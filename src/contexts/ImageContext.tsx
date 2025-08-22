import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';

interface GeneratedImage {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
  visibility: 'private' | 'public';
  userId: string;
}

interface ImageContextType {
  images: GeneratedImage[];
  addImage: (image: Omit<GeneratedImage, 'id' | 'timestamp' | 'userId'>) => void;
  deleteImage: (id: string) => void;
  loading: boolean;
}

const ImageContext = createContext<ImageContextType | undefined>(undefined);

export function useImages() {
  const context = useContext(ImageContext);
  if (context === undefined) {
    throw new Error('useImages must be used within an ImageProvider');
  }
  return context;
}

interface ImageProviderProps {
  children: ReactNode;
}

export function ImageProvider({ children }: ImageProviderProps) {
  const [images, setImages] = useState<GeneratedImage[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load user's images from localStorage
      const storedImages = localStorage.getItem(`creative-canvas-images-${user.id}`);
      if (storedImages) {
        setImages(JSON.parse(storedImages));
      }
    }
  }, [user]);

  const addImage = (imageData: Omit<GeneratedImage, 'id' | 'timestamp' | 'userId'>) => {
    if (!user) return;

    const newImage: GeneratedImage = {
      ...imageData,
      id: `img_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      userId: user.id
    };

    const updatedImages = [newImage, ...images];
    setImages(updatedImages);
    localStorage.setItem(`creative-canvas-images-${user.id}`, JSON.stringify(updatedImages));
  };

  const deleteImage = (id: string) => {
    if (!user) return;

    const updatedImages = images.filter(img => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem(`creative-canvas-images-${user.id}`, JSON.stringify(updatedImages));
  };

  const value = {
    images,
    addImage,
    deleteImage,
    loading
  };

  return (
    <ImageContext.Provider value={value}>
      {children}
    </ImageContext.Provider>
  );
}
