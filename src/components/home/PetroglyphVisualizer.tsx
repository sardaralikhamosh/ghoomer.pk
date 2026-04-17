import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, History, MapPin, Sun } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const PetroglyphVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of ancient petroglyphs carved into a dark riverstone boulder beside the Indus River near Chilas, Gilgit-Baltistan, Pakistan. The carvings show an ibex hunt scene with hunters carrying bows and a large ibex with curved horns — estimated 3,000 years old. Side-lighting from low afternoon sun reveals the carved lines dramatically. A local guide in a Pakol cap kneels beside the rock for scale. Dusty riverside setting. Shot on a 50mm lens, f/8, archaeological documentary photography, ultra-realistic, 3:2.";
      
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
      setError("Failed to generate the petroglyph view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-stone-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-[3/2] rounded-3xl overflow-hidden bg-stone-900 border border-stone-800 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-stone-700 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-stone-800 rounded-full flex items-center justify-center mb-6">
                    <History size={40} className="text-stone-600" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-500 mb-2">Ancient Echoes</h3>
                  <p className="max-w-xs">Visualize the 3,000-year-old rock art along the Indus River.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-stone-800 border-t-amber-500 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-amber-500" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-stone-400 animate-pulse">Revealing the past...</p>
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
                    alt="Ancient Petroglyphs in Chilas"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-amber-400" />
                      <span className="text-sm font-medium">Indus River, Chilas</span>
                    </div>
                    <span className="text-xs opacity-70">AI Archaeological Preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-900/10 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-amber-400 font-bold text-sm uppercase tracking-widest mb-4 block">Archaeological Heritage</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Ancient <span className="text-amber-400">Petroglyphs</span>
              </h2>
              <p className="text-stone-400 text-lg font-medium leading-relaxed mb-8">
                The banks of the Indus River near Chilas hold thousands of ancient carvings. Visualize these 3,000-year-old hunt scenes, etched into dark boulders, telling stories of a bygone era.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-amber-600 text-white rounded-full font-bold hover:bg-amber-500 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-amber-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Uncovering History...
                    </>
                  ) : (
                    <>
                      <History size={20} />
                      Visualize Ancient Art
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-stone-900 text-stone-300 rounded-full font-bold hover:bg-stone-800 transition-all"
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

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-stone-900 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center">
                    <Sun className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Golden Hour</h4>
                    <p className="text-stone-500 text-xs">Best light for viewing carvings.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center">
                    <History className="text-amber-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">3,000 Years Old</h4>
                    <p className="text-stone-500 text-xs">Prehistoric rock art.</p>
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
