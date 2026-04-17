import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Loader2, Share2, Users, Image as ImageIcon } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const SocialBannerVisualizer = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateImage = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const prompt = "A wide-format social media banner image (3:1 ratio) for a Pakistan mountain adventure travel brand called Ghoomer.pk. Left third: Passu Cones granite spires. Center: A Pakistani student guide smiling with mountains behind. Right third: Attabad Lake turquoise water. Warm golden morning light across all three sections. Text space left at top-left corner (clean sky area). Cinematic, travel brand quality, ultra-realistic seamless composite photograph, 3:1 aspect ratio.";
      
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
            aspectRatio: "16:9", // Closest standard ratio for 2.5-flash
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
      setError("Failed to generate the social banner. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="py-24 bg-white dark:bg-slate-950 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-widest mb-4 block">Brand Assets</span>
          <h2 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 tracking-tight">
            Adventure <span className="text-emerald-600 dark:text-emerald-400">Banners</span>
          </h2>
          <p className="max-w-2xl mx-auto text-slate-600 dark:text-slate-400 text-lg font-medium">
            Visualize our cinematic social media presence. A seamless composite of the Karakoram's finest sights, featuring our local guides and iconic landscapes.
          </p>
        </div>

        <div className="relative aspect-[3/1] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl mb-12">
          <AnimatePresence mode="wait">
            {!generatedImage && !isGenerating ? (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 p-12 text-center"
              >
                <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <Share2 size={40} className="text-emerald-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Social Media Banner</h3>
                <p className="max-w-xs text-slate-500">Visualize a wide-format brand banner for Ghoomer.pk</p>
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
                  <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-emerald-500 rounded-full animate-spin" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500" size={24} />
                </div>
                <p className="mt-6 font-bold text-slate-600 dark:text-slate-400 animate-pulse">Stitching the panorama...</p>
              </motion.div>
            ) : (
              <motion.div
                key="image"
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute inset-0"
              >
                <img
                  src={generatedImage!}
                  alt="Ghoomer.pk Social Banner"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                <div className="absolute top-8 left-8">
                  <div className="bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                    Brand Preview
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={generateImage}
              disabled={isGenerating}
              className="px-10 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-70 shadow-xl shadow-emerald-600/20"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating Banner...
                </>
              ) : (
                <>
                  <ImageIcon size={20} />
                  Visualize Social Banner
                </>
              )}
            </button>
            
            {generatedImage && (
              <button
                onClick={() => setGeneratedImage(null)}
                className="px-10 py-4 bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 rounded-full font-bold hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
              >
                Reset
              </button>
            )}
          </div>

          {error && (
            <p className="text-red-500 font-medium flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl border-t border-slate-100 dark:border-slate-900 pt-12">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <Users className="text-emerald-600" size={24} />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold">Local Guides</h4>
                <p className="text-slate-500 text-sm">Empowering students.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <ImageIcon className="text-emerald-600" size={24} />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold">Iconic Sights</h4>
                <p className="text-slate-500 text-sm">Passu & Attabad.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center">
                <Sparkles className="text-emerald-600" size={24} />
              </div>
              <div>
                <h4 className="text-slate-900 dark:text-white font-bold">Golden Hour</h4>
                <p className="text-slate-500 text-sm">Cinematic lighting.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
