import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Camera, Mountain, Wind } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const DeosaiVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of a Himalayan brown bear (Ursus arctos isabellinus) walking through wildflower meadows on the Deosai Plains, Pakistan, at 4,000m altitude. The bear is large and healthy, reddish-brown coat, photographed from a 4WD vehicle at a safe distance of 150m. The treeless plateau extends to the horizon. Wildflowers — yellow, violet, white — carpet the plateau floor. Overcast soft light. Shot on a 400mm telephoto lens, f/5.6, wildlife documentary photography, ultra-realistic, 3:2.";
      
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
      setError("Failed to generate the Deosai wildlife view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-emerald-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-[3/2] rounded-3xl overflow-hidden bg-emerald-900/50 border border-emerald-800 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-emerald-300/30 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-emerald-900/80 rounded-full flex items-center justify-center mb-6">
                    <Camera size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-200 mb-2">Wild Deosai</h3>
                  <p className="max-w-xs">Visualize the rare Himalayan brown bear in the "Land of Giants".</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-emerald-950/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-emerald-800 border-t-emerald-400 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-400" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-emerald-300 animate-pulse">Scanning the plateau...</p>
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
                    alt="Himalayan Brown Bear at Deosai"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Camera size={16} className="text-emerald-400" />
                      <span className="text-sm font-medium">Deosai National Park</span>
                    </div>
                    <span className="text-xs opacity-70">AI Wildlife Preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4 block">Land of Giants</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Himalayan <span className="text-emerald-400">Brown Bear</span>
              </h2>
              <p className="text-emerald-200/70 text-lg font-medium leading-relaxed mb-8">
                The Deosai Plains, at 4,000m, are one of the last strongholds of the Himalayan brown bear. Visualize this majestic predator roaming through wildflower meadows in the world's second-highest plateau.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-500 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-emerald-600/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Spotting Wildlife...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Visualize Deosai Bear
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-emerald-900/50 text-emerald-300 rounded-full font-bold hover:bg-emerald-900 transition-all"
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

              <div className="mt-12 grid grid-cols-2 gap-8 border-t border-emerald-900 pt-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center">
                    <Mountain className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">4,000m Altitude</h4>
                    <p className="text-emerald-500 text-xs">High-altitude plateau.</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-900/50 flex items-center justify-center">
                    <Wind className="text-emerald-400" size={20} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Wildflower Carpet</h4>
                    <p className="text-emerald-500 text-xs">Summer bloom (July-Aug).</p>
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
