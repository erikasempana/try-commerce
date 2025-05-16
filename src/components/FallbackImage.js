'use client';
import Image from "next/image";
import { useState } from "react";

export default function FallbackImage({ src, alt, width, height, className="h-48 rounded shadow object-cover" }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      width={width}
      height={height}
      onError={() => setImgSrc("/default.png")} 
      className={className}
    />
  );
}
