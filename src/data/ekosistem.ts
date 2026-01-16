export type EkosistemData = {
  slug: string;
  head: {
    title: string;
    description: string;
    backgroundImage: string;
  };
  builder: {
    items: {
      label: string;
      link: string;
    }[];
  };
  content: {
    title: string;
    summary: string;
    dukungan: string;
  };
  gallery: {
    images: string[];
  };
};

export const ekosistemDummy: EkosistemData[] = [
  {
    slug: "ekonomi",
    head: {
      title: "Ekonomi",
      description:
        "Ekosistem Ekonomi fokus pada cara Indonesia menciptakan kemakmuran, mendistribusikannya, dan memastikan keberlanjutan mata pencaharian warganya.",
      backgroundImage: "/assets/bg-ekos-ekonomi.png",
    },
    builder: {
      items: [
        { label: "Nusi Ari Kapuas", link: "#" },
        { label: "Ruang Warga", link: "#" },
        { label: "Gumi Kita", link: "#" },
        { label: "Social Enterprise", link: "#" },
      ],
    },
    content: {
      title: "CV Aneka Cipta",
      summary:
        "Aksi kolektif ini ingin menghubungkan komunitas ke pasar yang lebih luas dan adil melalui produk inovatif yang sesuai dengan konteks lokal, untuk menciptakan ekonomi berkelanjutan. Tujuannya adalah meningkatkan pendapatan komunitas, akses permodalan, dan pasar melalui diversifikasi produk yang kreatif.",
      dukungan:
        "Melalui aplikasi Pasar Kolaboraya 2025, tercatat sebanyak 80 dukungan diberikan kepada aksi kolektif CV Aneka Cipta. 80 pendukung ini berasal dari latar belakang dan fokus isu yang beragam dengan beberapa di antaranya adalah Keadilan Agraria dan Tata Kelola Sumber Daya Alam, inklusi Sosial, serta Pengembangan Komunitas.",
    },
    gallery: {
      images: [
        "/assets/g-ekonomi-1.jpg",
        "/assets/g-ekonomi-2.jpg",
        "/assets/g-ekonomi-3.jpg",
      ],
    },
  },

  {
    slug: "teknologi",
    head: {
      title: "Teknologi",
      description:
        "Ekosistem Teknologi berfokus pada penciptaan, adopsi, dan dampak teknologi digital terhadap tatanan masyarakat, ekonomi, dan politik.",
      backgroundImage: "/assets/bg-ekos-teknologi.png",
    },
    builder: {
      items: [
        { label: "Rembuk Nusa", link: "#" },
        {
          label: "Inovasi Kontekstual Kolaboratif",

          link: "#",
        },
        { label: "1000 Cahaya", link: "#" },
        { label: "GAMPANG", link: "#" },
      ],
    },
    content: {
      title: "Jelajah Daya Nusantara",
      summary:
        "Upaya ini bertujuan menciptakan masyarakat inklusif yang berdaya melalui demokrasi pengetahuan dan teknologi, dengan membangun platform jaringan komunikasi di level akar rumput. Inisiatif ini akan diwujudkan melalui identifikasi dan diseminasi informasi pemanfaatan ilmu pengetahuan dan teknologi di berbagai daerah.",
      dukungan:
        "Melalui aplikasi Pasar Kolaboraya 2025, tercatat 74 dukungan diberikan kepada aksi kolektif ‘Jelajah Daya Nusantara’. 74 pendukung ini berasal dari latar belakang dan fokus isu yang beragam di antaranya Lingkungan Hidup, Hak Asasi Manusia dan Inklusi terhadap Kelompok Rentan, Data Kelola Informasi dan Media Digital, serta Penciptaan dan Pengembangan Ruang Komunitas.",
    },
    gallery: {
      images: [
        "/assets/g-teknologi-1.jpg",
        "/assets/g-teknologi-2.jpg",
        "/assets/g-teknologi-3.jpg",
      ],
    },
  },

  {
    slug: "budaya",
    head: {
      title: "Budaya",
      description:
        "Enam ekosistem raya yang lahir dari perhelatan Pasar Kolaboraya  2025. Ketuk untuk melihat deskripsi ekosistem, Ecosystem Builder yang membangun dan merawat ekosistem, serta aksi kolektif yang digagas bersama pada Pasar Kolaboraya 2025.",
      backgroundImage: "/assets/bg-ekos-budaya.png",
    },
    builder: {
      items: [
        { label: "Studi Kolektif", link: "#" },
        {
          label: "SMILE",

          link: "#",
        },
        { label: "Kawasan Gaharu Pontianak", link: "#" },
        { label: "Inklusivitas", link: "#" },
      ],
    },
    content: {
      title: "Festival Nongkrong Budaya 2026",
      summary:
        "Aksi ini digagas untuk menggugah kesadaran kolektif warga dalam menjaga nilai-nilai kebudayaan yang selaras dengan kelestarian alam, kemanusiaan, dan kesejahteraan. Tujuannya adalah agar warga sadar dan aktif terlibat menjaga nilai kebudayaan bersama penggerak lintas isu dan sektor.",
      dukungan:
        "Melalui aplikasi Pasar Kolaboraya 2025, tercatat 56 dukungan diberikan kepada aksi kolektif Festival Nongkrong Budaya 2026. 56 pendukung ini berasal dari latar belakang dan fokus isu yang beragam di antaranya Pendidikan, Budaya, Pengembangan Ruang Komunal, Gender dan Perdamaian, serta Keadilan Iklim.",
    },
    gallery: {
      images: [
        "/assets/g-budaya-1.jpg",
        "/assets/g-budaya-2.jpg",
        "/assets/g-budaya-3.jpg",
      ],
    },
  },

  {
    slug: "ekologi",
    head: {
      title: "Ekologi",
      description:
        "Ekosistem Ekologi mencakup hubungan antara aktivitas manusia dengan lingkungan alam, keberlanjutan sumber daya, dan ketahanan terhadap krisis iklim.",
      backgroundImage: "/assets/bg-ekos-ekologi.png",
    },
    builder: {
      items: [
        { label: "Ekologi KIIvaS", link: "#" },
        { label: "Kolektifa Ruang", link: "#" },
        { label: "Sigi Hijau", link: "#" },
        { label: "KOMPAK", link: "#" },
      ],
    },
    content: {
      title: "Festival Pangan Nusantara",
      summary:
        "Festival ini merupakan perayaan untuk mengembalikan pola konsumsi dan mendokumentasikan pangan lokal melalui lensa perubahan iklim. Tujuan utamanya adalah meningkatkan penggunaan pangan lokal guna memperkuat kedaulatan pangan masyarakat.",
      dukungan:
        "Melalui aplikasi Pasar Kolaboraya 2025, tercatat 103 dukungan diberikan kepada aksi kolektif Festival Pangan Nusantara. 103 pendukung ini berasal dari latar belakang dan fokus isu yang beragam di antaranya Keadilan Agraria dan Keadilan Iklim, Inklusi Sosial, Pemberdayaan Ekonomi Rakyat dan Kewirausahaan Sosial, serta Pendidikan Alternatif.",
    },
    gallery: {
      images: [
        "/assets/g-ekologi-1.jpg",
        "/assets/g-ekologi-2.jpg",
        "/assets/g-ekologi-3.jpg",
      ],
    },
  },

  {
    slug: "politik",
    head: {
      title: "Politik",
      description:
        "Ekosistem Politik berfokus pada struktur kekuasaan, pengambilan keputusan, partisipasi publik, dan penegakan hukum yang menjadi fondasi negara.",
      backgroundImage: "/assets/bg-ekos-politik.png",
    },
    builder: {
      items: [
        { label: "Youth Rising Generation", link: "#" },
        { label: "Au Ume", link: "#" },
        { label: "Kota untuk Semua", link: "#" },
        { label: "YAPPIKA", link: "#" },
        { label: "AKARNUSA", link: "#" },
      ],
    },
    content: {
      title: "Suar Daya Fest",
      summary:
        "Rangkaian gerakan kolektif untuk membangun 50.000 penggerak perubahan melalui pendidikan demokrasi, festival warga, dan kampanye publik. Aksi ini bertujuan agar warga berdaya menuntut keadilan sosial dan ekologis dengan bekal pengetahuan praktis dari Simpel Demokrasi.",
      dukungan:
        "Melalui aplikasi Pasar Kolaboraya 2025, tercatat 41 dukungan diberikan kepada aksi kolektif Suar Daya Fest. 41 pendukung ini berasal dari latar belakang dan fokus isu yang beragam di antaranya Tata Kelola Demokrasi, Anti-Korupsi, dan Hukum, HAM, Ekonomi Inklusif, dan Inklusi Sosial.",
    },
    gallery: {
      images: [
        "/assets/g-politik-1.jpg",
        "/assets/g-politik-2.jpg",
        "/assets/g-politik-3.jpg",
      ],
    },
  },

  {
    slug: "sosial",
    head: {
      title: "Sosial",
      description:
        "Ekosistem Sosial mencakup kualitas hidup manusia, hubungan antar komunitas, serta akses terhadap layanan dasar seperti pendidikan dan kesehatan.",
      backgroundImage: "/assets/bg-ekos-sosial.png",
    },
    builder: {
      items: [
        { label: "GARDA LIMA", link: "#" },
        { label: "Kota untuk Semua", link: "#" },
        { label: "KolaborAksi Suroboyo", link: "#" },
        { label: "GEMBIRA", link: "#" },
      ],
    },
    content: {
      title: "KOLASE Festival Film Inklusi",
      summary:
        "Inisiatif beragam stakeholder ini bertujuan mengubah paradigma diskriminatif terhadap kelompok rentan dan marginal melalui festival film inklusif. Dukungan terhadap festival ini diharapkan dapat membuka akses, memperluas ruang, dan memperkuat keberagaman.",
      dukungan:
        "Melalui aplikasi Pasar Kolaboraya 2025, tercatat 43 dukungan diberikan kepada aksi kolektif KOLASE Festival Film Inklusi'. 43 pendukung ini berasal dari latar belakang dan fokus isu yang beragam di antara lain Inklusi Sosial, Lingkungan Hidup dan Tata Kelola SDA, Tata Ruang dan Permukiman, serta Edukasi dan Pengembangan Kapasitas Warga.",
    },
    gallery: {
      images: [
        "/assets/g-social-1.jpg",
        "/assets/g-social-2.jpg",
        "/assets/g-social-3.jpg",
      ],
    },
  },
];
