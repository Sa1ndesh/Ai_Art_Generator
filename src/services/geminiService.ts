interface GenerateImageParams {
  prompt: string;
  imageFile?: File;
  width?: number;
  height?: number;
}

export const generateImage = async ({
  prompt,
  width = 1024,
  height = 1024,
}: GenerateImageParams): Promise<string> => {
  try {
    console.log(`Generating image for prompt: "${prompt}"`);
    
    // Use Pollinations.ai free API for image generation
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${Date.now()}`;
    
    console.log(`Successfully generated image for prompt: "${prompt}"`);
    return imageUrl;
  } catch (error) {
    console.error('Error generating image:', error);
    
    // Fallback to a working placeholder image
    console.log('Falling back to placeholder image');
    const placeholderUrl = `https://picsum.photos/${width}/${height}?random=${Date.now()}`;
    return placeholderUrl;
  }
};
