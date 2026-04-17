import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Flower2, Map, Camera } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const HunzaBlossomVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of Hunza Valley in northern Pakistan during peak apricot blossom season in April. Thousands of white and pale pink apricot trees in terraced orchards cascade down mountain slopes. Baltit Fort perched on a rocky outcrop in the mid-ground. Rakaposhi peak (7,788m) snow-covered and dominant in the background filling 40% of the frame. Early morning golden hour light from the right casting long warm shadows across the terraces. Shot on a 24mm wide-angle lens, f/8, rich landscape depth, realistic travel photography, ultra-detailed, no watermark, 16:9 aspect ratio.";
      
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
      setError("Failed to capture the blossom season. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative order-2 lg:order-1 aspect-video rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Flower2 size={40} className="text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Spring in Hunza</h3>
                  <p className="max-w-xs text-slate-500">Visualize the valley turning white and pink under the giants.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-pink-400 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-pink-400" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-slate-600 dark:text-slate-400 animate-pulse">Painting the blossoms...</p>
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
                    alt="Hunza Apricot Blossoms"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Flower2 size={16} className="text-pink-300" />
                      <span className="text-sm font-medium">Hunza Valley, April</span>
                    </div>
                    <span className="text-xs opacity-70 font-bold">AI Spring Preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-pink-500 font-bold text-sm uppercase tracking-widest mb-4 block">Seasonal Wonders</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                Hunza <span className="text-pink-500">Apricot Blossom</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed mb-8">
                Experience the magic of spring in the Karakoram. Visualize thousands of apricot trees cascading down the Hunza terraces, with the ancient Baltit Fort and the mighty Rakaposhi peak in the background.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-pink-500 text-white rounded-full font-bold hover:bg-pink-600 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-pink-500/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Capturing Spring...
                    </>
                  ) : (
                    <>
                      <Camera size={20} />
                      Visualize Blossom Season
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
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

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate-100 dark:border-slate-900 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                    <Map className="text-pink-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Baltit Fort</h4>
                    <p className="text-slate-500 text-xs">800-year-old history.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center">
                    <Flower2 className="text-pink-500" size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Peak Bloom</h4>
                    <p className="text-slate-500 text-xs">Early April window.</p>
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
