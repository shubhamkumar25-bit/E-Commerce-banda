import React, { useState } from 'react';
import { SITE } from '../../config/site';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, alt = '', onError, ...props }) => {
  const [imageSource, setImageSource] = useState(src || SITE.fallbackImage);

  return (
    <img
      {...props}
      src={imageSource}
      alt={alt}
      onError={(event) => {
        if (imageSource !== SITE.fallbackImage) setImageSource(SITE.fallbackImage);
        onError?.(event);
      }}
    />
  );
};