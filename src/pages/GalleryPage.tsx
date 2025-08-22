import React from 'react';
import { motion } from 'framer-motion';
import Gallery from '../components/Gallery';
import { useImages } from '../contexts/ImageContext';

export default function GalleryPage() {
  const { images } = useImages();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Your Gallery
        </h1>
        <p className="text-gray-600">
          {images.length > 0 
            ? `${images.length} image${images.length !== 1 ? 's' : ''} in your collection`
            : 'Your creative journey starts here'
          }
        </p>
      </div>
      
      <Gallery />
    </motion.div>
  );
}
