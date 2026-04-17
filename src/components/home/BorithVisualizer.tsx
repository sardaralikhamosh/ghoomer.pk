import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Binoculars, Bird, Cloud } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const BorithVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo at dawn of two birdwatchers crouching beside Borith Lake in Passu, Upper Hunza, using binoculars. Three pink flamingos stand in the shallow water in the middle ground. The Passu Cones granite spires are reflected perfectly in the still lake surface. Pre-dawn blue hour light, misty atmosphere. One birdwatcher points silently at the flamingos. Shot on an 85mm lens, f/4, wildlife and travel photography, ultra-realistic, cinematic, 16:9.";
      
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
      setError("Failed to generate the Borith Lake view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-slate-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-900/20 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4 block">Wildlife & Serenity</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Dawn at <span className="text-blue-400">Borith Lake</span>
              </h2>
              <p className="text-slate-400 text-lg font-medium leading-relaxed mb-8">
                Borith Lake is a sanctuary for migratory birds. Experience the ethereal beauty of dawn in Passu, where flamingos rest in the misty waters beneath the iconic reflections of the Passu Cones.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-blue-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Capturing Dawn...
                    </>
                  ) : (
                    <>
                      <Binoculars size={20} />
                      Visualize Borith Dawn
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

              <div className="mt-12 flex items-center gap-8 border-t border-slate-900 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                    <Bird className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Migratory Path</h4>
                    <p className="text-slate-500 text-xs">A key stop for Central Asian birds.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center">
                    <Cloud className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Misty Mornings</h4>
                    <p className="text-slate-500 text-xs">Best viewed during the blue hour.</p>
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
                  className="absolute inset-0 flex flex-col items-center justify-center text-slate-700 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-6">
                    <Binoculars size={40} className="text-slate-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-500 mb-2">Ethereal Blue Hour</h3>
                  <p className="max-w-xs">Visualize the silent dawn and migratory flamingos at Borith Lake.</p>
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
                    <div className="w-16 h-16 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-500" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-slate-400 animate-pulse">Waiting for the light...</p>
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
                    alt="Birdwatching at Borith Lake"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Bird size={16} className="text-blue-400" />
                      <span className="text-sm font-medium">Borith Lake, Passu</span>
                    </div>
                    <span className="text-xs opacity-70">AI Wildlife Preview</span>
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
