import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Image as ImageIcon, Camera } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const SeasonalInspiration = () => {
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
      setError("Failed to generate the seasonal view. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
            
            <div className="relative z-10">
              <span className="text-emerald-600 font-bold text-sm uppercase tracking-widest mb-4 block">AI-Powered Inspiration</span>
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 font-display mb-6 tracking-tight">
                Visualize the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Blossom Season</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                Experience the magic of Hunza Valley in April. Our AI can visualize the peak apricot blossom season, showing you the breathtaking white and pink terraces before you even book.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateImage}
                  disabled={isGenerating}
                  className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-slate-900/20"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Generating View...
                    </>
                  ) : (
                    <>
                      <Sparkles size={20} />
                      Generate Seasonal View
                    </>
                  )}
                </button>
                
                {generatedImage && (
                  <button
                    onClick={() => setGeneratedImage(null)}
                    className="px-8 py-4 bg-slate-100 text-slate-600 rounded-full font-bold hover:bg-slate-200 transition-all"
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

          <div className="relative aspect-video rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 shadow-2xl">
            <AnimatePresence mode="wait">
              {!generatedImage && !isGenerating ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center text-slate-300 p-12 text-center"
                >
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                    <ImageIcon size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-400 mb-2">Ready to Visualize</h3>
                  <p className="max-w-xs">Click the button to generate a realistic photo of Hunza in peak blossom season.</p>
                </motion.div>
              ) : isGenerating ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/80 backdrop-blur-sm z-20"
                >
                  <div className="relative">
                    <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-600 rounded-full animate-spin" />
                    <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-600" size={24} />
                  </div>
                  <p className="mt-6 font-bold text-slate-600 animate-pulse">Painting the valley...</p>
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
                    alt="Hunza Valley Apricot Blossom"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
                    <div className="flex items-center gap-2">
                      <Camera size={16} />
                      <span className="text-sm font-medium">AI Generated Preview</span>
                    </div>
                    <span className="text-xs opacity-70">Peak Season: April</span>
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
