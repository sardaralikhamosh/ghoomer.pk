import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Star, Tent, Camera } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const StarTrailsVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A long-exposure star trails photo taken on the Deosai Plains at 4,100m altitude, Pakistan. Concentric circular star trails arc across a perfectly dark sky with no light pollution. The foreground shows the flat wildflower plateau extending to the horizon with Sheosar Lake reflecting the star trails as circular arcs. A small illuminated tent in the center-left provides the only warm light point. Total darkness except stars and tent. Shot at 14mm, f/2.8, multi-exposure composite, nightscape photography, ultra-realistic, 16:9.";
      
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
      setError("Failed to capture the star trails. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-black text-white overflow-hidden relative">
      {/* Subtle star trail background effect */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div 
            key={i}
            className="absolute border border-white/20 rounded-full"
            style={{
              top: '50%',
              left: '50%',
              width: `${(i + 1) * 200}px`,
              height: `${(i + 1) * 200}px`,
              transform: 'translate(-50%, -50%)',
              opacity: 1 - (i * 0.08)
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-video rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-zinc-600 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mb-6">
                    <Star size={40} className="text-zinc-500" />
                  </div>
                  <h3 className="text-xl font-bold text-zinc-400 mb-2">The Spinning Sky</h3>
                  <p className="max-w-xs">Visualize the passage of time over the high-altitude Deosai Plains.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-zinc-800 border-t-blue-400 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-400" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-zinc-400 animate-pulse">Stacking exposures...</p>
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
                    alt="Star Trails over Deosai"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Star size={16} className="text-blue-400" />
                      <span className="text-sm font-medium">Sheosar Lake, Deosai</span>
                    </div>
                    <span className="text-xs opacity-70">AI Star Trail Preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-4 block">Time & Motion</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Deosai <span className="text-blue-400">Star Trails</span>
              </h2>
              <p className="text-zinc-400 text-lg font-medium leading-relaxed mb-8">
                At 4,100m, the Deosai Plains offer a window into the infinite. Visualize concentric star trails arcing across a perfectly dark sky, reflected in the still waters of Sheosar Lake.
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
                      Capturing Time...
                    </>
                  ) : (
                    <>
                      <Camera size={20} />
                      Visualize Star Trails
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-zinc-900 text-zinc-300 rounded-full font-bold hover:bg-zinc-800 transition-all"
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

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-zinc-900 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                    <Tent className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Wild Camping</h4>
                    <p className="text-zinc-500 text-xs">Under the spinning sky.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center">
                    <Star className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Zero Pollution</h4>
                    <p className="text-zinc-500 text-xs">Pristine high-altitude air.</p>
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
