import { useState } from 'react'

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string
}

export function ImageWithFallback({ fallbackSrc = 'https://placehold.co/600x400?text=Memory', src, alt = '', ...props }: ImageWithFallbackProps) {
  const [error, setError] = useState(false)
  const finalSrc = !error ? src : fallbackSrc
  return <img src={finalSrc} alt={alt} onError={() => setError(true)} {...props} />
}


