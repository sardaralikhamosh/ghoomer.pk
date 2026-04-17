import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Footprints, Wind, AlertTriangle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const HussainiVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of a person crossing the famous Hussaini Suspension Bridge in Passu, Upper Hunza. The bridge is a traditional rope and wooden plank footbridge, clearly showing gaps between the worn planks and the ropes fraying slightly. The Hunza River gorge is 30m below, rushing white water visible. A broken old bridge hangs beside the current one. The person mid-bridge looks slightly nervous but moving forward. The Passu Cones rock spires loom behind. Shot on a 35mm wide-angle from the east bank, f/8, adventure travel photography, ultra-realistic, 16:9.";
      
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
      setError("Failed to generate the bridge view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-zinc-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-zinc-700/20 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-zinc-400 font-bold text-sm uppercase tracking-widest mb-4 block">Adventure & Adrenaline</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                The <span className="text-zinc-400">Hussaini</span> Bridge
              </h2>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-8">
                Known as one of the most dangerous bridges in the world, the Hussaini Suspension Bridge is a test of nerves. Visualize the thrill of crossing the Hunza River on a bridge of rope and wood, with the Passu Cones standing guard.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-zinc-100 text-zinc-900 rounded-full font-bold hover:bg-white transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-white/10"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Steadying the Bridge...
                    </>
                  ) : (
                    <>
                      <Footprints size={20} />
                      Visualize Crossing
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-zinc-800 text-zinc-300 rounded-full font-bold hover:bg-zinc-700 transition-all"
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

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-zinc-800 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                    <Wind className="text-zinc-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">High Winds</h4>
                    <p className="text-zinc-500 text-xs">A swaying challenge.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
                    <AlertTriangle className="text-zinc-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">30m Drop</h4>
                    <p className="text-zinc-500 text-xs">Above the Hunza River.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-zinc-800 border border-zinc-700 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-zinc-700 rounded-full flex items-center justify-center mb-6">
                    <Footprints size={40} className="text-zinc-500" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-400 mb-2">Mind the Gap</h3>
                  <p className="max-w-xs">Visualize the iconic and precarious crossing of the Hussaini Bridge.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-zinc-700 border-t-zinc-100 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-zinc-100" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-zinc-400 animate-pulse">Constructing the view...</p>
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
                    alt="Hussaini Suspension Bridge"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Footprints size={16} className="text-zinc-400" />
                      <span className="text-sm font-medium">Hussaini Bridge, Passu</span>
                    </div>
                    <span className="text-xs opacity-70">AI Adventure Preview</span>
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
