/**
 * ============================================================
 *  PORTFOLIO DATA — Satu-satunya file yang perlu Anda edit
 *  untuk mengganti seluruh isi portfolio.
 * ============================================================
 */

const PORTFOLIO_DATA = {

  // ---------------------------------------------------------
  // IDENTITAS
  // ---------------------------------------------------------
  profile: {
    name: "Sifa Mutiasya Hendayana Puteri",
    roles: ["Data Analyst", "Data Scientist", "Full Stack Developer"],
    tagline: "Fresh Graduate Teknik Informatika dengan spesialisasi Data Analytics dan Data Science. Bersertifikat BNSP dan berpengalaman dalam preprocessing, EDA, dan machine learning.",
    tagline_en: "Fresh Graduate in Informatics Engineering specializing in Data Analytics and Data Science. BNSP certified with experience in preprocessing, EDA, and machine learning.",
    summary: "Fresh Graduate Informatics Engineering from UIN Sunan Gunung Djati Bandung with a specialization in Data Analytics and Data Science. Certified by BNSP in the data field, with hands-on experience in data preprocessing, exploratory data analysis, statistical modeling, and machine learning using Python.",
    summary_id: "Fresh Graduate Teknik Informatika dari UIN Sunan Gunung Djati Bandung dengan spesialisasi Data Analytics dan Data Science. Bersertifikat BNSP di bidang data, dengan pengalaman dalam preprocessing data, exploratory data analysis, pemodelan statistik, dan machine learning menggunakan Python.",
    interests: ["Data Analytics", "Data Science", "Machine Learning", "Full Stack Development", "Data Visualization"],
    location: "Bandung, Indonesia 40165",
    email: "sifamutiasya14@gmail.com",
    whatsapp: "https://wa.me/6289657767722",
    cvFile: "assets/documents/CV-Sifa-Mutiasya-Hendayana-Puteri.pdf",
    social: {
      github: "https://github.com/sifamutiasyaa",
      linkedin: "https://www.linkedin.com/in/sifa-mutiasya-hendayana-puteri-130128247",
      instagram: "https://instagram.com/siff_mutiasya"
    },
    stats: [
      { label: "Proyek Selesai", value: 100, suffix: "+" },
      { label: "Sertifikat", value: 21, suffix: "+" },
      { label: "Teknologi Dikuasai", value: 20, suffix: "+" },
      { label: "Pengalaman", value: 3, suffix: "+ Tahun" }
    ]
  },

  // ---------------------------------------------------------
  // ACHIEVEMENTS - Prestasi & Publikasi
  // ---------------------------------------------------------
  achievements: [
    {
      title: "Silver Medal",
      title_en: "Silver Medal",
      event: "International Invention Competition for Young Moslem Scientists (IICYMS)",
      event_en: "International Invention Competition for Young Moslem Scientists (IICYMS)",
      description: "for the project 'Sentiment Analysis Approach for Identifying Emotional Imbalance in Daily Reflections'",
      description_en: "for the project 'Sentiment Analysis Approach for Identifying Emotional Imbalance in Daily Reflections'",
      year: "2024",
      icon: "fa-solid fa-medal",
      type: "competition"
    },
    {
      title: "Publikasi Ilmiah",
      title_en: "Scientific Publication",
      event: "XGBoost and Mixed Effect Model: Can Zakat (Alms) Improve the Human Development Index in Indonesia?",
      event_en: "XGBoost and Mixed Effect Model: Can Zakat (Alms) Improve the Human Development Index in Indonesia?",
      description: "Publikasi pada platform ResearchGate - Penelitian tentang pengaruh zakat terhadap Indeks Pembangunan Manusia (IPM) di Indonesia menggunakan model XGBoost dan Mixed Effect Model.",
      description_en: "Publication on ResearchGate - Research on the effect of zakat on the Human Development Index (HDI) in Indonesia using XGBoost and Mixed Effect Model.",
      year: "2025",
      icon: "fa-solid fa-file-lines",
      type: "publication",
      link: "https://www.researchgate.net/publication/409531801_XGBoost_and_Mixed_Effect_Model_Can_Zakat_Alms_Improve_the_Human_Development_Index_in_Indonesia"
    },
    {
      title: "Karya Tulis Ilmiah",
      title_en: "Scientific Paper",
      event: "Implementasi Hybrid Retrieval menggunakan model Indolegalbert untuk text Classification",
      event_en: "Implementation of Hybrid Retrieval using the Indolegalbert model for Text Classification",
      description: "UIN Sunan Gunung Djati Bandung - Sistem rekomendasi pasal KUHP berbasis narasi fakta kasus menggunakan Hybrid Retrieval (BM25 + IndoLegalBERT). Top-1 Accuracy 72%, Top-3 Accuracy 95%, MAP@3 dan MRR 82%.",
      description_en: "UIN Sunan Gunung Djati Bandung - Criminal Code article recommendation system based on case fact narratives using Hybrid Retrieval (BM25 + IndoLegalBERT). Top-1 Accuracy 72%, Top-3 Accuracy 95%, MAP@3 and MRR 82%.",
      year: "2026",
      icon: "fa-solid fa-graduation-cap",
      type: "thesis",
      link: "https://digilib.uinsgd.ac.id/133172/"
    }
  ],

  // ---------------------------------------------------------
  // KEAHLIAN
  // ---------------------------------------------------------
  skills: [
    { name: "Data Visualization (Tableau, Looker)", level: 90 },
    { name: "Python (Pandas, NumPy, Scikit-learn)", level: 88 },
    { name: "SQL (MySQL, MongoDB, Oracle)", level: 80 },
    { name: "Frontend (HTML, CSS, JS, TypeScript)", level: 80 },
    { name: "Backend (Laravel, Spring, Node.js)", level: 87 },
    { name: "Git & GitHub", level: 85 },
    { name: "Machine Learning (EDA, modeling)", level: 86 },
    { name: "Exploratory Data Analysis", level: 88 },
    { name: "Data Cleaning & Preprocessing", level: 85 },
    { name: "PHP", level: 80 },
    { name: "Java (Spring)", level: 68 }
  ],

  // ---------------------------------------------------------
  // PENDIDIKAN
  // ---------------------------------------------------------
  education: [
    {
      institution: "UIN Sunan Gunung Djati Bandung",
      major: "Teknik Informatika",
      major_en: "Informatics Engineering",
      period: "September 2022 — June 2026",
      gpa: "3.90 / 4.00",
      achievements: [
        "Fresh Graduate dengan predikat cum laude",
        "Fresh Graduate with cum laude predicate"
      ],
      organizations: ["Himpunan Mahasiswa Teknik Informatika (HIMATIF)"]
    }
  ],

  // ---------------------------------------------------------
  // PENGALAMAN KERJA
  // ---------------------------------------------------------
  experience: [
    {
      company: "PT Alita Praya Mitra",
      position: "Data Analyst",
      period: "June 2026 — Now",
      logo: "APM",
      description: "Memantau fasilitas site jaringan fiber optik melalui dashboard interaktif untuk mendukung visibilitas operasional dan pemeliharaan preventif.",
      description_en: "Monitoring fiber optic network site facilities through interactive dashboards to support operational visibility and preventive maintenance.",
      achievements: [
        "Mengembangkan dan memelihara dashboard untuk monitoring infrastruktur jaringan",
        "Mengintegrasikan dan memvisualisasikan data operasional"
      ],
      achievements_en: [
        "Developed and maintained dashboards for network infrastructure monitoring",
        "Integrated and visualized operational data"
      ],
      technologies: ["Python", "Looker Studio", "SQL", "Laravel"]
    },
    {
      company: "NoLimit Indonesia",
      position: "Data Annotator - Data Validation",
      period: "Feb 2026 — May 2026",
      logo: "NLI",
      description: "Memvalidasi dan mereview hasil analisis sentimen untuk berbagai proyek monitoring brand.",
      description_en: "Validating and reviewing sentiment analysis results for various brand monitoring projects.",
      achievements: [
        "Memastikan akurasi anotasi dan konsistensi data",
        "Menjaga kualitas dataset untuk pengembangan model analitik dan AI"
      ],
      achievements_en: [
        "Ensured annotation accuracy and data consistency",
        "Maintained dataset quality for analytical and AI model development"
      ],
      technologies: ["Python", "Data Labeling", "Quality Assurance"]
    },
    {
      company: "Coding Camp DBS Foundation",
      position: "Data Scientist Cohort",
      period: "Jan 2026 — June 2026",
      logo: "DBS",
      description: "Pelatihan intensif fokus pada data analytics, preprocessing, EDA, dan machine learning.",
      description_en: "Intensive training focused on data analytics, preprocessing, EDA, and machine learning.",
      achievements: [
        "Membangun proyek data end-to-end: cleaning, modeling, evaluasi, dan visualisasi"
      ],
      achievements_en: [
        "Built end-to-end data projects: cleaning, modeling, evaluation, and visualization"
      ],
      technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "Matplotlib"]
    },
    {
      company: "Coding Camp DBS Foundation",
      position: "Fullstack Developer Cohort",
      period: "Jan 2025 — July 2025",
      logo: "DBS",
      description: "Pelatihan intensif dalam frontend dan backend development.",
      description_en: "Intensive training in frontend and backend development.",
      achievements: [
        "Membangun aplikasi web skalabel dalam proyek tim"
      ],
      achievements_en: [
        "Built scalable web applications in team projects"
      ],
      technologies: ["JavaScript", "TypeScript", "PHP", "Laravel", "Node.js"]
    },
    {
      company: "Informatics Digital Service",
      position: "Frontend Coordinator",
      period: "Dec 2024 — Jan 2025",
      logo: "IDS",
      description: "Memimpin tim frontend, menstandarkan praktik kode, dan mengoptimalkan alur kerja.",
      description_en: "Leading frontend team, standardizing code practices, and optimizing workflow.",
      achievements: [
        "Memimpin sprint meeting mingguan, code review, dan mentoring sesi",
        "Meningkatkan kolaborasi dan pengembangan skill dalam tim"
      ],
      achievements_en: [
        "Led weekly sprint meetings, code reviews, and mentoring sessions",
        "Improved collaboration and skill development within the team"
      ],
      technologies: ["TypeScript", "React", "CSS", "Git"]
    },
    {
      company: "Village Government Program",
      position: "Project Manager",
      period: "Dec 2024 — Feb 2025",
      logo: "VGP",
      description: "Mengelola komunikasi dengan aparatur desa dan mengawasi eksekusi teknis proyek pembangunan.",
      description_en: "Managing communication with village officials and overseeing technical execution of development projects.",
      achievements: [
        "Koordinasi lintas tim dan manajemen tenggat waktu proyek"
      ],
      achievements_en: [
        "Cross-team coordination and project deadline management"
      ],
      technologies: ["Project Management", "Agile"]
    },
    {
      company: "Himpunan Mahasiswa Teknik Informatika (HIMATIF)",
      position: "Treasurer of the Division",
      period: "Aug 2023 — Mar 2024",
      logo: "HMT",
      description: "Manajemen anggaran untuk berbagai event dan memimpin kegiatan organisasi.",
      description_en: "Budget management for various events and leading organizational activities.",
      achievements: [
        "Mengelola keuangan untuk 10+ event"
      ],
      achievements_en: [
        "Managed finances for 10+ events"
      ],
      technologies: ["Financial Management", "Leadership"]
    }
  ],

  // ---------------------------------------------------------
  // PROJECT
  // ---------------------------------------------------------
  projects: [
    // ---------------------------------------------------------
// PROJECT (Tambahan 4 Proyek Baru)
// ---------------------------------------------------------
{
  id: "monitoring-humidity-temperature",
  name: "Monitoring Site Dashboard - Humidity & Temperature",
  name_id: "Dashboard Monitoring Site - Kelembaban & Suhu",
  category: "Data Analyst",
  date: "2026",
  status: "Selesai",
  status_en: "Completed",
  technologies: ["Python", "Streamlit", "Pandas", "Matplotlib"],
  shortDescription: "Dashboard monitoring kelembaban dan suhu untuk fasilitas site jaringan fiber optik.",
  shortDescription_en: "Humidity and temperature monitoring dashboard for fiber optic network site facilities.",
  thumbnail: "assets/images/projects/monitoring.png",
  links: { 
    demo: "https://dashboard-monitoring-site.streamlit.app/",
    github: "https://github.com/SifaMutiasyaa/Dahboard_Monitoring.git"
  },
  detail: {
    summary: "Mengembangkan dashboard monitoring real-time untuk memantau kelembaban dan suhu di fasilitas site jaringan fiber optik PT Alita Praya Mitra.",
    summary_en: "Developed a real-time monitoring dashboard to monitor humidity and temperature at PT Alita Praya Mitra's fiber optic network site facilities.",
    background: "Sebagai Data Analyst di PT Alita Praya Mitra, saya bertanggung jawab memantau kondisi lingkungan site jaringan fiber optik untuk mencegah kerusakan perangkat akibat suhu atau kelembaban ekstrem.",
    background_en: "As a Data Analyst at PT Alita Praya Mitra, I was responsible for monitoring environmental conditions at fiber optic network sites to prevent device damage from extreme temperature or humidity.",
    problem: "Data suhu dan kelembaban dari berbagai site tersebar dan sulit dimonitor secara terpusat, sehingga potensi kerusakan perangkat tidak terdeteksi dini.",
    problem_en: "Temperature and humidity data from various sites were scattered and difficult to monitor centrally, so potential device damage went undetected.",
    goal: "Membangun dashboard terpusat yang menampilkan kondisi suhu dan kelembaban secara real-time untuk mendukung pemeliharaan preventif.",
    goal_en: "Build a centralized dashboard that displays temperature and humidity conditions in real-time to support preventive maintenance.",
    workflow: [
      "Pengumpulan data sensor dari multiple site",
      "Data cleaning & preprocessing",
      "Exploratory Data Analysis",
      "Pembuatan dashboard interaktif dengan Streamlit"
    ],
    workflow_en: [
      "Sensor data collection from multiple sites",
      "Data cleaning & preprocessing",
      "Exploratory Data Analysis",
      "Interactive dashboard creation with Streamlit"
    ],
    features: [
      "Monitoring real-time suhu & kelembaban",
      "Alert notifikasi jika melewati threshold",
      "Visualisasi tren per site",
      "Export data untuk analisis lanjutan"
    ],
    features_en: [
      "Real-time temperature & humidity monitoring",
      "Alert notifications when exceeding thresholds",
      "Trend visualization per site",
      "Data export for further analysis"
    ],
    challenges: "Data dari berbagai sensor memiliki format dan interval pengiriman yang berbeda-beda.",
    challenges_en: "Data from various sensors had different formats and sending intervals.",
    solution: "Membangun pipeline ETL untuk menstandarkan format data dan menyamakan interval waktu.",
    solution_en: "Built an ETL pipeline to standardize data formats and align time intervals.",
    role: "Data Analyst — dari pengumpulan data hingga pembuatan dashboard.",
    role_en: "Data Analyst — from data collection to dashboard creation.",
    results: "Dashboard digunakan tim operasional untuk monitoring harian dan berhasil mencegah 3 potensi kerusakan perangkat.",
    results_en: "Dashboard used by operational team for daily monitoring and successfully prevented 3 potential device damages.",
    insight: "Monitoring real-time sangat penting untuk pemeliharaan preventif infrastruktur kritis.",
    insight_en: "Real-time monitoring is crucial for preventive maintenance of critical infrastructure.",
    gallery: [
      "assets/images/projects/monitoring-1.png",
      "assets/images/projects/monitoring-2.png"
    ]
  }
},
{
  id: "vms-dashboard-improvement",
  name: "VMS Dashboard Improvement - Visitor Management System",
  name_id: "Improvement Dashboard VMS - Visitor Management System",
  category: "Data Analyst",
  date: "2026",
  status: "Selesai",
  status_en: "Completed",
  technologies: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "Automation"],
  shortDescription: "Improvement dashboard Visitor Management System berbasis Laravel untuk memantau, menganalisis, dan mengotomatisasi data pengunjung.",
  shortDescription_en: "Laravel-based Visitor Management System dashboard improvement for monitoring, analyzing, and automating visitor data.",
  thumbnail: "assets/images/projects/vms-0.png",
  links: { 
  },
  detail: {
    summary: "Mengembangkan improvement dashboard VMS (Visitor Management System) berbasis Laravel untuk memantau, menganalisis, dan mengotomatisasi data pengunjung di PT Alita Praya Mitra.",
    summary_en: "Developed a Laravel-based VMS (Visitor Management System) dashboard improvement to monitor, analyze, and automate visitor data at PT Alita Praya Mitra.",
    background: "PT Alita Praya Mitra membutuhkan sistem manajemen pengunjung yang lebih baik untuk keamanan dan pelacakan aktivitas di area site jaringan fiber optik. Sistem sebelumnya masih manual dan tidak terintegrasi.",
    background_en: "PT Alita Praya Mitra needed a better visitor management system for security and activity tracking at fiber optic network site areas. The previous system was still manual and not integrated.",
    problem: "Data pengunjung masih tercatat manual di buku tamu, sulit dianalisis untuk keperluan audit dan keamanan, serta tidak ada notifikasi otomatis untuk kejadian penting.",
    problem_en: "Visitor data was still recorded manually in guest books, difficult to analyze for audit and security purposes, and there were no automatic notifications for important events.",
    goal: "Membangun dashboard VMS berbasis web yang terintegrasi untuk mencatat, memonitor, menganalisis, dan mengotomatisasi data pengunjung secara real-time.",
    goal_en: "Build an integrated web-based VMS dashboard to record, monitor, analyze, and automate visitor data in real-time.",
    workflow: [
      "Analisis kebutuhan sistem VMS dan business process",
      "Perancangan database (MySQL) dan arsitektur sistem",
      "Pengembangan backend dengan Laravel (API, controllers, models)",
      "Pengembangan frontend dengan Blade + Bootstrap",
      "Implementasi fitur otomatisasi (notifikasi, report auto-generate)",
      "Testing, debugging, dan deployment"
    ],
    workflow_en: [
      "VMS system requirements and business process analysis",
      "Database design (MySQL) and system architecture",
      "Backend development with Laravel (API, controllers, models)",
      "Frontend development with Blade + Bootstrap",
      "Automation features implementation (notifications, auto-generate reports)",
      "Testing, debugging, and deployment"
    ],
    features: [
      "Pencatatan data pengunjung digital terintegrasi",
      "Monitoring real-time jumlah pengunjung per site",
      "Analisis pola kunjungan dan dashboard interaktif",
      "Export data otomatis untuk audit (PDF, Excel)",
      "Sistem otentikasi multi-user (Admin, Security, Manager)",
      "Notifikasi otomatis via email/WA untuk visitasi penting",
      "Generate report otomatis periodik (harian/mingguan/bulanan)"
    ],
    features_en: [
      "Integrated digital visitor data recording",
      "Real-time visitor count monitoring per site",
      "Visit pattern analysis and interactive dashboard",
      "Automated data export for audits (PDF, Excel)",
      "Multi-user authentication system (Admin, Security, Manager)",
      "Automatic email/WA notifications for important visits",
      "Periodic auto-generate reports (daily/weekly/monthly)"
    ],
    challenges: "Mengintegrasikan data pengunjung dari beberapa site yang berbeda dan mengotomatisasi proses pelaporan yang sebelumnya manual.",
    challenges_en: "Integrating visitor data from several different sites and automating previously manual reporting processes.",
    solution: "Menggunakan Laravel dengan database terpusat MySQL, serta mengimplementasikan scheduler untuk auto-generate report dan notifikasi.",
    solution_en: "Using Laravel with centralized MySQL database, and implementing scheduler for auto-generate reports and notifications.",
    role: "Fullstack Developer & Data Analyst — analisis kebutuhan, pengembangan backend Laravel, frontend dashboard, dan implementasi fitur otomatisasi.",
    role_en: "Fullstack Developer & Data Analyst — requirements analysis, Laravel backend development, dashboard frontend, and automation features implementation.",
    results: "Dashboard VMS berbasis Laravel digunakan untuk monitoring keamanan di 5 site, memudahkan proses audit, dan menghemat waktu pelaporan hingga 70%.",
    results_en: "Laravel-based VMS dashboard used for security monitoring at 5 sites, simplified the audit process, and saved up to 70% of reporting time.",
    insight: "Otomatisasi proses bisnis dengan Laravel dan MySQL meningkatkan efisiensi operasional dan akurasi data secara signifikan.",
    insight_en: "Business process automation with Laravel and MySQL significantly improves operational efficiency and data accuracy.",
    gallery: [
      "assets/images/projects/vms.png",
      "assets/images/projects/vms-1.png",
      "assets/images/projects/vms-2.png"
    ]
  }
} ,
{
  id: "gold-prices-analysis",
  name: "Gold Prices Analysis Dashboard",
  name_id: "Dashboard Analisis Harga Emas",
  category: "Data Scientist",
  date: "2026",
  status: "Selesai",
  status_en: "Completed",
  technologies: ["Python", "Streamlit", "Pandas", "Plotly", "Scikit-learn"],
  shortDescription: "Dashboard analisis dan prediksi harga emas menggunakan model machine learning.",
  shortDescription_en: "Gold price analysis and prediction dashboard using machine learning models.",
  thumbnail: "assets/images/projects/gold.png",
  links: { 
    demo: "https://goldenticsds.streamlit.app/",
    github: "https://github.com/SifaMutiasyaa/Goldentics_DS"
  },
  detail: {
    summary: "Mengembangkan dashboard analisis dan prediksi harga emas menggunakan model machine learning untuk membantu pengambilan keputusan investasi.",
    summary_en: "Developed a gold price analysis and prediction dashboard using machine learning models to support investment decision-making.",
    background: "Proyek ini dikembangkan selama program Coding Camp DBS Foundation sebagai bagian dari Data Scientist Cohort. Fokus pada analisis time series dan prediksi harga emas.",
    background_en: "This project was developed during the Coding Camp DBS Foundation program as part of the Data Scientist Cohort. Focused on time series analysis and gold price prediction.",
    problem: "Investor kesulitan memprediksi pergerakan harga emas karena volatilitas pasar yang tinggi.",
    problem_en: "Investors struggled to predict gold price movements due to high market volatility.",
    goal: "Membangun model prediksi harga emas yang akurat dan dashboard interaktif untuk visualisasi tren.",
    goal_en: "Build an accurate gold price prediction model and interactive dashboard for trend visualization.",
    workflow: [
      "Pengumpulan data harga emas historis",
      "Data preprocessing & feature engineering",
      "Exploratory Data Analysis",
      "Pembangunan model machine learning (XGBoost, LSTM)",
      "Evaluasi model",
      "Pembuatan dashboard dengan Streamlit"
    ],
    workflow_en: [
      "Historical gold price data collection",
      "Data preprocessing & feature engineering",
      "Exploratory Data Analysis",
      "Machine learning model building (XGBoost, LSTM)",
      "Model evaluation",
      "Dashboard creation with Streamlit"
    ],
    features: [
      "Visualisasi tren harga emas historis",
      "Prediksi harga emas dengan ML",
      "Analisis korelasi dengan faktor lain",
      "Interactive charts dengan Plotly"
    ],
    features_en: [
      "Historical gold price trend visualization",
      "Gold price prediction with ML",
      "Correlation analysis with other factors",
      "Interactive charts with Plotly"
    ],
    challenges: "Data time series memiliki pola yang kompleks dan dipengaruhi banyak faktor eksternal.",
    challenges_en: "Time series data has complex patterns and is influenced by many external factors.",
    solution: "Menggunakan ensemble model dan feature engineering untuk meningkatkan akurasi prediksi.",
    solution_en: "Using ensemble models and feature engineering to improve prediction accuracy.",
    role: "Data Scientist — end-to-end dari data hingga deployment dashboard.",
    role_en: "Data Scientist — end-to-end from data to dashboard deployment.",
    results: "Model mencapai akurasi prediksi 85% dan dashboard digunakan untuk analisis investasi.",
    results_en: "Model achieved 85% prediction accuracy and dashboard used for investment analysis.",
    insight: "Kombinasi model machine learning dan visualisasi interaktif sangat powerful untuk analisis investasi.",
    insight_en: "The combination of machine learning models and interactive visualization is very powerful for investment analysis.",
    gallery: [
      "assets/images/projects/gold-1.png",
      "assets/images/projects/gold-2.png",
      "assets/images/projects/gold-3.png"
    ]
  }
},
{
  id: "ecommerce-dashboard-dicoding",
  name: "E-Commerce Dashboard Analysis",
  name_id: "Dashboard Analisis E-Commerce",
  category: "Data Scientist",
  date: "2026",
  status: "Selesai",
  status_en: "Completed",
  technologies: ["Python", "Streamlit", "Pandas", "Matplotlib", "Seaborn"],
  shortDescription: "Dashboard analisis data e-commerce untuk memahami perilaku pelanggan dan performa bisnis.",
  shortDescription_en: "E-commerce data analysis dashboard to understand customer behavior and business performance.",
  thumbnail: "assets/images/projects/ecommerce.png",
  links: { 
    demo: "https://dashboard-e-commerce-dicoding26.streamlit.app/",
    github: "https://github.com/SifaMutiasyaa/Dashboard-E-commerce"
  },
  detail: {
    summary: "Mengembangkan dashboard analisis e-commerce untuk memvisualisasikan data penjualan, perilaku pelanggan, dan performa bisnis secara komprehensif.",
    summary_en: "Developed an e-commerce analysis dashboard to visualize sales data, customer behavior, and business performance comprehensively.",
    background: "Proyek ini dikembangkan selama program Coding Camp DBS Foundation sebagai bagian dari Data Scientist Cohort. Fokus pada analisis data e-commerce untuk business intelligence.",
    background_en: "This project was developed during the Coding Camp DBS Foundation program as part of the Data Scientist Cohort. Focused on e-commerce data analysis for business intelligence.",
    problem: "Data e-commerce sangat besar dan kompleks, sulit untuk mendapatkan insight bisnis yang actionable tanpa visualisasi yang tepat.",
    problem_en: "E-commerce data is very large and complex, making it difficult to get actionable business insights without proper visualization.",
    goal: "Membangun dashboard interaktif yang memudahkan stakeholder dalam memahami performa bisnis dan perilaku pelanggan.",
    goal_en: "Build an interactive dashboard that makes it easy for stakeholders to understand business performance and customer behavior.",
    workflow: [
      "Pengumpulan data e-commerce (orders, customers, products)",
      "Data cleaning & preprocessing",
      "Exploratory Data Analysis",
      "Analisis RFM (Recency, Frequency, Monetary)",
      "Pembuatan dashboard dengan Streamlit"
    ],
    workflow_en: [
      "E-commerce data collection (orders, customers, products)",
      "Data cleaning & preprocessing",
      "Exploratory Data Analysis",
      "RFM (Recency, Frequency, Monetary) analysis",
      "Dashboard creation with Streamlit"
    ],
    features: [
      "Visualisasi tren penjualan",
      "Analisis perilaku pelanggan (RFM)",
      "Top produk & kategori",
      "Segmentasi pelanggan",
      "Filter interaktif berdasarkan periode"
    ],
    features_en: [
      "Sales trend visualization",
      "Customer behavior analysis (RFM)",
      "Top products & categories",
      "Customer segmentation",
      "Interactive filters by period"
    ],
    challenges: "Dataset besar membutuhkan optimasi query dan processing untuk performa dashboard.",
    challenges_en: "Large dataset requires query and processing optimization for dashboard performance.",
    solution: "Menggunakan aggregasi data dan caching untuk meningkatkan performa dashboard.",
    solution_en: "Using data aggregation and caching to improve dashboard performance.",
    role: "Data Scientist — end-to-end dari data hingga deployment dashboard.",
    role_en: "Data Scientist — end-to-end from data to dashboard deployment.",
    results: "Dashboard digunakan oleh tim bisnis untuk monitoring dan pengambilan keputusan strategis.",
    results_en: "Dashboard used by business team for monitoring and strategic decision-making.",
    insight: "Visualisasi data yang tepat dapat mengubah data mentah menjadi keputusan bisnis yang strategis.",
    insight_en: "Proper data visualization can transform raw data into strategic business decisions.",
    gallery: [
      "assets/images/projects/ecommerce-1.png",
      "assets/images/projects/ecommerce-2.png",
    ]
  }
}
,
    {
      id: "sales-dashboard-interactive",
      name: "Interactive Dashboard for Sales Performance Evaluation",
      name_id: "Dashboard Interaktif untuk Evaluasi Kinerja Penjualan",
      category: "Data Analyst",
      date: "Jan 2026",
      status: "Selesai",
      status_en: "Completed",
      technologies: ["Python", "Pandas", "Looker Studio", "SQL"],
      shortDescription: "Dashboard interaktif untuk evaluasi kinerja penjualan dan monitoring indikator bisnis kunci.",
      shortDescription_en: "Interactive dashboard for sales performance evaluation and key business indicator monitoring.",
      thumbnail: "assets/images/projects/sales.jpg",
      links: { demo: "https://datastudio.google.com/reporting/2784cc75-0263-4fba-a059-4721f6d934db", },
      detail: {
        summary: "Mengembangkan dashboard interaktif untuk mengevaluasi kinerja penjualan dan memonitor indikator bisnis kunci.",
        summary_en: "Developed an interactive dashboard to evaluate sales performance and monitor key business indicators.",
        background: "Tim bisnis kesulitan memantau performa penjualan secara real-time karena data tersebar di berbagai sumber.",
        background_en: "The business team struggled to monitor sales performance in real-time because data was scattered across various sources.",
        problem: "Tidak ada visualisasi terpusat yang menampilkan KPI penjualan secara dinamis.",
        problem_en: "There was no centralized visualization displaying sales KPIs dynamically.",
        goal: "Membangun dashboard yang memudahkan tim bisnis dalam memantau dan menganalisis performa penjualan.",
        goal_en: "Build a dashboard that makes it easy for business teams to monitor and analyze sales performance.",
        workflow: ["Pengumpulan data dari multiple source", "Data cleaning & transformation", "Exploratory Data Analysis", "Pembuatan dashboard interaktif"],
        workflow_en: ["Data collection from multiple sources", "Data cleaning & transformation", "Exploratory Data Analysis", "Interactive dashboard creation"],
        features: ["Filter berdasarkan periode dan region", "Visualisasi tren penjualan", "Top performing products"],
        features_en: ["Period and region filters", "Sales trend visualization", "Top performing products"],
        challenges: "Data dari berbagai sumber memiliki format yang berbeda-beda.",
        challenges_en: "Data from various sources had different formats.",
        solution: "Membangun pipeline ETL untuk menstandarkan format data sebelum visualisasi.",
        solution_en: "Built an ETL pipeline to standardize data formats before visualization.",
        role: "Data Analyst — analisis data hingga pembuatan dashboard.",
        role_en: "Data Analyst — from data analysis to dashboard creation.",
        results: "Dashboard digunakan tim manajemen untuk monitoring mingguan.",
        results_en: "Dashboard used by management team for weekly monitoring.",
        insight: "Visualisasi yang interaktif sangat membantu tim non-teknis dalam memahami data.",
        insight_en: "Interactive visualization greatly helps non-technical teams understand data.",
        gallery: [
          "assets/images/projects/sales-1.png",
          "assets/images/projects/sales-2.png"
        ]
      }
    },
   {
  id: "sales-performance-dashboard",
  name: "Sales Performance Analysis Dashboard",
  name_id: "Dashboard Analisis Kinerja Penjualan",
  category: "Data Analyst",
  date: "Dec 2025",
  status: "Selesai",
  status_en: "Completed",
  technologies: ["Looker Studio", "Google Data Studio", "SQL", "Google Sheets"],
  shortDescription: "Dashboard analisis kinerja penjualan menggunakan Looker Studio untuk memonitor metrik bisnis dan tren.",
  shortDescription_en: "Sales performance analysis dashboard using Looker Studio to monitor business metrics and trends.",
  thumbnail: "assets/images/projects/sell.png",
  links: { 
    demo: "https://datastudio.google.com/reporting/64e54656-2141-4a92-92ab-43de5c466269", 
  },
  detail: {
    summary: "Merancang dan mengembangkan dashboard analisis kinerja penjualan interaktif menggunakan Looker Studio (Google Data Studio).",
    summary_en: "Designed and developed an interactive sales performance analysis dashboard using Looker Studio (Google Data Studio).",
    background: "Kebutuhan akan dashboard yang dapat menampilkan metrik bisnis secara real-time dan mudah diakses oleh tim manajemen.",
    background_en: "The need for a dashboard that can display business metrics in real-time and is easily accessible by the management team.",
    problem: "Data penjualan tidak tervisualisasi dengan baik dan laporan masih manual menggunakan Excel yang memakan waktu.",
    problem_en: "Sales data was not well visualized and reports were still manual using Excel which was time-consuming.",
    goal: "Menyediakan dashboard interaktif yang mudah dipahami dan diakses oleh tim manajemen untuk monitoring kinerja penjualan.",
    goal_en: "Provide an interactive dashboard that is easy to understand and accessible by the management team for sales performance monitoring.",
    workflow: [
      "Pengumpulan dan konsolidasi data dari berbagai sumber (SQL, Google Sheets)",
      "Data cleaning & transformation menggunakan SQL",
      "Perancangan visualisasi dan dashboard di Looker Studio",
      "Implementasi filter interaktif dan parameter",
      "Scheduling auto-refresh data",
      "Testing dan deployment ke tim manajemen"
    ],
    workflow_en: [
      "Data collection and consolidation from various sources (SQL, Google Sheets)",
      "Data cleaning & transformation using SQL",
      "Visualization and dashboard design in Looker Studio",
      "Interactive filters and parameters implementation",
      "Data auto-refresh scheduling",
      "Testing and deployment to management team"
    ],
    features: [
      "Monitoring KPI utama (Revenue, Orders, Conversion Rate)",
      "Tren penjualan per periode (harian/mingguan/bulanan)",
      "Segmentasi pelanggan dan analisis RFM",
      "Filter interaktif berdasarkan region, produk, dan waktu",
      "Auto-refresh data real-time dari database",
      "Export report ke PDF untuk presentasi"
    ],
    features_en: [
      "Key KPI monitoring (Revenue, Orders, Conversion Rate)",
      "Sales trends by period (daily/weekly/monthly)",
      "Customer segmentation and RFM analysis",
      "Interactive filters by region, product, and time",
      "Real-time data auto-refresh from database",
      "Export report to PDF for presentations"
    ],
    challenges: "Menggabungkan data dari beberapa sumber yang berbeda (SQL dan Google Sheets) dengan format yang tidak konsisten.",
    challenges_en: "Combining data from several different sources (SQL and Google Sheets) with inconsistent formats.",
    solution: "Menggunakan SQL query untuk mengkonsolidasikan dan menstandarkan data sebelum divisualisasi di Looker Studio.",
    solution_en: "Using SQL queries to consolidate and standardize data before visualization in Looker Studio.",
    role: "Data Analyst — desain dan implementasi dashboard menggunakan Looker Studio.",
    role_en: "Data Analyst — dashboard design and implementation using Looker Studio.",
    results: "Dashboard menjadi alat utama monitoring penjualan tim manajemen dan menghemat waktu pelaporan hingga 60%.",
    results_en: "Dashboard became the main sales monitoring tool for the management team and saved up to 60% of reporting time.",
    insight: "Looker Studio sangat powerful untuk membuat dashboard yang mudah diakses dan dipahami oleh tim non-teknis.",
    insight_en: "Looker Studio is very powerful for creating dashboards that are easily accessible and understood by non-technical teams.",
    gallery: [
      "assets/images/projects/sell.png"
    ]
  }
} ,
    {
      id: "ui-if-digital",
      name: "UI Development in IF Digital Curriculum Module",
      name_id: "Pengembangan UI pada Modul Kurikulum Digital IF",
      category: "Fullstack",
      date: "Jan 2025",
      status: "Selesai",
      status_en: "Completed",
      technologies: ["TypeScript", "React", "CSS"],
      shortDescription: "Pengembangan antarmuka pengguna untuk modul kurikulum digital Teknik Informatika.",
      shortDescription_en: "User interface development for Informatics Engineering digital curriculum module.",
      thumbnail: "assets/images/projects/ui-if-thumb.jpg",
      links: { demo: "#", github: "https://github.com/username/if-digital-ui", video: "" },
      detail: {
        summary: "Membangun UI untuk modul kurikulum digital Teknik Informatika menggunakan TypeScript.",
        summary_en: "Built UI for Informatics Engineering digital curriculum module using TypeScript.",
        background: "Pengembangan modul pembelajaran digital untuk mahasiswa Teknik Informatika.",
        background_en: "Development of digital learning modules for Informatics Engineering students.",
        problem: "Dibutuhkan antarmuka yang scalable dan maintainable.",
        problem_en: "A scalable and maintainable interface was needed.",
        goal: "Membangun komponen UI yang reusable dan type-safe.",
        goal_en: "Build reusable and type-safe UI components.",
        workflow: ["Perancangan arsitektur komponen", "Implementasi dengan TypeScript", "Pengujian dan debugging"],
        workflow_en: ["Component architecture design", "Implementation with TypeScript", "Testing and debugging"],
        features: ["Komponen reusable", "Type-safe dengan TypeScript", "Responsif"],
        features_en: ["Reusable components", "Type-safe with TypeScript", "Responsive"],
        challenges: "Memastikan konsistensi desain di seluruh komponen.",
        challenges_en: "Ensuring design consistency across all components.",
        solution: "Menggunakan sistem desain dan Storybook untuk dokumentasi.",
        solution_en: "Using design system and Storybook for documentation.",
        role: "Frontend Developer — implementasi komponen UI.",
        role_en: "Frontend Developer — UI component implementation.",
        results: "Modul digunakan sebagai kurikulum resmi.",
        results_en: "Module used as official curriculum.",
        insight: "TypeScript meningkatkan maintainability kode dalam tim.",
        insight_en: "TypeScript improves code maintainability in teams.",
        gallery: ["assets/images/projects/ui-1.jpg", "assets/images/projects/ui-2.jpg"]
      }
    },
    {
      id: "public-service-platform",
      name: "Public Service Platform (Website & Mobile App)",
      name_id: "Platform Layanan Publik (Website & Aplikasi Mobile)",
      category: "Fullstack",
      date: "Dec 2024",
      status: "Selesai",
      status_en: "Completed",
      technologies: ["Laravel", "PHP", "MySQL", "Kotlin", "JavaScript"],
      shortDescription: "Platform layanan publik untuk menyederhanakan proses administrasi dan meningkatkan keterlibatan masyarakat.",
      shortDescription_en: "Public service platform to simplify administrative processes and increase community engagement.",
      thumbnail: "assets/images/projects/public-service-thumb.jpg",
      links: { demo: "#", github: "https://github.com/username/public-service", video: "" },
      detail: {
        summary: "Memimpin pengembangan platform layanan publik untuk mempermudah proses administrasi.",
        summary_en: "Led the development of a public service platform to simplify administrative processes.",
        background: "Masyarakat kesulitan mengakses layanan administrasi desa.",
        background_en: "Communities had difficulty accessing village administrative services.",
        problem: "Proses administrasi masih manual dan memakan waktu.",
        problem_en: "Administrative processes were still manual and time-consuming.",
        goal: "Membangun platform digital untuk layanan publik yang terintegrasi.",
        goal_en: "Build a digital platform for integrated public services.",
        workflow: ["Analisis kebutuhan", "Perancangan sistem", "Koordinasi tim", "Implementasi dan testing"],
        workflow_en: ["Requirements analysis", "System design", "Team coordination", "Implementation and testing"],
        features: ["Pengajuan surat online", "Informasi layanan publik", "Pelaporan masyarakat"],
        features_en: ["Online letter submission", "Public service information", "Community reporting"],
        challenges: "Koordinasi dengan berbagai pihak terkait.",
        challenges_en: "Coordination with various related parties.",
        solution: "Komunikasi intensif dan manajemen proyek yang terstruktur.",
        solution_en: "Intensive communication and structured project management.",
        role: "Project Manager & Fullstack Developer — koordinasi tim dan implementasi backend.",
        role_en: "Project Manager & Fullstack Developer — team coordination and backend implementation.",
        results: "Platform digunakan oleh 5 desa.",
        results_en: "Platform used by 5 villages.",
        insight: "Manajemen proyek yang baik kunci kesuksesan kolaborasi tim.",
        insight_en: "Good project management is key to successful team collaboration.",
        gallery: ["assets/images/projects/public-1.jpg", "assets/images/projects/public-2.jpg"]
      }
    },
    {
      id: "yumify",
      name: "Yumify - Recipe Discovery App",
      name_id: "Yumify - Aplikasi Penemuan Resep",
      category: "Android",
      date: "Dec 2024",
      status: "Selesai",
      status_en: "Completed",
      technologies: ["Kotlin", "Android", "REST API"],
      shortDescription: "Aplikasi penemuan resep dengan rekomendasi personal, tersedia di Google Play Store.",
      shortDescription_en: "Recipe discovery app with personal recommendations, available on Google Play Store.",
      thumbnail: "assets/images/projects/yumify-thumb.jpg",
      links: { demo: "https://play.google.com/store/apps/details?id=com.yumify", github: "https://github.com/username/yumify", video: "" },
      detail: {
        summary: "Mengembangkan aplikasi penemuan resep dengan rekomendasi personal.",
        summary_en: "Developed a recipe discovery app with personal recommendations.",
        background: "Banyak orang kesulitan mencari resep sesuai preferensi.",
        background_en: "Many people struggled to find recipes according to their preferences.",
        problem: "Aplikasi resep yang ada kurang personalisasi.",
        problem_en: "Existing recipe apps lacked personalization.",
        goal: "Menyediakan rekomendasi resep yang sesuai dengan preferensi pengguna.",
        goal_en: "Provide recipe recommendations that match user preferences.",
        workflow: ["Perancangan UI/UX", "Implementasi dengan Kotlin", "Integrasi API", "Testing dan deploy ke Play Store"],
        workflow_en: ["UI/UX design", "Implementation with Kotlin", "API integration", "Testing and deploy to Play Store"],
        features: ["Rekomendasi resep personal", "Pencarian resep", "Favorit dan bookmark"],
        features_en: ["Personal recipe recommendations", "Recipe search", "Favorites and bookmarks"],
        challenges: "Membangun rekomendasi yang akurat.",
        challenges_en: "Building accurate recommendations.",
        solution: "Menggunakan collaborative filtering untuk rekomendasi.",
        solution_en: "Using collaborative filtering for recommendations.",
        role: "Frontend Developer — implementasi UI dan integrasi API.",
        role_en: "Frontend Developer — UI implementation and API integration.",
        results: "Aplikasi tersedia di Google Play Store.",
        results_en: "App available on Google Play Store.",
        insight: "UI yang intuitif meningkatkan engagement pengguna.",
        insight_en: "Intuitive UI increases user engagement.",
        gallery: ["assets/images/projects/yumify-1.jpg", "assets/images/projects/yumify-2.jpg", "assets/images/projects/yumify-3.jpg"]
      }
    },
    {
      id: "hadith-search-engine",
      name: "Semantic-Based Hadith Search Engine",
      name_id: "Mesin Pencari Hadis Berbasis Semantik",
      category: "Data Scientist",
      date: "Oct 2024",
      status: "Riset",
      status_en: "Research",
      technologies: ["Python", "NLP", "Flask"],
      shortDescription: "Search engine hadis berbasis semantik dengan fokus pada quality assurance dan riset integrasi.",
      shortDescription_en: "Semantic-based hadith search engine with focus on quality assurance and integration research.",
      thumbnail: "assets/images/projects/hadits.jpg",
      links: {  },
      detail: {
        summary: "Kontribusi sebagai Quality Assurance lead dan research integrator dalam pengembangan search engine hadis.",
        summary_en: "Contribution as Quality Assurance lead and research integrator in hadith search engine development.",
        background: "Pencarian hadis masih berbasis kata kunci kurang akurat secara semantik.",
        background_en: "Hadith search was still keyword-based, lacking semantic accuracy.",
        problem: "Sulit menemukan hadis yang relevan secara makna.",
        problem_en: "Difficult to find contextually relevant hadith.",
        goal: "Membangun search engine yang memahami konteks dan makna.",
        goal_en: "Build a search engine that understands context and meaning.",
        workflow: ["Research dan analisis", "Integrasi model NLP", "Quality Assurance testing"],
        workflow_en: ["Research and analysis", "NLP model integration", "Quality Assurance testing"],
        features: ["Pencarian berbasis semantik", "Relevansi dan akurasi"],
        features_en: ["Semantic-based search", "Relevance and accuracy"],
        challenges: "Memastikan akurasi semantik dalam konteks hadis.",
        challenges_en: "Ensuring semantic accuracy in hadith context.",
        solution: "Testing dan validasi yang ketat.",
        solution_en: "Rigorous testing and validation.",
        role: "QA Lead & Research Integrator — menjamin akurasi dan fungsionalitas.",
        role_en: "QA Lead & Research Integrator — ensuring accuracy and functionality.",
        results: "Search engine digunakan untuk penelitian.",
        results_en: "Search engine used for research.",
        insight: "Kualitas data dan testing sangat penting dalam sistem berbasis AI.",
        insight_en: "Data quality and testing are crucial in AI-based systems.",
        gallery: ["assets/images/projects/hadits-1.jpg"]
      }
    },
    {
      id: "railway-database",
      name: "Railway Database System",
      name_id: "Sistem Database Perkeretaapian",
      category: "Data Analyst",
      date: "July 2023",
      status: "Selesai",
      status_en: "Completed",
      technologies: ["MySQL", "SQL"],
      shortDescription: "Sistem database relasional untuk manajemen perkeretaapian.",
      shortDescription_en: "Relational database system for railway management.",
      thumbnail: "assets/images/projects/api.png",
      links: { demo: "https://docs.google.com/document/d/1uffYh8fBZ2VIjc8XSzdEtfPauGyxUKbmQt5Topi1x_4/edit?usp=sharing" },
      detail: {
        summary: "Merancang dan mengimplementasikan sistem database relasional untuk manajemen perkeretaapian.",
        summary_en: "Designed and implemented a relational database system for railway management.",
        background: "Manajemen data kereta api masih manual.",
        background_en: "Railway data management was still manual.",
        problem: "Data tidak terstruktur dan sulit diakses.",
        problem_en: "Data was unstructured and difficult to access.",
        goal: "Membangun database yang terstruktur untuk manajemen kereta api.",
        goal_en: "Build a structured database for railway management.",
        workflow: ["Perancangan schema", "Implementasi MySQL", "Testing dan presentasi"],
        workflow_en: ["Schema design", "MySQL implementation", "Testing and presentation"],
        features: ["Manajemen jadwal", "Data pelanggan", "Pemesanan tiket"],
        features_en: ["Schedule management", "Customer data", "Ticket booking"],
        challenges: "Menentukan relasi antar tabel yang tepat.",
        challenges_en: "Determining the right relationships between tables.",
        solution: "Perancangan ERD yang matang sebelum implementasi.",
        solution_en: "Thorough ERD design before implementation.",
        role: "Team Member — perancangan dan implementasi database.",
        role_en: "Team Member — database design and implementation.",
        results: "Sistem digunakan dalam tugas akhir mata kuliah.",
        results_en: "System used in final course project.",
        insight: "Database yang baik adalah fondasi sistem informasi yang handal.",
        insight_en: "A good database is the foundation of a reliable information system.",
        gallery: ["assets/images/projects/api.png"]
      }
    },
    {
      id: "bookstore-website",
      name: "Book Store Website (Admin)",
      name_id: "Website Toko Buku (Admin)",
      category: "Fullstack",
      date: "June 2023",
      status: "Selesai",
      status_en: "Completed",
      technologies: ["PHP", "MySQL", "HTML", "CSS"],
      shortDescription: "Website toko buku sederhana dengan fungsionalitas admin.",
      shortDescription_en: "Simple book store website with admin functionality.",
      thumbnail: "assets/images/projects/bookstore-thumb.jpg",
      links: { demo: "#", github: "https://github.com/username/bookstore", video: "" },
      detail: {
        summary: "Membangun website toko buku sederhana dengan fungsionalitas admin.",
        summary_en: "Built a simple book store website with admin functionality.",
        background: "Kebutuhan akan toko buku online yang sederhana.",
        background_en: "The need for a simple online book store.",
        problem: "Toko buku offline ingin memperluas jangkauan online.",
        problem_en: "Offline bookstore wanted to expand online reach.",
        goal: "Menyediakan website untuk admin mengelola buku dan pesanan.",
        goal_en: "Provide a website for admin to manage books and orders.",
        workflow: ["Perancangan desain", "Implementasi PHP & MySQL", "Testing"],
        workflow_en: ["Design", "PHP & MySQL implementation", "Testing"],
        features: ["Manajemen buku", "Autentikasi admin", "Session control"],
        features_en: ["Book management", "Admin authentication", "Session control"],
        challenges: "Membangun autentikasi yang aman.",
        challenges_en: "Building secure authentication.",
        solution: "Menggunakan session dan password hashing sederhana.",
        solution_en: "Using session and simple password hashing.",
        role: "Fullstack Developer — dari desain hingga implementasi.",
        role_en: "Fullstack Developer — from design to implementation.",
        results: "Website digunakan sebagai tugas mata kuliah.",
        results_en: "Website used as course assignment.",
        insight: "Keamanan autentikasi sangat penting dalam aplikasi web.",
        insight_en: "Authentication security is crucial in web applications.",
        gallery: ["assets/images/projects/bookstore-1.jpg"]
      }
    }
  ],

  // ---------------------------------------------------------
  // SERTIFIKAT
  // ---------------------------------------------------------
  certificates: [
    // BNSP
    { name: "Associate Data Analyst", issuer: "BNSP (Badan Nasional Sertifikasi Profesi)", year: "2025-2029", category: "BNSP", image: "assets/images/certificates/bnsp-data-analyst.jpg" },
    // Dicoding Indonesia
    { name: "Machine Learning for Beginners", issuer: "Dicoding Indonesia", year: "2026", category: "Dicoding", image: "assets/images/certificates/ml-beginner.jpg" },
    { name: "Fundamentals of Data Science", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/data-science.jpg" },
    { name: "Prompt Engineering for Software Developers", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/prompt.jpg" },
    { name: "Fundamentals of Cloud Computing and Generative AI on AWS", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-cloud-aws.jpg" },
    { name: "Intermediate Web Development", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-intermediate-web.jpg" },
    { name: "Financial Literacy 101", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-financial.jpg" },
    { name: "Beginner Back-End Development with JavaScript", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-backend-js.jpg" },
    { name: "Fundamentals of JavaScript Programming", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-js-fundamentals.jpg" },
    { name: "Fundamental Front-End Web Development", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-frontend-fundamental.jpg" },
    { name: "Front-End Web Development for Beginners", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-frontend-beginner.jpg" },
    { name: "Fundamentals of Git and GitHub", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-git-github.jpg" },
    { name: "Fundamentals of Web Programming", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-web-programming.jpg" },
    { name: "Introduction to Programming for Aspiring Software Developers", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-intro-programming.jpg" },
    { name: "Introduction to Programming Logic (Programming Logic 101)", issuer: "Dicoding Indonesia", year: "2025", category: "Dicoding", image: "assets/images/certificates/dicoding-logic-programming.jpg" },
    // Cisco Networking Academy
    { name: "CCNA: Introduction to Networks", issuer: "Cisco Networking Academy", year: "2025", category: "Cisco", image: "assets/images/certificates/cisco.png" },
    // Oracle Academy
    { name: "Database Programming with SQL", issuer: "Oracle Academy", year: "2024", category: "Oracle", image: "assets/images/certificates/oracle-databaseprograming.jpg" },
    { name: "Database Design", issuer: "Oracle Academy", year: "2024", category: "Oracle", image: "assets/images/certificates/database-design.jpg" },
  ]
};