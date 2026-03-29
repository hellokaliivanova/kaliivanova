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
    client: 'TFM',
    year: '2023',
    description: 'Me llamo Kalina y nací en Bulgaria.\nEn 2005 fuimos a España a ver a mi padre sin saber que sería nuestro nuevo hogar. Igual que mis tatarabuelos, pero sus circunstancias fueron muy diferentes, tuvieron que abandonar su hogar por un genocidio a causa de la Primera Guerra de los Balcanes (1912-13).\n\nHace un año, observando mi pequeño álbum familiar descubrí una fotografía de mis tatarabuelos, Mariya y Stoyu Dapkovi, gracias a esta fotografía me invadió la curiosidad de conocer quiénes fueron. Eran búlgaros tracios vivieron en Goliam Dervent, un pueblo ubicado en la parte de Grecia, cerca de Bulgaria donde hace unos milenios vivieron los tracios, primera civilización que ocupó en el territorio.\n\nDescubrí que ellos también tuvieron que abandonar su hogar, pero su caso fue muy diferente, porque los echaron. Eran refugiados a causa de La Guerra de los Balcanes (1912-1913). La guerra ya había acabado, el otoño acababa de llegar, pero la paz estaba muy lejos de llegar. Un día sucedió lo que más temían: los turcos provocaron un genocidio, irrumpieron en muchos pueblos, persiguieron y mataron a aldeanos.\n\nMis tatarabuelos cogieron lo que pudieron y huyeron con sus familias a Bulgaria.\n\nKopriva pone en valor el álbum familiar como elemento de identidad de mi familia. Kopriva es hogar.\n\nProyecto galardonado con oro en los premios ADCV en la sección estudiante.\n\nhttps://premiosadcv.com/proyectos/kopriva/'
  },
  {
    id: 'tirant',
    name: 'TIRANT',
    category: 'BRANDING / COMUNICACIÓN / PACKAGING',
    client: 'TIRANT.STORE',
    year: '2023',
    description: 'Diseño de marca para un pequeño taller de artesanía de productos de cuero Tirant.store, ubicado en la ciudad de València.\n\nTipografia display serif Magalie diseñada por Mark van Leeuwen.'
  },
  {
    id: 'festes-mislata',
    name: 'FESTES MISLATA',
    category: 'CARTELERÍA / CAMPAÑA',
    client: 'AJUNTAMENT DE MISLATA',
    year: '2024',
    descriptionIndex: 1,
    description: `Dirección creativa para las fiestas patronales y populares de Mislata 2024. El nuevo diseño de la imagen para las fiestas refleja su tradición y vitalidad. La icónica estatua "Almassil" de Miquel Navarro, como protagonista y representante de las fiestas. Con una estética moderna y vibrante, utiliza colores vivos y elementos que conectan la historia local con el presente. Esta identidad visual celebra la energía y alegría que caracteriza las festividades.

Desde el departamento de comunicación nos encargamos en crear un sistema visual para todo tipo de soportes, tanto analógicos como digitales: cartelería para redes sociales y web, mupis e información en paradas de bus, lonas para escenarios, señalética, folleto y merch.

EQUIPO CREATIVO

Cruz Sánchez
y Kalina Ivanova

TAGS
DIRECCIÓN CREATIVA SISTEMA VISUAL RRSS RETAIL`
  },
  {
    id: 'ino',
    name: 'INO',
    category: 'BRANDING',
    client: 'INO-BG',
    year: '2024',
    description: `La marca ИНО, escrita en cirílico, se pronuncia "INO" y está dirigida exclusivamente al mercado nacional de Bulgaria. Es una empresa familiar pequeña en la ciudad costera Varna especializada en la industria de la moda desde los 90.

Sin perder la esencia de la marca al ser un oficio artesanal y manual, se escogió una tipografía como base que represente esos valores. Para lograrlo, busqué una tipografía scripta que tuviera una morfología más redondeada y amable. 

Finalmente, seleccioné la tipografía "Nickainley Normal" que tenía los idiomas del latín y el cirílico. Su morfología me permitió representar la forma orgánica de un hilo y así crear el logotipo.`,
    descriptionIndex: 4
  },
  {
    id: 'melancolia',
    name: 'MELANCOLÍA',
    category: 'LIBRO / ENCUADERNACIÓN',
    client: 'PROYECTO PERSONAL',
    year: '2024',
    description: 'Este proyecto surge de la convicción de que el valor filosófico de la película Melancolía del director danés Lars Von Trier proviene de una utilización del lenguaje cinematográfico que permite transmitir, en un contexto apocalíptico, la experiencia de la angustia en su lectura antropológica, ontológica y ética.\n\nMelancolía es una película que utiliza el fin (apocalipsis) como una tragedia íntima; describir el alma. Mediante el libro se reflexiona sobre las emociones —y la inevitabilidad ante el fin del mundo— que puede el individuo experimentar en un estado trágico o apocalíptico.',
    extraCards: [
      {
        afterMediaSubstring: '05_melancolia',
        text: 'Basándome en el análisis de influencias artísticas, literarias y filisóficas. Considero que el libro necesita una tipografía que debe transmitir unos valores emocionales con un toque transgresor. \n\nPor lo tanto la tipografía Fea ha sido seleccionada por su estructura humanista sans serif, tiene una modulación contrastada con detalles que rompen su morfología homogénea que ayuda a transmitir ese tono transgresor del largometraje. La tipografía Fea ha sido diseñada por Víctor Guerrero para la revista NEO2.'
      }
    ]
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
    <div className="shrink-0 relative w-screen md:min-w-[310px] md:w-[310px] h-[350px] md:h-[388px] p-4 md:p-8 text-left leading-[11pt] text-[11pt] normal-case flex flex-col justify-between overflow-hidden snap-start bg-black text-white">
      <div ref={scrollRef} className="overflow-y-auto pr-2 custom-scrollbar h-full" onScroll={handleScroll}>
        <p className="whitespace-pre-wrap">{project.description}</p>
      </div>
      {['melancolia', 'kopriva'].includes(project.id) && !isAtBottom && (
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
    <div className="min-h-screen w-full flex flex-col font-sans uppercase text-xs md:text-sm leading-[1.1] tracking-tight bg-white text-black">
      {/* Top Navigation */}
      {/* Removed border-b from header to merge with project data */}
      <header className="sticky top-0 z-50 bg-white">
        <div className="flex justify-between items-stretch">
          {/* Left Side */}
          <div className="flex">
            {/* Removed border-r here as requested */}
            <div className="px-3 py-2 flex items-center">
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
          <div className="px-3 py-2">PROYECTO</div>
          <div className="px-3 py-2">CATEGORÍA</div>
          <div className="px-3 py-2 flex justify-between">
            <span>CLIENTE</span>
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
                <div className="px-3 py-2 border-b md:border-b-0 flex items-center">
                  {project.name}
                </div>
                <div className="px-3 py-2 border-b md:border-b-0 flex items-center">
                  {project.category}
                </div>
                <div className="px-3 py-2 flex items-center">
                  {project.client}
                </div>
              </div>

              {/* Project Content Slider */}
              <div className="flex overflow-x-auto border-b border-black bg-black snap-x snap-mandatory relative z-0">

                {/* 1. Render First Images */}
                {firstImages.map((media, i) => {
                  const isVideo = media.toLowerCase().match(/\.(mp4|webm|ogg)(\?.*)?$/i);
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
                  const isVideo = media.toLowerCase().match(/\.(mp4|webm|ogg)(\?.*)?$/i);
                  const matchingExtraCards = project.extraCards?.filter(card => media.includes(card.afterMediaSubstring)) || [];

                  return (
                    <React.Fragment key={`media-end-fragment-${i}`}>
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
                      {/* Render extra texts immediately following this media, if any */}
                      {matchingExtraCards.map((card, cardIndex) => (
                        <div key={`extra-card-${i}-${cardIndex}`} className="shrink-0 relative w-screen md:min-w-[310px] md:w-[310px] h-[350px] md:h-[388px] p-4 md:p-8 text-left leading-[11pt] text-[11pt] normal-case flex flex-col justify-between overflow-hidden snap-start bg-black text-white">
                          <div className="overflow-y-auto pr-2 custom-scrollbar h-full">
                            <p className="whitespace-pre-wrap">{card.text}</p>
                          </div>
                        </div>
                      ))}
                    </React.Fragment>
                  );
                })}

              </div>
            </article>
          );
        })}

        {/* Footer */}
        <div className="p-3 border-t border-black bg-white text-xs">
          KALINA IVANOVA
        </div>
      </main>

      {/* Modal Sobre mí */}
      {isAboutOpen && (
        <div className="fixed inset-0 z-[60] bg-white/40 backdrop-blur-md text-black overflow-y-auto md:overflow-hidden w-full h-full normal-case">
          <div className="min-h-full md:h-full flex flex-col p-6 md:p-8">

            {/* Top row with 4 columns */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 mb-4 md:mb-6 text-[11pt] tracking-normal leading-[11pt]">

              {/* Col 1 */}
              <div className="flex flex-col gap-2 md:gap-4">
                <h2>Kalina Ivanova</h2>
                <p>
                  Diseñadora gráfica que, a lo largo de estos años, ha trabajado en proyectos en distintas áreas del diseño, tanto en el ámbito cultural como en el comercial. Mi enfoque se basa en una búsqueda constante de nuevas maneras de crear sistemas e ideas que comuniquen un concepto de forma eficaz. Considero que toda identidad debe construirse a partir de una narrativa sólida, capaz de transmitir un mensaje que conecte con el público, ya sea mediante la divulgación, la sorpresa, la nostalgia o la estética.
                </p>
              </div>

              {/* Col 2 */}
              <div className="flex flex-col gap-2 md:gap-4">
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
              <div className="flex flex-col gap-2 md:gap-4">
                <h2>Exposiciones</h2>
                <div>
                  <p className="mb-2 md:mb-4">
                    <a href="https://www.adcv.com/inauguracion-expo-premios-adcv/" target="_blank" rel="noreferrer" className="hover:underline">
                      Exposición en LAS NAVES<br />
                      Premios ADCV 2024
                    </a><br />
                    Proyecto: Kopriva
                  </p>
                  <p>
                    2026<br />
                    Exposición en CCCC (Centro del Carmen de Cultura Contemporánea)<br />
                    <a href="https://www.consorcimuseus.gva.es/exposicion/lescola-dart-i-superior-de-disseny-175-anys-al-cor-de-valencia/?lang=es" target="_blank" rel="noreferrer" className="hover:underline">
                      L’ESCOLA D’ART I SUPERIOR DE DISSENY. 175 ANYS AL COR DE VALÈNCIA
                    </a><br />
                    Proyecto: Kopriva
                  </p>
                </div>
              </div>

              {/* Col 4 */}
              <div className="flex flex-col gap-2 md:gap-4">
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
            <div className="flex-1 min-h-0 flex items-center justify-center py-4 md:py-0 md:-mt-10 relative z-10">
              <img
                src={kImage}
                alt="K"
                className="w-full h-full max-w-5xl object-contain"
              />
            </div>

            {/* Bottom row */}
            <div className="mt-4 flex flex-col md:flex-row justify-between items-center md:items-end text-[11pt] leading-[11pt]">
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
              className="fixed top-4 right-4 md:top-6 md:right-6 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center border border-black bg-transparent hover:bg-black hover:text-white transition-colors z-[70] md:text-xl"
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
