import { Section, Container } from './Section';
import { useState } from 'react';
import { ScrollReveal } from './ScrollReveal';
import { ChevronLeft, ChevronRight, X, ChevronDown } from 'lucide-react';

// Image names (without extension) — thumbs and full are WebP
const imageNames = [
  // Pratos e comida
  'DSC03821', 'DSC03897', 'DSC03819', 'DSC03820', 'DSC03826', 'DSC03837',
  'DSC03746', 'DSC03747', 'DSC03749', 'DSC03753', 'DSC03755',
  'DSC03730', 'DSC03732', 'DSC03733', 'DSC03735', 'DSC03737',
  'DSC03739', 'DSC03741', 'DSC03742', 'DSC03744',
  // Ambiente e decoração
  'DSC03757', 'DSC03758', 'DSC03760', 'DSC03761', 'DSC03762',
  'DSC03764', 'DSC03765', 'DSC03767', 'DSC03769', 'DSC03770',
  'DSC03771', 'DSC03772', 'DSC03773', 'DSC03781', 'DSC03782',
  'DSC03784', 'DSC03785', 'DSC03786', 'DSC03787', 'DSC03789',
  'DSC03790', 'DSC03791', 'DSC03797', 'DSC03798', 'DSC03800',
  'DSC03801', 'DSC03802', 'DSC03803', 'DSC03804', 'DSC03807',
  'DSC03809', 'DSC03810', 'DSC03812', 'DSC03813',
  // Marmitex e buffet
  'DSC03842', 'DSC03848', 'DSC03853', 'DSC03857', 'DSC03860',
  // Equipe e atendimento
  'DSC03884', 'DSC03886', 'DSC03887', 'DSC03888', 'DSC03890',
  'DSC03891', 'DSC03892', 'DSC03893', 'DSC03895', 'DSC03898',
  'DSC03899', 'IMG_3312(1)', 'IMG_3314', 'IMG_3315', 'IMG_3316',
];

const thumb = (name: string) => `/images/gallery/thumbs/${name}.webp`;
const full = (name: string) => `/images/gallery/full/${name}.webp`;

const INITIAL_COUNT = 9;
const LOAD_MORE_COUNT = 12;

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  const showMore = () => {
    setVisibleCount((prev) => Math.min(prev + LOAD_MORE_COUNT, imageNames.length));
  };

  const hasMore = visibleCount < imageNames.length;

  const visibleNames = imageNames.slice(0, visibleCount);

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    if (direction === 'prev') {
      setSelectedImage(selectedImage > 0 ? selectedImage - 1 : imageNames.length - 1);
    } else {
      setSelectedImage(selectedImage < imageNames.length - 1 ? selectedImage + 1 : 0);
    }
  };

  return (
    <Section id="galeria" variant="default">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-[#1A1A1A] mb-4">
              Galeria
            </h2>
            <p className="text-xl text-[#1A1A1A]/70 max-w-2xl mx-auto">
              É isso que você vai comer — sem filtro, sem promessa vazia
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
          {visibleNames.map((name, index) => (
            <button
              key={name}
              onClick={() => setSelectedImage(index)}
              className="group relative aspect-square rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-[transform,box-shadow] duration-300 hover:scale-105"
            >
              <img
                src={thumb(name)}
                alt={`MEG Restaurante - Foto ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
        </ScrollReveal>

        {/* Ver Mais */}
        {hasMore && (
          <div className="text-center mt-8">
            <button
              onClick={showMore}
              className="inline-flex items-center gap-2 bg-[#FFF8F2] hover:bg-[#E8611A]/10 text-[#1A1A1A] font-medium px-8 py-3 rounded-lg border-2 border-[#E8611A]/20 hover:border-[#E8611A] transition-all duration-200"
            >
              <ChevronDown className="w-5 h-5" />
              Ver mais fotos ({imageNames.length - visibleCount} restantes)
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-2 md:p-4"
            onClick={() => setSelectedImage(null)}
          >
            {/* Close */}
            <button
              className="absolute top-3 right-3 text-white/70 hover:text-white transition-colors z-10 p-2"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            {/* Counter */}
            <span className="absolute top-5 left-5 text-white/50 text-sm">
              {selectedImage + 1} / {imageNames.length}
            </span>

            {/* Previous */}
            <button
              className="absolute left-1 md:left-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox('prev'); }}
            >
              <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            {/* Image — full-size WebP for lightbox */}
            <img
              src={full(imageNames[selectedImage])}
              alt={`MEG Restaurante - Foto ${selectedImage + 1}`}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Next */}
            <button
              className="absolute right-1 md:right-6 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors z-10 p-2"
              onClick={(e) => { e.stopPropagation(); navigateLightbox('next'); }}
            >
              <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
            </button>
          </div>
        )}
      </Container>
    </Section>
  );
}
