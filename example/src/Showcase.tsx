import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
  useTheme,
} from "@unisimon/metrik-ui";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  GraduationCap,
  Info,
  Moon,
  MoreHorizontal,
  Plus,
  Search,
  Sun,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

/* ════════════════════════════════════════════════════════════════════════
   Navegación
   ════════════════════════════════════════════════════════════════════════ */
const NAV: { group: string; items: { id: string; label: string }[] }[] = [
  {
    group: "Fundamentos",
    items: [
      { id: "paleta", label: "Paleta de color" },
      { id: "tokens", label: "Tokens · radius · sombra" },
      { id: "tipografia", label: "Tipografía" },
    ],
  },
  {
    group: "Componentes",
    items: [
      { id: "botones", label: "Button" },
      { id: "badges", label: "Badge" },
      { id: "alertas", label: "Alert" },
      { id: "formularios", label: "Formularios" },
      { id: "overlays", label: "Overlays" },
      { id: "navegacion", label: "Navegación · Tabs" },
      { id: "feedback", label: "Feedback · Loading" },
    ],
  },
  {
    group: "Patrones",
    items: [
      { id: "dashboard", label: "Dashboard demo" },
      { id: "hooks", label: "Hooks & utils" },
    ],
  },
];

/* ════════════════════════════════════════════════════════════════════════
   Helpers de presentación
   ════════════════════════════════════════════════════════════════════════ */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids.join(",")]);
  return active;
}

function Section({
  id,
  index,
  title,
  desc,
  children,
}: {
  id: string;
  index: string;
  title: string;
  desc: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="reveal scroll-mt-24 border-t border-border pt-14">
      <header className="mb-7 flex flex-col gap-2">
        <span className="font-mono text-xs tracking-widest text-primary">{index}</span>
        <h2 className="font-display text-3xl font-bold leading-none text-fg sm:text-4xl">{title}</h2>
        <p className="max-w-2xl text-sm leading-relaxed text-fg-muted">{desc}</p>
      </header>
      {children}
    </section>
  );
}

/** Panel de demostración con cuadrícula técnica. */
function Stage({
  children,
  label,
  grid = true,
  className,
}: {
  children: ReactNode;
  label?: string;
  grid?: boolean;
  className?: string;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-xs">
      {label && (
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="size-1.5 rounded-full bg-accent" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-fg-subtle">{label}</span>
        </div>
      )}
      <div className={cn("p-6 sm:p-8", grid && "metrik-stage", className)}>{children}</div>
    </div>
  );
}

/** Etiqueta de una fila de variantes. */
function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 border-b border-dashed border-border py-4 first:pt-0 last:border-0 last:pb-0 sm:flex-row sm:items-center">
      <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
        {label}
      </span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   Datos de paleta
   ════════════════════════════════════════════════════════════════════════ */
const RAMPS: { name: string; varBase: string }[] = [
  { name: "teal", varBase: "teal" },
  { name: "coral", varBase: "coral" },
  { name: "slate", varBase: "slate" },
];
const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

const SEMANTIC: { token: string; cssVar: string; note: string }[] = [
  { token: "bg", cssVar: "--metrik-bg", note: "Fondo de la app" },
  { token: "surface", cssVar: "--metrik-surface", note: "Cards · panels" },
  { token: "surface-muted", cssVar: "--metrik-surface-muted", note: "Hover · zonas suaves" },
  { token: "border", cssVar: "--metrik-border", note: "Bordes sutiles" },
  { token: "fg", cssVar: "--metrik-fg", note: "Texto principal" },
  { token: "fg-muted", cssVar: "--metrik-fg-muted", note: "Texto secundario" },
  { token: "primary", cssVar: "--metrik-primary", note: "CTA · marca" },
  { token: "accent", cssVar: "--metrik-accent", note: "Resaltar · coral" },
  { token: "success", cssVar: "--metrik-success", note: "Estados positivos" },
  { token: "danger", cssVar: "--metrik-danger", note: "Errores · destructivo" },
  { token: "warning", cssVar: "--metrik-warning", note: "Advertencias" },
];

const HOOKS: { name: string; desc: string }[] = [
  { name: "useTheme()", desc: "Light · dark · system con persistencia en localStorage." },
  { name: "useDisclosure()", desc: "Estado open/close para overlays, modales y drawers." },
  { name: "useMediaQuery()", desc: "Suscripción a media queries · incluye useBreakpoint." },
  { name: "useDebounce()", desc: "Valor debounced · ideal para inputs de búsqueda." },
  { name: "useLocalStorage()", desc: "Estado sincronizado con localStorage entre pestañas." },
  { name: "useClickOutside()", desc: "Cierra paneles al hacer click fuera del elemento." },
  { name: "useToggle()", desc: "Helper minimal para alternar booleanos." },
];

const ALL_IDS = NAV.flatMap((g) => g.items.map((i) => i.id));

/* ════════════════════════════════════════════════════════════════════════
   Página
   ════════════════════════════════════════════════════════════════════════ */
export function Showcase() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const active = useScrollSpy(["overview", ...ALL_IDS]);
  useReveal();
  const isDark = resolvedTheme === "dark";

  return (
    <div className="metrik-canvas min-h-screen bg-bg text-fg">
      <div className="mx-auto flex max-w-[1400px] gap-0 lg:gap-10 lg:px-8">
        <Sidebar active={active} isDark={isDark} toggleTheme={toggleTheme} />

        <main className="min-w-0 flex-1 px-5 pb-28 sm:px-8 lg:px-0">
          <Hero isDark={isDark} toggleTheme={toggleTheme} />

          <div className="space-y-16">
            <PaletteSection />
            <TokensSection />
            <TypographySection />
            <ButtonsSection />
            <BadgesSection />
            <AlertsSection />
            <FormsSection />
            <OverlaysSection />
            <NavSection />
            <FeedbackSection />
            <DashboardSection />
            <HooksSection />
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
}

/* ─── Sidebar ──────────────────────────────────────────────────────────── */
function Sidebar({
  active,
  isDark,
  toggleTheme,
}: {
  active: string;
  isDark: boolean;
  toggleTheme: () => void;
}) {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border py-8 pr-6 lg:flex">
      <a href="#overview" className="mb-10 flex items-center gap-3">
        <span className="grid size-9 place-items-center rounded-lg border-2 border-primary">
          <span className="size-3.5 rounded-sm bg-accent" />
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-bold tracking-tight">Metrik UI</span>
          <span className="font-mono text-[10px] tracking-widest text-fg-subtle">@unisimon · v0.1</span>
        </span>
      </a>

      <nav className="flex-1 space-y-7 overflow-y-auto pr-1">
        {NAV.map((group) => (
          <div key={group.group}>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-fg-subtle">
              {group.group}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const on = active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className={cn(
                        "flex items-center gap-2.5 rounded-md py-1.5 pl-3 pr-2 text-sm transition-colors duration-fast",
                        on
                          ? "bg-primary-soft font-medium text-primary"
                          : "text-fg-muted hover:bg-surface-muted hover:text-fg",
                      )}
                    >
                      <span
                        className={cn(
                          "h-3.5 w-px transition-colors",
                          on ? "bg-primary" : "bg-transparent",
                        )}
                      />
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label="Cambiar tema"
        aria-pressed={isDark}
        className="mt-6 flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2.5 text-sm transition-colors duration-fast hover:bg-surface-muted"
      >
        <span className="flex items-center gap-2 text-fg-muted">
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
          {isDark ? "Modo oscuro" : "Modo claro"}
        </span>
        {/* indicador visual · no interactivo · el toggle lo maneja el botón */}
        <Switch checked={isDark} tabIndex={-1} aria-hidden className="pointer-events-none" />
      </button>
    </aside>
  );
}

/* ─── Hero ─────────────────────────────────────────────────────────────── */
function Hero({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const stats = [
    { n: "19", l: "Componentes" },
    { n: "7", l: "Hooks" },
    { n: "33", l: "Tokens" },
    { n: "2", l: "Temas" },
  ];
  return (
    <section id="overview" className="scroll-mt-8 py-14 sm:py-20">
      {/* topbar mobile */}
      <div className="mb-10 flex items-center justify-between lg:hidden">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg border-2 border-primary">
            <span className="size-3 rounded-sm bg-accent" />
          </span>
          <span className="font-display text-base font-bold">Metrik UI</span>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Cambiar tema">
          {isDark ? <Moon className="size-4" /> : <Sun className="size-4" />}
        </Button>
      </div>

      <div className="rise flex items-center gap-2" style={{ animationDelay: "40ms" }}>
        <Badge tone="primary" dot>
          v0.1.0
        </Badge>
        <span className="font-mono text-xs tracking-widest text-fg-subtle">
          DESIGN SYSTEM · CIENCIA DE DATOS
        </span>
      </div>

      <h1
        className="rise mt-5 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl"
        style={{ animationDelay: "120ms" }}
      >
        Componentes
        <br />
        <span className="text-primary">dashboards</span> de{" "}
        <span className="relative whitespace-nowrap text-accent">
          Metri-k
          <svg
            className="absolute -bottom-2 left-0 w-full text-accent/40"
            viewBox="0 0 200 12"
            fill="none"
            preserveAspectRatio="none"
          >
            <path d="M2 9C50 3 150 3 198 9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </span>
        .
      </h1>

      <p
        className="rise mt-7 max-w-xl text-base leading-relaxed text-fg-muted sm:text-lg"
        style={{ animationDelay: "200ms" }}
      >
        Librería React de la <strong className="text-fg">Universidad Simón Bolívar</strong>. Accesible,
        tipada y temable, construida sobre Radix · Tailwind · CVA. Esto es todo lo que trae.
      </p>

      <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: "280ms" }}>
        <Button
          size="lg"
          rightIcon={<ArrowUpRight />}
          onClick={() => document.getElementById("paleta")?.scrollIntoView()}
        >
          Explorar el catálogo
        </Button>
        <Button size="lg" variant="outline" leftIcon={<Copy />}>
          pnpm add @unisimon/metrik-ui
        </Button>
      </div>

      <dl
        className="rise mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4"
        style={{ animationDelay: "360ms" }}
      >
        {stats.map((s) => (
          <div key={s.l} className="bg-surface px-5 py-6">
            <dt className="font-display text-4xl font-bold tabular-nums text-fg">{s.n}</dt>
            <dd className="mt-1 font-mono text-[11px] uppercase tracking-widest text-fg-subtle">{s.l}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ─── Paleta ───────────────────────────────────────────────────────────── */
function PaletteSection() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = (v: string) => {
    navigator.clipboard?.writeText(v);
    setCopied(v);
    setTimeout(() => setCopied((c) => (c === v ? null : c)), 1200);
  };
  return (
    <Section
      id="paleta"
      index="01 · FUNDAMENTOS"
      title="Paleta de color"
      desc="Tres rampas primitivas (teal, coral, slate) y once tokens semánticos que se reasignan automáticamente en modo oscuro. Haz click en un token para copiarlo."
    >
      <div className="space-y-8">
        {/* rampas primitivas */}
        <div className="space-y-5">
          {RAMPS.map((ramp) => (
            <div key={ramp.name}>
              <div className="mb-2 flex items-baseline gap-2">
                <span className="font-display text-sm font-semibold capitalize">{ramp.name}</span>
                <span className="font-mono text-[11px] text-fg-subtle">--metrik-{ramp.name}-*</span>
              </div>
              <div className="flex overflow-hidden rounded-lg border border-border">
                {STEPS.map((step) => (
                  <button
                    key={step}
                    onClick={() => copy(`var(--metrik-${ramp.varBase}-${step})`)}
                    title={`--metrik-${ramp.varBase}-${step}`}
                    className="group relative h-16 flex-1 transition-transform duration-fast hover:z-10 hover:scale-105"
                    style={{ background: `var(--metrik-${ramp.varBase}-${step})` }}
                  >
                    <span
                      className={cn(
                        "absolute inset-x-0 bottom-1 text-center font-mono text-[10px] opacity-0 transition-opacity group-hover:opacity-100",
                        step >= 500 ? "text-white/90" : "text-slate-900/70",
                      )}
                    >
                      {step}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* tokens semánticos */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {SEMANTIC.map((s) => (
            <button
              key={s.token}
              onClick={() => copy(`var(${s.cssVar})`)}
              className="group flex items-center gap-3 rounded-lg border border-border bg-surface p-3 text-left transition-colors duration-fast hover:border-border-strong"
            >
              <span
                className="size-10 shrink-0 rounded-md border border-border shadow-xs"
                style={{ background: `var(${s.cssVar})` }}
              />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5 font-mono text-xs font-medium text-fg">
                  {s.token}
                  {copied === `var(${s.cssVar})` ? (
                    <Check className="size-3 text-success" />
                  ) : (
                    <Copy className="size-3 text-fg-subtle opacity-0 transition-opacity group-hover:opacity-100" />
                  )}
                </span>
                <span className="block truncate text-xs text-fg-muted">{s.note}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─── Tokens (radius / shadow / motion) ────────────────────────────────── */
function TokensSection() {
  const radii = ["sm", "md", "lg", "xl"] as const;
  const shadows = ["xs", "sm", "md", "lg"] as const;
  return (
    <Section
      id="tokens"
      index="02 · FUNDAMENTOS"
      title="Radius · sombra · motion"
      desc="Escalas consistentes expuestas como variables CSS y clases utility de Tailwind (rounded-*, shadow-*, duration-*)."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label="border-radius" grid={false}>
          <div className="flex flex-wrap items-end gap-6">
            {radii.map((r) => (
              <div key={r} className="flex flex-col items-center gap-2">
                <div
                  className="size-20 border-2 border-primary bg-primary-soft"
                  style={{ borderRadius: `var(--metrik-radius-${r})` }}
                />
                <span className="font-mono text-[11px] text-fg-muted">rounded-{r}</span>
              </div>
            ))}
          </div>
        </Stage>

        <Stage label="box-shadow" grid={false}>
          <div className="flex flex-wrap items-center gap-7">
            {shadows.map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div
                  className="grid size-20 place-items-center rounded-lg bg-surface"
                  style={{ boxShadow: `var(--metrik-shadow-${s})` }}
                >
                  <span className="font-mono text-xs text-fg-subtle">{s}</span>
                </div>
                <span className="font-mono text-[11px] text-fg-muted">shadow-{s}</span>
              </div>
            ))}
          </div>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Tipografía ───────────────────────────────────────────────────────── */
function TypographySection() {
  const scale = [
    { cls: "text-4xl font-bold", lbl: "Display / 36", txt: "Cohorte 2024-II" },
    { cls: "text-2xl font-semibold", lbl: "Título / 24", txt: "Indicadores clave" },
    { cls: "text-base", lbl: "Cuerpo / 16", txt: "Texto de párrafo para descripciones y contenido general del dashboard." },
    { cls: "text-sm text-fg-muted", lbl: "Small / 14", txt: "Etiquetas, ayudas y metadatos secundarios." },
    { cls: "font-mono text-xs uppercase tracking-widest text-fg-subtle", lbl: "Mono / 12", txt: "KPI · TENDENCIA · COHORTE" },
  ];
  return (
    <Section
      id="tipografia"
      index="03 · FUNDAMENTOS"
      title="Tipografía"
      desc="La escala tipográfica usa números tabulares para alinear cifras en KPIs y tablas. tabular-nums está disponible como utility."
    >
      <Stage label="type scale" grid={false}>
        <div className="divide-y divide-border">
          {scale.map((s) => (
            <div key={s.lbl} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-6">
              <span className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                {s.lbl}
              </span>
              <span className={cn("min-w-0", s.cls)}>{s.txt}</span>
            </div>
          ))}
        </div>
      </Stage>
    </Section>
  );
}

/* ─── Buttons ──────────────────────────────────────────────────────────── */
function ButtonsSection() {
  return (
    <Section
      id="botones"
      index="04 · COMPONENTES"
      title="Button"
      desc="6 variantes · 4 tamaños · estados loading y disabled · iconos izquierda/derecha · asChild para renderizar como enlace."
    >
      <Stage label="<Button />">
        <div className="space-y-1">
          <Row label="variant">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link →</Button>
          </Row>
          <Row label="size">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button size="icon" aria-label="Añadir">
              <Plus />
            </Button>
          </Row>
          <Row label="icon">
            <Button leftIcon={<Download />}>Descargar</Button>
            <Button variant="outline" rightIcon={<ArrowUpRight />}>
              Ver reporte
            </Button>
          </Row>
          <Row label="state">
            <Button loading>Cargando</Button>
            <Button disabled>Disabled</Button>
            <Button fullWidth className="max-w-xs">
              Full width
            </Button>
          </Row>
        </div>
      </Stage>
    </Section>
  );
}

/* ─── Badges ───────────────────────────────────────────────────────────── */
function BadgesSection() {
  const tones = ["neutral", "primary", "accent", "success", "danger", "warning", "solid"] as const;
  return (
    <Section
      id="badges"
      index="05 · COMPONENTES"
      title="Badge"
      desc="Etiquetas compactas en 7 tonos y 3 tamaños, con punto opcional para indicar estado en vivo."
    >
      <Stage label="<Badge />">
        <div className="space-y-1">
          <Row label="tone">
            {tones.map((t) => (
              <Badge key={t} tone={t}>
                {t}
              </Badge>
            ))}
          </Row>
          <Row label="size">
            <Badge size="sm">small</Badge>
            <Badge size="md">medium</Badge>
            <Badge size="lg">large</Badge>
          </Row>
          <Row label="dot">
            <Badge tone="success" dot>
              En línea
            </Badge>
            <Badge tone="danger" dot>
              Caído
            </Badge>
            <Badge tone="warning" dot>
              Degradado
            </Badge>
          </Row>
        </div>
      </Stage>
    </Section>
  );
}

/* ─── Alerts ───────────────────────────────────────────────────────────── */
function AlertsSection() {
  return (
    <Section
      id="alertas"
      index="06 · COMPONENTES"
      title="Alert"
      desc="Avisos contextuales en 4 tonos con borde lateral. Soporta título, descripción e icono."
    >
      <Stage label="<Alert />" grid={false}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Alert tone="info">
            <AlertTitle>Sincronización programada</AlertTitle>
            <AlertDescription>El próximo refresco de datos será a las 8:00 AM.</AlertDescription>
          </Alert>
          <Alert tone="success">
            <AlertTitle>Datos sincronizados</AlertTitle>
            <AlertDescription>Última actualización hace 2 minutos.</AlertDescription>
          </Alert>
          <Alert tone="warning">
            <AlertTitle>Umbral cercano</AlertTitle>
            <AlertDescription>La deserción se acerca al límite del 5%.</AlertDescription>
          </Alert>
          <Alert tone="danger">
            <AlertTitle>KPI fuera de rango</AlertTitle>
            <AlertDescription>La deserción superó el umbral configurado.</AlertDescription>
          </Alert>
        </div>
      </Stage>
    </Section>
  );
}

/* ─── Forms ────────────────────────────────────────────────────────────── */
function FormsSection() {
  const [check, setCheck] = useState<boolean | "indeterminate">("indeterminate");
  return (
    <Section
      id="formularios"
      index="07 · COMPONENTES"
      title="Formularios"
      desc="Input, Textarea, Label, Select, Checkbox y Switch — todos accesibles, con foco visible y estados de validación."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label="Input · Textarea · Select" grid={false}>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="q" required>
                Búsqueda
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
                <Input id="q" placeholder="cohorte 2024-II" className="pl-9" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="ok">state · success</Label>
                <Input id="ok" defaultValue="Válido" state="success" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="err">state · error</Label>
                <Input id="err" defaultValue="Inválido" state="error" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="prog">Programa</Label>
              <Select defaultValue="sistemas">
                <SelectTrigger id="prog">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Ingenierías</SelectLabel>
                    <SelectItem value="sistemas">Ingeniería de Sistemas</SelectItem>
                    <SelectItem value="industrial">Ingeniería Industrial</SelectItem>
                  </SelectGroup>
                  <SelectGroup>
                    <SelectLabel>Sociales</SelectLabel>
                    <SelectItem value="psico">Psicología</SelectItem>
                    <SelectItem value="derecho">Derecho</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="notes">Notas</Label>
              <Textarea id="notes" placeholder="Comentarios para el equipo…" />
            </div>
          </div>
        </Stage>

        <Stage label="Checkbox · Switch · size" grid={false}>
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">checkbox</p>
              <label className="flex items-center gap-3 text-sm">
                <Checkbox defaultChecked /> Estudiantes en riesgo
              </label>
              <label className="flex items-center gap-3 text-sm">
                <Checkbox
                  checked={check}
                  onCheckedChange={(v) => setCheck(v)}
                /> Indeterminado (click)
              </label>
              <label className="flex items-center gap-3 text-sm text-fg-subtle">
                <Checkbox disabled /> Deshabilitado
              </label>
            </div>
            <Separator />
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">switch</p>
              <label className="flex items-center justify-between text-sm">
                Datos en vivo <Switch defaultChecked />
              </label>
              <label className="flex items-center justify-between text-sm">
                Notificaciones <Switch />
              </label>
              <label className="flex items-center justify-between text-sm text-fg-subtle">
                Bloqueado <Switch disabled />
              </label>
            </div>
            <Separator />
            <div className="space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">input · size</p>
              <Input size="sm" placeholder="size sm" />
              <Input size="md" placeholder="size md" />
              <Input size="lg" placeholder="size lg" />
            </div>
          </div>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Overlays ─────────────────────────────────────────────────────────── */
function OverlaysSection() {
  return (
    <Section
      id="overlays"
      index="08 · COMPONENTES"
      title="Overlays"
      desc="Dialog, DropdownMenu, Popover y Tooltip — construidos sobre primitivas Radix con focus-trap, portal y navegación por teclado."
    >
      <Stage label="Dialog · DropdownMenu · Popover · Tooltip">
        <div className="flex flex-wrap items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button leftIcon={<Download />}>Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Archivar reportes</DialogTitle>
                <DialogDescription>
                  Se moverán al baúl y podrás recuperarlos durante 30 días.
                </DialogDescription>
              </DialogHeader>
              <label className="flex items-center gap-3 py-2 text-sm">
                <Checkbox defaultChecked /> Notificar a los tutores
              </label>
              <DialogFooter>
                <Button variant="ghost" size="sm">
                  Cancelar
                </Button>
                <Button variant="danger" size="sm">
                  Sí, archivar
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" rightIcon={<MoreHorizontal />}>
                DropdownMenu
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Reporte</DropdownMenuLabel>
              <DropdownMenuItem>
                Editar <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Duplicar <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem destructive>Eliminar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="secondary">Popover</Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="space-y-2">
                <p className="font-display text-sm font-semibold">Rango de fechas</p>
                <p className="text-sm text-fg-muted">
                  Coloca aquí cualquier contenido: filtros, mini-formularios o ayuda contextual.
                </p>
                <div className="flex gap-2 pt-1">
                  <Input size="sm" placeholder="Desde" />
                  <Input size="sm" placeholder="Hasta" />
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Info">
                <Info />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Tooltip con delay configurable</TooltipContent>
          </Tooltip>
        </div>
      </Stage>
    </Section>
  );
}

/* ─── Navegación / Tabs ────────────────────────────────────────────────── */
function NavSection() {
  return (
    <Section
      id="navegacion"
      index="09 · COMPONENTES"
      title="Tabs · Separator"
      desc="Tabs en dos variantes (underline y pill) y separadores horizontales/verticales."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label='variant="underline"' grid={false}>
          <Tabs defaultValue="a">
            <TabsList variant="underline">
              <TabsTrigger value="a">Resumen</TabsTrigger>
              <TabsTrigger value="b">Filtros</TabsTrigger>
              <TabsTrigger value="c">Acciones</TabsTrigger>
            </TabsList>
            <TabsContent value="a" className="text-sm text-fg-muted">
              Vista general de la cohorte y sus indicadores principales.
            </TabsContent>
            <TabsContent value="b" className="text-sm text-fg-muted">
              Configura programa, periodo y umbrales de alerta.
            </TabsContent>
            <TabsContent value="c" className="text-sm text-fg-muted">
              Exporta, archiva o comparte el reporte con el equipo.
            </TabsContent>
          </Tabs>
        </Stage>

        <Stage label='variant="pill"' grid={false}>
          <Tabs defaultValue="a">
            <TabsList variant="pill">
              <TabsTrigger value="a">Día</TabsTrigger>
              <TabsTrigger value="b">Semana</TabsTrigger>
              <TabsTrigger value="c">Mes</TabsTrigger>
            </TabsList>
            <TabsContent value="a" className="text-sm text-fg-muted">
              Agregación diaria de eventos.
            </TabsContent>
            <TabsContent value="b" className="text-sm text-fg-muted">
              Agregación semanal · 7 días.
            </TabsContent>
            <TabsContent value="c" className="text-sm text-fg-muted">
              Agregación mensual acumulada.
            </TabsContent>
          </Tabs>
          <div className="mt-6 flex items-center gap-3 text-sm text-fg-muted">
            Inicio <Separator orientation="vertical" className="h-4" /> Cohortes
            <Separator orientation="vertical" className="h-4" /> 2024-II
          </div>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Feedback / Loading ───────────────────────────────────────────────── */
function FeedbackSection() {
  return (
    <Section
      id="feedback"
      index="10 · COMPONENTES"
      title="Avatar · Spinner · Skeleton"
      desc="Indicadores de identidad y estados de carga: avatares con fallback, spinners en 4 tamaños y skeletons con shimmer animado."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        <Stage label="<Avatar />" grid={false}>
          <div className="flex items-end gap-4">
            <Avatar size="sm">
              <AvatarFallback className="bg-primary-soft text-primary">SM</AvatarFallback>
            </Avatar>
            <Avatar size="md">
              <AvatarFallback className="bg-accent-soft text-accent">MD</AvatarFallback>
            </Avatar>
            <Avatar size="lg">
              <AvatarFallback className="bg-primary-soft text-primary">LG</AvatarFallback>
            </Avatar>
            <Avatar size="xl">
              <AvatarFallback className="bg-surface-muted">XL</AvatarFallback>
            </Avatar>
          </div>
        </Stage>

        <Stage label="<Spinner />" grid={false}>
          <div className="flex items-center gap-5">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" />
          </div>
        </Stage>

        <Stage label="<Skeleton />" grid={false}>
          <div className="flex items-center gap-3">
            <Skeleton circle className="size-12" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
            </div>
          </div>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Dashboard demo ───────────────────────────────────────────────────── */
function DashboardSection() {
  const kpis = [
    { label: "Matrícula", value: "12 488", delta: "+4.2%", tone: "primary" as const, up: true },
    { label: "Deserción", value: "5.1%", delta: "+0.8 pts", tone: "danger" as const, up: false },
    { label: "Promedio", value: "3.78", delta: "estable", tone: "neutral" as const, up: true },
  ];
  return (
    <Section
      id="dashboard"
      index="11 · PATRONES"
      title="Dashboard en contexto"
      desc="Los mismos componentes, compuestos en un patrón real de tablero analítico — la razón de ser de la librería."
    >
      <Stage label="composición real" grid={false}>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="size-5 text-primary" />
              <h3 className="font-display text-lg font-bold">Cohorte 2024-II</h3>
              <Badge tone="primary" size="sm" dot>
                en vivo
              </Badge>
            </div>
            <Button size="sm" variant="outline" leftIcon={<Download />}>
              Exportar
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {kpis.map((k) => (
              <Card key={k.label}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardDescription>{k.label}</CardDescription>
                    <Badge tone={k.tone} dot>
                      {k.delta}
                    </Badge>
                  </div>
                  <CardTitle
                    className={cn("text-3xl tabular-nums", k.tone === "danger" && "text-danger")}
                  >
                    {k.value}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-1 text-xs text-fg-muted">
                  {k.up ? (
                    <TrendingUp className="size-3.5 text-success" />
                  ) : (
                    <TrendingDown className="size-3.5 text-danger" />
                  )}
                  vs. periodo anterior
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
              <CardDescription>Movimientos del último día.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { c: "bg-primary", t: "Marta V. publicó el reporte Q3", time: "hace 2 min" },
                { c: "bg-danger", t: "KPI deserción superó el 5%", time: "hace 18 min" },
                { c: "bg-border-strong", t: "Reporte mensual enviado", time: "ayer" },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className={cn("mt-1.5 size-2 shrink-0 rounded-full", row.c)} />
                  <div className="flex-1">
                    <div>{row.t}</div>
                    <div className="text-xs text-fg-subtle">{row.time}</div>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="link" size="sm">
                Ver todo →
              </Button>
              <Avatar size="sm">
                <AvatarFallback className="bg-primary-soft text-primary">MV</AvatarFallback>
              </Avatar>
            </CardFooter>
          </Card>
        </div>
      </Stage>
    </Section>
  );
}

/* ─── Hooks ────────────────────────────────────────────────────────────── */
function HooksSection() {
  return (
    <Section
      id="hooks"
      index="12 · PATRONES"
      title="Hooks & utilidades"
      desc="7 hooks reutilizables y el helper cn() (clsx + tailwind-merge) para combinar clases resolviendo conflictos."
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {HOOKS.map((h) => (
          <div
            key={h.name}
            className="rounded-lg border border-border bg-surface p-4 transition-colors duration-fast hover:border-primary"
          >
            <code className="font-mono text-sm font-medium text-primary">{h.name}</code>
            <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{h.desc}</p>
          </div>
        ))}
        <div className="rounded-lg border border-dashed border-border-strong bg-surface-muted p-4">
          <code className="font-mono text-sm font-medium text-accent">cn(...)</code>
          <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
            Combina clases de Tailwind resolviendo conflictos con twMerge.
          </p>
        </div>
      </div>
    </Section>
  );
}

/* ─── Footer ───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="mt-20 border-t border-border pt-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2.5">
          <span className="grid size-7 place-items-center rounded-md border-2 border-primary">
            <span className="size-2.5 rounded-sm bg-accent" />
          </span>
          <span className="text-sm text-fg-muted">
            <strong className="text-fg">@unisimon/metrik-ui</strong> · MIT © 2026
          </span>
        </div>
        <span className="font-mono text-[11px] tracking-widest text-fg-subtle">
          UNIDAD DE CIENCIA DE LOS DATOS · UNIVERSIDAD SIMÓN BOLÍVAR
        </span>
      </div>
    </footer>
  );
}
