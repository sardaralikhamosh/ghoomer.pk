import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Mountain, Compass, Palette } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const BrandIconVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A flat design app icon for a Pakistan mountain travel platform. The icon shows a simplified mountain silhouette (three peaks, the center one tallest — representing K2) in deep teal (#1D9E75) on a white circle background. A small compass rose is integrated into the tallest peak as a subtle detail. Clean, modern, minimal style. No text. No shadows. Flat vector icon aesthetic. 1:1 square ratio, suitable for app store icon.";
      
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
            aspectRatio: "1:1",
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
      setError("Failed to generate the brand icon. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-[2rem] overflow-hidden bg-white shadow-2xl border border-zinc-200 dark:border-zinc-800">
              <AnimatePresence mode="wait">
                {!generatedImage && !isGenerating ? (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 p-12 text-center"
                  >
                    <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-900 rounded-full flex items-center justify-center mb-6 shadow-sm">
                      <Palette size={40} className="text-teal-500" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Brand Identity</h3>
                    <p className="max-w-xs text-zinc-500">Visualize our minimal app icon design.</p>
                  </motion.div>
                ) : isGenerating ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm z-20"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-zinc-200 dark:border-zinc-800 border-t-teal-500 rounded-full animate-spin" />
                      <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-teal-500" size={24} />
                    </div>
                    <p className="mt-6 font-bold text-zinc-600 dark:text-zinc-400 animate-pulse">Designing icon...</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="image"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={generatedImage!}
                      alt="Brand App Icon"
                      className="w-full h-full object-contain p-8"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {/* Decorative background for the icon */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-teal-500/5 rounded-full blur-3xl" />
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative z-10">
              <span className="text-teal-600 dark:text-teal-400 font-bold text-sm uppercase tracking-widest mb-4 block">Visual Identity</span>
              <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
                Modern <span className="text-teal-600 dark:text-teal-400">Minimalism</span>
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 text-lg font-medium leading-relaxed mb-8">
                Our brand identity reflects the purity and scale of the Karakoram. Visualize our official app icon: a simplified K2 silhouette in deep teal, integrated with a subtle compass rose.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-teal-600 text-white rounded-full font-bold hover:bg-teal-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-teal-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Generating Icon...
                    </>
                  ) : (
                    <>
                      <Palette size={20} />
                      Generate App Icon
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-full font-bold hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all border border-zinc-200 dark:border-zinc-800"
                  >
                    Reset
                  </button>
                )}
              </div>

              {error && (
                <p className="mt-4 text-red-500 font-medium flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full" />
                  {error}
                </p>
              )}

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm">
                    <Mountain className="text-teal-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-bold text-sm">K2 Silhouette</h4>
                    <p className="text-zinc-500 text-xs">Symbol of the north.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center shadow-sm">
                    <Compass className="text-teal-600" size={20} />
                  </div>
                  <div>
                    <h4 className="text-zinc-900 dark:text-white font-bold text-sm">Compass Rose</h4>
                    <p className="text-zinc-500 text-xs">Guiding your journey.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
