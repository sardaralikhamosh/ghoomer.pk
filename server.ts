import express from "express";
import { createServer as createViteServer } from "vite";
import Database from "better-sqlite3";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import axios from "axios";

import nodemailer from "nodemailer";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

dotenv.config();

let stripe: Stripe | null = null;
const getStripe = () => {
  if (!stripe && process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripe;
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "ghoomer-secret-key-123";

// Database setup
const db = new Database("ghoomer.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT NOT NULL,
    avatar TEXT,
    role TEXT DEFAULT 'User', -- 'User' or 'Guide'
    stripe_account_id TEXT, -- For Stripe Connect
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    guide_id TEXT NOT NULL,
    guide_name TEXT NOT NULL,
    trip_name TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    days INTEGER NOT NULL,
    travelers INTEGER NOT NULL,
    total_price INTEGER NOT NULL,
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Approved', 'Paid', 'Cancelled', 'Rejected'
    payment_status TEXT DEFAULT 'Unpaid', -- 'Unpaid', 'Paid', 'Refunded'
    payment_method TEXT, -- 'Stripe', 'JazzCash'
    payment_intent_id TEXT, -- For Stripe
    cancellation_policy TEXT DEFAULT '24h', -- '24h', '7d', 'Non-refundable'
    check_in_time DATETIME,
    check_out_time DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    guide_id TEXT NOT NULL,
    guide_name TEXT NOT NULL,
    user_name TEXT NOT NULL,
    adventure TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT 0,
    attachment_url TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS guide_verifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guide_id INTEGER NOT NULL,
    document_type TEXT,
    document_url TEXT,
    verified BOOLEAN DEFAULT 0,
    verified_by INTEGER,
    verified_at DATETIME
  );

  CREATE TABLE IF NOT EXISTS certifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guide_id INTEGER NOT NULL,
    name TEXT,
    issuing_authority TEXT,
    issue_date DATE,
    expiry_date DATE,
    certificate_url TEXT
  );

  CREATE TABLE IF NOT EXISTS guide_availability (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    guide_id INTEGER NOT NULL,
    date DATE NOT NULL,
    is_available BOOLEAN DEFAULT 1
  );

  CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    type TEXT,
    title TEXT,
    message TEXT,
    is_read BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS favorites (
    user_id INTEGER NOT NULL,
    guide_id TEXT NOT NULL,
    PRIMARY KEY (user_id, guide_id),
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS reviews (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    guide_id TEXT NOT NULL,
    booking_id TEXT NOT NULL,
    rating INTEGER NOT NULL,
    comment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS bikes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- '70cc', '125cc', '250cc', 'Off-road'
    price_per_day INTEGER NOT NULL,
    image TEXT,
    shop_name TEXT NOT NULL,
    location TEXT NOT NULL,
    insurance_included BOOLEAN DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS mechanics (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    location TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    phone TEXT NOT NULL,
    rating REAL DEFAULT 0,
    specialty TEXT
  );

  CREATE TABLE IF NOT EXISTS routes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    difficulty TEXT, -- 'Easy', 'Moderate', 'Hard'
    distance TEXT,
    duration TEXT,
    start_point TEXT,
    end_point TEXT,
    waypoints TEXT, -- JSON string
    fuel_stops TEXT, -- JSON string
    accommodations TEXT, -- JSON string
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS gear (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type TEXT NOT NULL, -- 'Helmet', 'Jacket', 'Gloves', 'Boots'
    price_per_day INTEGER NOT NULL,
    image TEXT
  );

  CREATE TABLE IF NOT EXISTS micro_treks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    duration TEXT,
    difficulty TEXT,
    elevation_gain TEXT,
    price INTEGER NOT NULL,
    village TEXT NOT NULL,
    image TEXT,
    map_data TEXT, -- JSON string
    cultural_addon_price INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS micro_trek_guides (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    village TEXT NOT NULL,
    rating REAL DEFAULT 0,
    experience TEXT,
    avatar TEXT
  );

  CREATE TABLE IF NOT EXISTS student_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    university TEXT NOT NULL,
    student_id_url TEXT NOT NULL,
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Approved', 'Rejected'
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS guidepass_subscriptions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    plan TEXT NOT NULL, -- 'Monthly', 'Yearly'
    status TEXT DEFAULT 'Active',
    expires_at DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

  CREATE TABLE IF NOT EXISTS impact_tokens (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    balance INTEGER DEFAULT 0,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);

// Add missing columns to messages table if they don't exist (for existing databases)
try {
  db.exec("ALTER TABLE messages ADD COLUMN is_read BOOLEAN DEFAULT 0");
} catch (e) {}
try {
  db.exec("ALTER TABLE messages ADD COLUMN attachment_url TEXT");
} catch (e) {}

// Seed Moto Trek data if empty
const bikesCount = db.prepare("SELECT COUNT(*) as count FROM bikes").get() as any;
if (bikesCount.count === 0) {
  const seedBikes = [
    { name: "Honda CD 70", type: "70cc", price: 1500, shop: "Karakoram Rentals", loc: "Gilgit", img: "https://picsum.photos/seed/bike1/400/300" },
    { name: "Yamaha YBR 125G", type: "125cc", price: 2500, shop: "Highland Motors", loc: "Skardu", img: "https://picsum.photos/seed/bike2/400/300" },
    { name: "Suzuki GS 150", type: "125cc", price: 3000, shop: "Adventure Wheels", loc: "Hunza", img: "https://picsum.photos/seed/bike3/400/300" },
    { name: "Kawasaki KLX 250", type: "Off-road", price: 8000, shop: "Dirt Riders", loc: "Gilgit", img: "https://picsum.photos/seed/bike4/400/300" }
  ];
  const stmt = db.prepare("INSERT INTO bikes (name, type, price_per_day, shop_name, location, image) VALUES (?, ?, ?, ?, ?, ?)");
  seedBikes.forEach(b => stmt.run(b.name, b.type, b.price, b.shop, b.loc, b.img));
}

const mechanicsCount = db.prepare("SELECT COUNT(*) as count FROM mechanics").get() as any;
if (mechanicsCount.count === 0) {
  const seedMechanics = [
    { name: "Ali's Workshop", loc: "Gilgit Main Market", lat: 35.9208, lng: 74.308, phone: "+923001234567", rating: 4.8, specialty: "Engine Tuning" },
    { name: "Skardu Bike Point", loc: "Skardu Bazaar", lat: 35.2975, lng: 75.6333, phone: "+923007654321", rating: 4.5, specialty: "Suspension" },
    { name: "Hunza Moto Care", loc: "Karimabad", lat: 36.3275, lng: 74.6658, phone: "+923009876543", rating: 4.9, specialty: "General Service" }
  ];
  const stmt = db.prepare("INSERT INTO mechanics (name, location, lat, lng, phone, rating, specialty) VALUES (?, ?, ?, ?, ?, ?, ?)");
  seedMechanics.forEach(m => stmt.run(m.name, m.loc, m.lat, m.lng, m.phone, m.rating, m.specialty));
}

const routesCount = db.prepare("SELECT COUNT(*) as count FROM routes").get() as any;
if (routesCount.count === 0) {
  const seedRoutes = [
    { 
      name: "Karakoram Highway Run", 
      desc: "The classic ride from Gilgit to Hunza.", 
      diff: "Easy", 
      dist: "100km", 
      dur: "3 hours",
      start: "Gilgit",
      end: "Hunza",
      waypoints: JSON.stringify(["Rakaposhi View Point", "Nomal"]),
      fuel: JSON.stringify(["Gilgit PSO", "Aliabad Shell"]),
      stays: JSON.stringify(["Serena Gilgit", "Eagle's Nest"]),
      img: "https://picsum.photos/seed/route1/800/400"
    },
    { 
      name: "Deosai Plains Crossing", 
      desc: "High altitude off-road adventure.", 
      diff: "Hard", 
      dist: "150km", 
      dur: "6 hours",
      start: "Skardu",
      end: "Astore",
      waypoints: JSON.stringify(["Sheosar Lake", "Bara Pani"]),
      fuel: JSON.stringify(["Skardu City"]),
      stays: JSON.stringify(["Deosai Campsite"]),
      img: "https://picsum.photos/seed/route2/800/400"
    }
  ];
  const stmt = db.prepare("INSERT INTO routes (name, description, difficulty, distance, duration, start_point, end_point, waypoints, fuel_stops, accommodations, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  seedRoutes.forEach(r => stmt.run(r.name, r.desc, r.diff, r.dist, r.dur, r.start, r.end, r.waypoints, r.fuel, r.stays, r.img));
}

const gearCount = db.prepare("SELECT COUNT(*) as count FROM gear").get() as any;
if (gearCount.count === 0) {
  const seedGear = [
    { name: "Full Face Helmet", type: "Helmet", price: 500, img: "https://picsum.photos/seed/gear1/400/300" },
    { name: "Riding Jacket", type: "Jacket", price: 800, img: "https://picsum.photos/seed/gear2/400/300" },
    { name: "Knee Guards", type: "Protection", price: 300, img: "https://picsum.photos/seed/gear3/400/300" }
  ];
  const stmt = db.prepare("INSERT INTO gear (name, type, price_per_day, image) VALUES (?, ?, ?, ?)");
  seedGear.forEach(g => stmt.run(g.name, g.type, g.price, g.img));
}

const microTreksCount = db.prepare("SELECT COUNT(*) as count FROM micro_treks").get() as any;
if (microTreksCount.count === 0) {
  const seedMicroTreks = [
    { 
      name: "Altit Village Heritage Walk", 
      desc: "Explore the ancient streets of Altit and visit the 1100-year-old fort surroundings.", 
      dur: "2 hours", 
      diff: "Easy", 
      elev: "50m", 
      price: 4500, 
      village: "Altit", 
      img: "https://picsum.photos/seed/trek1/400/300",
      map: JSON.stringify({ points: [[36.314, 74.671], [36.315, 74.672], [36.316, 74.673]] }),
      addon: 1500
    },
    { 
      name: "Gulmit Glacier View Point", 
      desc: "A short but steep hike to get a panoramic view of the Gulmit glacier.", 
      dur: "4 hours", 
      diff: "Moderate", 
      elev: "400m", 
      price: 6500, 
      village: "Gulmit", 
      img: "https://picsum.photos/seed/trek2/400/300",
      map: JSON.stringify({ points: [[36.414, 74.871], [36.415, 74.872], [36.416, 74.873]] }),
      addon: 2000
    },
    { 
      name: "Passu Suspension Bridge Trail", 
      desc: "Walk through the apricot orchards of Passu to the famous suspension bridge.", 
      dur: "3 hours", 
      diff: "Easy", 
      elev: "30m", 
      price: 5000, 
      village: "Passu", 
      img: "https://picsum.photos/seed/trek3/400/300",
      map: JSON.stringify({ points: [[36.474, 74.891], [36.475, 74.892], [36.476, 74.893]] }),
      addon: 1200
    }
  ];
  const stmt = db.prepare("INSERT INTO micro_treks (name, description, duration, difficulty, elevation_gain, price, village, image, map_data, cultural_addon_price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
  seedMicroTreks.forEach(t => stmt.run(t.name, t.desc, t.dur, t.diff, t.elev, t.price, t.village, t.img, t.map, t.addon));
}

const microGuidesCount = db.prepare("SELECT COUNT(*) as count FROM micro_trek_guides").get() as any;
if (microGuidesCount.count === 0) {
  const seedMicroGuides = [
    { name: "Zafar Iqbal", village: "Altit", rating: 4.9, exp: "15 years", avatar: "https://i.pravatar.cc/150?u=zafar" },
    { name: "Sajida Bibi", village: "Gulmit", rating: 4.8, exp: "8 years", avatar: "https://i.pravatar.cc/150?u=sajida" },
    { name: "Karim Khan", village: "Passu", rating: 4.7, exp: "12 years", avatar: "https://i.pravatar.cc/150?u=karim" }
  ];
  const stmt = db.prepare("INSERT INTO micro_trek_guides (name, village, rating, experience, avatar) VALUES (?, ?, ?, ?, ?)");
  seedMicroGuides.forEach(g => stmt.run(g.name, g.village, g.rating, g.exp, g.avatar));
}

app.use(express.json());
app.use(cookieParser());

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ message: "Forbidden" });
    req.user = user;
    next();
  });
};

// Nodemailer setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.ethereal.email",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "mock_user",
    pass: process.env.SMTP_PASS || "mock_pass",
  },
});

const sendBookingConfirmation = async (userEmail: string, booking: any) => {
  try {
    const info = await transporter.sendMail({
      from: '"Ghoomer.pk" <no-reply@ghoomer.pk>',
      to: userEmail,
      subject: `Booking Confirmation: ${booking.trip_name}`,
      text: `Your booking for ${booking.trip_name} with ${booking.guide_name} is confirmed!`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #10b981;">Booking Confirmed!</h2>
          <p>Hi there,</p>
          <p>Your adventure to <strong>${booking.trip_name}</strong> with <strong>${booking.guide_name}</strong> is officially confirmed.</p>
          <div style="background: #f9fafb; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><strong>Booking ID:</strong> BK-${booking.id}</p>
            <p style="margin: 5px 0;"><strong>Start Date:</strong> ${booking.start_date}</p>
            <p style="margin: 5px 0;"><strong>Duration:</strong> ${booking.days} days</p>
            <p style="margin: 5px 0;"><strong>Total Price:</strong> $${booking.total_price}</p>
          </div>
          <p>You can download your itinerary and manage your booking from your dashboard.</p>
          <p>Safe travels!</p>
          <p>Team Ghoomer.pk</p>
        </div>
      `,
    });
    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.error("Email error:", error);
  }
};

// API Routes
app.post("/api/auth/signup", async (req, res) => {
  const { email, password, name } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const stmt = db.prepare("INSERT INTO users (email, password, name) VALUES (?, ?, ?)");
    const result = stmt.run(email, hashedPassword, name);
    
    const user = { id: result.lastInsertRowid, email, name };
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "7d" });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.status(201).json({ user });
  } catch (error: any) {
    if (error.code === "SQLITE_CONSTRAINT") {
      return res.status(400).json({ message: "Email already exists" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user: any = db.prepare("SELECT * FROM users WHERE email = ?").get(email);
    if (!user) return res.status(400).json({ message: "Invalid credentials" });
    
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });
    
    const userData = { id: user.id, email: user.email, name: user.name, avatar: user.avatar };
    const token = jwt.sign(userData, JWT_SECRET, { expiresIn: "7d" });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });
    
    res.json({ user: userData });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/api/auth/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});

app.get("/api/auth/me", authenticateToken, (req: any, res) => {
  res.json({ user: req.user });
});

app.put("/api/auth/profile", authenticateToken, (req: any, res) => {
  const { name, avatar, email } = req.body;
  try {
    // Check if email is already taken by another user
    if (email !== req.user.email) {
      const existingUser = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    db.prepare("UPDATE users SET name = ?, avatar = ?, email = ? WHERE id = ?").run(name, avatar, email, req.user.id);
    const updatedUser = { ...req.user, name, avatar, email };
    const token = jwt.sign(updatedUser, JWT_SECRET, { expiresIn: "7d" });
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Booking Routes
app.post("/api/bookings", authenticateToken, (req: any, res) => {
  const { guideId, guideName, tripName, startDate, endDate, days, travelers, totalPrice, cancellationPolicy = '24h' } = req.body;
  
  try {
    const stmt = db.prepare(`
      INSERT INTO bookings (user_id, guide_id, guide_name, trip_name, start_date, end_date, days, travelers, total_price, status, payment_status, cancellation_policy)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'Pending', 'Unpaid', ?)
    `);
    
    const result = stmt.run(
      req.user.id,
      guideId,
      guideName,
      tripName,
      startDate,
      endDate,
      days,
      travelers,
      totalPrice,
      cancellationPolicy
    );
    
    const newBooking = {
      id: `BK-${result.lastInsertRowid}`,
      guideId,
      guideName,
      tripName,
      startDate,
      endDate,
      days,
      travelers,
      totalPrice,
      status: 'Pending',
      paymentStatus: 'Unpaid',
      cancellationPolicy,
      createdAt: new Date().toISOString()
    };
    
    res.status(201).json({ booking: newBooking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Failed to create booking request" });
  }
});

// Guide Approval Routes
app.put("/api/bookings/:id/approve", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  const bookingId = id.replace('BK-', '');
  
  try {
    // In a real app, check if the logged-in user is the guide for this booking
    const stmt = db.prepare("UPDATE bookings SET status = 'Approved' WHERE id = ?");
    const result = stmt.run(bookingId);
    
    if (result.changes === 0) return res.status(404).json({ message: "Booking not found" });
    
    res.json({ message: "Booking approved. Waiting for payment." });
  } catch (error) {
    res.status(500).json({ message: "Failed to approve booking" });
  }
});

app.put("/api/bookings/:id/reject", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  const bookingId = id.replace('BK-', '');
  
  try {
    const stmt = db.prepare("UPDATE bookings SET status = 'Rejected' WHERE id = ?");
    const result = stmt.run(bookingId);
    
    if (result.changes === 0) return res.status(404).json({ message: "Booking not found" });
    
    res.json({ message: "Booking rejected" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reject booking" });
  }
});

// Payment Routes
app.post("/api/bookings/:id/pay/stripe", authenticateToken, async (req: any, res) => {
  const { id } = req.params;
  const bookingId = id.replace('BK-', '');
  
  try {
    const booking: any = db.prepare("SELECT * FROM bookings WHERE id = ? AND user_id = ?").get(bookingId, req.user.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    if (booking.status !== 'Approved') return res.status(400).json({ message: "Booking must be approved before payment" });

    const stripeInstance = getStripe();
    if (!stripeInstance) {
      // Mock payment for demo if no key
      db.prepare("UPDATE bookings SET status = 'Paid', payment_status = 'Paid', payment_method = 'Stripe' WHERE id = ?").run(bookingId);
      
      // Send confirmation email
      const updatedBooking: any = db.prepare("SELECT * FROM bookings WHERE id = ?").get(bookingId);
      sendBookingConfirmation(req.user.email, updatedBooking);

      return res.json({ message: "Payment successful (Demo Mode)", clientSecret: "demo_secret" });
    }

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: { name: booking.trip_name },
          unit_amount: booking.total_price * 100,
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${req.headers.origin}/bookings?success=true&id=${id}`,
      cancel_url: `${req.headers.origin}/bookings?canceled=true`,
      metadata: { bookingId: id }
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error);
    res.status(500).json({ message: "Failed to initiate Stripe payment" });
  }
});

app.post("/api/bookings/:id/pay/jazzcash", authenticateToken, async (req: any, res) => {
  const { id } = req.params;
  const bookingId = id.replace('BK-', '');
  
  try {
    const booking: any = db.prepare("SELECT * FROM bookings WHERE id = ? AND user_id = ?").get(bookingId, req.user.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Mock JazzCash API Call
    // In a real app, you'd call JazzCash's HTTP API here
    console.log("Initiating JazzCash payment for booking:", id);
    
    // Simulate success for demo
    db.prepare("UPDATE bookings SET status = 'Paid', payment_status = 'Paid', payment_method = 'JazzCash' WHERE id = ?").run(bookingId);
    
    // Send confirmation email
    const updatedBooking: any = db.prepare("SELECT * FROM bookings WHERE id = ?").get(bookingId);
    sendBookingConfirmation(req.user.email, updatedBooking);

    res.json({ 
      message: "JazzCash payment initiated. Please check your mobile for the USSD prompt.",
      status: "Success"
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to initiate JazzCash payment" });
  }
});

app.get("/api/bookings", authenticateToken, (req: any, res) => {
  try {
    const bookings = db.prepare("SELECT * FROM bookings WHERE user_id = ? ORDER BY created_at DESC").all(req.user.id);
    
    const formattedBookings = bookings.map((b: any) => ({
      id: `BK-${b.id}`,
      guideId: b.guide_id,
      guideName: b.guide_name,
      tripName: b.trip_name,
      startDate: b.start_date,
      endDate: b.end_date,
      days: b.days,
      travelers: b.travelers,
      totalPrice: b.total_price,
      status: b.status,
      paymentStatus: b.payment_status,
      checkInTime: b.check_in_time,
      checkOutTime: b.check_out_time,
      createdAt: b.created_at
    }));
    
    res.json({ bookings: formattedBookings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

// Message Routes
app.post("/api/messages", (req, res) => {
  const { guideId, guideName, userName, adventure, message } = req.body;
  
  // Optional: check if user is logged in to associate with user_id
  let userId = null;
  const token = req.cookies.token;
  if (token) {
    try {
      const decoded: any = jwt.verify(token, JWT_SECRET);
      userId = decoded.id;
    } catch (e) {
      // Ignore invalid token for guest messages
    }
  }

  try {
    const stmt = db.prepare(`
      INSERT INTO messages (user_id, guide_id, guide_name, user_name, adventure, message)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(userId, guideId, guideName, userName, adventure, message);
    res.status(201).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Message error:", error);
    res.status(500).json({ message: "Failed to send message" });
  }
});

// Favorite Routes
app.post("/api/favorites/toggle", authenticateToken, (req: any, res) => {
  const { guideId } = req.body;
  const userId = req.user.id;

  try {
    const existing = db.prepare("SELECT * FROM favorites WHERE user_id = ? AND guide_id = ?").get(userId, guideId);
    
    if (existing) {
      db.prepare("DELETE FROM favorites WHERE user_id = ? AND guide_id = ?").run(userId, guideId);
      res.json({ saved: false });
    } else {
      db.prepare("INSERT INTO favorites (user_id, guide_id) VALUES (?, ?)").run(userId, guideId);
      res.json({ saved: true });
    }
  } catch (error) {
    res.status(500).json({ message: "Failed to toggle favorite" });
  }
});

app.get("/api/favorites", authenticateToken, (req: any, res) => {
  try {
    const favorites = db.prepare("SELECT guide_id FROM favorites WHERE user_id = ?").all(req.user.id);
    res.json({ favorites: favorites.map((f: any) => f.guide_id) });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorites" });
  }
});

// Moto Trek Routes
app.get("/api/moto/bikes", (req, res) => {
  try {
    const bikes = db.prepare("SELECT * FROM bikes").all();
    res.json(bikes);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bikes" });
  }
});

app.get("/api/moto/mechanics", (req, res) => {
  try {
    const mechanics = db.prepare("SELECT * FROM mechanics").all();
    res.json(mechanics);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch mechanics" });
  }
});

app.get("/api/moto/routes", (req, res) => {
  try {
    const routes = db.prepare("SELECT * FROM routes").all();
    res.json(routes.map((r: any) => ({
      ...r,
      waypoints: JSON.parse(r.waypoints),
      fuel_stops: JSON.parse(r.fuel_stops),
      accommodations: JSON.parse(r.accommodations)
    })));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch routes" });
  }
});

app.get("/api/moto/gear", (req, res) => {
  try {
    const gear = db.prepare("SELECT * FROM gear").all();
    res.json(gear);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch gear" });
  }
});

app.post("/api/moto/sos", authenticateToken, (req: any, res) => {
  const { mechanicId, location } = req.body;
  // In a real app, this would trigger an SMS/Push notification to the mechanic
  console.log(`SOS Alert from user ${req.user.id} to mechanic ${mechanicId} at ${location}`);
  res.json({ message: "SOS Alert sent! A mechanic will contact you shortly." });
});

// Micro Trek Routes
app.get("/api/micro-treks", (req, res) => {
  try {
    const treks = db.prepare("SELECT * FROM micro_treks").all();
    res.json(treks.map((t: any) => ({
      ...t,
      map_data: JSON.parse(t.map_data)
    })));
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch micro treks" });
  }
});

app.get("/api/micro-treks/:village/guides", (req, res) => {
  const { village } = req.params;
  try {
    const guides = db.prepare("SELECT * FROM micro_trek_guides WHERE village = ?").all(village);
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch guides" });
  }
});

app.post("/api/micro-treks/book", authenticateToken, (req: any, res) => {
  const { trekId, guideId, date, includeAddon } = req.body;
  try {
    const trek: any = db.prepare("SELECT * FROM micro_treks WHERE id = ?").get(trekId);
    const guide: any = db.prepare("SELECT * FROM micro_trek_guides WHERE id = ?").get(guideId);
    
    if (!trek || !guide) return res.status(404).json({ message: "Trek or Guide not found" });

    const totalPrice = trek.price + (includeAddon ? trek.cultural_addon_price : 0);

    const result = db.prepare(`
      INSERT INTO bookings (user_id, guide_id, guide_name, trip_name, start_date, end_date, days, travelers, total_price, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(req.user.id, `MICRO-${guideId}`, guide.name, trek.name, date, date, 1, 1, totalPrice, 'Paid');

    res.json({ message: "Micro Trek booked successfully!", bookingId: result.lastInsertRowid });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Failed to book micro trek" });
  }
});

// Guide Management
app.post("/api/guides/verify", authenticateToken, (req: any, res) => {
  const { documentType, documentUrl } = req.body;
  try {
    db.prepare("INSERT INTO guide_verifications (guide_id, document_type, document_url) VALUES (?, ?, ?)").run(req.user.id, documentType, documentUrl);
    res.json({ message: "Verification documents submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit verification" });
  }
});

app.get("/api/guides/:id/certifications", (req, res) => {
  const { id } = req.params;
  try {
    const certs = db.prepare("SELECT * FROM certifications WHERE guide_id = ?").all(id);
    res.json(certs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch certifications" });
  }
});

app.put("/api/guides/availability", authenticateToken, (req: any, res) => {
  const { date, isAvailable } = req.body;
  try {
    const existing = db.prepare("SELECT id FROM guide_availability WHERE guide_id = ? AND date = ?").get(req.user.id, date) as any;
    if (existing) {
      db.prepare("UPDATE guide_availability SET is_available = ? WHERE id = ?").run(isAvailable ? 1 : 0, existing.id);
    } else {
      db.prepare("INSERT INTO guide_availability (guide_id, date, is_available) VALUES (?, ?, ?)").run(req.user.id, date, isAvailable ? 1 : 0);
    }
    res.json({ message: "Availability updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to update availability" });
  }
});

// Payments
app.post("/api/payments/create-intent", authenticateToken, async (req: any, res) => {
  const { amount, bookingId } = req.body;
  try {
    const stripeInstance = getStripe();
    if (!stripeInstance) {
      return res.json({ clientSecret: "demo_secret_" + Math.random().toString(36).substring(7) });
    }
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      metadata: { bookingId }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: "Failed to create payment intent" });
  }
});

app.post("/api/payments/jazzcash", authenticateToken, (req: any, res) => {
  const { amount, bookingId, phoneNumber } = req.body;
  // Mock JazzCash integration
  try {
    db.prepare("UPDATE bookings SET payment_method = 'JazzCash', payment_status = 'Paid', status = 'Paid' WHERE id = ?").run(bookingId.replace('BK-', ''));
    res.json({ message: "JazzCash payment processed successfully (Demo)", transactionId: "JC" + Date.now() });
  } catch (error) {
    res.status(500).json({ message: "Failed to process JazzCash payment" });
  }
});

app.get("/api/payments/status/:id", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  try {
    const booking: any = db.prepare("SELECT payment_status FROM bookings WHERE id = ?").get(id.replace('BK-', ''));
    res.json({ status: booking?.payment_status || 'Unknown' });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payment status" });
  }
});

// Messages
app.get("/api/messages/unread", authenticateToken, (req: any, res) => {
  try {
    const unreadCount = db.prepare("SELECT COUNT(*) as count FROM messages WHERE guide_id = ? AND is_read = 0").get(req.user.id.toString()) as any;
    res.json({ count: unreadCount.count });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch unread messages" });
  }
});

app.post("/api/messages/:id/read", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  try {
    db.prepare("UPDATE messages SET is_read = 1 WHERE id = ?").run(id);
    res.json({ message: "Message marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark message as read" });
  }
});

// Notifications
app.get("/api/notifications", authenticateToken, (req: any, res) => {
  try {
    const notifications = db.prepare("SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC").all(req.user.id);
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
});

app.post("/api/notifications/mark-read", authenticateToken, (req: any, res) => {
  try {
    db.prepare("UPDATE notifications SET is_read = 1 WHERE user_id = ?").run(req.user.id);
    res.json({ message: "Notifications marked as read" });
  } catch (error) {
    res.status(500).json({ message: "Failed to mark notifications as read" });
  }
});

// Innovation Features
app.post("/api/student/apply", authenticateToken, (req: any, res) => {
  const { university, studentIdUrl } = req.body;
  try {
    db.prepare("INSERT INTO student_applications (user_id, university, student_id_url) VALUES (?, ?, ?)").run(req.user.id, university, studentIdUrl);
    res.json({ message: "Student guide application submitted" });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit application" });
  }
});

app.post("/api/guidepass/subscribe", authenticateToken, (req: any, res) => {
  const { plan } = req.body;
  const expiresAt = new Date();
  if (plan === 'Monthly') expiresAt.setMonth(expiresAt.getMonth() + 1);
  else expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  try {
    db.prepare("INSERT INTO guidepass_subscriptions (user_id, plan, expires_at) VALUES (?, ?, ?)").run(req.user.id, plan, expiresAt.toISOString());
    res.json({ message: `Subscribed to ${plan} GuidePass successfully` });
  } catch (error) {
    res.status(500).json({ message: "Failed to subscribe" });
  }
});

app.get("/api/impact/balance", authenticateToken, (req: any, res) => {
  try {
    const impact = db.prepare("SELECT balance FROM impact_tokens WHERE user_id = ?").get(req.user.id) as any;
    res.json({ balance: impact?.balance || 0 });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch impact balance" });
  }
});

// Review Routes
app.post("/api/reviews", authenticateToken, (req: any, res) => {
  const { guideId, bookingId, rating, comment } = req.body;
  const userId = req.user.id;

  try {
    // Check if user has a booking for this guide
    const booking = db.prepare("SELECT * FROM bookings WHERE id = ? AND user_id = ? AND guide_id = ?").get(bookingId.replace('BK-', ''), userId, guideId);
    if (!booking) {
      return res.status(403).json({ message: "You can only review guides you have booked." });
    }

    // Check if review already exists for this booking
    const existing = db.prepare("SELECT * FROM reviews WHERE booking_id = ? AND user_id = ?").get(bookingId, userId);
    if (existing) {
      return res.status(400).json({ message: "You have already reviewed this booking." });
    }

    const stmt = db.prepare(`
      INSERT INTO reviews (user_id, guide_id, booking_id, rating, comment)
      VALUES (?, ?, ?, ?, ?)
    `);
    stmt.run(userId, guideId, bookingId, rating, comment);
    
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (error) {
    console.error("Review error:", error);
    res.status(500).json({ message: "Failed to submit review" });
  }
});

// Check-in / Check-out Routes
app.post("/api/bookings/:id/check-in", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  const bookingId = id.replace('BK-', '');
  const now = new Date().toISOString();

  try {
    const result = db.prepare("UPDATE bookings SET check_in_time = ?, status = 'In Progress' WHERE id = ? AND user_id = ?").run(now, bookingId, req.user.id);
    if (result.changes === 0) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Checked in successfully", checkInTime: now });
  } catch (error) {
    res.status(500).json({ message: "Failed to check in" });
  }
});

app.post("/api/bookings/:id/check-out", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  const bookingId = id.replace('BK-', '');
  const now = new Date().toISOString();

  try {
    const result = db.prepare("UPDATE bookings SET check_out_time = ?, status = 'Completed' WHERE id = ? AND user_id = ?").run(now, bookingId, req.user.id);
    if (result.changes === 0) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Checked out successfully", checkOutTime: now });
  } catch (error) {
    res.status(500).json({ message: "Failed to check out" });
  }
});

// PDF Itinerary Route
app.get("/api/bookings/:id/itinerary", authenticateToken, (req: any, res) => {
  const { id } = req.params;
  const bookingId = id.replace('BK-', '');

  try {
    const booking: any = db.prepare("SELECT * FROM bookings WHERE id = ? AND user_id = ?").get(bookingId, req.user.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setTextColor(16, 185, 129); // Emerald-500
    doc.text("GHOOMER.PK", 105, 20, { align: "center" });
    
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42); // Slate-900
    doc.text("Official Trip Itinerary", 105, 30, { align: "center" });
    
    // Booking Info
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139); // Slate-500
    doc.text(`Booking ID: BK-${booking.id}`, 20, 45);
    doc.text(`Issued Date: ${new Date().toLocaleDateString()}`, 20, 50);
    
    // Trip Details
    doc.setFontSize(14);
    doc.setTextColor(15, 23, 42);
    doc.text("Trip Details", 20, 65);
    
    const tableData = [
      ["Trip Name", booking.trip_name],
      ["Guide", booking.guide_name],
      ["Start Date", booking.start_date],
      ["End Date", booking.end_date],
      ["Duration", `${booking.days} Days`],
      ["Travelers", `${booking.travelers} Person(s)`],
      ["Total Price", `$${booking.total_price}`],
      ["Status", booking.status],
    ];

    (doc as any).autoTable({
      startY: 70,
      head: [["Field", "Information"]],
      body: tableData,
      theme: "striped",
      headStyles: { fillColor: [16, 185, 129] },
    });

    // Safety Info
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(14);
    doc.text("Safety & Contact", 20, finalY + 20);
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text("• Please ensure you check-in via the app when starting your journey.", 20, finalY + 30);
    doc.text("• Emergency Support: +92 300 1234567", 20, finalY + 35);
    doc.text("• Local Guide Contact: Available in your dashboard.", 20, finalY + 40);

    // Footer
    doc.setFontSize(8);
    doc.text("Thank you for choosing Ghoomer.pk - Exploring Pakistan Together.", 105, 280, { align: "center" });

    const pdfBuffer = doc.output("arraybuffer");
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=Itinerary_BK-${booking.id}.pdf`);
    res.send(Buffer.from(pdfBuffer));

  } catch (error) {
    console.error("PDF error:", error);
    res.status(500).json({ message: "Failed to generate itinerary" });
  }
});

// Data Routes (Simulating real API calls)
app.get("/api/guides", (req, res) => {
  // Add a small delay to simulate network latency
  setTimeout(() => {
    res.json({ guides: [
      {
        id: '1',
        name: "Ali Raza",
        location: "Hunza Valley",
        rating: 4.9,
        reviews: 127,
        pricePerDay: 75,
        specialties: ["K2 Trekking", "Mountaineering", "Photography"],
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
        isVerified: true,
        badge: "TOP RATED",
        bio: "Born and raised in the heart of Hunza, I have been guiding expeditions for over a decade. My passion is showing travelers the hidden gems of the Karakoram range.",
        experienceYears: 12,
        availability: ["Monday", "Wednesday", "Friday", "Saturday"],
        languages: ["English", "Urdu", "Burushaski"]
      },
      {
        id: '2',
        name: "Sarah Khan",
        location: "Skardu",
        rating: 4.8,
        reviews: 89,
        pricePerDay: 65,
        specialties: ["Cultural Tours", "Food Tours", "Photography"],
        image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=600&q=80",
        isVerified: true,
        badge: "CULTURE EXPERT",
        bio: "I specialize in cultural immersion and photography. I love sharing the rich history and traditions of the Balti people with my guests.",
        experienceYears: 8,
        availability: ["Tuesday", "Thursday", "Saturday", "Sunday"],
        languages: ["English", "Urdu", "Balti"]
      },
      {
        id: '3',
        name: "Ahmed Hassan",
        location: "Fairy Meadows",
        rating: 4.7,
        reviews: 156,
        pricePerDay: 85,
        specialties: ["Ice Climbing", "Skiing", "Winter Expeditions"],
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
        isVerified: true,
        badge: "WINTER SPECIALIST",
        bio: "An expert in winter sports and high-altitude climbing. I have summited several 7,000m peaks and am a certified ice climbing instructor.",
        experienceYears: 15,
        availability: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        languages: ["English", "Urdu", "German"]
      },
      {
        id: '4',
        name: "Zara Malik",
        location: "Chitral",
        rating: 4.9,
        reviews: 203,
        pricePerDay: 70,
        specialties: ["Kalash Valley", "Cultural Immersion", "Trekking"],
        image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=600&q=80",
        isVerified: true,
        badge: "LOCAL EXPERT",
        bio: "I am deeply connected to the Kalash community and offer unique insights into their ancient way of life. Join me for a journey through time.",
        experienceYears: 10,
        availability: ["Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        languages: ["English", "Urdu", "Khowar"]
      }
    ]});
  }, 800);
});

app.get("/api/destinations", (req, res) => {
  setTimeout(() => {
    res.json({ destinations: [
      {
        id: 'k2',
        name: "K2 Base Camp",
        description: "World's most challenging trek",
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=600&q=80",
        guideCount: 32,
        region: 'Gilgit-Baltistan',
        activityType: 'Mountaineering',
        price: 1200,
        difficulty: 'Extreme',
        bestSeason: 'Summer',
        groupSize: 'Small Group'
      },
      {
        id: 'hunza',
        name: "Hunza Valley",
        description: "Cultural gem of the north",
        image: "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=600&q=80",
        guideCount: 45,
        region: 'Gilgit-Baltistan',
        activityType: 'Cultural',
        price: 450,
        difficulty: 'Easy',
        bestSeason: 'Spring',
        groupSize: 'Large Group'
      },
      {
        id: 'fairy',
        name: "Fairy Meadows",
        description: "Camp under Nanga Parbat",
        image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=600&q=80",
        guideCount: 28,
        region: 'Gilgit-Baltistan',
        activityType: 'Trekking',
        price: 350,
        difficulty: 'Moderate',
        bestSeason: 'Summer',
        groupSize: 'Small Group'
      },
      {
        id: 'skardu',
        name: "Skardu Valley",
        description: "Gateway to the Karakoram",
        image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=90",
        guideCount: 38,
        region: 'Gilgit-Baltistan',
        activityType: 'Photography',
        price: 600,
        difficulty: 'Moderate',
        bestSeason: 'Autumn',
        groupSize: 'Solo'
      },
      {
        id: 'phander',
        name: "Phander Valley",
        description: "The trout fishing paradise",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=600&q=80",
        guideCount: 15,
        region: 'Gilgit-Baltistan',
        activityType: 'Sightseeing',
        price: 350,
        difficulty: 'Easy',
        bestSeason: 'Summer',
        groupSize: 'Small Group'
      },
      {
        id: 'khaplu',
        name: "Khaplu Valley",
        description: "Royal heritage and architecture",
        image: "https://images.unsplash.com/photo-1593693399766-6f7ad6eff5c0?auto=format&fit=crop&w=600&q=80",
        guideCount: 20,
        region: 'Gilgit-Baltistan',
        activityType: 'Cultural',
        price: 400,
        difficulty: 'Easy',
        bestSeason: 'Autumn',
        groupSize: 'Small Group'
      },
      {
        id: 'shandur',
        name: "Shandur Pass",
        description: "Roof of the world polo ground",
        image: "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=600&q=80",
        guideCount: 12,
        region: 'Gilgit-Baltistan',
        activityType: 'Cultural',
        price: 550,
        difficulty: 'Moderate',
        bestSeason: 'Summer',
        groupSize: 'Small Group'
      },
      {
        id: 'kalash',
        name: "Kalash Valley",
        description: "Ancient culture and traditions",
        image: "https://images.unsplash.com/photo-1524230572899-a752b3835840?auto=format&fit=crop&w=600&q=80",
        guideCount: 18,
        region: 'Khyber Pakhtunkhwa',
        activityType: 'Cultural',
        price: 400,
        difficulty: 'Easy',
        bestSeason: 'Autumn',
        groupSize: 'Small Group'
      }
    ]});
  }, 1200);
});

// Vite middleware for development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
