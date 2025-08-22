import React, { useState } from 'react';
import { Download, Share2, Save, Loader2, AlertCircle, Wand2, Copy, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageDisplayProps {
  imageUrl: string | null;
  prompt: string;
  loading: boolean;
  error: string | null;
  onSave?: () => void;
}

export default function ImageDisplay({ imageUrl, prompt, loading, error, onSave }: ImageDisplayProps) {
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownload = () => {
    if (!imageUrl) return;
    
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `creative-canvas-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!imageUrl) return;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Creative Canvas - AI Generated Image',
          text: `Check out this AI-generated image: "${prompt}"`,
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const handleSave = async () => {
    if (!onSave) return;
    
    setSaving(true);
    try {
      await onSave();
    } catch (error) {
      console.error('Save error:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Generated Image
      </h2>

      <div className="relative">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="aspect-square bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg flex items-center justify-center"
            >
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Wand2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                </motion.div>
                <p className="text-gray-700 font-medium mb-2">Creating your masterpiece...</p>
                <p className="text-gray-500 text-sm">"{prompt.slice(0, 50)}..."</p>
                <div className="w-48 bg-gray-200 rounded-full h-2 mt-4 mx-auto overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="aspect-square bg-red-50 border-2 border-red-200 rounded-lg flex items-center justify-center"
            >
              <div className="text-center text-red-600 p-6">
                <AlertCircle className="h-12 w-12 mx-auto mb-4" />
                <p className="font-medium mb-2">Generation Failed</p>
                <p className="text-sm text-red-500">{error}</p>
                <p className="text-xs text-gray-500 mt-2">Try a different prompt or refresh the page</p>
              </div>
            </motion.div>
          )}

          {imageUrl && !loading && !error && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-4"
            >
              <div className="relative group">
                <img
                  src={imageUrl}
                  alt={prompt}
                  className="w-full aspect-square object-cover rounded-lg shadow-lg"
                  onError={(e) => {
                    console.error('Image failed to load:', imageUrl);
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={() => {
                    console.log('Image loaded successfully:', imageUrl);
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all rounded-lg" />
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                <p className="text-sm text-gray-600 font-medium flex items-center">
                  <Wand2 className="h-4 w-4 mr-2 text-purple-600" />
                  Prompt:
                </p>
                <p className="text-gray-800 mt-1">{prompt}</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  <Download className="h-4 w-4" />
                  <span>Download</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShare}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                  <span>{copied ? 'Copied!' : 'Share'}</span>
                </motion.button>

                {onSave && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-md"
                  >
                    {saving ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    <span>{saving ? 'Saving...' : 'Save to Gallery'}</span>
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && !error && !imageUrl && (
          <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Wand2 className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <p className="font-medium">Your generated image will appear here</p>
              <p className="text-sm mt-1">Enter a prompt and click Generate to start creating</p>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
