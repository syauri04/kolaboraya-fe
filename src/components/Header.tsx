"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react"; // ikon modern dan ringan

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // handle scroll hide/show
  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setShow(false);
    } else {
      setShow(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // daftar menu
  const menus = [
    { name: "Tentang", href: "/tentang" },
    { name: "Agenda", href: "/agenda" },
    { name: "Produk Kolaborasi", href: "/produk-kolaborasi" },
    { name: "Senarai Cerita", href: "/senarai-cerita" },
    // { name: "Ekosistem", href: "/ekosistem" },
  ];

  return (
    <>
      {/* HEADER BAR */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: show ? 0 : -100 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 w-full z-50 bg-[#386366] text-white shadow-md"
      >
        <div className="container mx-auto flex items-center justify-between px-3 sm:px-6 py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/assets/logo.png"
              alt="Kolaboraya"
              width={181}
              height={72}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 font-bold text-lg">
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className={`hover:text-gray-200 transition ${
                  pathname === menu.href ? "text-[#EDB133]" : ""
                }`}
              >
                {menu.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Button */}
          <a
            href="https://pk2025.kolaboraya.id/"
            className="hidden lg:block ml-6 bg-[#6E87A8] text-white font-bold text-lg px-5 py-2 rounded-[10px] hover:bg-[#7b91c8] transition"
          >
            Pasar Kolaboraya
          </a>

          {/* Mobile Hamburger Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </motion.header>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-full h-screen bg-white text-[#386366] z-40 flex flex-col items-center justify-center gap-6 font-semibold text-2xl"
          >
            {menus.map((menu) => (
              <Link
                key={menu.href}
                href={menu.href}
                className={`transition hover:text-[#EDB133] ${
                  pathname === menu.href ? "text-[#EDB133]" : ""
                }`}
                onClick={() => setIsOpen(false)} // tutup menu setelah klik
              >
                {menu.name}
              </Link>
            ))}

            <Link
              href="/pasar-kolaboraya"
              className="bg-[#6E87A8] text-white font-bold text-lg px-6 py-3 rounded-[10px] hover:bg-[#7b91c8] transition"
              onClick={() => setIsOpen(false)}
            >
              Pasar Kolaboraya
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
