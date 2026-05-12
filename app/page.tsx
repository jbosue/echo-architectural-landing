'use client';

import type { ComponentType, CSSProperties, FormEvent, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, CircleDashed, Hammer, Layers3, Move3D, Recycle, Shield, Waves } from 'lucide-react';

type Finish = {
  name: string;
  tone: string;
  gradient: string;
  accent: string;
  flecks: string;
  grain: string;
};

type MotionTransition = {
  duration: number;
  ease: readonly [number, number, number, number];
  delay?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

const finishes: Finish[] = [
  {
    name: 'Nevada Gris',
    tone: 'mineral frio',
    gradient: 'from-[#d8d5cc] via-[#9d9990] to-[#4b4a47]',
    accent: '#d8d5cc',
    flecks: 'rgba(255,255,255,0.46)',
    grain: 'rgba(35,34,32,0.28)',
  },
  {
    name: 'Fiesta',
    tone: 'negro cromatico',
    gradient: 'from-[#040404] via-[#17120f] to-[#d06a48]',
    accent: '#d06a48',
    flecks: 'rgba(239,111,67,0.66)',
    grain: 'rgba(255,255,255,0.12)',
  },
  {
    name: 'Nebula White',
    tone: 'blanco orbital',
    gradient: 'from-[#f7f4ea] via-[#dad4c7] to-[#8f897e]',
    accent: '#f7f4ea',
    flecks: 'rgba(72,67,61,0.32)',
    grain: 'rgba(255,255,255,0.5)',
  },
  {
    name: 'Carbon Static',
    tone: 'grafito profundo',
    gradient: 'from-[#050505] via-[#151515] to-[#46423b]',
    accent: '#1f1f1d',
    flecks: 'rgba(255,255,255,0.2)',
    grain: 'rgba(0,0,0,0.42)',
  },
  {
    name: 'Volcanic Ash',
    tone: 'ceniza calida',
    gradient: 'from-[#26221f] via-[#766d61] to-[#c9bca8]',
    accent: '#a39380',
    flecks: 'rgba(244,219,174,0.35)',
    grain: 'rgba(18,15,12,0.38)',
  },
  {
    name: 'Solar Dust',
    tone: 'polvo dorado',
    gradient: 'from-[#221a10] via-[#ad8750] to-[#ead49a]',
    accent: '#d4a45d',
    flecks: 'rgba(255,224,142,0.58)',
    grain: 'rgba(82,49,17,0.3)',
  },
];

const applications = [
  ['Retail', 'Espacios que capturan atención.', '/images/app-retail.jpg'],
  ['Hospitalidad', 'Atmósferas que permanecen.', '/images/app-hospitality.jpg'],
  ['Espacios de trabajo', 'Identidad construida desde la superficie.', '/images/app-workspace.jpg'],
  ['Mobiliario', 'Objetos convertidos en declaración.', '/images/app-furniture.jpg'],
  ['Exhibición', 'Presencia temporal. Impacto duradero.', '/images/app-exhibition.jpg'],
];

const performance: Array<[string, ComponentType<{ className?: string }>]> = [
  ['Ligero', Layers3],
  ['Duradero', Shield],
  ['Termoformable', Move3D],
  ['Resistente a humedad', Waves],
  ['Precisión mecanizable', Hammer],
  ['Composición circular', Recycle],
];

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 56, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: true, margin: '-18%' },
  transition: { duration: 1.15, ease, delay } as MotionTransition,
});

function SectionKicker({ children, dark = true }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`mb-7 text-[0.62rem] uppercase tracking-[0.36em] ${dark ? 'text-white/36' : 'text-black/36'}`}>
      {children}
    </p>
  );
}

function EditorialSection({
  id,
  children,
  className = '',
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative min-h-screen overflow-hidden px-5 py-24 md:px-10 ${className}`}>
      {children}
    </section>
  );
}

function MaterialTexture({ finish, className = '' }: { finish: Finish; className?: string }) {
  return (
    <div
      className={`material-render relative overflow-hidden bg-gradient-to-br ${finish.gradient} ${className}`}
      style={
        {
          '--fleck-color': finish.flecks,
          '--grain-color': finish.grain,
        } as CSSProperties
      }
    >
      <div className="absolute inset-0 material-depth" />
      <div className="absolute inset-0 material-sheen" />
    </div>
  );
}

function FloatingPanel({ finish, compact = false }: { finish: Finish; compact?: boolean }) {
  return (
    <div className="panel-stage">
      <motion.div
        className={`panel-3d ${compact ? 'h-[52vh] max-h-[620px] w-[54vw] max-w-[390px]' : 'h-[68vh] max-h-[760px] w-[58vw] max-w-[520px]'}`}
        animate={{ rotateY: [-11, 8, -11], rotateX: [5, -2, 5], y: [0, -18, 0] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      >
        <MaterialTexture finish={finish} className="absolute inset-0 rounded-[6px]" />
        <div className="panel-edge panel-edge-right" />
        <div className="panel-edge panel-edge-bottom" />
      </motion.div>
    </div>
  );
}

function HeroVisual() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 0.18], [1.07, 1.18]);
  const y = useTransform(scrollYProgress, [0, 0.18], [0, -80]);

  return (
    <motion.div style={{ scale, y }} className="absolute inset-0">
      <img
        src="/images/hero-macro.jpg"
        alt=""
        className="h-full w-full object-cover opacity-62 [object-position:62%_52%]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.74)_26%,rgba(0,0,0,0.18)_58%,#000_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_54%,rgba(255,255,255,0.18),transparent_18%),linear-gradient(180deg,#000_0%,transparent_36%,#000_100%)]" />
    </motion.div>
  );
}

function TraditionalMorph() {
  const pieces = ['Piedra.', 'Madera.', 'Laminados.'];

  return (
    <div className="relative h-[58vh] min-h-[420px]">
      {pieces.map((piece, index) => (
        <motion.div
          key={piece}
          initial={{ opacity: 0, x: -60, rotate: index * 2 - 4 }}
          whileInView={{ opacity: 1, x: 0, rotate: index * -3 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.1, ease, delay: index * 0.18 }}
          className="absolute left-0 top-1/2 h-20 w-[62vw] max-w-[720px] origin-left border border-white/12 bg-white/[0.035] backdrop-blur-md md:h-28"
          style={{ transform: `translateY(${(index - 1) * 96}px)` }}
        >
          <span className="absolute left-6 top-1/2 -translate-y-1/2 font-serif text-4xl text-white/44 md:text-7xl">{piece}</span>
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, scale: 0.88, rotate: -8 }}
        whileInView={{ opacity: 1, scale: 1, rotate: -2 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 1.4, ease, delay: 0.74 }}
        className="absolute bottom-0 right-0 h-[42vh] w-[44vw] min-w-[280px] max-w-[540px]"
      >
        <MaterialTexture finish={finishes[1]} className="h-full rounded-[6px] shadow-[0_60px_180px_rgba(0,0,0,0.7)]" />
      </motion.div>
    </div>
  );
}

function SensoryTriptych() {
  return (
    <div className="grid min-h-[76vh] gap-3 md:grid-cols-[1.2fr_0.8fr_0.7fr]">
      <motion.div {...reveal()} className="relative overflow-hidden rounded-[4px]">
        <img src="/images/material-banner.jpg" alt="" className="h-full min-h-[520px] w-full object-cover [object-position:50%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.55))]" />
      </motion.div>
      <motion.div {...reveal(0.12)} className="relative overflow-hidden rounded-[4px] bg-[#111]">
        <img src="/images/sensory-water.jpg" alt="" className="h-full min-h-[520px] w-full object-cover [object-position:50%_50%]" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-white/50 shadow-[0_0_42px_rgba(255,255,255,0.6)]" />
      </motion.div>
      <motion.div {...reveal(0.22)} className="relative overflow-hidden rounded-[4px] bg-bone">
        <img src="/images/sensory-cut.jpg" alt="" className="h-full min-h-[520px] w-full object-cover [object-position:50%_50%]" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-black/25" />
      </motion.div>
    </div>
  );
}

function ApplicationCard({ title, text, image, index }: { title: string; text: string; image: string; index: number }) {
  return (
    <motion.article
      {...reveal(index * 0.06)}
      className="group relative flex min-h-[68vh] overflow-hidden rounded-[6px] border border-white/8 bg-[#0d0d0b]"
    >
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.18)_38%,rgba(0,0,0,0.9)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.35),transparent_42%,rgba(0,0,0,0.2))]" />
      <div className="relative mt-auto p-6 md:p-8">
        <p className="mb-5 text-[0.62rem] uppercase tracking-[0.32em] text-white/34">0{index + 1}</p>
        <h3 className="font-serif text-5xl leading-none text-bone md:text-6xl">{title}</h3>
        <p className="mt-6 max-w-[18rem] text-base leading-7 text-white/62">{text}</p>
      </div>
    </motion.article>
  );
}

function TechnicalExplode() {
  return (
    <div className="relative h-[62vh] min-h-[460px]">
      {[0, 1, 2].map((layer) => (
        <motion.div
          key={layer}
          initial={{ opacity: 0, x: 60, y: 40 }}
          whileInView={{ opacity: 1, x: layer * 34, y: layer * -34 }}
          viewport={{ once: true, margin: '-20%' }}
          transition={{ duration: 1.2, ease, delay: layer * 0.12 }}
          className="absolute left-[12%] top-[22%] h-[42vh] w-[62vw] max-w-[620px] rounded-[6px] border border-white/12 shadow-[0_50px_140px_rgba(0,0,0,0.48)]"
        >
          <MaterialTexture finish={finishes[layer + 1]} className="h-full rounded-[6px]" />
        </motion.div>
      ))}
      <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const fields = ['Nombre', 'Estudio o empresa', 'Correo electrónico', 'Tipo de proyecto', 'Etapa del proyecto'];

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="relative border-t border-white/18 pt-8">
      <motion.div
        initial={false}
        animate={submitted ? { opacity: 1, y: 0, pointerEvents: 'auto' } : { opacity: 0, y: 24, pointerEvents: 'none' }}
        className="absolute inset-0 z-10 flex flex-col justify-center bg-[#030303]/96 backdrop-blur-xl"
      >
        <CircleDashed className="mb-9 h-9 w-9 animate-spin text-white/45 [animation-duration:9s]" />
        <p className="max-w-lg font-serif text-5xl leading-[0.95] text-bone md:text-7xl">Tu exploración comienza aquí.</p>
      </motion.div>
      <form onSubmit={onSubmit} className="grid gap-5">
        {fields.map((field) => (
          <label key={field} className="block">
            <span className="mb-2 block text-[0.62rem] uppercase tracking-[0.32em] text-white/34">{field}</span>
            <input
              required
              type={field === 'Correo electrónico' ? 'email' : 'text'}
              className="w-full border-b border-white/18 bg-transparent py-4 text-lg text-white outline-none transition focus:border-white"
            />
          </label>
        ))}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <button className="inline-flex items-center justify-center rounded-[4px] bg-bone px-7 py-4 text-sm font-medium uppercase tracking-[0.18em] text-black transition hover:bg-white">
            Solicitar muestra
            <ArrowRight className="ml-3 h-4 w-4" />
          </button>
          <button type="button" className="rounded-[4px] border border-white/18 px-7 py-4 text-sm uppercase tracking-[0.18em] text-white/74 transition hover:border-white/55 hover:text-white">
            Agendar asesoría
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Home() {
  const [activeFinish, setActiveFinish] = useState(finishes[0]);
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <main className="bg-[#030303] text-white selection:bg-bone selection:text-black">
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-6 mix-blend-difference md:px-10">
        <a href="#hero" className="text-sm font-semibold tracking-[0.5em] text-white">ECHO</a>
        <div className="hidden gap-8 text-[0.62rem] uppercase tracking-[0.32em] text-white/70 md:flex">
          <a href="#revelacion">Materia</a>
          <a href="#universos">Universos</a>
          <a href="#biblioteca">Biblioteca</a>
          <a href="#contacto">Contacto</a>
        </div>
      </nav>

      <EditorialSection id="hero" className="grid place-items-center bg-black text-center">
        <HeroVisual />
        <motion.div {...reveal(0.12)} className="relative z-10 mx-auto max-w-[92rem]">
          <h1 className="editorial-headline text-[20vw] leading-[0.78] md:text-[12vw]">
            EL SIGUIENTE<br />LENGUAJE<br />MATERIAL
          </h1>
          <p className="mx-auto mt-10 max-w-2xl text-lg leading-8 text-white/68 md:text-2xl">
            Una nueva categoría de superficies arquitectónicas diseñada para espacios que rechazan la repetición.
          </p>
          <a href="#disrupcion" className="mt-12 inline-flex items-center rounded-[4px] border border-white/22 px-7 py-4 text-sm uppercase tracking-[0.2em] text-white transition hover:border-white hover:bg-white hover:text-black">
            Explorar el material <ArrowRight className="ml-3 h-4 w-4" />
          </a>
        </motion.div>
        <div className="absolute bottom-7 left-1/2 z-10 -translate-x-1/2 text-[0.62rem] uppercase tracking-[0.34em] text-white/42">
          Desliza para descubrir
        </div>
      </EditorialSection>

      <EditorialSection id="disrupcion" className="grid items-center bg-[#050505]">
        <div className="mx-auto grid w-full max-w-7xl gap-16 md:grid-cols-[0.95fr_1.05fr] md:items-center">
          <div>
            <SectionKicker>02 / Disrupción</SectionKicker>
            <motion.h2 {...reveal()} className="max-w-4xl font-serif text-[12vw] leading-[0.92] text-bone md:text-[5.8vw]">
              La arquitectura lleva demasiado tiempo hablando con los mismos materiales
            </motion.h2>
            <motion.div {...reveal(0.18)} className="mt-12 max-w-md text-2xl leading-10 text-white/58">
              <p>Piedra.</p>
              <p>Madera.</p>
              <p>Laminados.</p>
              <p className="mt-8">El diseño ha evolucionado. Los materiales no al mismo ritmo.</p>
              <p className="mt-10 font-serif text-5xl text-white">Hasta ahora.</p>
            </motion.div>
          </div>
          <TraditionalMorph />
        </div>
      </EditorialSection>

      <EditorialSection id="revelacion" className="grid items-center bg-bone text-black">
        <div className="mx-auto grid w-full max-w-7xl gap-12 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <motion.div {...reveal()}>
            <SectionKicker dark={false}>03 / Revelación</SectionKicker>
            <h2 className="max-w-4xl text-[14vw] font-semibold leading-[0.82] md:text-[7vw]">
              Una nueva categoría de materia arquitectónica
            </h2>
            <p className="mt-10 max-w-xl text-xl leading-8 text-black/62">
              Paneles de polímero recuperado diseñados con precisión para arquitectura expresiva a gran escala.
            </p>
            <div className="mt-14 grid max-w-xl grid-cols-2 gap-px bg-black/14 text-[0.68rem] uppercase tracking-[0.24em] text-black/62">
              {['1.25 × 2.50 m', '10–25 mm', 'Precisión mecanizable', 'Libertad termoformable'].map((spec) => (
                <div key={spec} className="bg-bone p-5">{spec}</div>
              ))}
            </div>
          </motion.div>
          <FloatingPanel finish={finishes[0]} />
        </div>
      </EditorialSection>

      <EditorialSection className="grid items-center bg-[#080807]">
        <div className="mx-auto w-full max-w-7xl">
          <motion.div {...reveal()} className="max-w-4xl">
            <SectionKicker>04 / Diferencia</SectionKicker>
            <h2 className="text-[13vw] font-semibold leading-[0.84] md:text-[7vw]">Diseñado más allá de lo convencional</h2>
          </motion.div>
          <div className="mt-20 grid gap-px bg-white/12 md:grid-cols-2">
            <motion.div {...reveal(0.1)} className="bg-[#10100f] p-7 md:p-12">
              <p className="mb-12 text-[0.62rem] uppercase tracking-[0.34em] text-white/34">Superficies tradicionales</p>
              {['Limitaciones rígidas', 'Acabados previsibles', 'Lenguaje visual repetido', 'Expresión limitada'].map((item) => (
                <p key={item} className="border-t border-white/10 py-7 font-serif text-4xl text-white/38 md:text-6xl">{item}</p>
              ))}
            </motion.div>
            <motion.div {...reveal(0.2)} className="bg-bone p-7 text-black md:p-12">
              <p className="mb-12 text-[0.62rem] uppercase tracking-[0.34em] text-black/36">ECHO</p>
              {['Versatilidad escultórica', 'Precisión mecanizable', 'Libertad formal', 'Inteligencia material'].map((item) => (
                <p key={item} className="border-t border-black/12 py-7 font-serif text-4xl md:text-6xl">{item}</p>
              ))}
            </motion.div>
          </div>
          <motion.p {...reveal(0.18)} className="mt-16 text-center font-serif text-5xl text-bone md:text-7xl">
            El diseño comienza donde termina la convención.
          </motion.p>
        </div>
      </EditorialSection>

      <EditorialSection className="bg-black">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mb-16 max-w-3xl">
            <SectionKicker>05 / Experiencia sensorial</SectionKicker>
            <h2 className="font-serif text-[16vw] leading-[0.86] text-bone md:text-[8vw]">Materia con memoria.<br />Forma con intención.</h2>
            <div className="mt-10 space-y-4 text-xl leading-8 text-white/58">
              <p>La luz responde distinto.</p>
              <p>La textura permanece.</p>
              <p>Cada borde cuenta una historia espacial.</p>
            </div>
          </motion.div>
          <SensoryTriptych />
        </div>
      </EditorialSection>

      <EditorialSection id="universos" className="bg-[#f1eee6] text-black">
        <div className="mx-auto max-w-7xl">
          <motion.div {...reveal()} className="mb-14 flex flex-col justify-between gap-10 md:flex-row md:items-end">
            <div>
              <SectionKicker dark={false}>06 / Universos de aplicación</SectionKicker>
              <h2 className="max-w-5xl text-[12vw] font-semibold leading-[0.84] md:text-[6.6vw]">Arquitectura, superficie, presencia.</h2>
            </div>
          </motion.div>
          <div className="grid gap-3 lg:grid-cols-5">
            {applications.map(([title, text, image], index) => (
              <ApplicationCard key={title} title={title} text={text} image={image} index={index} />
            ))}
          </div>
        </div>
      </EditorialSection>

      <EditorialSection className="grid items-center bg-[#050505]">
        <div className="mx-auto grid w-full max-w-7xl gap-16 md:grid-cols-[0.85fr_1.15fr] md:items-center">
          <div>
            <motion.div {...reveal()}>
              <SectionKicker>07 / Rendimiento</SectionKicker>
              <h2 className="text-[13vw] font-semibold leading-[0.84] md:text-[6.8vw]">Belleza respaldada por desempeño</h2>
            </motion.div>
            <div className="mt-14 grid grid-cols-2 gap-px bg-white/10 md:grid-cols-3">
              {performance.map(([item, Icon], index) => (
                <motion.div key={item} {...reveal(index * 0.04)} className="group bg-[#10100f] p-6 transition hover:bg-bone hover:text-black md:p-8">
                  <Icon className="mb-12 h-5 w-5 text-current opacity-55 transition group-hover:rotate-6" />
                  <p className="min-h-14 text-xl leading-tight md:text-2xl">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
          <TechnicalExplode />
        </div>
      </EditorialSection>

      <EditorialSection id="biblioteca" className="grid items-center bg-bone text-black">
        <div className="mx-auto grid w-full max-w-7xl gap-16 md:grid-cols-[0.82fr_1.18fr] md:items-center">
          <motion.div {...reveal()}>
            <SectionKicker dark={false}>08 / Biblioteca material</SectionKicker>
            <h2 className="text-[15vw] font-semibold leading-[0.82] md:text-[7.6vw]">Curar lo inesperado</h2>
            <p className="mt-8 max-w-md text-xl leading-8 text-black/58">Una paleta creada para la individualidad arquitectónica.</p>
            <div className="mt-12 grid gap-px bg-black/12">
              {finishes.map((finish) => (
                <button
                  key={finish.name}
                  onClick={() => setActiveFinish(finish)}
                  className={`group grid grid-cols-[2.8rem_1fr_auto] items-center gap-4 px-4 py-4 text-left transition ${activeFinish.name === finish.name ? 'bg-black text-white' : 'bg-bone hover:bg-white'}`}
                >
                  <span className={`h-10 w-10 rounded-[4px] bg-gradient-to-br ${finish.gradient} material-render`} />
                  <span>
                    <span className="block text-lg">{finish.name}</span>
                    <span className={`block text-xs uppercase tracking-[0.22em] ${activeFinish.name === finish.name ? 'text-white/42' : 'text-black/42'}`}>{finish.tone}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 opacity-45 transition group-hover:translate-x-1" />
                </button>
              ))}
            </div>
          </motion.div>
          <motion.div layout className="relative min-h-[78vh]">
            <div className="absolute inset-0 rounded-full blur-3xl" style={{ background: activeFinish.accent, opacity: 0.18 }} />
            <FloatingPanel finish={activeFinish} compact />
          </motion.div>
        </div>
      </EditorialSection>

      <EditorialSection className="grid items-center bg-black">
        <img src="/images/origin-human.jpg" alt="" className="absolute inset-0 h-full w-full object-cover opacity-36 [object-position:55%_50%]" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#000_0%,rgba(0,0,0,0.78)_46%,rgba(0,0,0,0.28)_100%),linear-gradient(180deg,#000_0%,transparent_34%,#000_100%)]" />
        <motion.div {...reveal()} className="relative mx-auto w-full max-w-7xl">
          <SectionKicker>09 / Origen</SectionKicker>
          <h2 className="max-w-5xl font-serif text-[15vw] leading-[0.86] text-bone md:text-[7.8vw]">
            Diseñado en Colombia.<br />Pensado para cualquier lugar.
          </h2>
          <div className="mt-12 max-w-xl space-y-5 text-xl leading-8 text-white/62">
            <p>ECHO transforma materiales recuperados en permanencia arquitectónica.</p>
            <p>Una visión familiar convertida en innovación espacial.</p>
          </div>
        </motion.div>
      </EditorialSection>

      <EditorialSection id="contacto" className="bg-[#030303]">
        <img src="/images/sample-kit.jpg" alt="" className="absolute right-0 top-0 hidden h-full w-[42vw] object-cover opacity-20 md:block" />
        <div className="absolute right-0 top-0 hidden h-full w-[50vw] bg-[linear-gradient(90deg,#030303_0%,rgba(3,3,3,0.72)_35%,rgba(3,3,3,0.2)_100%)] md:block" />
        <div className="mx-auto grid min-h-[82vh] w-full max-w-7xl gap-16 md:grid-cols-[1fr_0.85fr] md:items-center">
          <motion.div {...reveal()}>
            <SectionKicker>10 / Conversión</SectionKicker>
            <h2 className="font-serif text-[16vw] leading-[0.82] text-bone md:text-[8.2vw]">Solicita la experiencia material</h2>
            <p className="mt-12 max-w-xl text-3xl leading-tight text-white/58 md:text-5xl">
              Descubre la superficie.<br />Entiende la categoría.<br />Diseña sin repetir.
            </p>
          </motion.div>
          <motion.div {...reveal(0.16)}>
            <ContactForm />
          </motion.div>
        </div>
        <footer className="relative mx-auto mt-20 flex max-w-7xl flex-col justify-between gap-4 border-t border-white/10 pt-8 text-[0.62rem] uppercase tracking-[0.32em] text-white/30 md:flex-row">
          <span>(c) {year} ECHO</span>
          <span>Materia arquitectónica recuperada / Colombia</span>
        </footer>
      </EditorialSection>
    </main>
  );
}
