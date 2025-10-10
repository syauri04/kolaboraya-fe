"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Header() {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // handle scroll hide/show
  const handleScroll = () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
      setShow(false); // scroll ke bawah → hide
    } else {
      setShow(true); // scroll ke atas → show
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
    <motion.header initial={{ y: 0 }} animate={{ y: show ? 0 : -100 }} transition={{ duration: 0.3, ease: "easeInOut" }} className="fixed top-0 left-0 w-full z-50 bg-[#386366] text-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/assets/logo.png" alt="Kolaboraya" width={181} height={72} priority />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 font-bold text-lg">
          {menus.map((menu) => (
            <Link key={menu.href} href={menu.href} className={`hover:text-gray-200 transition ${pathname === menu.href ? "text-[#EDB133]" : ""}`}>
              {menu.name}
            </Link>
          ))}
        </nav>

        {/* Button */}
        <Link href="/pasar-kolaboraya" className="ml-6 bg-[#6E87A8] text-white font-bold text-lg px-5 py-2 rounded-[10px] hover:bg-[#7b91c8] transition">
          Pasar Kolaboraya
        </Link>
      </div>
    </motion.header>
  );
}
