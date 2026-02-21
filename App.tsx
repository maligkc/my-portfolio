
import React, { useState, useEffect } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Code2,
  Database,
  Terminal,
  Layers,
  ExternalLink,
  ChevronRight,
  User,
  Briefcase,
  GraduationCap,
  Cpu,
  Smartphone,
  Globe
} from 'lucide-react';

// --- Types ---
type Language = 'tr' | 'en';

interface Skill {
  name: string;
}

interface Project {
  title: string;
  description: string;
  tech: string[];
}

interface Experience {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string;
}

// --- Translations ---
const translations = {
  tr: {
    nav: {
      about: 'Hakkımda',
      skills: 'Yetenekler',
      experience: 'Deneyim',
      projects: 'Projeler',
      contact: 'İletişim'
    },
    hero: {
      status: 'FİKRİNİZİ GERÇEĞE DÖNÜŞTÜRELİM',
      title1: 'MUHAMMED',
      title2: 'ALİ GÖKÇE',
      description1: '.NET Backend',
      description2: 'Mobil Geliştirici;',
      description3: 'ölçeklenebilir API’ler ve Flutter ile yüksek performanslı, platformlar arası uygulamalar geliştirmeye odaklı.',
      cta: 'İletişime Geç',
      github: 'GitHub'
    },
    about: {
      heading: 'Hakkımda',
      p1: 'mezunuyum. Güçlü backend sistemleri ile modern mobil deneyimlerin kesişiminde uzmanlaşmış bir geliştiriciyim.',
      p1_bold: 'Bilgisayar Mühendisliği ',
      // Fixed: Added p1_end to match the English translation structure and resolve TS error
      p1_end: '',
      p2: 'Temelim',
      p2_mid: 'C# ve .NET Core',
      p2_end: 'üzerine kurulu olsa da, mobil geliştirme için araç setimi Flutter ile genişlettim. Tüm platformlarda mükemmel kullanıcı deneyimleri sunan, veri odaklı ve sorunsuz çalışan uygulamalar geliştirmeye odaklanıyorum.',
      stats: {
        coding: 'Yıllık Kodlama',
        projects: 'Tamamlanan Proje'
      },
      role: 'Bilgisayar Mühendisi'
    },
    skills: {
      heading: 'Yetenekler & Teknoloji',
      mobile: {
        title: 'Mobil Geliştirme',
        desc: 'Flutter, Dart ve Firebase kullanarak şık, yerel kalitede platformlar arası uygulamalar geliştiriyorum.'
      },
      backend: {
        title: 'Backend Uzmanlığı',
        desc: 'C#, .NET Framework, ASP.NET Core, Web API ve Python Flask ile sağlam servis mimarileri oluşturma deneyimi.'
      },
      database: {
        title: 'Veri Kalıcılığı',
        desc: 'SQL Server, SQLite (mobil için) ve PostgreSQL üzerinde gelişmiş ORM teknikleri ile çalışma yetkinliği.'
      }
    },
    experience: {
      heading: 'Deneyim',
      items: [
        {
          company: "Abonesepeti",
          role: "Backend Geliştirici",
          date: "2025",
          location: "İstanbul",
          description: ".NET teknolojilerini, Entity Framework ve MSSQL’i kullanarak RESTful API’ler geliştirdim; kimlik doğrulama ve yetkilendirme, veri doğrulama ve katmanlı mimari prensiplerini uyguladım"
        },
        {
          company: "PUXO Digital Experience",
          role: "Mobil Geliştirici Stajyeri",
          date: "2024",
          location: "İstanbul",
          description: "Flutter kullanarak iOS odaklı, çapraz platform mobil uygulamalar ve kullanıcı arayüzü bileşenleri geliştirdim."
        },
        {
          company: "Netcollec A.Ş - Logo Yazılım İş Ortağı",
          role: ".NET Geliştirici Stajyeri",
          date: "2023",
          location: "İstanbul",
          description: ".NET Framework, DevExpress ve MSSQL kullanarak ERP sistemleri ve karmaşık veritabanı mimarileri geliştirdim. İş süreci optimizasyonuna odaklandım."
        },
        {
          company: "TEKSO SOĞUTMA",
          role: "Bilgi İşlem Departmanı Stajyeri",
          date: "2022",
          location: "İstanbul",
          description: "Kurumsal BT altyapısı, ağ yönetimi ve dahili yazılım desteği konularında temel deneyim kazandım."
        }
      ]
    },
    education: {
      heading: 'Eğitim',
      university: 'BÜLENT ECEVİT ÜNİVERSİTESİ',
      major: 'Bilgisayar Mühendisliği',
      quote: '"Yüksek performanslı hesaplama, dağıtık sistemler ve yazılım mühendisliği metodolojilerine odaklanmış Bilgisayar Mühendisi."'
    },
    projects: {
      heading: 'Öne Çıkan Projeler',
      items: [
        {
          title: "Platformlar Arası Mobil Uygulamalar",
          description: "Kesintisiz veri senkronizasyonu için entegre backend servislerine sahip, Flutter ile geliştirilmiş performanslı mobil uygulamalar.",
          tech: ["Flutter", "Dart", "Firebase", "REST API"]
        },
        {
          title: "JWT Kimlik Doğrulama & REST API",
          description: "Yüksek güvenlikli ortamlar için katmanlı mimari ve JWT tabanlı kimlik doğrulama kullanan güvenli ASP.NET Core Web API'leri.",
          tech: [".NET Core", "Web API", "JWT", "Clean Architecture"]
        },
        {
          title: "Hastane Randevu Sistemi",
          description: "Hastaları, doktorları ve randevuları yönetmek için rol tabanlı erişim kontrolüne sahip kapsamlı bir veritabanı tabanlı backend.",
          tech: ["Entity Framework", "SQL Server", "C#", "MVC"]
        },
        {
          title: "Öğrenci Sınav Yönetim Sistemi",
          description: "Tam CRUD işlemleri ve raporlama ile sınav oluşturma, puanlama ve öğrenci yönetimi için otomatik backend mantığı.",
          tech: ["C#", "SQL", "Reporting", "Business Logic"]
        }
      ]
    },
    contact: {
      heading: 'İletişime Geç',
      //cta: 'EFSANE BİR ŞEYLER <span class="gradient-text">İNŞA EDELİM.</span>',
      cta: 'YENİ PROJELER İÇİN <span class="gradient-text"> İLETİŞİME GEÇİN</span>',
      description: '',
      form: {
        name: 'İsim',
        email: 'E-posta',
        subject: 'Konu',
        message: 'Mesaj',
        send: 'Mesaj Gönder',
        placeholders: {
          name: 'Adınız Soyadınız',
          email: 'ornek@mail.com',
          subject: 'Proje Hakkında',
          message: 'Size nasıl yardımcı olabilirim?'
        }
      }
    },
    footer: {
      rights: 'Tüm hakları saklıdır.'
    }
  },
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      contact: 'Contact'
    },
    hero: {
      status: 'LET\'S TURN YOUR IDEA INTO REALITY',
      title1: 'MUHAMMED',
      title2: 'ALİ GÖKÇE',
      description1: '.NET Backend &',
      description2: 'Mobile Developer',
      description3: 'focused on building scalable APIs and high-performance cross-platform applications with Flutter.',
      cta: 'Get in Touch',
      github: 'GitHub'
    },
    about: {
      heading: 'About Me',
      p1: 'I am a',
      p1_bold: 'Computer Engineer',
      p1_end: 'and developer specializing in the intersection of robust backend systems and modern mobile experiences.',
      p2: 'While my roots are in',
      p2_mid: 'C# and .NET Core',
      p2_end: ', I have expanded my toolkit to include Flutter for mobile development. I focus on creating seamless, data-driven applications that provide great user experiences across all platforms.',
      stats: {
        coding: 'Years Coding',
        projects: 'Projects Done'
      },
      role: 'Computer Engineer'
    },
    skills: {
      heading: 'Skills & Tech',
      mobile: {
        title: 'Mobile Development',
        desc: 'Building beautiful, native-quality cross-platform applications using Flutter, Dart, and Firebase.'
      },
      backend: {
        title: 'Backend Mastery',
        desc: 'Expertise in C#, .NET Framework, ASP.NET Core, Web API and Python Flask for building robust service architectures.'
      },
      database: {
        title: 'Data Persistence',
        desc: 'Proficient in SQL Server, SQLite (for mobile), and PostgreSQL with advanced ORM techniques.'
      }
    },
    experience: {
      heading: 'Experience',
      items: [
        {
          company: "Abonesepeti",
          role: "Backend Developer",
          date: "2025",
          location: "İstanbul",
          description: "Developed backend features, building RESTful APIs using .NET technologies, Entity Framework and MSSQL, while implementing authentication & authorization, data validation, and layered architecture principles."
        },
        {
          company: "PUXO Digital Experience",
          role: "Mobile Developer Intern",
          date: "2024",
          location: "İstanbul",
          description: "Developed iOS-focused cross-platform mobile applications and UI components using Flutter."
        },
        {
          company: "Netcollec A.Ş - Logo Yazılım Partner",
          role: ".NET Developer Intern",
          date: "2023",
          location: "İstanbul",
          description: "Developed ERP systems and complex database architectures using .NET Framework, DevExpress, and MSSQL. Focused on business process optimization."
        },
        {
          company: "TEKSO REFRIGERATION",
          role: "IT Department Intern",
          date: "2022",
          location: "İstanbul",
          description: "Gained foundational experience in corporate IT infrastructure, network management, and internal software support."
        }
      ]
    },
    education: {
      heading: 'Education',
      university: 'BÜLENT ECEVİT UNIVERSITY',
      major: 'Computer Engineering',
      quote: '"Graduate Computer Engineer with a focus on high-performance computing, distributed systems, and software engineering methodologies."'
    },
    projects: {
      heading: 'Featured Projects',
      items: [
        {
          title: "Cross-Platform Mobile Apps",
          description: "Developing performant mobile applications using Flutter with integrated backend services for seamless data synchronization.",
          tech: ["Flutter", "Dart", "Firebase", "REST API"]
        },
        {
          title: "JWT Authentication & REST API",
          description: "Developed secure ASP.NET Core Web APIs using layered architecture and JWT-based authentication for high-security environments.",
          tech: [".NET Core", "Web API", "JWT", "Clean Architecture"]
        },
        {
          title: "Hospital Appointment System",
          description: "A comprehensive database-driven backend for managing patients, doctors, and appointments with role-based access control.",
          tech: ["Entity Framework", "SQL Server", "C#", "MVC"]
        },
        {
          title: "Student Exam Management System",
          description: "Automated backend logic for exam creation, scoring, and student management with full CRUD operations and reporting.",
          tech: ["C#", "SQL", "Reporting", "Business Logic"]
        }
      ]
    },
    contact: {
      heading: 'Get In Touch',
      cta: "<span class=\"gradient-text\">REACH OUT </span> FOR NEW PROJECTS",
      description: "I'm currently looking for new opportunities and collaborations. Whether you have a question or just want to say hi, my inbox is always open.",
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        send: 'Send Message',
        placeholders: {
          name: 'Name Surname',
          email: 'example@mail.com',
          subject: 'About project',
          message: 'How can I help you?'
        }
      }
    },
    footer: {
      rights: 'All rights reserved.'
    }
  }
};

// LOGO

const Logo = ({ scrolled }: { scrolled: boolean }) => (
  <a href="#" className="group flex items-center">
    <img
      src="/images/logo.png"
      alt="MAG logo"
      className={`w-20 h-20 transition-transform duration-300 ${scrolled ? '' : 'group-hover:scale-110'}`}
    />
  </a>
);






// --- Components ---

const Navbar: React.FC<{ lang: Language, setLang: (l: Language) => void }> = ({ lang, setLang }) => {
  const [scrolled, setScrolled] = useState(false);
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (

    // <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass' : 'py-6 bg-transparent'}`}>
    // <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 glass border-b border-white/5' : 'py-6 bg-transparent'}`}>
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-4 backdrop-blur-sm bg-slate-900/10 border-b border-white/10' : 'py-6 bg-transparent'}`}>

      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
        {/* <a href="#" className="text-xl font-bold tracking-tighter gradient-text">Mali .dev</a> */}
        {/* <a href="#" className="text-xl font-bold tracking-tighter gradient-text"><img src="images/letter-m.png" alt="Mali .dev logo" className="w-8 h-8" /></a> */}
        <Logo scrolled={scrolled} />

        <div className="flex items-center gap-8">
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-300">
            <a href="#about" className="hover:text-sky-400 transition-colors">{t.about}</a>
            <a href="#skills" className="hover:text-sky-400 transition-colors">{t.skills}</a>
            <a href="#experience" className="hover:text-sky-400 transition-colors">{t.experience}</a>
            <a href="#projects" className="hover:text-sky-400 transition-colors">{t.projects}</a>
            <a href="#contact" className="hover:text-sky-400 transition-colors">{t.contact}</a>
          </div>

          <button
            onClick={() => setLang(lang === 'tr' ? 'en' : 'tr')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass text-xs font-bold transition-all hover:border-sky-500/50"
          >
            <Globe size={14} className="text-sky-400" />
            <span className={lang === 'tr' ? 'text-sky-400' : 'text-slate-400'}>TR</span>
            <span className="text-slate-600">|</span>
            <span className={lang === 'en' ? 'text-sky-400' : 'text-slate-400'}>EN</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

const SectionHeading: React.FC<{ children: React.ReactNode, icon: any }> = ({ children, icon: Icon }) => (
  <div className="flex items-center gap-3 mb-12">
    <div className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
      <Icon size={24} />
    </div>
    <h2 className="text-3xl font-bold tracking-tight text-slate-100">{children}</h2>
    <div className="h-[1px] flex-grow bg-slate-800 ml-4"></div>
  </div>
);

const SkillBadge: React.FC<{ skill: Skill }> = ({ skill }) => (
  <span className="px-4 py-2 rounded-full glass text-sm font-medium text-slate-300 border border-slate-700/50 hover:border-sky-500/50 transition-all cursor-default">
    {skill.name}
  </span>
);

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => (
  <div className="group p-6 rounded-2xl glass border border-slate-800 hover:border-sky-500/50 transition-all duration-300 flex flex-col h-full">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 rounded-lg bg-slate-800 text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors">
        <Cpu size={20} />
      </div>
      <div className="flex gap-3 text-slate-400">
        <a href="https://github.com/maligkc?tab=repositories" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400 transition-colors">
          <Github size={18} />
        </a>
      </div>
    </div>
    <h3 className="text-xl font-bold mb-3 text-slate-100">{project.title}</h3>
    <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
      {project.description}
    </p>
    <div className="flex flex-wrap gap-2 mt-auto">
      {project.tech.map(t => (
        <span key={t} className="text-[10px] uppercase tracking-wider font-bold text-sky-400/80 bg-sky-400/5 px-2 py-1 rounded">
          {t}
        </span>
      ))}
    </div>
  </div>
);

const ExperienceItem: React.FC<{ exp: any }> = ({ exp }) => (
  <div className="relative pl-8 pb-12 last:pb-0 border-l border-slate-800">
    <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
      <h3 className="text-lg font-bold text-slate-100">{exp.role}</h3>
      <span className="text-sm font-medium text-sky-400 mono">{exp.date}</span>
    </div>
    <div className="flex items-center gap-2 text-slate-400 text-sm mb-4">
      <span className="font-semibold text-slate-300">{exp.company}</span>
      <span>•</span>
      <span>{exp.location}</span>
    </div>
    <p className="text-slate-400 text-sm leading-relaxed">
      {exp.description}
    </p>
  </div>
);

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const t = translations[lang];

  const githubUrl = "https://github.com/maligkc";
  const linkedinUrl = "https://www.linkedin.com/in/muhammed-ali-g%C3%B6k%C3%A7e-75746a226/";
  const email = "maligkc12@gmail.com";
  const profileImageUrl = "/images/foto.jpeg";

  const skillsList: Skill[] = [
    { name: 'C#' }, { name: '.NET Core' }, { name: 'ASP.NET Web API' },
    { name: 'Flutter' }, { name: 'Dart' }, { name: 'Firebase' },
    { name: 'SQLite' }, { name: 'JWT' }, { name: 'Microservices' },
    { name: 'N-Tier Architecture' }, { name: 'Entity Framework' }, { name: 'MSSQL' },
    { name: 'PostgreSQL' }, { name: 'React' }, { name: 'HTML/CSS' },
    { name: 'Bootstrap' }, { name: 'Python Flask' }, { name: 'Java' }
  ];

  return (
    <div className="min-h-screen selection:bg-sky-500/30 relative overflow-x-hidden">
      <div className="fixed inset-0 pointer-events-none hero-bg-ambient z-0">
        <div className="ambient-beam ambient-beam-a"></div>
        <div className="ambient-beam ambient-beam-b"></div>
        <div className="ambient-ring ambient-ring-a"></div>
        <div className="ambient-ring ambient-ring-b"></div>
        <div className="ambient-particles">
          <span className="ambient-particle particle-1"></span>
          <span className="ambient-particle particle-2"></span>
          <span className="ambient-particle particle-3"></span>
          <span className="ambient-particle particle-4"></span>
          <span className="ambient-particle particle-5"></span>
          <span className="ambient-particle particle-6"></span>
        </div>
        <div className="hero-grid-glow"></div>
        <div className="absolute top-[-20%] left-[-14%] w-[58vw] h-[58vw] max-w-[820px] max-h-[820px] bg-sky-500/20 rounded-full blur-[130px] hero-blob hero-blob-a"></div>
        <div className="absolute top-[12%] right-[-18%] w-[52vw] h-[52vw] max-w-[760px] max-h-[760px] bg-indigo-500/20 rounded-full blur-[120px] hero-blob hero-blob-b"></div>
        <div className="absolute bottom-[-24%] left-[14%] w-[50vw] h-[50vw] max-w-[760px] max-h-[760px] bg-cyan-400/20 rounded-full blur-[125px] hero-blob hero-blob-c"></div>
      </div>

      <div className="relative z-10">
        <Navbar lang={lang} setLang={setLang} />

        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold uppercase tracking-widest mb-6 animate-pulse">
              {t.hero.status}
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6 leading-[1.1]">
              {t.hero.title1} <br />
              <span className="gradient-text">{t.hero.title2}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-medium max-w-2xl mb-10 leading-relaxed">
              <span className="text-slate-100">{t.hero.description1}</span> & <span className="text-slate-100">{t.hero.description2}</span> {t.hero.description3}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a href="#contact" className="px-8 py-4 bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold rounded-xl transition-all hover:scale-105 active:scale-95">
                {t.hero.cta}
              </a>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="px-8 py-4 glass text-slate-200 font-bold rounded-xl transition-all hover:bg-slate-800 flex items-center gap-2">
                <Github size={20} /> {t.hero.github}
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading icon={User}>{t.about.heading}</SectionHeading>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-slate-400 leading-relaxed text-lg">
                <p>
                  <span className="text-sky-400 font-semibold">{t.about.p1_bold}</span> {t.about.p1} {lang === 'en' ? t.about.p1_end : ''}
                </p>
                <p>
                  {t.about.p2} <span className="text-slate-100">{t.about.p2_mid}</span> {t.about.p2_end}
                </p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-xl glass">
                    <div className="text-sky-400 font-bold text-2xl mb-1">3+</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">{t.about.stats.coding}</div>
                  </div>
                  <div className="p-4 rounded-xl glass">
                    <div className="text-sky-400 font-bold text-2xl mb-1">10+</div>
                    <div className="text-xs uppercase tracking-wider text-slate-500 font-bold">{t.about.stats.projects}</div>
                  </div>
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-indigo-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative p-8 rounded-2xl glass border border-slate-700/50 flex flex-col justify-center items-center text-center overflow-hidden">
                  <div className="w-56 h-56 relative mb-6">
                    <div className="absolute inset-0 bg-sky-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                    <img
                      src={profileImageUrl}
                      alt="Muhammed Ali Gökçe"
                      className="w-full h-full rounded-2xl object-cover relative z-10 border-4 border-slate-800 shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  <h4 className="text-xl font-bold text-slate-100 mb-2">Muhammed Ali Gökçe</h4>
                  <p className="text-sky-400 mono text-sm mb-4">{t.about.role}</p>
                  <div className="flex gap-4">
                    <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="p-2 glass rounded-lg hover:text-sky-400 transition-colors"><Linkedin size={20} /></a>
                    <a href={`mailto:${email}`} className="p-2 glass rounded-lg hover:text-sky-400 transition-colors"><Mail size={20} /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading icon={Terminal}>{t.skills.heading}</SectionHeading>
            <div className="flex flex-wrap gap-3">
              {skillsList.map(skill => <SkillBadge key={skill.name} skill={skill} />)}
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <div className="p-8 rounded-2xl glass border border-slate-800">
                <Smartphone className="text-sky-400 mb-6" size={32} />
                <h3 className="text-xl font-bold mb-4">{t.skills.mobile.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t.skills.mobile.desc}
                </p>
              </div>
              <div className="p-8 rounded-2xl glass border border-slate-800">
                <Code2 className="text-indigo-400 mb-6" size={32} />
                <h3 className="text-xl font-bold mb-4">{t.skills.backend.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t.skills.backend.desc}
                </p>
              </div>
              <div className="p-8 rounded-2xl glass border border-slate-800">
                <Database className="text-emerald-400 mb-6" size={32} />
                <h3 className="text-xl font-bold mb-4">{t.skills.database.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t.skills.database.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-20 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-6">
            <SectionHeading icon={Briefcase}>{t.experience.heading}</SectionHeading>
            <div className="mt-8">
              {t.experience.items.map((exp: any, idx: number) => <ExperienceItem key={idx} exp={exp} />)}
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="py-20 scroll-mt-24">
          <div className="max-w-4xl mx-auto px-6">
            <SectionHeading icon={GraduationCap}>{t.education.heading}</SectionHeading>
            <div className="p-8 rounded-2xl glass border border-sky-500/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
              <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-bold text-slate-100">{t.education.university}</h3>
                  <p className="text-sky-400 font-semibold mt-1">{t.education.major}</p>
                </div>
                <div className="px-4 py-2 glass rounded-lg text-sm font-bold mono text-slate-300">
                  2021 — 2025
                </div>
              </div>
              <p className="text-slate-400 leading-relaxed italic">
                {t.education.quote}
              </p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading icon={Cpu}>{t.projects.heading}</SectionHeading>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {t.projects.items.map((p: any) => <ProjectCard key={p.title} project={p} />)}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 scroll-mt-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionHeading icon={Mail}>{t.contact.heading}</SectionHeading>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-4xl font-black mb-8" dangerouslySetInnerHTML={{ __html: t.contact.cta }}></h3>
                <p className="text-slate-400 mb-10 text-lg">
                  {t.contact.description}
                </p>

                <div className="space-y-8">
                  <a href={`mailto:${email}`} className="flex items-center gap-4 group cursor-pointer transition-transform hover:translate-x-1">
                    <div className="p-3 rounded-lg glass group-hover:bg-sky-500 group-hover:text-slate-900 transition-all">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">{t.contact.form.email}</div>
                      <div className="text-slate-100 font-medium">{email}</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 group transition-transform hover:translate-x-1">
                    <div className="p-3 rounded-lg glass group-hover:bg-sky-500 group-hover:text-slate-900 transition-all">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <div className="text-xs uppercase tracking-widest text-slate-500 font-bold">Location</div>
                      <div className="text-slate-100 font-medium">İSTANBUL</div>
                    </div>
                  </div>
                </div>
              </div>

              <form className="p-8 rounded-2xl glass border border-slate-800 space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">{t.contact.form.name}</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-sky-500 focus:outline-none transition-colors" placeholder={t.contact.form.placeholders.name} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-300">{t.contact.form.email}</label>
                    <input type="email" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-sky-500 focus:outline-none transition-colors" placeholder={t.contact.form.placeholders.email} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">{t.contact.form.subject}</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-sky-500 focus:outline-none transition-colors" placeholder={t.contact.form.placeholders.subject} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-300">{t.contact.form.message}</label>
                  <textarea className="w-full bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-sky-500 focus:outline-none transition-colors h-32 resize-none" placeholder={t.contact.form.placeholders.message}></textarea>
                </div>
                <button className="w-full py-4 bg-sky-500 hover:bg-sky-400 text-slate-900 font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-500/20 active:scale-[0.98]">
                  {t.contact.form.send} <ChevronRight size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-800 bg-slate-950">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-slate-500 text-sm">
              &copy; {new Date().getFullYear()} Muhammed Ali Gökçe. {t.footer.rights}
            </div>
            <div className="flex gap-6">
              <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors"><Linkedin size={20} /></a>
              <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors"><Github size={20} /></a>
              <a href={`${githubUrl}?tab=repositories`} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors"><ExternalLink size={20} /></a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
