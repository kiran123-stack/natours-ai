'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Use Next.js Router

interface SmartDestinationProps {
  name: string;
  initialImage: string;
}

export default function SmartDestination({ name, initialImage }: SmartDestinationProps) {
  const router = useRouter();

  // On click, go to the new page!
  const handleClick = () => {
    // URL encode the name (e.g., "New York" -> "New%20York")
    router.push(`/destination/${encodeURIComponent(name)}?img=${encodeURIComponent(initialImage)}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="relative w-full h-[60vh] rounded-[20px] overflow-hidden cursor-pointer group bg-gray-900 shadow-2xl border border-white/10"
    >
      <Image
        src={initialImage}
        alt={name}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90"
      />
      
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />

      {/* Floating Text */}
      <div className="absolute bottom-8 left-8">
        <h2 className="text-3xl font-bold text-white uppercase tracking-tighter mb-2">{name}</h2>
        <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-widest group-hover:translate-x-2 transition-transform">
          <span>Click for AI Guide</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
}