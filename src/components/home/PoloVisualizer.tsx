import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Image as ImageIcon, Trophy, Users } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const PoloVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A photo of a traditional polo match at Shandur Pass (3,720m altitude) in Gilgit-Baltistan, Pakistan. Two teams of six riders on Chitrali horses race at full gallop across a flat highland plateau. No helmets or protective gear — traditional free-style polo. A crowd of hundreds of spectators lines both sides of the ground. Dhol drummers and shehnai players in colourful clothes stand at the sidelines. Blue mountain sky above the plateau. Dusty action. Shot on a telephoto 200mm lens, f/5.6, fast shutter 1/1000s, sports documentary photography, ultra-realistic, 16:9.";
      
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
      setError("Failed to generate the polo match view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-indigo-950 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative aspect-video rounded-3xl overflow-hidden bg-indigo-900/50 border border-indigo-800 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-indigo-300/30 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-indigo-900/80 rounded-full flex items-center justify-center mb-6">
                    <Trophy size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-indigo-200 mb-2">Kings of the Highlands</h3>
                  <p className="max-w-xs">Visualize the raw energy of traditional free-style polo at 3,720m.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-indigo-950/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-indigo-800 border-t-indigo-400 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-400" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-indigo-300 animate-pulse">Capturing the action...</p>
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
                    alt="Traditional Polo at Shandur Pass"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Trophy size={16} className="text-indigo-400" />
                      <span className="text-sm font-medium">Shandur Polo Festival</span>
                    </div>
                    <span className="text-xs opacity-70">AI Sports Preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="order-1 lg:order-2 relative">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-indigo-400 font-bold text-sm uppercase tracking-widest mb-4 block">Cultural Spectacle</span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">
                Traditional <span className="text-indigo-400">Free-Style Polo</span>
              </h2>
              <p className="text-indigo-200/70 text-lg font-medium leading-relaxed mb-8">
                Witness the "Game of Kings" in its purest form. At Shandur Pass, polo is played without modern rules or helmets, accompanied by the thunder of drums and the cheers of thousands.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-indigo-500 text-white rounded-full font-bold hover:bg-indigo-400 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-indigo-500/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Visualizing Match...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Visualize Polo Match
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-indigo-900/50 text-indigo-300 rounded-full font-bold hover:bg-indigo-900 transition-all"
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

              <div className="mt-12 flex items-center gap-6 border-t border-indigo-900 pt-8">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-indigo-950 bg-indigo-800 flex items-center justify-center overflow-hidden">
                      <img src={`https://picsum.photos/seed/polo${i}/100/100`} alt="Spectator" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <p className="text-indigo-300 text-sm font-medium">
                  Join <span className="text-white font-bold">thousands</span> of spectators this July.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
