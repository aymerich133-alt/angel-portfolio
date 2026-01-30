
"use client";

import { useEffect, useState } from "react";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
   const sections = ["hero", "portfolio", "software", "about", "contact"];
   const [activeSection, setActiveSection] = useState("hero");
     useEffect(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
              }
            });
          },
          {
            rootMargin: "-120px 0px -60% 0px",
            threshold: 0,
          }
        );

        sections.forEach((id) => {
          const el = document.getElementById(id);
          if (el) observer.observe(el);
        });

        return () => observer.disconnect();
      }, []);

  return (
    <>
      <nav className="fixed top-6 left-0 w-full flex justify-center z-50">
        <div
          className="
            bg-[#F3EFE3]
            border
            border-[#1E4E8C]/30
            rounded-full
            shadow-md
            px-10
            py-3
            flex
            gap-8
          "
        >
          <a
            href="#hero"
            className={`text-sm font-medium transition ${
              activeSection === "hero"
                ? "text-[#B93838]"
                : "text-[#1E4E8C]/40 hover:text-[#1E4E8C]/70"
            }`}
          >
            Home
          </a>
          <a
            href="#portfolio"
            className={`text-sm font-medium transition ${
              activeSection === "portfolio"
                ? "text-[#B93838]"
                : "text-[#1E4E8C]/40 hover:text-[#1E4E8C]/70"
            }`}
          >
            Work
          </a>
          <a
            href="#about"
            className={`text-sm font-medium transition ${
              activeSection === "about"
                ? "text-[#B93838]"
                : "text-[#1E4E8C]/40 hover:text-[#1E4E8C]/70"
            }`}
          >
            About
          </a>
          <a
            href="#software"
            className={`text-sm font-medium transition ${
              activeSection === "software"
                ? "text-[#B93838]"
                : "text-[#1E4E8C]/40 hover:text-[#1E4E8C]/70"
            }`}
          >
            Software
          </a>
          <a
            href="#contact"
            className={`text-sm font-medium transition ${
              activeSection === "contact"
                ? "text-[#B93838]"
                : "text-[#1E4E8C]/40 hover:text-[#1E4E8C]/70"
            }`}
          >
            Contact
          </a>
        </div>
      </nav>

      {children}
    </>
  );
}
