import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Star, Moon, Camera } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AstrophotographyVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A long-exposure astrophotography photo of the Milky Way core rising directly above Rakaposhi peak (7,788m) as seen from the Eagle's Nest (Duikar) viewpoint above Karimabad, Hunza, Pakistan. The Milky Way is fully visible — dense star band, subtle nebula colouring, green airglow at the horizon. Rakaposhi's snow-covered summit silhouette is perfectly framed below the galaxy core. The Hunza Valley below has scattered warm village lights. Shot at 14mm, f/2.8, ISO 3200, 20-second exposure, nightscape photography, ultra-realistic, 16:9.";
      
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
      setError("Failed to capture the night sky. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
      {/* Starry background effect */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div 
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-4 block">Nightscapes & Cosmos</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Celestial <span className="text-indigo-400">Rakaposhi</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
                Experience the breathtaking clarity of the Hunza night sky. Visualize the Milky Way core rising directly above the snow-capped Rakaposhi peak, as seen from the legendary Eagle's Nest viewpoint.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-500 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-indigo-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Exposing Sensor...
                    </>
                  ) : (
                    <>
                      <Star size={20} />
                      Visualize Night Sky
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-slate-900 text-slate-300 rounded-full font-bold hover:bg-slate-800 transition-all"
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

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate-900 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                    <Moon className="text-indigo-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Eagle's Nest</h4>
                    <p className="text-slate-500 text-xs">2,850m elevation.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                    <Camera className="text-indigo-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Long Exposure</h4>
                    <p className="text-slate-500 text-xs">20s, f/2.8, ISO 3200.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-slate-600 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <Star size={40} className="text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Dark Sky Sanctuary</h3>
                  <p className="max-w-xs">Visualize the cosmic dance over the Karakoram giants.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-800 border-t-indigo-400 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-slate-400 animate-pulse">Capturing photons...</p>
                </motion.div>
              ) : (
                <motion.div
                  key="image"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0"
                >
                  <img
                    src={generatedImage!}
                    alt="Milky Way over Rakaposhi"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-indigo-400" />
                      <span className="text-sm font-medium">Eagle's Nest, Duikar</span>
                    </div>
                    <span className="text-xs opacity-70">AI Astrophotography Preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
