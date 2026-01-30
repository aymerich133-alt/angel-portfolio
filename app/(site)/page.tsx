"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState} from "react";
import Image from "next/image";

export default function WorkCategoryPage() {
  const params = useParams();
  const activeCategory = params.category as string;

  const sectionRef = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);


  const laneRef = useRef<HTMLDivElement | null>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const fishState = useRef(
    new Map<HTMLElement, { y: number; rotate: number }>()
  );

  /* ===============================
     FISH WAVE MOTION (SCROLL)
     =============================== */
  useEffect(() => {
    const lane = laneRef.current;
    if (!lane) return;

    const handleScroll = () => {
      const center = lane.scrollLeft + lane.clientWidth / 2;

      lane.querySelectorAll<HTMLElement>("[data-fish]").forEach((el) => {
        const elCenter = el.offsetLeft + el.clientWidth / 2;
        const distance = (elCenter - center) / lane.clientWidth;

        const targetY = Math.sin(distance * Math.PI) * 10;
        const targetRotate = distance * 6;

        const state =
          fishState.current.get(el) || { y: 0, rotate: 0 };

        state.y += (targetY - state.y) * 0.08;
        state.rotate += (targetRotate - state.rotate) * 0.08;

        fishState.current.set(el, state);

        el.style.transform = `
          translateY(${state.y}px)
          rotate(${state.rotate}deg)
        `;
      });
    };

    lane.addEventListener("scroll", handleScroll, { passive: true });
    return () => lane.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
  const lane = laneRef.current;
  const el = categoryRefs.current[activeCategory];

  if (!lane || !el) return;

  const laneRect = lane.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();

  const currentScroll = lane.scrollLeft;

  const elCenter =
    elRect.left - laneRect.left + currentScroll + elRect.width / 2;

  const targetScroll =
    elCenter - lane.clientWidth / 2;

  lane.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  });
}, [activeCategory]);

useEffect(() => {
  if (!sectionRef.current) return;

  const observer = new IntersectionObserver(
    ([entry]) => {
      setInView(entry.isIntersecting);
    },
    {
      threshold: 0.4, // 40% visible = turns red
    }
  );

  observer.observe(sectionRef.current);
  return () => observer.disconnect();
}, []);


  /* ===============================
     DATA
     =============================== */
  const categories = [
    { key: "3d", label: "3D Work", href: "/work/3d#portfolio", img: "/images/fish/Fish_03.png",},
    { key: "motion", label: "Motion Design", href: "/work/motion#portfolio", img: "/images/fish/Fish_02.png", },
    { key: "graphic", label: "Graphic Design", href: "/work/graphic#portfolio", img: "/images/fish/Fish_01.png", },
    { key: "video", label: "Video Editing", href: "/work/video#portfolio", img: "/images/fish/Fish_02.png", },
    { key: "3d2", label: "3D Work", href: "/work/3d#portfolio", img: "/images/fish/Fish_03.png", },
  ];


  const projectsByCategory: Record<
    string,
    { title: string; slug: string; description: string }[]
  > = {
    "3d": [
      { title: "Floating Island", slug: "floating-island", description: "Stylized 3D environment" },
      { title: "Creature Study", slug: "creature-study", description: "Organic modeling practice" },
      { title: "Floating Island", slug: "floating-island", description: "Stylized 3D environment" },
      { title: "Creature Study", slug: "creature-study", description: "Organic modeling practice" },
    ],
    motion: [
      { title: "Loop Study", slug: "loop-study", description: "Seamless motion loop" },
      { title: "Typography Motion", slug: "typography-motion", description: "Animated type" },
    ],
    graphic: [
      { title: "Poster Series", slug: "poster-series", description: "Print-style graphics" },
      { title: "Visual Identity", slug: "visual-identity", description: "Brand exploration" },
    ],
    video: [
      { title: "Short Film Edit", slug: "short-film-edit", description: "Narrative pacing" },
      { title: "Showreel", slug: "showreel", description: "Compilation edit" },
    ],
  };

  return (
    <main className="min-h-screen">

      {/* ================= HERO ================= */}
      <section
        id="hero"
        className="
          relative
          min-h-screen
          flex
          flex-col
          justify-start
          items-center
          text-center
          px-6
          pt-[45vh]
          overflow-hidden
          bg-[#1E4E8C]
          text-[#F3EFE3]
        "
      >

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
          animate-[texture-drift_60s_linear_infinite]
        "
        />

        {/* SOFT DARK OVERLAY (keeps contrast readable) */}
        <div
          className="
            absolute
            inset-0
            bg-[#1E4E8C]/80
            pointer-events-none
          "
        />

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center">
          <h1
            className="
              
              hero-title
              leading-[0.9]
              tracking-wide
              mb-10
            "
            style={{ fontSize: "clamp(11rem, 18vw, 25rem)" }}
          >
            ANGEL AYMERICH
          </h1>



          <p
            className="
              secondary-title
              text-xl
              md:text-2xl
              max-w-3xl
              text-[#F3EFE3]/80
              mb-10
            "
          >
            Blending design, code, and vibes into interactive stories
          </p>

          {/* SCROLL HINT */}
          <div className="flex flex-col items-center gap-2 text-[#F3EFE3]/60">
            <span className="text-sm tracking-wide">Scroll</span>
            <span className="text-lg animate-[float_2.5s_ease-in-out_infinite]">
              ↓
            </span>
          </div>
        </div>
      </section>

      {/* ================= WORK SELECTION ================= */}
      <section
        ref={sectionRef}
        id="portfolio"
        className="scroll-mt-[120px] pt-10"
      >



        {/* TITLE + HINTS */}
        <div className="flex items-center justify-center gap-6 mb-10">

          {/* LEFT HINT */}
          <span
            className="
              hidden
              md:block
              text-sm
              font-semibold
              tracking-wide
              text-[#B93838]
              rotate-[-6deg]
              animate-pulse
            "
          >
            click a fish
          </span>

          {/* MAIN TITLE */}
          <h2
            className={`
              hero-title
              text-5xl
              font-bold
              text-center
              mb-10
              transition-colors
              duration-500
              ${inView ? "text-[#B93838]" : "text-[#1E4E8C]"}
            `}
            style={{ fontSize: "clamp(1rem, 8vw, 5rem)" }}
          >
            Work Selection
          </h2>


          {/* RIGHT HINT */}
          <span
            className="
              hidden
              md:flex
              items-center
              gap-2
              text-sm
              font-semibold
              tracking-wide
              text-[#B93838]
            "
          >
            scroll
            <span className="animate-[float_2s_ease-in-out_infinite]">→</span>
          </span>

        </div>



        {/* ===== FISH LANE ===== */}
        <div className="relative mt-16">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#F3EFE3] to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#F3EFE3] to-transparent z-10" />

         <div
          ref={laneRef}
          className="
            relative
            w-full
            h-[220px]
            overflow-x-auto
            overflow-y-hidden
            cursor-grab
            select-none
          "
        >
          <div className="flex items-center gap-45 h-full">

            {/* LEFT SPACER */}
            <div className="flex-shrink-0 w-[15vw]" />

            {categories.map((item) => (
            <Link key={item.key} href={item.href} className="flex-shrink-0">
              <div
                ref={(el) => {
                  categoryRefs.current[item.key] = el;
                }}
                data-fish
                className="
                  relative
                  w-[400px]
                  h-[260px]
                  transition-all
                  duration-300
                  ease-out
                  hover:scale-105
                  hover:-translate-y-1
                "
              >
                {/* FISH IMAGE */}
                <img
                  src={item.img}
                  alt={item.label}
                  className="
                    absolute
                    inset-0
                    w-full
                    h-full
                    object-contain
                    pointer-events-none
                    select-none
                  "
                  draggable={false}
                />

                {/* TEXT OVERLAY */}
                <div
                  className={`
                    hero-title
                    absolute
                    inset-0
                    flex
                    items-center
                    justify-center
                    text-5xl
                    text-[#1E4E8C]
                    whitespace-nowrap
                    text-outline-cream
                    transition-all
                    duration-300
                    hover:scale-135
                    ease-out
                    ${
                      activeCategory === item.key
                          ? "text-[#B93838]"
                          : "text-[#1E4E8C] hover:text-[#B93838] hover:scale-110"
                    }
                  `}
                >
                  {item.label}
                </div>
              </div>
            </Link>
          ))}

          </div>
        </div>
        </div>

      </section>

       {/* ================= ABOUT ================= */}
      <section
        id="about"
        className="
          relative
          scroll-mt-[120px]
          py-32
          bg-[#1E4E8C]
          text-[#F3EFE3]
          overflow-hidden
        "
      >
        {/* TEXTURE LAYER (STATIC) */}
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
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">

            {/* TEXT COLUMN */}
            <div>
              <h2 className="hero-title text-5xl font-bold mb-10"
              style={{ fontSize: "clamp(1rem, 8vw, 5rem)" }}
              >
                About
              </h2>

              <p className="text-lg leading-relaxed text-[#F3EFE3]/75 max-w-[38ch] space-y-6">
              <span className="block">
                I was born and raised in Tampico, Tamaulipas, near the sea —  
                and that sense of motion and openness often shows up in my work.
              </span>

              <span className="block">
                I’ve always been both creatively and technically inclined.  
                Alongside design and animation, math and logic shaped how I think,  
                which naturally led me toward coding and interactive systems.
              </span>

              <span className="block">
                I believe designers should understand the technical side  
                of what they build — it leads to stronger, more thoughtful experiences.
              </span>

              <span className="block">
                I studied Animation and Videogame Engineering  
                at Universidad Panamericana in Mexico City  
                and am currently specializing in Visual Effects at the same university.
              </span>
            </p>

            </div>

            {/* IMAGE / CARD COLUMN */}
            <div className="flex justify-center md:justify-end">
              <div
                className="
                  group
                  relative
                  w-[320px]
                  h-[420px]
                  rounded-2xl
                  bg-[#0B132B]/10
                  -translate-x-4
                  md:-translate-x-10
                  rotate-[-3deg]
                  shadow-[0_20px_60px_rgba(0,0,0,0.18)]
                "
              >
                {/* PHOTO */}
                <Image
                  src="/images/about/PhotoCard.png"
                  alt="Angel Aymerich"
                  fill
                  className="
                    object-cover
                    rounded-2xl
                    select-none
                    group-hover:scale-[1.02]
                    transition-transform
                    duration-300
                  "
                  draggable={false}
                  priority
                />

                {/* LABEL */}
                <span
                  className="
                    absolute
                    -bottom-6
                    left-1/2
                    -translate-x-1/2
                    text-sm
                    text-[#F3EFE3]/80
                    italic
                  "
                >
                  That’s me!
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= SOFTWARE ================= */}
      <section
        id="software"
        className="scroll-mt-[120px] pt-10 pb-20 bg-[#F3EFE3]"
      >
        <div className="max-w-5xl mx-auto text-center mb-16 text-[#1E4E8C]">
          <h2 className=" hero-title text-5xl font-bold mb-10"
          style={{ fontSize: "clamp(1rem, 8vw, 5rem)" }}
          >
            Software
          </h2>

          <p className="mt-4 text-lg text-[#1f2a44]/70">
            Tools I use daily to design, animate, and build.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-0 gap-y-28 place-items-center">
            {[
              { src: "/images/software/BlenderIcon.png", alt: "Blender" },
              { src: "/images/software/AfterIcon.png", alt: "After Effects" },
              { src: "/images/software/PremierIcon.png", alt: "Premiere Pro" },
              { src: "/images/software/MayaIcon.png", alt: "Maya" },
              { src: "/images/software/PhotoshopIcon.png", alt: "Photoshop" },
              { src: "/images/software/IllustratorIcon.png", alt: "Illustrator" },
              { src: "/images/software/CanvaIcon.png", alt: "Canva" },
              { src: "/images/software/PythonIcon.png", alt: "Python" },
            ].map((tool) => (
              <div
                key={tool.alt}
                className="
                  group
                  transition-all
                  duration-300
                  ease-out
                  rotate-[-2deg]
                  hover:rotate-0
                  hover:scale-110
                  hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]
                  hover:-translate-y-1

                "
              >
                <Image
                  src={tool.src}
                  alt={tool.alt}
                  width={80}
                  height={80}
                  className="select-none"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>

      </section>

      {/* ================= CONTACT ================= */}
      <section
        id="contact"
        className="
          relative
          scroll-mt-[120px]
          py-25
          pt-10
          pb-40
          bg-[#1E4E8C]
          text-[#F3EFE3]
          overflow-hidden
        "
      >
        {/* TEXTURE LAYER (STATIC) */}
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
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-24">

          {/* ===== ROW 1: TITLE ===== */}
          <h2
            className="hero-title text-5xl font-bold tracking-tight text-[#F3EFE3]"
            style={{ fontSize: "clamp(1rem, 8vw, 5rem)" }}
          >
            Let’s connect
          </h2>

          {/* ===== ROW 2: STAMP + FOLDER ===== */}
          <div className="flex justify-center items-start gap-24 flex-wrap">

            {/* STAMP */}
            <a
              href="mailto:aymerich133@gmail.com"
              className="
                group
                flex
                flex-col
                items-center
                rotate-[-6deg]
                transition-all
                duration-300
                ease-out
                hover:scale-110
                hover:rotate-0
                active:scale-95
              "
            >
              <div
                className="
                  transition-all
                  duration-200
                  ease-out
                  group-hover:drop-shadow-[0_12px_24px_rgba(0,0,0,0.25)]
                  group-active:translate-y-[2px]
                "
              >
                <Image
                  src="/images/contact/stamp.png"
                  alt="Send email"
                  width={350}
                  height={350}
                  draggable={false}
                />
              </div>

              <span className="mt-6 text-lg tracking-wide text-[#F3EFE3]/70 group-hover:text-[#F3EFE3] transition">
                Send me an email
              </span>
            </a>

            {/* FOLDER */}
            <a
              href="/cv/CV_AngelAymerich.pdf"
              download
              className="
                group
                flex
                flex-col
                items-center
                rotate-[4deg]
                hover:rotate-0
                transition-all
                duration-300
                ease-out
                hover:scale-110
                hover:-translate-y-1
                hover:drop-shadow-[0_16px_32px_rgba(0,0,0,0.18)]
                cursor-pointer
              "
            >
              <img
                src="/images/contact/Folder.png"
                alt="Download resume"
                className="w-[250px] select-none"
                draggable={false}
              />
              <span className="mt-6 text-lg tracking-wide text-[#F3EFE3]/70 group-hover:text-[#F3EFE3] transition">
                Download resume
              </span>
            </a>

          </div>

          {/* ===== ROW 3: EMAIL + SOCIALS ===== */}
          <div className="flex justify-center items-center gap-10 flex-wrap">

            {/* EMAIL TEXT */}
            <a
              href="mailto:aymerich133@gmail.com"
              className="
                group
                flex
                flex-col
                items-center
                text-xl
                md:text-2xl
                font-medium
                tracking-wide
                hover:scale-110
                transition-all
                duration-300
                ease-out
              "
            >
              aymerich133@gmail.com
            </a>

            <span className="text-[#F3EFE3]/30">•</span>

            {/* SOCIAL ICONS */}
            <div className="flex items-center gap-8">
              {[
                {
                  href: "https://instagram.com/angelitros.jpg",
                  src: "/images/contact/instagram.png",
                  alt: "Instagram",
                  tilt: "-rotate-6",
                },
                {
                  href: "https://github.com/aymerich133-alt",
                  src: "/images/contact/githubIcon.png",
                  alt: "GitHub",
                  tilt: "rotate-3",
                },
                {
                  href: "https://linkedin.com/in/angel-aymerich-quezada-91103b201/",
                  src: "/images/contact/linkedinIcon.png",
                  alt: "LinkedIn",
                  tilt: "-rotate-2",
                },
              ].map((icon) => (
                <a
                  key={icon.alt}
                  href={icon.href}
                  target="_blank"
                  className={`
                    group
                    transition-all
                    duration-300
                    ease-out
                    hover:scale-125
                    ${icon.tilt}
                  `}
                >
                  <img
                    src={icon.src}
                    alt={icon.alt}
                    className="
                      w-14
                      h-14
                      md:w-16
                      md:h-16
                      select-none
                      transition-all
                      duration-300
                      ease-out
                      group-hover:rotate-0
                      group-hover:drop-shadow-[0_12px_28px_rgba(0,0,0,0.4)]
                    "
                    draggable={false}
                  />
                </a>
              ))}
            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
