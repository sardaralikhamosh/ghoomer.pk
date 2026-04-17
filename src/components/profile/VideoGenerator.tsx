import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { motion, AnimatePresence } from 'motion/react';
import { Video, Sparkles, Loader2, Play, Download, AlertCircle, Key, RefreshCw } from 'lucide-react';
import { cn } from '../../lib/utils';

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

export const VideoGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  const loadingMessages = [
    "Initializing Veo engine...",
    "Analyzing your adventure prompt...",
    "Crafting cinematic shots...",
    "Rendering mountain landscapes...",
    "Adding local atmosphere...",
    "Finalizing your promotional video...",
    "Almost there! Preparing download link..."
  ];

  useEffect(() => {
    checkApiKey();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      let i = 0;
      setLoadingMessage(loadingMessages[0]);
      interval = setInterval(() => {
        i = (i + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[i]);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  const checkApiKey = async () => {
    try {
      const selected = await window.aistudio.hasSelectedApiKey();
      setHasKey(selected);
    } catch (err) {
      console.error("Error checking API key:", err);
      setHasKey(false);
    }
  };

  const handleSelectKey = async () => {
    await window.aistudio.openSelectKey();
    setHasKey(true); // Assume success as per instructions
  };

  const generateVideo = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setError(null);
    setVideoUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: `A professional promotional video for an adventure guide in Pakistan: ${prompt}. Cinematic, high quality, 4k, travel vlog style.`,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        operation = await ai.operations.getVideosOperation({ operation: operation });
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      
      if (downloadLink) {
        // Fetch the video with the API key
        const response = await fetch(downloadLink, {
          method: 'GET',
          headers: {
            'x-goog-api-key': process.env.API_KEY || '',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            // Reset key selection if entity not found as per instructions
            setHasKey(false);
            throw new Error("API Key session expired or invalid. Please select your key again.");
          }
          throw new Error("Failed to download generated video.");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      } else {
        throw new Error("No video was generated. Please try a different prompt.");
      }
    } catch (err: any) {
      console.error("Video generation error:", err);
      setError(err.message || "An unexpected error occurred during video generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  if (hasKey === false) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-12 text-center">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Key className="text-amber-500" size={40} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-4 font-display">API Key Required</h3>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          To use the Veo video generation feature, you need to select a paid Google Cloud project API key. 
          This ensures high-quality video generation for your profile.
        </p>
        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleSelectKey}
            className="px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white rounded-2xl font-bold transition-all shadow-lg shadow-sky-100 flex items-center gap-2"
          >
            <Key size={20} />
            Select API Key
          </button>
          <a 
            href="https://ai.google.dev/gemini-api/docs/billing" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-xs text-sky-600 hover:underline font-medium"
          >
            Learn about Gemini API billing
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-3xl border border-slate-200/50 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center text-sky-500">
            <Video size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-display">Promotional Video Generator</h3>
            <p className="text-slate-500 text-sm">Powered by Veo 3.1</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
              Describe your guide style & experience
            </label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. A cinematic journey through Hunza Valley, showing local hospitality, traditional food, and breathtaking mountain peaks..."
              className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:border-sky-500 transition-all text-sm font-medium min-h-[120px] resize-none"
              disabled={isGenerating}
            />
          </div>

          {error && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3 text-rose-600">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <div className="text-sm font-medium">{error}</div>
            </div>
          )}

          <button
            onClick={generateVideo}
            disabled={isGenerating || !prompt.trim()}
            className={cn(
              "w-full py-5 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-3 shadow-xl",
              isGenerating || !prompt.trim() 
                ? "bg-slate-200 cursor-not-allowed" 
                : "bg-gradient-to-r from-sky-500 to-emerald-500 hover:shadow-sky-200"
            )}
          >
            {isGenerating ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>Generating Video...</span>
              </>
            ) : (
              <>
                <Sparkles size={24} />
                <span>Generate Promotional Video</span>
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-slate-900 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-br from-sky-500/20 to-emerald-500/20" />
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
            </div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 border-4 border-white/10 border-t-sky-500 rounded-full animate-spin mx-auto mb-8" />
              <h4 className="text-2xl font-bold text-white mb-2 font-display">{loadingMessage}</h4>
              <p className="text-white/40 text-sm">This usually takes 1-2 minutes. Please don't close this tab.</p>
            </div>
          </motion.div>
        )}

        {videoUrl && !isGenerating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl border border-slate-200/50 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <h4 className="font-bold text-slate-900">Your Generated Video</h4>
              <div className="flex gap-2">
                <button 
                  onClick={() => setVideoUrl(null)}
                  className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 transition-colors"
                  title="Clear"
                >
                  <RefreshCw size={20} />
                </button>
                <a 
                  href={videoUrl} 
                  download="promo-video.mp4"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-all"
                >
                  <Download size={18} />
                  Download
                </a>
              </div>
            </div>
            <div className="aspect-video bg-black relative group">
              <video 
                src={videoUrl} 
                controls 
                className="w-full h-full"
                autoPlay
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
