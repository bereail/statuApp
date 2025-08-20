// app/s/[slug]/Images.tsx
import Image from 'next/image';

export default function Images({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
      {images.map((src) => (
        <div key={src} style={{ position: 'relative', width: '100%', aspectRatio: '4/3', borderRadius: 8, overflow: 'hidden' }}>
          <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 33vw" style={{ objectFit: 'cover' }} />
        </div>
      ))}
    </div>
  );
}
