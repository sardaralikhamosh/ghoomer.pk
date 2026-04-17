import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Star, Tent, Mountain } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const K2BaseCampVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A nightscape photo of K2 Base Camp on the Baltoro Glacier, Pakistan, under a blazing Milky Way. The K2 pyramid (8,611m) is silhouetted against a sky packed with stars — Milky Way core above the summit. Several orange expedition tents glow from within in the glacier foreground, their reflection in a small meltwater pool. The glacier ice has a faint blue moonlight. Shot at 16mm, f/2.8, ISO 4000, astrophotography, ultra-realistic, cinematic, 16:9.";
      
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
      setError("Failed to capture the K2 nightscape. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-4 block">The Savage Mountain</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                K2 <span className="text-orange-400">Base Camp</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
                Stand at the foot of the world's most formidable peak. Visualize K2 silhouetted against a blazing Milky Way, with the Baltoro Glacier reflecting the cosmic glow and the warm light of expedition tents.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-500 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-orange-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Exposing Glacier...
                    </>
                  ) : (
                    <>
                      <Mountain size={20} />
                      Visualize K2 Night
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
                    <Tent className="text-orange-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Expedition Life</h4>
                    <p className="text-slate-500 text-xs">Baltoro Glacier, 5,150m.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center">
                    <Star className="text-orange-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Bortle 1 Sky</h4>
                    <p className="text-slate-500 text-xs">Absolute darkness.</p>
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
                    <Mountain size={40} className="text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">The Baltoro Night</h3>
                  <p className="max-w-xs">Visualize the cosmic core over the King of Mountains.</p>
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
                    <div className="w-16 h-16 border-4 border-slate-800 border-t-orange-400 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-400" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-slate-400 animate-pulse">Capturing the Savage Mountain...</p>
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
                    alt="K2 Base Camp at Night"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Mountain size={16} className="text-orange-400" />
                      <span className="text-sm font-medium">K2 Base Camp, Baltoro</span>
                    </div>
                    <span className="text-xs opacity-70">AI Expedition Preview</span>
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
