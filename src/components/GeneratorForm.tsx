import React, { useState, useRef } from 'react';
import { Wand2, Upload, X, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface GeneratorFormProps {
  onGenerate: (prompt: string, imageFile?: File) => Promise<void>;
  loading: boolean;
}

const samplePrompts = [
  "A futuristic cityscape at sunset with flying cars and neon lights",
  "A magical forest with glowing mushrooms and fairy lights",
  "A cozy coffee shop in a rainy city street",
  "A majestic dragon soaring through stormy clouds",
  "An underwater palace with coral gardens and tropical fish",
  "A steampunk mechanical butterfly with brass wings",
  "A serene mountain lake reflecting snow-capped peaks",
  "A cyberpunk samurai in neon-lit Tokyo streets"
];

export default function GeneratorForm({ onGenerate, loading }: GeneratorFormProps) {
  const [prompt, setPrompt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    await onGenerate(prompt.trim(), imageFile || undefined);
  };

  const useSamplePrompt = (samplePrompt: string) => {
    setPrompt(samplePrompt);
  };

  const getRandomPrompt = () => {
    const randomPrompt = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    setPrompt(randomPrompt);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <div className="text-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
          Creative Canvas
        </h1>
        <p className="text-gray-600">
          Transform your imagination into stunning visuals with AI
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
              Describe your image
            </label>
            <button
              type="button"
              onClick={getRandomPrompt}
              className="text-xs text-purple-600 hover:text-purple-800 flex items-center space-x-1"
            >
              <Sparkles className="h-3 w-3" />
              <span>Random idea</span>
            </button>
          </div>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="A futuristic cityscape at sunset with flying cars and neon lights..."
            className="w-full h-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all"
            disabled={loading}
          />
          
          {/* Sample prompts */}
          <div className="mt-3">
            <p className="text-xs text-gray-500 mb-2">Try these ideas:</p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.slice(0, 3).map((samplePrompt, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => useSamplePrompt(samplePrompt)}
                  className="text-xs bg-gray-100 hover:bg-purple-100 text-gray-700 hover:text-purple-700 px-2 py-1 rounded transition-colors"
                >
                  {samplePrompt.slice(0, 30)}...
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reference Image (Optional)
          </label>
          
          {previewUrl ? (
            <div className="relative inline-block">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition-all"
            >
              <div className="text-center">
                <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <span className="text-xs text-gray-500">Upload Image</span>
              </div>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={loading}
          />
        </div>

        <motion.button
          type="submit"
          disabled={!prompt.trim() || loading}
          whileHover={{ scale: loading ? 1 : 1.02 }}
          whileTap={{ scale: loading ? 1 : 0.98 }}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-4 px-6 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center space-x-2 shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Generating magical art...</span>
            </>
          ) : (
            <>
              <Wand2 className="h-5 w-5" />
              <span>Generate Image</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
