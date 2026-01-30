"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";


export default function ProjectPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const slug = params.slug as string;
  const fromCategory = searchParams.get("from");

  // Folder name = slug (rule of the system)
  const projectPath = `/images/projects/${slug}`;
  const debug = true;


  const galleryImages = [
    "shot-1.png",
    "shot-2.png",
    "shot-3.png",
  ];

  const backHref = fromCategory
    ? `/work/${fromCategory}#portfolio`
    : "/#portfolio";

  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

const projects = [
  // 3D & VFX
  {
    title: "Porsche Teaser",
    slug: "porsche",
    description:
      "Cinematic car teaser focused on shaders, lighting, and motion design.",
    longDescription: [
      "This project explores how lighting and material design can transform a static 3D asset into a cinematic experience. The focus was on developing a realistic yet stylized car shader that balances physical accuracy with visual appeal, paying special attention to reflections, roughness variation, and paint response under different light sources.",

      "In Blender, I designed multiple lighting setups to emphasize the vehicle’s silhouette and surface detail, creating dramatic contrast and controlled highlights. Several camera paths and compositions were tested to produce dynamic teaser shots that feel both promotional and expressive.",

      "The final piece was edited into a short teaser video, combining motion, timing, and visual rhythm to communicate the character of the car rather than just its form. This project reflects my interest in how light, movement, and texture influence perception and emotional response."
    ],
  },

  {
    title: "Tropical Jungle Environment",
    slug: "jungle",
    description:
      "Stylized jungle scene exploring atmosphere and lighting for an upcoming animated short titled *El Patio*.",
    longDescription: [
      "This project focuses on building a dense tropical environment that feels alive through layered lighting, volumetric fog, and controlled color contrast.",

      "The goal was to guide the viewer’s eye using light shafts, depth cues, and compositional framing while maintaining a sense of natural chaos in the vegetation.",

      "Procedural techniques were used to scatter foliage and control variation, allowing for rapid iteration on mood and density without sacrificing artistic control."
    ],
  },

  {
    title: "Blender Donut",
    slug: "donut",
    description:
      "Node-based donut system exploring parametric modeling and procedural materials.",
    longDescription: [
      "This project explores how geometry nodes can be used to create fully parametric models that respond to design changes in real time.",

      "The donut system was built to allow control over shape, icing behavior, and surface detail through exposed parameters, making it both a technical exercise and a playful design tool.",

      "The focus was on building clean, readable node graphs that balance flexibility with performance."
    ],
  },

  {
    title: "3D Lighting Studies",
    slug: "LightPractice",
    description:
      "A series of lighting studies in Blender exploring character, environment, and still life.",
    longDescription: [
      "This project explores and applies three-point lighting using a key light, fill light, and rim light to create depth, contrast, and visual clarity.",

      "The character study focuses on recreating reference images placed alongside the illuminated model, emphasizing accuracy in light direction, intensity, and mood.",

      "The still life explores more natural lighting and composition, experimenting with a vertical aspect ratio to study framing and balance.",

      "The final environment study simulates a nighttime scene with warm, dim lighting to create atmosphere and a sense of narrative space."
    ],
  },

  // Motion Design
  {
    title: "Motion Self Portrait",
    slug: "BrainSplit",
    description:
      "Personal motion piece exploring identity, influences, and creative personality.",
    longDescription: [
      "This motion project presents a visual self-portrait, sharing my interests, influences, and the people who shape my life. Inspired by a trend I discovered on Instagram, the piece highlights my favorite films, anime, sports teams, and characters, while also incorporating personal elements such as my family.",

      "The project was created using Photoshop and After Effects, with a focus on asset design, pre-compositions, and layered effects to achieve smooth, dynamic transitions and expressive motion."
    ],
  },

  {
    title: "Shoot Lyric Video",
    slug: "shootLyrics",
    description:
      "Playful motion lyric video with music-driven typography, transitions, and textured visuals.",
    longDescription: [
      "This project is a motion graphic lyric video for *“Shoot”* by Chaeyoung of TWICE, designed to translate the song’s playful energy into dynamic, expressive typography. The focus was on synchronizing falling text animations and rhythmic transitions with the music to create a visual flow that feels responsive and alive.",

      "The piece was created using a Photoshop and After Effects workflow, where custom typographic assets were designed and then animated through layered compositions and timing-based effects.",

      "Special attention was given to the use of textures and subtle visual noise to add depth and a handcrafted feel, helping the video feel more tactile and polished rather than purely digital."
    ],
  },

  {
    title: "Good Stuff Lyric Video",
    slug: "GoodStuff",
    description:
      "High-energy black-and-white lyric video exploring kinetic typography, distortion, and analog-inspired motion.",
    longDescription: [
      "This project is a fast-paced motion lyric video for *“Good Stuff”* by Karina of aespa, designed to match the aggressive rhythm and flow of the song through bold, kinetic typography and constant visual movement.",

      "The entire piece was created in After Effects, using a typographic system driven by animated noise to produce a topography-like effect where the letters continuously shift and evolve.",

      "A curved screen effect inspired by old CRT televisions was applied to subtly warp the frame, adding an analog, retro character to the digital motion design."
    ],
  },

  {
    title: "Kobe Motion Piece",
    slug: "Kobe",
    description:
      "Cinematic parallax motion piece using depth, blur, and color accents to simulate speed and impact.",
    longDescription: [
      "This project transforms a still image of Kobe Bryant driving toward the basket into a dynamic motion composition using parallax and layered depth. By separating the subject from the background and animating them at different speeds, the piece creates the illusion of forward momentum and camera movement breaking out of a static frame.",

      "Directional blur and selective focus reinforce the feeling of speed and force, while yellow and purple paint splashes reference the Los Angeles Lakers’ color identity and add graphic energy. Styled like a video game intro screen, the final piece signals that the action is about to begin.",

      "The project was created using a Photoshop and After Effects workflow, combining compositing and motion design to turn a single image into a cinematic moment."
    ],
  },

  // Graphic Design
  {
    title: "Lisa Poster",
    slug: "lisaPoster",
    description:
      "Red-dominant poster design combining custom typography, illustration, and mixed-media graphic elements.",
    longDescription: [
      "This project is a graphic poster centered on Lisa of BLACKPINK, focused on creating a bold, high-impact composition through custom typography and a dominant red color palette.",

      "The type was altered and stylized in Illustrator to function as both a graphic element and a visual anchor within the layout. Hand-drawn accents created in Procreate and photo compositing in Photoshop were layered together to build depth and contrast.",

      "The final design was animated into a short process reel for Instagram, edited in Premiere Pro and After Effects to showcase the creative workflow and transformation from sketch to finished poster."
    ],
  },

  {
    title: "Chaeyoung Poster",
    slug: "ChaeyoungPoster",
    description:
      "Blue-and-white poster design using textured cutouts and dynamic composition inspired by a TWICE album release.",
    longDescription: [
      "This project is a graphic poster centered on Chaeyoung of TWICE, created to celebrate the release of the group’s *This Is For* album.",

      "The composition is built around a high-contrast blue-and-white color palette, using bold cut shapes and layered textures to create a sense of movement and visual rhythm within a static layout.",

      "This project also became my first Instagram process reel, encouraging me to continue sharing my creative workflow and design process publicly."
    ],
  },

  {
    title: "Ani Purple Poster",
    slug: "AniPurple",
    description:
      "Purple-toned photo poster exploring glass effects, blending modes, and glowing visual accents.",
    longDescription: [
      "This project is a wallpaper-style poster created from a portrait of my partner, designed as an exploration of color, texture, and layered visual effects.",

      "A glass-like distortion effect was applied to the face using blending modes and texture overlays in Photoshop to experiment with transparency, reflection, and surface depth.",

      "Subtle highlights, including a small heart-shaped sparkle in the eyes, were added to introduce a personal and expressive detail."
    ],
  },

  {
    title: "Winter Poster",
    slug: "WinterPoster",
    description:
      "Pink-and-purple poster design combining cutout textures, branding elements, and layered graphic composition.",
    longDescription: [
      "This project is a graphic poster centered on Winter of aespa, designed around a soft pink and purple color palette paired with scrapbook-style paper and cutout textures.",

      "Graphic components inspired by Winter’s visual identity and logo were integrated into the layout to give the piece a sense of personality and cohesion beyond a simple photo-based poster.",

      "The entire design was created in Photoshop, using layered textures and compositing techniques to build depth and visual rhythm."
    ],
  },

  // Video Editing & Campaigns
  {
    title: "Sweet Slash",
    slug: "SweetSlash",
    description:
      "Collaborative stop motion short combining physical animation, 2D effects, and post-production storytelling.",
    longDescription: [
      "This project is a stop motion short film exploring character-driven conflict and playful narrative through physical animation. The story follows a confrontation between Spider-Gwen and a Nendoroid figure of Himiko Toga, centered around a mysterious box that becomes the catalyst for action and humor.",

      "My primary focus was on animating the physical figures on set through handcrafted, frame-by-frame movement.",

      "In post-production, I developed 2D animated effects, masked out support stands, and explored color grading and sound design to enhance the final presentation."
    ],
  },

  {
    title: "Masks Motion Study",
    slug: "Masks",
    description:
      "Urban motion study using tracking and sound-driven reveals to transform real-world footage.",
    longDescription: [
      "This project is a motion design experiment built from street footage recorded in Mexico City, focused on reinterpreting real-world scenes through tracked graphic elements and selective reveals.",

      "Using After Effects, graphic layers and masks were motion-tracked to elements within the scene, allowing visual accents to stay anchored to moving subjects and objects.",

      "Sound cues, such as a car horn, were used to drive transitions and reveals, connecting audio events directly to what appears on screen."
    ],
  },

  {
    title: "La Carga del Año 2026",
    slug: "LCDA2026",
    description:
      "Branded motion graphics campaign for internal training and public-facing social media promotion.",
    longDescription: [
      "This project is a motion graphics training video and social media campaign created for BP’s *“La Carga del Año 2026”* promotion, developed as part of my role supporting BP’s social media and internal communications.",

      "The training video uses animated text and graphic elements to clearly explain the mechanics of the promotion to station staff and fuel attendants.",

      "A series of promotional posts were designed for Instagram and Facebook, and the project included AI-generated voiceover, sound design, and background music."
    ],
  },

  {
    title: "Christams Reel",
    slug: "RatChris",
    description:
      "Playful holiday social edit combining choreography, rotoscoping, and trend-based motion styling.",
    longDescription: [
      "This project is a short-form holiday video inspired by a viral trend featuring a rat and a clown dancing to a Christmas remix of a Drake track.",

      "The piece was fully planned, filmed, and directed by me, including camera setup, shot selection, and choreography.",

      "After Effects and Premiere Pro were used for editing, timing, and rotoscoping to match the rhythm and visual tone of the original trend."
    ],
  },
];



const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
      const onKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setLightboxImage(null);
        }
      };

      window.addEventListener("keydown", onKeyDown);
      return () => window.removeEventListener("keydown", onKeyDown);
    }, []);


  return (
    <main className="min-h-screen">

      {/* ================= TOP / CREAM INTRO ================= */}
      <section className="bg-[#F3EFE3] px-8 pt-10 pb-20">
        <div className="max-w-4xl mx-auto">

          {/* BACK LINK */}
          <Link
            href={backHref}
            className="inline-block mb-10 text-sm text-[#1f2a44]/60 hover:text-[#1f2a44] transition"
          >
            ← Back to Work
          </Link>

          {/* TITLE */}
          <h1 className="hero-title text-5xl md:text-6xl font-bold mb-6 text-[#1E4E8C]">
            {project?.title || slug.replace(/-/g, " ")}
          </h1>

          <p className="text-lg md:text-xl text-[#1f2a44]/80 max-w-2xl">
            {project?.description || "Project description coming soon."}
          </p>


        </div>
      </section>

      {/* ================= BLUE / TEXTURED BODY ================= */}
      <section className="relative bg-[#1E4E8C] text-[#F3EFE3] py-14 overflow-hidden w-screen left-1/2 -translate-x-1/2">

        {/* TEXTURE LAYER */}
        <div
          className="
            absolute
            inset-[-20%]
            bg-[url('/images/hero/Texture3.jpg')]
            bg-cover
            bg-center
            opacity-25
            mix-blend-overlay
            pointer-events-none
          "
        />

        {/* SOFT DARK OVERLAY */}
        <div
          className="
            absolute
            inset-0
            bg-[#1E4E8C]/80
            pointer-events-none
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto space-y-20">

          {/* {debug && (
            <div className="mb-6 p-4 rounded-lg bg-black/40 text-xs text-white font-mono">
              <div>slug: {String(slug)}</div>
              <div>projectPath: {projectPath}</div>
              <div>video: {projectPath}/main.mp4</div>
              <div>image 1: {projectPath}/shot-1.png</div>
            </div>
          )}  */}

          {/* MEDIA */}
          <div 
          className=
          "w-full rounded-2xl overflow-hidden flex justify-center">

            {/* VIDEO */}
            <video
              src={`${projectPath}/main.mp4`}
              controls
              autoPlay
              muted
              loop
              playsInline
              className="
                max-w-full
                transition-all
                duration-300
              "
              onLoadedMetadata={(e) => {
                const video = e.currentTarget;
                const isVertical = video.videoHeight > video.videoWidth;

                if (isVertical) {
                  video.classList.add(
                    "max-h-[70vh]",
                    "max-w-[360px]",
                    "mx-auto",
                    "object-contain",
                    "rounded-xl"
                  );
                } else {
                  video.classList.add("w-full", "object-cover");
                }
              }}

              onError={(e) => {
                const target = e.currentTarget;
                target.style.display = "none";
                const img = target.nextElementSibling as HTMLImageElement | null;
                if (img) {
                  img.style.display = "block";
          }

              }}
            />

            {/* IMAGE FALLBACK */}
            <img
              src={`${projectPath}/main.png`}
              alt={`${slug} main visual`}
              className="
                hidden
                max-w-full
                transition-all
                duration-300
              "
              onLoad={(e) => {
                const img = e.currentTarget;
                const isVertical = img.naturalHeight > img.naturalWidth;

                if (isVertical) {
                  img.classList.add(
                    "block",
                    "max-h-[70vh]",
                    "max-w-[420px]",
                    "mx-auto",
                    "object-contain",
                    "rounded-xl"
                  );
                } else {
                  img.classList.add("block", "w-full", "object-cover");
                }
              }}

              draggable={false}
            />
          </div>


          {/* ================= GALLERY ================= */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {galleryImages.map((img, i) => (
              <div
                key={i}
                className="
                  group
                  relative
                  h-[220px]
                  rounded-xl
                  overflow-hidden
                  bg-white/10
                  transition-all
                  duration-300
                  ease-out
                  hover:-translate-y-1
                  hover:shadow-[0_20px_40px_rgba(0,0,0,0.35)]
                "
              >
                <img
                  src={`${projectPath}/${img}`}
                  alt={`${slug} gallery image ${i + 1}`}
                  onClick={() => setLightboxImage(`${projectPath}/${img}`)}
                  className="
                    w-full
                    h-full
                    object-cover
                    cursor-zoom-in
                    transition-transform
                    duration-500
                    ease-out
                    group-hover:scale-110
                  "
                  draggable={false}
                />

              </div>
            ))}
          </div>

          {/* ================= TEXT ================= */}
          <div className="space-y-6 text-[#F3EFE3]/85 text-lg max-w-2xl">
            {project?.longDescription?.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            )) || (
              <p>Full project breakdown coming soon.</p>
            )}
          </div>

        </div>
      </section>
    {lightboxImage && (
      <div
        className="
          fixed
          inset-0
          z-[999]
          bg-black/90
          flex
          items-center
          justify-center
          backdrop-blur-sm
        "
        onClick={() => setLightboxImage(null)}
      >
        {/* Close Button */}
        <button
          className="
            absolute
            top-6
            right-6
            text-white
            text-3xl
            hover:scale-110
            transition
          "
          onClick={() => setLightboxImage(null)}
        >
          ×
        </button>

        {/* Image */}
        <img
          src={lightboxImage}
          alt="Fullscreen view"
          className="
            max-w-[90vw]
            max-h-[90vh]
            rounded-xl
            shadow-2xl
            cursor-zoom-out
          "
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </div>
    )}
    </main>
  );
}
