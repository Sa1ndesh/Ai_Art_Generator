import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import GeneratorForm from '../components/GeneratorForm';
import ImageDisplay from '../components/ImageDisplay';
import { useAuth } from '../contexts/AuthContext';
import { useImages } from '../contexts/ImageContext';
import { generateImage as generateImageFromApi } from '../services/geminiService';

export default function HomePage() {
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { user, signInAnonymously } = useAuth();
  const { addImage } = useImages();

  useEffect(() => {
    if (!user) {
      signInAnonymously();
    }
  }, [user, signInAnonymously]);


  const handleGenerate = async (prompt: string, imageFile?: File) => {
    if (!prompt.trim()) {
      setError('Please enter a prompt to generate an image.');
      return;
    }

    setLoading(true);
    setError(null);
    setCurrentPrompt(prompt);
    setCurrentImage(null); // Clear previous image

    try {
      console.log('Generating image for prompt:', prompt);
      const imageUrl = await generateImageFromApi({ prompt, imageFile });
      console.log('Generated image URL:', imageUrl);
      setCurrentImage(imageUrl);
    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to generate image. Please try again with a different prompt.');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!currentImage || !currentPrompt) return;

    try {
      addImage({
        prompt: currentPrompt,
        imageUrl: currentImage,
        visibility: 'private'
      });

      // Show success message
      const successDiv = document.createElement('div');
      successDiv.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-2';
      successDiv.innerHTML = `
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
        </svg>
        <span>Image saved to gallery!</span>
      `;
      document.body.appendChild(successDiv);
      
      setTimeout(() => {
        if (document.body.contains(successDiv)) {
          document.body.removeChild(successDiv);
        }
      }, 3000);
    } catch (err) {
      console.error('Save error:', err);
      setError('Failed to save image. Please try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div>
        <GeneratorForm onGenerate={handleGenerate} loading={loading} />
      </div>
      
      <div>
        <ImageDisplay
          imageUrl={currentImage}
          prompt={currentPrompt}
          loading={loading}
          error={error}
          onSave={currentImage ? handleSave : undefined}
        />
      </div>
    </motion.div>
  );
}
