"use client";

import Image from "next/image";
import { FaInstagram, FaFacebookF } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="w-full relative z-20">
      {/* Main footer */}
      <div className="bg-[#386366] text-white py-14 ">
        <div className="container mx-auto flex flex-col md:flex-row justify-between px-3 sm:px-6 ">
          {/* Logo */}
          <div className="mb-6 md:mb-0">
            <Image
              src="/assets/logo-footer.png"
              alt="Pasar Kolaboraya"
              width={304}
              height={302}
              className="object-contain "
            />
          </div>

          {/* Kontak & Sosial Media */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 text-left md:justify-items-end">
            {/* Kontak */}
            <div>
              <h3 className="font-semibold mb-3">Kontak</h3>
              <div className="flex items-center gap-2">
                <MdEmail size={20} />
                <a
                  href="mailto:kolaboraya@roemahinspirit.id"
                  className="hover:underline"
                >
                  kolaboraya@roemahinspirit.id
                </a>
              </div>
            </div>

            {/* Sosial Media */}
            <div>
              <h3 className="font-semibold mb-3">Sosial Media</h3>
              <div className="flex flex-col gap-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaInstagram size={20} /> Instagram
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  className="flex items-center gap-2 hover:underline"
                >
                  <FaFacebookF size={20} /> Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-[#F77A3EEE] text-white py-3 text-base">
        <div className="container mx-auto px-3 sm:px-6">
          © 2024 Kolaboraya All rights reserved.
        </div>
      </div>
    </footer>
  );
}
