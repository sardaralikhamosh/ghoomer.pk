import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Image as ImageIcon, Bike, Map } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AdventureVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of a solo adventure cyclist on a loaded touring bicycle riding the Karakoram Highway (KKH) alongside Attabad Lake in Hunza, northern Pakistan. The road runs beside the intensely turquoise lake with a rock tunnel portal visible ahead. The cyclist wears cycling kit with panniers loaded on the bike. A dramatic rock cliff rises vertically on the right. The turquoise water fills the left of the frame. Bright midday sun, reflection on the water. Shot on a 35mm lens from roadside level, f/7.1, adventure cycling documentary photography, ultra-realistic, 16:9.";
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              text: prompt,
            },
          ],
        },
        config: {
          imageConfig: {
            aspectRatio: "16:9",
          },
        },
      });

      let imageUrl = null;
      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          const base64EncodeString = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64EncodeString}`;
          break;
        }
      }

      if (imageUrl) {
        setGeneratedImage(imageUrl);
      } else {
        throw new Error("No image data received from the model.");
      }
    } catch (err) {
      console.error("Image generation failed:", err);
      setError("Failed to generate the adventure view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-video rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center mb-6">
                    <Bike size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Adventure Awaits</h3>
                  <p className="max-w-xs">Visualize the legendary Karakoram Highway cycling experience.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-700 border-t-emerald-500 rounded-full animate-spin" />
                    <Bike className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-slate-400 animate-pulse">Mapping the route...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0"
                >
                  <img
                    src={generatedImage!}
                    alt="Cycling Attabad Lake KKH"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Map size={16} className="text-emerald-400" />
                      <span className="text-sm font-medium">Attabad Lake, KKH</span>
                    </div>
                    <span className="text-xs opacity-70">AI Adventure Preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-900/20 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4 block">The Ultimate Road Trip</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Ride the <span className="text-emerald-400">Karakoram Highway</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
                The KKH is one of the world's most spectacular roads. Visualize yourself cycling alongside the turquoise waters of Attabad Lake, passing through mountain tunnels and under towering granite spires.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-emerald-500 text-slate-900 rounded-full font-bold hover:bg-emerald-400 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-emerald-500/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Visualizing Ride...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Visualize Adventure
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-slate-800 text-slate-300 rounded-full font-bold hover:bg-slate-700 transition-all"
                  >
                    Reset
                  </button>
                )}
              </div>

              {error && (
                <p className="mt-4 text-red-400 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-400 rounded-full" />
                  {error}
                </p>
              )}

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate-800 pt-8">
                <div>
                  <h4 className="text-white font-bold mb-1">8th Wonder</h4>
                  <p className="text-slate-500 text-sm">The highest paved international road in the world.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Turquoise Waters</h4>
                  <p className="text-slate-500 text-sm">Formed in 2010, the lake is a masterpiece of nature.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
