import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Utensils, Coffee, Flame } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const CulinaryVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of a young Pakistani woman in traditional Hunza dress cooking chapshuro flatbread on a cast iron pan over a wood fire inside a traditional Hunza kitchen. The kitchen has stone walls, wooden shelves with copper pots, and warm firelight. A foreign tourist woman sits beside her watching and smiling, both engaged and laughing. The stuffed bread is visible on the griddle, golden and sizzling. Warm indoor firelight, intimate atmosphere. Shot on a 35mm lens, f/2.2, documentary food and travel photography, ultra-realistic, 3:2.";
      
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
      setError("Failed to generate the culinary view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-stone-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-[3/2] rounded-3xl overflow-hidden bg-stone-800 border border-stone-700 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-stone-600 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-stone-700 rounded-full flex items-center justify-center mb-6">
                    <Utensils size={40} className="text-stone-500" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-400 mb-2">Kitchen Stories</h3>
                  <p className="max-w-xs">Visualize the warmth of a traditional Hunza kitchen and the art of Chapshuro.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-stone-900/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-stone-700 border-t-orange-500 rounded-full animate-spin" />
                    <Flame className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-stone-400 animate-pulse">Heating the griddle...</p>
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
                    alt="Traditional Hunza Kitchen"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Flame size={16} className="text-orange-400" />
                      <span className="text-sm font-medium">Traditional Kitchen Experience</span>
                    </div>
                    <span className="text-xs opacity-70">AI Culinary Preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-900/20 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-orange-400 font-bold text-sm uppercase tracking-widest mb-4 block">Culinary Connection</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Taste the <span className="text-orange-400">Tradition</span>
              </h2>
              <p className="text-stone-400 text-lg font-medium leading-relaxed mb-8">
                Food is the universal language of the mountains. Visualize the intimate experience of learning to cook Chapshuro—the "Hunza Pizza"—over a wood fire in a centuries-old stone kitchen.
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
                      Preparing Scene...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Visualize Kitchen Scene
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-stone-800 text-stone-300 rounded-full font-bold hover:bg-stone-700 transition-all"
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

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-stone-800 pt-8">
                <div>
                  <h4 className="text-white font-bold mb-1">Chapshuro</h4>
                  <p className="text-stone-500 text-sm">Savory stuffed flatbread, a local delicacy.</p>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Stone Kitchens</h4>
                  <p className="text-stone-500 text-sm">Experience the authentic warmth of Hunza homes.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
