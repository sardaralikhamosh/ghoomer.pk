import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Image as ImageIcon, Heart, Sun } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const HarvestVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of a Hunza family (elderly grandmother, young woman, and child) hand-picking ripe golden apricots from a tree in a high-altitude orchard in Karimabad, Hunza. The orchard is terraced on a steep mountain slope with Ultar Sar peak (7,388m) visible in the background. The grandmother wears a traditional embroidered Hunza headscarf. Baskets of bright orange apricots fill the foreground. August harvest light, warm and golden. Shot on a 35mm lens, f/5.6, documentary travel photography, ultra-realistic, 3:2.";
      
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
            aspectRatio: "3:2",
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
      setError("Failed to generate the harvest view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-amber-50/30 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-amber-100 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-amber-700 font-bold text-sm uppercase tracking-widest mb-4 block">Cultural Heritage</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-6 tracking-tight">
                The Golden <span className="text-amber-600">Harvest</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                August in Hunza is a time of community and abundance. Experience the warmth of the apricot harvest, where families gather in terraced orchards to pick the fruit that has sustained the valley for centuries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-amber-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Visualizing Harvest...
                    </>
                  ) : (
                    <>
                      <Sun size={20} />
                      Visualize Harvest
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-white text-amber-700 border border-amber-200 rounded-full font-bold hover:bg-amber-50 transition-all"
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
            </div>
          </div>

          <div className="relative aspect-[3/2] rounded-3xl overflow-hidden bg-amber-50 border border-amber-100 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-amber-200 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Heart size={40} className="text-amber-200" />
                  </div>
                  <h3 className="text-xl font-bold text-amber-400 mb-2">A Taste of Hunza</h3>
                  <p className="max-w-xs">Generate a warm, documentary-style view of the traditional apricot harvest.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-100 border-t-amber-600 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-600" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-amber-700 animate-pulse">Gathering the fruit...</p>
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
                    alt="Apricot Harvest in Hunza"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Sun size={16} className="text-amber-400" />
                      <span className="text-sm font-medium">Karimabad, August Harvest</span>
                    </div>
                    <span className="text-xs opacity-70">AI Cultural Preview</span>
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
