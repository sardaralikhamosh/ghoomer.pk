import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { X, Maximize2, Minimize2, Navigation } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

// Replace with your own token
const MAPBOX_TOKEN = (import.meta as any).env?.VITE_MAPBOX_ACCESS_TOKEN || 'pk.eyJ1IjoiZ2hvb21lciIsImEiOiJjbHR6eW56eGwwMDRtMmptcW56eGwwMDRtIn0.placeholder';

interface MapItem {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  price?: number;
  rating?: number;
  image?: string;
}

interface MapSearchProps {
  items: MapItem[];
  onSelectItem: (id: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const MapSearch: React.FC<MapSearchProps> = ({ items, onSelectItem, isOpen, onClose }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const markers = useRef<{ [key: string]: mapboxgl.Marker }>({});

  useEffect(() => {
    if (!isOpen || !mapContainer.current) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [74.3587, 31.5204], // Default to Lahore
      zoom: 5,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    return () => {
      map.current?.remove();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!map.current) return;

    // Clear existing markers
    Object.values(markers.current).forEach(m => {
      if (m && typeof (m as any).remove === 'function') {
        (m as any).remove();
      }
    });
    markers.current = {};

    const bounds = new mapboxgl.LngLatBounds();

    items.forEach(item => {
      if (!item.coordinates) return;

      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.innerHTML = `
        <div class="bg-white dark:bg-slate-900 px-3 py-1.5 rounded-full shadow-xl border border-slate-100 dark:border-slate-800 flex items-center gap-2 cursor-pointer hover:scale-110 transition-transform group">
          <div class="w-2 h-2 rounded-full bg-sky-500 group-hover:bg-emerald-500 transition-colors"></div>
          <span class="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">$${item.price || 0}</span>
        </div>
      `;

      el.addEventListener('click', () => {
        onSelectItem(item.id);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([item.coordinates.lng, item.coordinates.lat])
        .addTo(map.current!);

      markers.current[item.id] = marker;
      bounds.extend([item.coordinates.lng, item.coordinates.lat]);
    });

    if (items.length > 0) {
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 12 });
    }
  }, [items]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={cn(
            "fixed z-[90] transition-all duration-500",
            isExpanded 
              ? "inset-0" 
              : "bottom-8 right-8 w-[400px] h-[500px] rounded-[40px] overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800"
          )}
        >
          <div ref={mapContainer} className="w-full h-full" />
          
          <div className="absolute top-6 left-6 right-6 flex justify-between items-center pointer-events-none">
            <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 shadow-lg pointer-events-auto">
              <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-2">
                <Navigation size={12} className="text-sky-500" />
                {items.length} Locations Found
              </span>
            </div>
            
            <div className="flex gap-2 pointer-events-auto">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-2xl border border-white/20 shadow-lg hover:bg-white dark:hover:bg-slate-900 transition-all"
              >
                {isExpanded ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
              </button>
              <button
                onClick={onClose}
                className="p-3 bg-rose-500 text-white rounded-2xl shadow-lg hover:bg-rose-600 transition-all"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {!isExpanded && (
            <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
              <div className="bg-sky-500 text-white px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-center shadow-xl shadow-sky-500/20 pointer-events-auto">
                Interactive Map View
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
