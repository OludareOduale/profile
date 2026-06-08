import { useState, useEffect, useRef } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const WORK = [
  {
    title: 'The Strategist',
    tag: 'Strategy & Delivery',
    excerpt:
      'Those two things — people and strategy — are not in tension. In my experience, they are the same discipline.',
    body: [
      'In product and delivery, impact is rarely abstract. It shows up in numbers and in moments. I developed the global playbook that standardised the rollout of an identity and access management solution across 120 countries — navigating language, culture, and context at a scale most teams never encounter.',
      'I led a product release that brought 3 million new users into the China market, contributing to 13 million users globally. I helped a global bank build digital capability so effectively it earned an industry award. And I helped a vehicle manufacturer compress issue resolution cycles from months down to days — the kind of shift that quietly transforms how an entire organisation functions.',
      'But the results that stay with me are the human ones. My approach has always been to see the whole person, not just the role they occupy. That instinct — to draw out what\'s already there rather than impose what shouldn\'t be — is what shapes how I lead, collaborate, and teach.',
    ],
    quotes: [
      { text: 'Dare skillfully brought out the best in everyone.', name: 'Bruno Buglio', role: 'Creative Director' },
      { text: 'Dare has an exceptional strategy mindset.', name: 'Adrian', role: 'Partner, KPMG' },
    ],
    closing: 'The strategist does not just read the board. He shapes it. And the best strategies I have ever built were built around people first.',
  },
  {
    title: 'The Entrepreneur',
    tag: 'Ventures & Teaching',
    excerpt:
      'Teaching and building are not separate activities. Every venture I have launched has been an act of education — mine or someone else\'s.',
    body: [
      'Private academic tutoring and classroom innovation tours, career seminars and startup advisory, agricultural land in sub-Saharan Africa and a data intelligence product for the African startup ecosystem. Where others see scattered interests, I see a single thread — the compounding effect of backing people and ideas before they are obvious bets.',
      'What I have come to understand about myself is this: I am a teacher and facilitator before I am anything else. At KPMG, outside my formal role, I certified over 100 colleagues in Scaled Agile. At Leeds University, I stepped into the lecture theatre as a guest lecturer. The teaching instinct does not wait for an invitation — it finds the gap and fills it.',
      'Through the Crestrad Virtual Internship Programme, I drew over 850 participants across four countries. Through career seminars reaching 2,150 participants, I watched people recalibrate what they thought was possible. Through Ephod Career Training, I supported career transitions representing an estimated combined income uplift of over £10 million.',
      'I am currently building and expanding cash crop farming operations in sub-Saharan Africa — cashew and cocoa as long-term holdings. A patient venture in a market most overlook. The farm is growing. So is the vision.',
    ],
    quotes: [],
    closing: 'Teaching and building are not separate activities. Every venture I have launched has been an act of education — mine or someone else\'s.',
  },
  {
    title: 'The Shepherd',
    tag: 'Faith & Community',
    excerpt:
      'The strategist, the entrepreneur, and the shepherd are one life, being shaped for one purpose — and the work of teaching, building, and planting is how that purpose multiplies.',
    body: [
      'That instinct — to show up, to take ownership, to give before anyone asks — has never left me. My formation in faith was never passive. As a child I was already teaching children\'s church. At fifteen I was translating for my Pastor.',
      'The pattern that followed is one I have seen repeat itself across every city and every room: arrive, find what needs doing, take ownership, and do it with everything you have. Every new assignment, the same instinct. Every new community, the same question — not who will lead this? but what needs to happen here, and am I willing to be the one?',
      'In August 2025, I stepped into something I had been quietly moving toward for years — planting a branch of a church in Birmingham, UK. The trial service came just days after I lost my father. I stood before that small gathering with a trembling voice and eyes close to tears, and preached — not through the grief but into it, and out the other side into something that felt like joy.',
      'Today I lead this young and growing community. The culture we are building is one of ownership — from the youngest member to the elders, we function all hands on deck. Our weekly LIFE School sessions bring practical life and business skills into the discipleship rhythm, because we hold this conviction strongly: responsible Christianity and entrepreneurial faithfulness are not separate callings. They are the same one.',
    ],
    quotes: [],
    closing: 'The strategist, the entrepreneur, and the shepherd are not three different people. They never were. They are one life, being shaped for one purpose — and the work of teaching, building, and planting is how that purpose multiplies.',
  },
];

const NAV_LINKS = ['Work', 'About'];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(18px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function WorkCard({ item, index }: { item: typeof WORK[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <FadeIn delay={index * 80}>
      <article className="group border-b border-[#e8e4de] py-8">
        <button
          className="w-full text-left cursor-pointer"
          onClick={() => setExpanded(v => !v)}
        >
          <div className="flex items-start justify-between gap-6">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs text-[#bbb] font-light tracking-wide">{item.tag}</span>
              </div>
              <h3 className="font-garamond text-xl text-[#1a1a1a] group-hover:text-[#444] transition-colors mb-3">
                {item.title}
              </h3>
              <p className="text-sm text-[#888] leading-relaxed font-light">
                {item.excerpt}
              </p>
            </div>
            <div
              className={`text-[#ccc] group-hover:text-[#888] flex-shrink-0 mt-1 transition-all duration-300 ${
                expanded ? 'rotate-90' : ''
              }`}
            >
              <ArrowUpRight size={16} />
            </div>
          </div>
        </button>

        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            expanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pt-6 space-y-4 border-t border-[#f0ede8] mt-6">
            {item.body.map((para, i) => (
              <p key={i} className="text-sm text-[#666] leading-relaxed font-light">
                {para}
              </p>
            ))}
            {item.quotes.length > 0 && (
              <div className="space-y-3 py-2">
                {item.quotes.map((q, i) => (
                  <blockquote key={i} className="pl-4 border-l-2 border-[#e8e4de]">
                    <p className="text-sm text-[#888] italic font-light leading-relaxed">
                      &ldquo;{q.text}&rdquo;
                    </p>
                    <cite className="text-xs text-[#bbb] not-italic mt-1 block">
                      — {q.name}, {q.role}
                    </cite>
                  </blockquote>
                ))}
              </div>
            )}
            <p className="text-sm text-[#444] leading-relaxed font-garamond italic text-base pt-2">
              {item.closing}
            </p>
          </div>
        </div>
      </article>
    </FadeIn>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="bg-[#f9f7f4] min-h-screen text-[#1a1a1a] font-inter antialiased">

      {/* Nav */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#f9f7f4]/95 backdrop-blur-sm border-b border-[#e8e4de]' : ''
        }`}
      >
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="font-garamond text-lg italic tracking-wide text-[#1a1a1a] hover:text-[#666] transition-colors"
          >
            Dare Oduale
          </button>

          <nav className="hidden sm:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={`text-sm tracking-wide transition-colors ${
                  activeSection === link.toLowerCase()
                    ? 'text-[#1a1a1a]'
                    : 'text-[#888] hover:text-[#1a1a1a]'
                }`}
              >
                {link}
              </button>
            ))}
          </nav>

          <button
            className="sm:hidden text-[#888] hover:text-[#1a1a1a] transition-colors"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className={`sm:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-40' : 'max-h-0'
          }`}
        >
          <div className="bg-[#f9f7f4] border-b border-[#e8e4de] px-6 pb-5 flex flex-col gap-4 pt-2">
            {NAV_LINKS.map(link => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className="text-sm text-[#888] hover:text-[#1a1a1a] transition-colors text-left"
              >
                {link}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-24 px-6 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-12">
          {/* Text */}
          <div className="flex-1" style={{ animation: 'fadeUp 0.9s ease forwards' }}>
            <p className="text-sm text-[#999] tracking-widest uppercase mb-6 font-inter font-light">
              England, UK
            </p>
            <h1 className="font-garamond text-5xl sm:text-6xl leading-tight mb-8 text-[#1a1a1a]">
              I teach, build,<br />
              <em>and plant.</em>
            </h1>
            <p className="text-[#666] text-lg leading-relaxed font-light">
              Strategist, entrepreneur, and shepherd. Working across technology, new ventures, and Christian communities — writing to clarify, teaching to multiply.
            </p>
          </div>

          {/* Portrait */}
          <div
            className="mt-10 sm:mt-0 flex-shrink-0 flex sm:justify-end"
            style={{ animation: 'fadeUp 0.9s ease 150ms both' }}
          >
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full overflow-hidden ring-1 ring-[#e8e4de]">
              <img
                src="/sqcropDareheadshots002.jpg"
                alt="Dare Oduale"
                className="w-full h-full object-cover object-top grayscale"
              />
            </div>
          </div>
        </div>

        <div
          className="flex items-center gap-6 mt-12"
          style={{ animation: 'fadeUp 0.9s ease 200ms both' }}
        >
          <a
            href="https://instagram.com/dareoduale"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-sm text-[#1a1a1a] border border-[#1a1a1a] px-5 py-2.5 hover:bg-[#1a1a1a] hover:text-[#f9f7f4] transition-all duration-300"
          >
            Instagram
            <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
          <a
            href="mailto:do@dareoduale.com"
            className="text-sm text-[#888] hover:text-[#1a1a1a] transition-colors underline underline-offset-4 decoration-[#ccc]"
          >
            do@dareoduale.com
          </a>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <div className="border-t border-[#e8e4de]" />
      </div>

      {/* Work */}
      <section id="work" className="py-24 px-6 max-w-3xl mx-auto">
        <FadeIn>
          <div className="flex items-baseline justify-between mb-14">
            <h2 className="font-garamond text-3xl italic text-[#1a1a1a]">Work</h2>
            <span className="text-sm text-[#bbb] font-light">3 parts</span>
          </div>
        </FadeIn>

        <div className="flex flex-col">
          {WORK.map((item, i) => (
            <WorkCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-6">
        <div className="border-t border-[#e8e4de]" />
      </div>

      {/* About */}
      <section id="about" className="py-24 px-6 max-w-3xl mx-auto">
        <FadeIn>
          <h2 className="font-garamond text-3xl italic text-[#1a1a1a] mb-14">About</h2>
        </FadeIn>

        <div className="grid sm:grid-cols-5 gap-12 sm:gap-16">
          <FadeIn className="sm:col-span-3">
            <div className="space-y-5 text-[#555] text-base leading-relaxed font-light">
              <p>
                The strategist, the entrepreneur, and the shepherd are not three different people. They never were. They are one life, being shaped for one purpose.
              </p>
              <p>
                I have spent my career asking what it takes for people to perform at their best — and then building the conditions to make it happen. Across investment banking, pharmaceuticals, energy, consulting, and startups, the work has always been the same: understand the people, clarify the path, and build the conditions for something remarkable to happen.
              </p>
              <p>
                The work of teaching, building, and planting is how that purpose multiplies.
              </p>
            </div>
          </FadeIn>

          <FadeIn className="sm:col-span-2" delay={120}>
            <div className="space-y-6">
              {[
                { label: 'Location', value: 'England, UK' },
                { label: 'Currently building', value: 'Church plant, Birmingham' },
                { label: 'Also building', value: 'Cash crop farming, sub-Saharan Africa' },
                { label: 'Instagram', value: '@oludareoduale' },
              ].map(item => (
                <div key={item.label}>
                  <p className="text-xs text-[#bbb] tracking-widest uppercase mb-1 font-light">{item.label}</p>
                  <p className="text-sm text-[#444]">{item.value}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e8e4de] py-10 px-6">
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <span className="font-garamond italic text-[#bbb] text-sm">Dare Oduale</span>
          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/dareoduale"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#bbb] hover:text-[#888] transition-colors tracking-wide"
            >
              Instagram
            </a>
            <a
              href="mailto:do@dareoduale.com"
              className="text-xs text-[#bbb] hover:text-[#888] transition-colors tracking-wide"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
