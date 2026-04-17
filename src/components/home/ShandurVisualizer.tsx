import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Image as ImageIcon, Mountain, Wind } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const ShandurVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of a mountain biker descending a gravel road from Shandur Pass (3,720m) in Gilgit-Baltistan with a vast highland plateau and mountain panorama behind. The cyclist is in mid-descent, slight motion blur on the wheels, dust rising behind. The plateau stretches endlessly — no trees, just sky and rock and glacier streams. The scale of emptiness is dramatic. Late afternoon golden light. Shot on a 35mm lens, f/6.3, adventure cycling photography, cinematic, ultra-realistic, 16:9.";
      
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
      setError("Failed to generate the Shandur view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-stone-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-orange-600 font-bold text-sm uppercase tracking-widest mb-4 block">High Altitude Adventure</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-6 tracking-tight">
                The Roof of the <span className="text-orange-600">World</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                Shandur Pass, at 3,720m, is the highest polo ground in the world and a legendary cycling route. Visualize the dramatic descent across the vast, treeless highland plateau under the golden afternoon sun.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-orange-600 text-white rounded-full font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-orange-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Capturing the Scale...
                    </>
                  ) : (
                    <>
                      <Wind size={20} />
                      Visualize Shandur Descent
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-white text-slate-600 border border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-all"
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

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                    <Mountain size={40} className="text-slate-200" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Highland Panorama</h3>
                  <p className="max-w-xs">Generate a cinematic view of the descent from Shandur Pass.</p>
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
                    <div className="w-16 h-16 border-4 border-orange-100 border-t-orange-600 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-600" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-slate-600 animate-pulse">Rendering the plateau...</p>
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
                    alt="Mountain Biking Shandur Pass"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Mountain size={16} className="text-orange-400" />
                      <span className="text-sm font-medium">Shandur Pass, 3,720m</span>
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
