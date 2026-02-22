import React from 'react';
import { Project } from './types';
import kImage from '/images/sobre-mi/K.webp';
// Import all media that live under /images/projects/<projectId> using Vite's glob import.
// Vite replaces the values with resolved URLs during build.
const imageModules = import.meta.glob('/images/projects/**/*.{jpg,jpeg,png,webp,gif,avif,svg,mp4,webm,ogg}', {
  eager: true,
  import: 'default'
}) as Record<string, string>;

const getProjectImages = (projectId: string, placeholderCount = 6): string[] => {
  const prefix = `/images/projects/${projectId}/`;

  const found = Object.entries(imageModules)
    .filter(([path]) => path.startsWith(prefix))
    // Numeric compare so 10.jpg comes after 9.jpg
    .sort((a, b) => a[0].localeCompare(b[0], undefined, { numeric: true, sensitivity: 'base' }))
    .map(([, src]) => src);

  if (found.length > 0) {
    return found;
  }

  // If there are no local images, fall back to placeholders.
  return Array.from({ length: placeholderCount }, (_, i) => `https://placehold.co/600x800/f0f0f0/333333?text=${encodeURIComponent(projectId)}+${i + 1}`);
};

const projects: Project[] = [
  {
    id: 'kopriva',
    name: 'KOPRIVA',
    category: 'LIBRO / ARCHIVO',
    year: '2023',
    description: 'Descripción pendiente para el proyecto KOPRIVA. Por favor, proporciona el texto descriptivo o el HTML de este proyecto para sustituir este marcador de posición. Este espacio está reservado para explicar el concepto, la técnica y el contexto del diseño.'
  },
  {
    id: 'tirant',
    name: 'TIRANT',
    category: 'BRANDING / COMUNICACIÓN / PACKAGING',
    year: '2023',
    description: 'Descripción pendiente para el proyecto TIRANT. Por favor, proporciona el texto descriptivo o el HTML de este proyecto. Aquí se detallarán los desafíos tipográficos y la dirección de arte tomada para esta pieza.'
  },
  {
    id: 'festes-mislata',
    name: 'FESTES MISLATA',
    category: 'CARTELERÍA / CAMPAÑA',
    year: '2022',
    description: 'Descripción pendiente para FESTES MISLATA. Este proyecto probablemente abarca la identidad visual y comunicación para las fiestas locales. Necesito el texto original para completar esta sección con la narrativa correcta.'
  },
  {
    id: 'ino',
    name: 'INO',
    category: 'BRANDING',
    year: '2024',
    description: 'Descripción pendiente para INO. Por favor, proporciona el texto descriptivo para este proyecto.',
    descriptionIndex: 4
  },
  {
    id: 'melancolia',
    name: 'MELANCOLÍA',
    category: 'LIBRO / ENCUADERNACIÓN',
    year: '2024',
    description: 'Este proyecto surge de la convicción de que el valor filosófico de la película Melancolía del director danés Lars Von Trier proviene de una utilización del lenguaje cinematográfico que permite transmitir, en un contexto apocalíptico, la experiencia de la angustia en su lectura antropológica, ontológica y ética.\n\nMelancolía es una película que utiliza el fin (apocalipsis) como una tragedia íntima; describir el alma. Mediante el libro se reflexiona sobre las emociones —y la inevitabilidad ante el fin del mundo— que puede el individuo experimentar en un estado trágico o apocalíptico.'
  }
];

const ProjectDescriptionCard: React.FC<{ project: Project }> = ({ project }) => {
  const [isAtBottom, setIsAtBottom] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      const { scrollHeight, clientHeight } = scrollRef.current;
      if (Math.ceil(clientHeight) >= scrollHeight - 2) {
        setIsAtBottom(true);
      }
    }
  }, [project.description]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (Math.ceil(scrollTop + clientHeight) >= scrollHeight - 2) {
      setIsAtBottom(true);
    } else {
      setIsAtBottom(false);
    }
  };

  return (
    <div className="shrink-0 relative w-screen md:min-w-[310px] md:w-[310px] h-[350px] md:h-[388px] p-4 md:p-8 text-left leading-relaxed normal-case text-sm md:text-base flex flex-col justify-between overflow-hidden snap-start bg-black text-white">
      <div ref={scrollRef} className="overflow-y-auto pr-2 custom-scrollbar h-full" onScroll={handleScroll}>
        <p className="whitespace-pre-wrap">{project.description}</p>
      </div>
      {project.id === 'melancolia' && !isAtBottom && (
        <div className="absolute bottom-4 right-2 md:bottom-8 md:right-3 flex justify-end opacity-80 animate-pulse pointer-events-none transition-opacity duration-300">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
};

const App: React.FC = () => {
  const [isAboutOpen, setIsAboutOpen] = React.useState(false);

  const closeAbout = () => setIsAboutOpen(false);

  return (
    <div className="min-h-screen w-full flex flex-col font-sans uppercase text-xs md:text-sm leading-tight tracking-tight bg-white text-black">
      {/* Top Navigation */}
      {/* Removed border-b from header to merge with project data */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="flex justify-between items-stretch">
          {/* Left Side */}
          <div className="flex">
            {/* Removed border-r here as requested */}
            <div className="px-3 py-2 flex items-center font-bold">
              © 2026 KALI IVANOVA
            </div>
          </div>

          {/* Right Side */}
          <div className="flex">
            <a href="#" className="px-3 py-2 border-l border-black hover:bg-black hover:text-white transition-colors flex items-center bg-black text-white">
              PROYECTOS
            </a>
            <button
              type="button"
              onClick={() => setIsAboutOpen(true)}
              className="px-3 py-2 border-l border-black hover:bg-black hover:text-white transition-colors flex items-center"
            >
              SOBRE MÍ
            </button>
          </div>
        </div>

        {/* Filter Bar / Column Headers */}
        <div className="grid grid-cols-3 border-t border-b border-black bg-white">
          <div className="px-3 py-2 font-semibold">PROYECTO</div>
          <div className="px-3 py-2 font-semibold">CATEGORÍA</div>
          <div className="px-3 py-2 flex justify-between text-gray-400">
            {/* Empty space */}
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {projects.map((project) => {
          const images = getProjectImages(project.id);
          const descIndex = project.descriptionIndex ?? 3;
          // Prepare the content list with description inserted after descIndex images
          const contentItems = [...images];
          const firstImages = contentItems.slice(0, descIndex);
          const remainingImages = contentItems.slice(descIndex);

          return (
            <article key={project.id} className="border-b border-black last:border-b-0">
              {/* Project Header Row - Made Sticky */}
              {/* Adjusted top value slightly to ensure overlap (60px mobile, 66px desktop) */}
              <div className="grid grid-cols-1 md:grid-cols-3 border-b border-black bg-white sticky top-[60px] md:top-[66px] z-40">
                <div className="px-3 py-2 border-b md:border-b-0 flex items-center font-bold">
                  {project.name}
                </div>
                <div className="px-3 py-2 border-b md:border-b-0 flex items-center">
                  {project.category}
                </div>
                <div className="px-3 py-2 flex items-center text-gray-500">
                  {/* Empty space */}
                </div>
              </div>

              {/* Project Content Slider */}
              <div className="flex overflow-x-auto border-b border-black bg-black snap-x snap-mandatory relative z-0">

                {/* 1. Render First Images */}
                {firstImages.map((media, i) => {
                  const isVideo = media.toLowerCase().match(/\.(mp4|webm|ogg)$/i);
                  return (
                    <div key={`media-start-${i}`} className="shrink-0 w-auto h-[350px] md:h-[388px] snap-start">
                      {isVideo ? (
                        <video
                          src={media}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-auto h-full object-contain md:object-cover block"
                        />
                      ) : (
                        <img
                          src={media}
                          alt={`Project ${project.name} media ${i + 1}`}
                          className="w-auto h-full object-contain md:object-cover block"
                          onError={(e) => {
                            // Fallback in case local image is missing
                            const target = e.target as HTMLImageElement;
                            target.src = `https://placehold.co/600x800/f0f0f0/333333?text=${project.id}+${i + 1}`;
                          }}
                        />
                      )}
                    </div>
                  );
                })}

                {/* 2. Render Description Card (Fixed as 4th item) */}
                <ProjectDescriptionCard project={project} />

                {/* 3. Render Remaining Images */}
                {remainingImages.map((media, i) => {
                  const isVideo = media.toLowerCase().match(/\.(mp4|webm|ogg)$/i);
                  return (
                    <div key={`media-end-${i}`} className="shrink-0 w-auto h-[350px] md:h-[388px] snap-start">
                      {isVideo ? (
                        <video
                          src={media}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-auto h-full object-contain md:object-cover block"
                        />
                      ) : (
                        <img
                          src={media}
                          alt={`Project ${project.name} media ${i + 4}`}
                          className="w-auto h-full object-contain md:object-cover block"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://placehold.co/600x800/f0f0f0/333333?text=${project.id}+${i + 4}`;
                          }}
                        />
                      )}
                    </div>
                  );
                })}

              </div>
            </article>
          );
        })}

        {/* Footer */}
        <div className="p-3 border-t border-black bg-white text-xs">
          TÉRMINOS Y CONDICIONES
        </div>
      </main>

      {/* Modal Sobre mí */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[60] bg-white text-black overflow-y-auto md:overflow-hidden w-full h-full normal-case">
          <div className="min-h-full md:h-full flex flex-col p-6 md:p-8">

            {/* Top row with 4 columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-4 md:mb-6 text-sm font-bold tracking-normal leading-snug">

              {/* Col 1 */}
              <div className="flex flex-col gap-2 md:gap-4">
                <h2>Kalina Ivanova</h2>
                <p className="text-xs md:text-sm">
                  Diseñadora gráfica y durante estos<br />
                  años he desarrollado proyectos en<br />
                  todas las áreas del diseño, tanto en el<br />
                  ámbito cultural como comercial. Mi<br />
                  metodología se basa en una constante<br />
                  búsqueda de nuevas formas de crear<br />
                  sistemas e ideas que comuniquen de<br />
                  la mejor manera un concepto. Detrás<br />
                  de una identidad debe haber una<br />
                  narrativa y comunicar un mensaje que<br />
                  crea un vínculo con el público. Ya sea a<br />
                  través de la divulgación, la sorpresa,<br />
                  la nostalgia o la estética.
                </p>
              </div>

              {/* Col 2 */}
              <div className="flex flex-col gap-2 md:gap-4 text-xs md:text-sm">
                <h2>Logros</h2>
                <div>
                  <p className="mb-2 md:mb-4">
                    (2024) Premio ADCV ORO<br />
                    Premios ADCV<br />
                    Proyecto: Kopriva
                  </p>
                  <p>
                    Edición Selekted 2024<br />
                    Proyecto seleccionado: New<br />
                    Talent (Estudiante)<br />
                    Proyecto: Kopriva
                  </p>
                </div>
              </div>

              {/* Col 3 */}
              <div className="flex flex-col gap-2 md:gap-4 text-xs md:text-sm">
                <h2>Exposiciones</h2>
                <div>
                  <p>
                    Exposición en LAS NAVES<br />
                    Premios ADCV 2024<br />
                    Proyecto: Kopriva
                  </p>
                </div>
              </div>

              {/* Col 4 */}
              <div className="flex flex-col gap-2 md:gap-4 text-xs md:text-sm">
                <h2>Estudios</h2>
                <div>
                  <p className="mb-2 md:mb-4">
                    (2019) Grado<br />
                    en Diseño gráfico
                  </p>
                  <p>
                    (2024) Máster Oficial<br />
                    en Diseño de<br />
                    Publicaciones<br />
                    Analógicas y Digitales
                  </p>
                </div>
              </div>
            </div>

            {/* Center image - flex-1 min-h-0 allows it to shrink to fit remaining space */}
            <div className="flex-1 min-h-0 flex items-center justify-center py-4 md:py-2 px-4">
              <img
                src={kImage}
                alt="K"
                className="w-full h-full max-w-4xl object-contain"
              />
            </div>

            {/* Bottom row */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center md:items-end font-bold text-xs md:text-sm">
              <a href="mailto:hellokaliivanova@gmail.com" className="hover:underline mb-2 md:mb-0">
                hellokaliivanova@gmail.com
              </a>
              <a href="https://www.instagram.com/kaliiivanova/" target="_blank" rel="noreferrer" className="hover:underline">
                IG @kaliiivanova
              </a>
            </div>

            <button
              type="button"
              aria-label="Cerrar"
              className="fixed top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-black bg-transparent hover:bg-black hover:text-white transition-colors z-[70] font-bold md:text-xl"
              onClick={closeAbout}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
