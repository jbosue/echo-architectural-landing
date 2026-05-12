'use client';

import type { ComponentType, CSSProperties, FormEvent, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  CircleDashed,
  Hammer,
  Layers3,
  Move3D,
  Recycle,
  Shield,
  Waves,
} from 'lucide-react';

type Finish = {
  name: string;
  descriptor: string;
  gradient: string;
  accent: string;
  flecks: string;
};

const finishes: Finish[] = [
  {
    name: 'Nevada Gris',
    descriptor: 'mineral grey with quiet graphite movement',
    gradient: 'from-[#d6d3cb] via-[#9d9a93] to-[#555452]',
    accent: '#d6d3cb',
    flecks: 'rgba(255,255,255,0.42)',
  },
  {
    name: 'Fiesta',
    descriptor: 'chromatic fragments suspended in deep architectural black',
    gradient: 'from-[#1d1b1b] via-[#38312e] to-[#d36d50]',
    accent: '#d36d50',
    flecks: 'rgba(248,183,91,0.55)',
  },
  {
    name: 'Obsidian Veil',
    descriptor: 'soft black with a satin, monolithic presence',
    gradient: 'from-[#050505] via-[#191919] to-[#3a3936]',
    accent: '#222222',
    flecks: 'rgba(255,255,255,0.18)',
  },
  {
    name: 'Caliza',
    descriptor: 'warm pale aggregate for galleries and hospitality spaces',
    gradient: 'from-[#f2eee4] via-[#d9d0c1] to-[#9e9484]',
    accent: '#e7dfd0',
    flecks: 'rgba(77,68,58,0.22)',
  },
];

const applications = [
  ['Retail', 'branded surfaces that turn movement into memory'],
  ['Hospitality', 'tactile calm for bars, suites, lobbies, and thresholds'],
  ['Workspace', 'lighter systems for partitions, desks, and spatial identity'],
  ['Furniture', 'formed, routed, and detailed like a new species of craft'],
  ['Exhibition', 'fast-build environments with enduring material presence'],
];

const performance: Array<[string, string, ComponentType<{ className?: string }>]> = [
  ['Lightweight', 'less mass, more freedom', Layers3],
  ['Durable', 'built for daily contact', Shield],
  ['Thermoformable', 'heat becomes geometry', Move3D],
  ['Moisture Resistant', 'stable in demanding interiors', Waves],
  ['Machinable', 'cuts, routes, and edges with precision', Hammer],
  ['Circular Composition', 'reclaimed polymers, engineered forward', Recycle],
];

const smoothEase = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  initial: { opacity: 0, y: 42 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-18%' },
  transition: { duration: 0.9, ease: smoothEase },
};

function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-8 text-xs uppercase tracking-label ${dark ? 'text-white/45' : 'text-black/45'}`}>
      {children}
    </p>
  );
}

function MaterialPlane({ finish, className = '' }: { finish: Finish; className?: string }) {
  return (
    <motion.div
      layout
      className={`material-plane relative overflow-hidden rounded-[1.7rem] border border-white/15 bg-gradient-to-br ${finish.gradient} shadow-material ${className}`}
      style={{ '--fleck-color': finish.flecks } as CSSProperties}
      transition={{ duration: 0.8, ease: smoothEase }}
    >
      <div className="absolute inset-0 material-noise opacity-70" />
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent mix-blend-soft-light" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />
    </motion.div>
  );
}

function HeroMacro() {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 0.16], [0, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.16], [1, 1.08]);

  return (
    <motion.div style={{ y, scale }} className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_43%,rgba(255,255,255,0.18),transparent_19%),radial-gradient(circle_at_48%_52%,rgba(164,156,141,0.34),transparent_31%),linear-gradient(145deg,#000_0%,#0d0d0c_42%,#25231f_100%)]" />
      <div className="absolute left-1/2 top-1/2 h-[66vmin] w-[118vmin] -translate-x-1/2 -translate-y-1/2 rotate-[-13deg] rounded-[3rem] border border-white/10 bg-gradient-to-br from-stone-100/20 via-stone-500/10 to-black shadow-[0_70px_160px_rgba(0,0,0,0.7)] material-noise" />
      <motion.div
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0% 0 0)' }}
        transition={{ duration: 1.8, ease: smoothEase, delay: 0.25 }}
        className="absolute inset-0 bg-[linear-gradient(100deg,transparent_0%,rgba(255,255,255,0.26)_46%,transparent_58%)] opacity-60"
      />
    </motion.div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative rounded-[2rem] border border-white/12 bg-white/[0.035] p-5 shadow-material backdrop-blur-xl md:p-8">
      <motion.div
        initial={false}
        animate={submitted ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: 20, pointerEvents: 'none' }}
        className="absolute inset-0 z-10 grid place-items-center rounded-[2rem] bg-[#050505]/95 p-8 text-center backdrop-blur-xl"
      >
        <CircleDashed className="mb-8 h-10 w-10 animate-spin text-white/50 [animation-duration:8s]" />
        <p className="font-serif text-4xl text-white md:text-6xl">Sample experience initiated.</p>
        <p className="mt-6 max-w-md text-sm leading-7 text-white/55">
          ECHO will respond with finish guidance, fabrication notes, and the next available material kit window.
        </p>
      </motion.div>
      <form onSubmit={onSubmit} className="grid gap-4">
        {['Name', 'Studio / Company', 'Email', 'Project Type', 'Project Stage'].map((field) => (
          <label key={field} className="group block">
            <span className="mb-2 block text-[0.65rem] uppercase tracking-label text-white/38">{field}</span>
            <input
              required
              type={field === 'Email' ? 'email' : 'text'}
              className="w-full border-b border-white/16 bg-transparent px-0 py-4 text-base text-white outline-none transition placeholder:text-white/20 focus:border-white/70"
              placeholder={field === 'Project Stage' ? 'Concept / DD / Construction / Procurement' : field}
            />
          </label>
        ))}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button className="group inline-flex items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-medium text-black transition hover:bg-bone">
            Request Sample Kit
            <ArrowRight className="ml-3 h-4 w-4 transition group-hover:translate-x-1" />
          </button>
          <button type="button" className="rounded-full border border-white/18 px-7 py-4 text-sm text-white/80 transition hover:border-white/45 hover:text-white">
            Book Design Consultation
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Home() {
  const [activeFinish, setActiveFinish] = useState(finishes[0]);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="min-h-screen overflow-hidden bg-graphite text-white selection:bg-white selection:text-black">
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-5 mix-blend-difference md:px-10">
        <a href="#hero" className="text-sm font-semibold tracking-[0.5em] text-white">ECHO</a>
        <div className="hidden items-center gap-8 text-[0.65rem] uppercase tracking-label text-white/70 md:flex">
          <a href="#matter">Matter</a>
          <a href="#worlds">Worlds</a>
          <a href="#library">Library</a>
          <a href="#sample">Sample</a>
        </div>
      </nav>

      <section id="hero" className="relative grid min-h-screen place-items-center overflow-hidden px-5 py-24 text-center">
        <HeroMacro />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.35)_42%,#000_100%)]" />
        <motion.div {...fadeUp} className="relative z-10 max-w-6xl">
          <p className="mb-8 text-xs uppercase tracking-label text-white/45">Colombia / engineered architectural surface</p>
          <h1 className="text-[17vw] font-semibold uppercase leading-[0.76] tracking-cinematic md:text-[9.8vw]">
            Not wood.<br />Not stone.<br />Not what came before.
          </h1>
          <p className="mx-auto mt-9 max-w-xl text-lg text-white/68 md:text-2xl">A new category of architectural surface.</p>
          <a href="#disruption" className="mt-12 inline-flex items-center rounded-full border border-white/22 px-7 py-4 text-sm text-white/88 transition hover:border-white hover:bg-white hover:text-black">
            Explore the Material <ArrowRight className="ml-3 h-4 w-4" />
          </a>
        </motion.div>
        <div className="absolute bottom-8 left-1/2 h-16 w-px -translate-x-1/2 overflow-hidden bg-white/12">
          <motion.div animate={{ y: ['-100%', '120%'] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }} className="h-8 w-px bg-white" />
        </div>
      </section>

      <section id="disruption" className="relative grid min-h-screen items-center bg-bone px-5 py-24 text-black md:px-10">
        <div className="mx-auto grid max-w-7xl gap-16 md:grid-cols-[1.15fr_0.85fr] md:items-end">
          <motion.div {...fadeUp}>
            <SectionLabel>01 / category disruption</SectionLabel>
            <h2 className="max-w-5xl text-[15vw] font-semibold leading-[0.82] tracking-cinematic md:text-[8.3vw]">
              Architecture keeps repeating itself.
            </h2>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.15 }} className="pb-3">
            <p className="max-w-lg text-2xl leading-tight text-black/62 md:text-4xl">
              Materials haven&apos;t evolved at the speed of design ambition.
            </p>
            <div className="mt-12 h-1 w-full overflow-hidden bg-black/10">
              <motion.div whileInView={{ x: ['-100%', '0%'] }} viewport={{ once: true }} transition={{ duration: 1.4, ease: smoothEase }} className="h-full bg-black" />
            </div>
          </motion.div>
        </div>
      </section>

      <section id="matter" className="relative min-h-screen overflow-hidden bg-[#090909] px-5 py-28 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.09),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.9fr_1.1fr] md:items-center">
          <motion.div {...fadeUp}>
            <SectionLabel dark>02 / material reveal</SectionLabel>
            <h2 className="font-serif text-[18vw] leading-[0.86] text-bone md:text-[8vw]">Architectural Matter, Reimagined</h2>
            <div className="mt-12 grid gap-4 text-sm uppercase tracking-label text-white/48 sm:grid-cols-3">
              <span>1.25 x 2.50 m</span>
              <span>10-25 mm</span>
              <span>Precision-engineered reclaimed polymer</span>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, rotateX: 18, rotateZ: -9, y: 80 }} whileInView={{ opacity: 1, rotateX: 0, rotateZ: -5, y: 0 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 1.2, ease: smoothEase }} className="perspective-1000">
            <MaterialPlane finish={finishes[0]} className="mx-auto aspect-[1/2] w-[68vw] max-w-[430px] md:w-[36vw]" />
            <div className="mx-auto mt-7 flex max-w-[430px] justify-between text-[0.65rem] uppercase tracking-label text-white/35">
              <span>technical panel</span><span>structural consistency</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid min-h-screen items-center bg-white px-5 py-24 text-black md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl">
            <SectionLabel>03 / different by design</SectionLabel>
            <h2 className="text-6xl font-semibold tracking-cinematic md:text-8xl">The break from inherited surfaces.</h2>
          </motion.div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] bg-black/12 md:grid-cols-2">
            <motion.div {...fadeUp} className="bg-[#efede7] p-8 md:p-12">
              <p className="mb-10 text-xs uppercase tracking-label text-black/35">Traditional surfaces</p>
              {['rigid conventions', 'predictable finishes', 'limited fabrication expression'].map((item) => (
                <div key={item} className="border-t border-black/10 py-7 text-3xl text-black/42 md:text-5xl">{item}</div>
              ))}
            </motion.div>
            <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.16 }} className="bg-black p-8 text-white md:p-12">
              <p className="mb-10 text-xs uppercase tracking-label text-white/35">ECHO</p>
              {['sculptural versatility', 'machinable precision', 'thermoformable intelligence', 'circular permanence'].map((item) => (
                <div key={item} className="border-t border-white/12 py-7 font-serif text-3xl text-bone md:text-5xl">{item}</div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative grid min-h-screen items-center overflow-hidden bg-[#11100e] px-5 py-24 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_46%,rgba(231,223,208,0.16),transparent_28%),linear-gradient(90deg,rgba(0,0,0,0.65),transparent)]" />
        <motion.div initial={{ scale: 1.2, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true, margin: '-20%' }} transition={{ duration: 1.4, ease: smoothEase }} className="absolute right-[-16vw] top-1/2 h-[82vh] w-[82vh] -translate-y-1/2 rounded-full bg-gradient-to-br from-stone-100/20 via-stone-500/20 to-black material-noise blur-[0.2px]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="max-w-4xl">
            <SectionLabel dark>04 / tactile experience</SectionLabel>
            <h2 className="font-serif text-[18vw] leading-[0.84] text-bone md:text-[9vw]">Matter with memory.<br />Form with intention.</h2>
            <p className="mt-10 max-w-xl text-xl leading-8 text-white/56">
              Edges hold detail. Surfaces gather light. Each panel carries a composed trace of its reclaimed origin without becoming nostalgia.
            </p>
          </motion.div>
        </div>
      </section>

      <section id="worlds" className="min-h-screen bg-bone px-5 py-24 text-black md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mb-12 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <SectionLabel>05 / application worlds</SectionLabel>
              <h2 className="max-w-4xl text-6xl font-semibold tracking-cinematic md:text-8xl">Spatial systems, not product placements.</h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-black/50">Designed for the spaces where touch, brand, and architectural permanence converge.</p>
          </motion.div>
          <div className="grid gap-4 lg:grid-cols-5">
            {applications.map(([title, text], index) => (
              <motion.article key={title} {...fadeUp} transition={{ ...fadeUp.transition, delay: index * 0.06 }} className="group relative min-h-[420px] overflow-hidden rounded-[1.6rem] bg-black p-6 text-white">
                <div className={`absolute inset-0 bg-gradient-to-br ${finishes[index % finishes.length].gradient} opacity-70 transition duration-700 group-hover:scale-110 group-hover:opacity-95 material-noise`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="relative flex h-full flex-col justify-end">
                  <p className="mb-4 text-[0.65rem] uppercase tracking-label text-white/45">0{index + 1}</p>
                  <h3 className="font-serif text-5xl">{title}</h3>
                  <p className="mt-5 translate-y-4 text-sm leading-6 text-white/0 transition duration-500 group-hover:translate-y-0 group-hover:text-white/70">{text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="grid min-h-screen items-center bg-[#070707] px-5 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <motion.div {...fadeUp} className="mb-16 max-w-3xl">
            <SectionLabel dark>06 / performance system</SectionLabel>
            <h2 className="text-6xl font-semibold tracking-cinematic md:text-8xl">Performance disappears into possibility.</h2>
          </motion.div>
          <div className="grid gap-px overflow-hidden rounded-[2rem] bg-white/10 md:grid-cols-3">
            {performance.map(([title, text, Icon], index) => (
              <motion.div key={title as string} {...fadeUp} transition={{ ...fadeUp.transition, delay: Number(index) * 0.04 }} className="bg-[#10100f] p-8 md:p-10">
                <Icon className="mb-12 h-6 w-6 text-white/55" />
                <h3 className="text-2xl text-white">{title as string}</h3>
                <p className="mt-3 text-sm leading-6 text-white/45">{text as string}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="library" className="grid min-h-screen items-center bg-white px-5 py-24 text-black md:px-10">
        <div className="mx-auto grid max-w-7xl gap-14 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <motion.div {...fadeUp}>
            <SectionLabel>07 / material library</SectionLabel>
            <h2 className="text-6xl font-semibold tracking-cinematic md:text-8xl">Choose a surface language.</h2>
            <p className="mt-8 max-w-md text-lg leading-8 text-black/55">A curated finish system for designers who need material atmosphere before specification.</p>
            <div className="mt-12 grid gap-3">
              {finishes.map((finish) => (
                <button key={finish.name} onClick={() => setActiveFinish(finish)} className={`flex items-center justify-between rounded-full border px-4 py-3 text-left transition ${activeFinish.name === finish.name ? 'border-black bg-black text-white' : 'border-black/10 hover:border-black/40'}`}>
                  <span className="flex items-center gap-4">
                    <span className={`h-9 w-9 rounded-full bg-gradient-to-br ${finish.gradient} material-noise`} />
                    <span>
                      <span className="block text-sm font-medium">{finish.name}</span>
                      <span className={`block text-xs ${activeFinish.name === finish.name ? 'text-white/55' : 'text-black/45'}`}>{finish.descriptor}</span>
                    </span>
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div layout className="relative">
            <div className="absolute -inset-10 rounded-full blur-3xl" style={{ background: activeFinish.accent, opacity: 0.22 }} />
            <MaterialPlane finish={activeFinish} className="relative mx-auto aspect-[1/1.62] w-[72vw] max-w-[520px]" />
          </motion.div>
        </div>
      </section>

      <section id="sample" className="relative min-h-screen overflow-hidden bg-[#050505] px-5 py-24 md:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(255,255,255,0.12),transparent_25%),radial-gradient(circle_at_15%_88%,rgba(214,211,203,0.12),transparent_26%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-16 md:grid-cols-[1fr_0.9fr] md:items-center">
          <motion.div {...fadeUp}>
            <SectionLabel dark>08 / conversion</SectionLabel>
            <h2 className="font-serif text-[18vw] leading-[0.84] text-bone md:text-[8.6vw]">Request the Sample Experience</h2>
            <p className="mt-10 max-w-xl text-2xl leading-tight text-white/58 md:text-4xl">
              Feel the material.<br />Explore the category.<br />Design beyond convention.
            </p>
          </motion.div>
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }}>
            <ContactForm />
          </motion.div>
        </div>
        <footer className="relative mx-auto mt-24 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[0.65rem] uppercase tracking-label text-white/35 md:flex-row">
          <span>© {currentYear} ECHO</span>
          <span>Manufactured in Colombia / family-driven materials company</span>
        </footer>
      </section>
    </main>
  );
}
