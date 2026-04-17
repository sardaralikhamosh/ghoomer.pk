import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Mountain, Car, Camera } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const PassuConesVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of the Tupopdan Cathedral Spires (Passu Cones) in Gojal, Hunza, northern Pakistan. Vertical granite rock needles rising sharply to 6,106m above the Karakoram Highway below. Small white Toyota Hilux on the highway road for scale — people appear tiny against the spires. Karakoram Highway visible as a thin ribbon along the valley floor. Early morning blue-hour light, slight mist in the lower valley, dramatic sky with wispy clouds. Shot on a 35mm lens, f/11, deep focus, cinematic landscape photography, ultra-realistic, 16:9.";
      
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
      setError("Failed to capture the Cathedral Spires. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900/50 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-slate-500/10 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-slate-500 dark:text-slate-400 font-bold text-sm uppercase tracking-widest mb-4 block">Cathedral Spires</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">
                The <span className="text-slate-600 dark:text-slate-300">Passu Cones</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg font-medium leading-relaxed mb-8">
                Witness the vertical granite needles of Tupopdan rising sharply to 6,106m. Visualize the scale of these massive spires against the Karakoram Highway, captured in the ethereal light of the blue hour.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-full font-bold hover:bg-slate-900 dark:hover:bg-slate-600 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-slate-900/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Scaling Spires...
                    </>
                  ) : (
                    <>
                      <Mountain size={20} />
                      Visualize Passu Cones
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700"
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

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-slate-200 dark:border-slate-800 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    <Car className="text-slate-600 dark:text-slate-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Karakoram Highway</h4>
                    <p className="text-slate-500 text-xs">The world's highest paved road.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-sm">
                    <Camera className="text-slate-600 dark:text-slate-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-slate-900 dark:text-white font-bold text-sm">Blue Hour</h4>
                    <p className="text-slate-500 text-xs">Pre-dawn atmospheric light.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Mountain size={40} className="text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Tupopdan Cathedral</h3>
                  <p className="max-w-xs text-slate-500">Visualize the jagged spires of Gojal.</p>
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
                    <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-slate-600 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-slate-600 dark:text-slate-400 animate-pulse">Rendering the spires...</p>
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
                    alt="Passu Cones"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Mountain size={16} className="text-slate-300" />
                      <span className="text-sm font-medium">Passu Cones, Gojal</span>
                    </div>
                    <span className="text-xs opacity-70 font-bold">AI Landscape Preview</span>
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
