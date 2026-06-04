import { useEffect, useState, type ReactNode } from "react";
import type { DateRange } from "react-day-picker";
import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Calendar,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  ChipSelector,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  DateRangePill,
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
  FileDropzone,
  FloatingDatePicker,
  FloatingFileInput,
  FloatingInput,
  FloatingSelect,
  FloatingTextarea,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  RadioGroup,
  RadioGroupItem,
  RichTextEditor,
  ScrollArea,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  Skeleton,
  Spinner,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Toaster,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  cn,
  toast,
  useTheme,
} from "@juanarenas31/metrik-ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Combobox,
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuTrigger,
  EmptyState,
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Progress,
  Slider,
  Toggle,
  ToggleGroup,
  ToggleGroupItem,
} from "@juanarenas31/metrik-ui";
import {
  ArrowUpRight,
  Bell,
  Bold,
  Check,
  ChevronDown,
  Copy,
  CreditCard,
  Download,
  Eye,
  GraduationCap,
  Inbox,
  Info,
  Italic,
  Moon,
  MoreHorizontal,
  PanelRight,
  Plus,
  Search,
  Settings,
  Star,
  Sun,
  Trash2,
  TrendingDown,
  TrendingUp,
  Underline,
  User,
} from "lucide-react";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  Container,
  DataTable,
  Grid,
  Stack,
} from "@juanarenas31/metrik-ui";
import type { ChartConfig, ColumnDef } from "@juanarenas31/metrik-ui";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

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
    group: "Nuevos · v0.2",
    items: [
      { id: "campos", label: "Campos flotantes" },
      { id: "seleccion", label: "Radio · Chips" },
      { id: "form", label: "Form & validación" },
      { id: "calendario", label: "Fechas · Calendar" },
      { id: "sheet", label: "Sheet · Command" },
      { id: "archivos", label: "Dropzone · Editor" },
      { id: "tabla", label: "Table" },
      { id: "layout2", label: "Collapsible · Scroll" },
      { id: "toaster", label: "Toaster" },
    ],
  },
  {
    group: "Avanzados · v0.3",
    items: [
      { id: "controles", label: "Progress · Slider · Toggle" },
      { id: "overlays2", label: "AlertDialog · Hover · Context" },
      { id: "combobox", label: "Combobox · Accordion" },
      { id: "navdata", label: "Breadcrumb · Pagination" },
    ],
  },
  {
    group: "Datos · v0.3",
    items: [
      { id: "datatable", label: "DataTable" },
      { id: "charts", label: "Charts" },
    ],
  },
  {
    group: "Layout · v0.3.1",
    items: [{ id: "layout", label: "Container · Stack · Grid" }],
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
  { name: "blue", varBase: "blue" },
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
  { token: "primary", cssVar: "--metrik-primary", note: "Acción · CTA" },
  { token: "accent", cssVar: "--metrik-accent", note: "Énfasis · realce" },
  { token: "info", cssVar: "--metrik-info", note: "Información · datos · links" },
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
      <Toaster position="bottom-right" />
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

            <FloatingFieldsSection />
            <SelectionSection />
            <FormSection />
            <DatesSection />
            <SheetCommandSection />
            <FilesSection />
            <TableSection />
            <Layout2Section />
            <ToasterSection />

            <ControlesSection />
            <Overlays2Section />
            <ComboboxSection />
            <NavDataSection />

            <DataTableSection />
            <ChartsSection />

            <LayoutSection />

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
          pnpm add @juanarenas31/metrik-ui
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
  const tones = ["neutral", "primary", "accent", "info", "success", "danger", "warning", "solid"] as const;
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
            <strong className="text-fg">@juanarenas31/metrik-ui</strong> · MIT © 2026
          </span>
        </div>
        <span className="font-mono text-[11px] tracking-widest text-fg-subtle">
          UNIDAD DE CIENCIA DE LOS DATOS · UNIVERSIDAD SIMÓN BOLÍVAR
        </span>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   NUEVOS · v0.2
   ════════════════════════════════════════════════════════════════════════ */

/* ─── Campos flotantes ─────────────────────────────────────────────────── */
function FloatingFieldsSection() {
  return (
    <Section
      id="campos"
      index="v0.2 · FORMULARIOS"
      title="Campos flotantes"
      desc="Inputs con label que flota al enfocar o tener valor. Variantes para texto, área, select nativo, archivo y fecha (con calendario en popover)."
    >
      <Stage label="Floating*" grid={false}>
        <div className="grid gap-5 sm:grid-cols-2">
          <FloatingInput label="Nombre del programa" defaultValue="Ingeniería de Sistemas" />
          <FloatingInput label="Código SNIES" type="number" />
          <FloatingSelect label="Facultad" defaultValue="ing">
            <option value="ing">Ingenierías</option>
            <option value="soc">Ciencias Sociales</option>
            <option value="adm">Administración</option>
          </FloatingSelect>
          <FloatingDatePickerDemo />
          <FloatingFileInput label="Adjuntar syllabus" />
          <FloatingTextarea label="Observaciones" className="sm:col-span-1" />
        </div>
      </Stage>
    </Section>
  );
}

function FloatingDatePickerDemo() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return <FloatingDatePicker label="Fecha de corte" value={date} onValueChange={setDate} />;
}

/* ─── RadioGroup · ChipSelector ────────────────────────────────────────── */
const TAGS = [
  { value: "riesgo", label: "En riesgo" },
  { value: "becados", label: "Becados" },
  { value: "virtual", label: "Virtual" },
  { value: "nocturno", label: "Nocturno" },
  { value: "posgrado", label: "Posgrado" },
];

function SelectionSection() {
  const [tags, setTags] = useState<string[]>(["riesgo", "becados"]);
  return (
    <Section
      id="seleccion"
      index="v0.2 · SELECTORES"
      title="RadioGroup · ChipSelector"
      desc="Selección única (radios accesibles vía Radix) y selección múltiple en chips toggleables con estado controlado."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label="<RadioGroup />" grid={false}>
          <RadioGroup defaultValue="semanal">
            {[
              { v: "diario", t: "Reporte diario", d: "Cada día a las 7:00 AM" },
              { v: "semanal", t: "Reporte semanal", d: "Lunes a primera hora" },
              { v: "mensual", t: "Reporte mensual", d: "Primer día hábil" },
            ].map((o) => (
              <label
                key={o.v}
                htmlFor={o.v}
                className="flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 transition-colors hover:bg-surface-muted has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
              >
                <RadioGroupItem value={o.v} id={o.v} className="mt-0.5" />
                <span className="text-sm">
                  <span className="block font-medium text-fg">{o.t}</span>
                  <span className="block text-xs text-fg-muted">{o.d}</span>
                </span>
              </label>
            ))}
          </RadioGroup>
        </Stage>

        <Stage label="<ChipSelector />" grid={false}>
          <p className="mb-3 text-sm text-fg-muted">Filtra estudiantes por etiquetas:</p>
          <ChipSelector options={TAGS} value={tags} onValueChange={setTags} />
          <p className="mt-4 font-mono text-xs text-fg-subtle">
            seleccionados: [{tags.join(", ")}]
          </p>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Form & validación ────────────────────────────────────────────────── */
function FormSection() {
  const [email, setEmail] = useState("");
  const touched = email.length > 0;
  const error = touched && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? "Correo institucional inválido." : undefined;
  return (
    <Section
      id="form"
      index="v0.2 · FORMULARIOS"
      title="Form & validación"
      desc="Form ligero (sin react-hook-form). FormField cablea id/aria entre Label, control y mensaje de error automáticamente."
    >
      <Stage label="<Form />" grid={false}>
        <Form
          className="max-w-md"
          onSubmit={(e) => {
            e.preventDefault();
            if (!error && email) toast.success("Formulario enviado", { description: email });
          }}
        >
          <FormField error={error}>
            <FormLabel required>Correo institucional</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="nombre@unisimon.edu.co"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                state={error ? "error" : "default"}
              />
            </FormControl>
            <FormDescription>Te enviaremos el reporte a este correo.</FormDescription>
            <FormMessage />
          </FormField>

          <FormField>
            <FormLabel>Comentario</FormLabel>
            <FormControl>
              <Textarea placeholder="Opcional…" />
            </FormControl>
          </FormField>

          <Button type="submit" size="sm" rightIcon={<ArrowUpRight />}>
            Enviar
          </Button>
        </Form>
      </Stage>
    </Section>
  );
}

/* ─── Fechas · Calendar ────────────────────────────────────────────────── */
function DatesSection() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [range, setRange] = useState<DateRange | undefined>();
  return (
    <Section
      id="calendario"
      index="v0.2 · MOSTRAR"
      title="Calendar · DateRangePill"
      desc="Calendario basado en react-day-picker (locale es), estilizado con tokens metrik. Soporta selección única y de rango."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label='<Calendar mode="single" />' grid={false}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border border-border"
          />
        </Stage>
        <Stage label="<DateRangePill />" grid={false}>
          <div className="space-y-4">
            <p className="text-sm text-fg-muted">Pastilla compacta para filtrar por periodo:</p>
            <DateRangePill value={range} onValueChange={setRange} />
            <p className="font-mono text-xs text-fg-subtle">
              {range?.from
                ? `${range.from.toLocaleDateString("es")} → ${range.to?.toLocaleDateString("es") ?? "…"}`
                : "sin rango"}
            </p>
            <Separator />
            <p className="text-sm text-fg-muted">
              FloatingDatePicker con dropdown de mes/año (default) y rango de años acotado:
            </p>
            <FloatingDatePicker
              label="Fecha de nacimiento"
              value={date}
              onValueChange={setDate}
              fromYear={1950}
              toYear={new Date().getFullYear()}
            />
          </div>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Sheet · Command ──────────────────────────────────────────────────── */
function SheetCommandSection() {
  return (
    <Section
      id="sheet"
      index="v0.2 · CUBRIR"
      title="Sheet · Command"
      desc="Sheet: panel lateral (Drawer) en 4 lados sobre Radix Dialog. Command: paleta de comandos con búsqueda (cmdk)."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label="<Sheet />">
          <div className="flex flex-wrap gap-3">
            {(["right", "left", "top", "bottom"] as const).map((side) => (
              <Sheet key={side}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" leftIcon={<PanelRight />}>
                    {side}
                  </Button>
                </SheetTrigger>
                <SheetContent side={side}>
                  <SheetHeader>
                    <SheetTitle>Filtros del reporte</SheetTitle>
                    <SheetDescription>Ajusta los parámetros y aplica.</SheetDescription>
                  </SheetHeader>
                  <div className="space-y-4 py-2">
                    <FloatingSelect label="Programa" defaultValue="sis">
                      <option value="sis">Ing. Sistemas</option>
                      <option value="psi">Psicología</option>
                    </FloatingSelect>
                    <label className="flex items-center gap-3 text-sm">
                      <Checkbox defaultChecked /> Solo estudiantes en riesgo
                    </label>
                  </div>
                  <SheetFooter>
                    <SheetClose asChild>
                      <Button size="sm" fullWidth>
                        Aplicar filtros
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </Stage>

        <Stage label="<Command />" grid={false}>
          <Command className="rounded-lg border border-border shadow-xs">
            <CommandInput placeholder="Buscar acción o reporte…" />
            <CommandList>
              <CommandEmpty>Sin resultados.</CommandEmpty>
              <CommandGroup heading="Sugerencias">
                <CommandItem>
                  <User /> Ver perfil <CommandShortcut>⌘P</CommandShortcut>
                </CommandItem>
                <CommandItem>
                  <CreditCard /> Facturación <CommandShortcut>⌘B</CommandShortcut>
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Ajustes">
                <CommandItem>
                  <Settings /> Preferencias
                </CommandItem>
                <CommandItem>
                  <Bell /> Notificaciones
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Dropzone · RichTextEditor ────────────────────────────────────────── */
function FilesSection() {
  const [files, setFiles] = useState<File[]>([]);
  return (
    <Section
      id="archivos"
      index="v0.2 · FORMULARIOS"
      title="FileDropzone · RichTextEditor"
      desc="Zona de arrastrar-y-soltar archivos y un editor de texto enriquecido ligero (negrita, cursiva, listas, enlaces) sin dependencias pesadas."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label="<FileDropzone />" grid={false}>
          <FileDropzone value={files} onFilesChange={setFiles} accept="image/*,.pdf" />
        </Stage>
        <Stage label="<RichTextEditor />" grid={false}>
          <RichTextEditor defaultValue="<p>Resumen del <b>reporte Q3</b>. Edita este texto y prueba la <i>barra</i>.</p>" />
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Table ────────────────────────────────────────────────────────────── */
function TableSection() {
  const rows = [
    { prog: "Ing. de Sistemas", mat: "1 240", des: "4.1%", tone: "success" as const },
    { prog: "Psicología", mat: "980", des: "5.6%", tone: "danger" as const },
    { prog: "Administración", mat: "1 510", des: "3.2%", tone: "success" as const },
    { prog: "Derecho", mat: "870", des: "5.0%", tone: "warning" as const },
  ];
  return (
    <Section
      id="tabla"
      index="v0.2 · MOSTRAR"
      title="Table"
      desc="Tabla semántica y accesible con header, filas hover, selección y footer. Compón celdas con cualquier componente."
    >
      <Stage label="<Table />" grid={false}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Programa</TableHead>
              <TableHead className="text-right">Matrícula</TableHead>
              <TableHead className="text-right">Deserción</TableHead>
              <TableHead>Estado</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.prog}>
                <TableCell className="font-medium">{r.prog}</TableCell>
                <TableCell className="text-right tabular-nums">{r.mat}</TableCell>
                <TableCell className="text-right tabular-nums">{r.des}</TableCell>
                <TableCell>
                  <Badge tone={r.tone} dot>
                    {r.tone === "success" ? "ok" : r.tone === "warning" ? "límite" : "alerta"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Stage>
    </Section>
  );
}

/* ─── Collapsible · ScrollArea ─────────────────────────────────────────── */
function Layout2Section() {
  return (
    <Section
      id="layout2"
      index="v0.2 · DISPOSICIÓN"
      title="Collapsible · ScrollArea"
      desc="Collapsible para secciones plegables con animación de altura, y ScrollArea con scrollbar estilizado consistente entre navegadores."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label="<Collapsible />" grid={false}>
          <Collapsible className="rounded-lg border border-border">
            <CollapsibleTrigger asChild>
              <button className="flex w-full items-center justify-between p-4 text-sm font-medium">
                Ver detalle de la cohorte
                <ChevronDown className="size-4 text-fg-muted transition-transform [[data-state=open]_&]:rotate-180" />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="space-y-2 border-t border-border p-4 text-sm text-fg-muted">
                <p>Matrícula total: 1 240 estudiantes.</p>
                <p>Promedio acumulado: 3.78.</p>
                <p>Tutores asignados: 28.</p>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </Stage>

        <Stage label="<ScrollArea />" grid={false}>
          <ScrollArea className="h-48 rounded-lg border border-border p-4">
            <div className="space-y-3">
              {Array.from({ length: 14 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <Avatar size="sm">
                    <AvatarFallback className="bg-primary-soft text-primary">
                      {String.fromCharCode(65 + i)}
                    </AvatarFallback>
                  </Avatar>
                  Estudiante #{i + 1} · cohorte 2024-II
                </div>
              ))}
            </div>
          </ScrollArea>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Toaster (Sonner) ─────────────────────────────────────────────────── */
function ToasterSection() {
  return (
    <Section
      id="toaster"
      index="v0.2 · COMENTARIO"
      title="Toaster · toast()"
      desc="Notificaciones tipo toast con sonner, con tema sincronizado a metrik. Monta <Toaster /> una vez y dispara toast() desde donde sea."
    >
      <Stage label="toast()">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => toast("Evento registrado", { description: "Hoy a las " + new Date().toLocaleTimeString("es") })}>
            Default
          </Button>
          <Button onClick={() => toast.success("Reporte guardado")}>Success</Button>
          <Button variant="danger" onClick={() => toast.error("Falló la sincronización")}>
            Error
          </Button>
          <Button
            variant="secondary"
            onClick={() => toast.warning("Deserción cerca del umbral")}
          >
            Warning
          </Button>
          <Button
            variant="ghost"
            leftIcon={<Trash2 />}
            onClick={() =>
              toast("¿Archivar reporte?", {
                action: { label: "Deshacer", onClick: () => toast.success("Acción deshecha") },
              })
            }
          >
            Con acción
          </Button>
        </div>
      </Stage>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   AVANZADOS · v0.3
   ════════════════════════════════════════════════════════════════════════ */

/* ─── Progress · Slider · Toggle ───────────────────────────────────────── */
function ControlesSection() {
  const [progress, setProgress] = useState(64);
  const [range, setRange] = useState<number[]>([2.5, 4.5]);
  const [fmt, setFmt] = useState<string[]>(["bold"]);
  return (
    <Section
      id="controles"
      index="v0.3 · CONTROLES"
      title="Progress · Slider · Toggle"
      desc="Barra de progreso con tonos, slider de valor único y de rango, y toggles individuales o agrupados (segmented control)."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label="<Progress /> · <Slider />" grid={false}>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-fg-muted">Avance del semestre</span>
                <span className="font-mono tabular-nums text-fg">{progress}%</span>
              </div>
              <Progress value={progress} />
              <div className="flex gap-2 pt-1">
                <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.max(0, p - 10))}>
                  −10
                </Button>
                <Button size="sm" variant="outline" onClick={() => setProgress((p) => Math.min(100, p + 10))}>
                  +10
                </Button>
              </div>
            </div>
            <div className="space-y-3">
              <Progress value={88} tone="success" />
              <Progress value={42} tone="warning" />
              <Progress value={23} tone="danger" />
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-fg-muted">Rango de promedio</span>
                <span className="font-mono tabular-nums text-fg">
                  {range[0].toFixed(1)} – {range[1].toFixed(1)}
                </span>
              </div>
              <Slider
                value={range}
                onValueChange={setRange}
                min={0}
                max={5}
                step={0.1}
                minStepsBetweenThumbs={1}
              />
            </div>
          </div>
        </Stage>

        <Stage label="<Toggle /> · <ToggleGroup />" grid={false}>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">toggle</p>
              <div className="flex gap-2">
                <Toggle aria-label="Negrita">
                  <Bold />
                </Toggle>
                <Toggle aria-label="Cursiva" variant="outline">
                  <Italic />
                </Toggle>
                <Toggle aria-label="Subrayado" defaultPressed>
                  <Underline />
                </Toggle>
              </div>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">toggle group · multiple</p>
              <ToggleGroup type="multiple" value={fmt} onValueChange={setFmt}>
                <ToggleGroupItem value="bold">
                  <Bold />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic">
                  <Italic />
                </ToggleGroupItem>
                <ToggleGroupItem value="underline">
                  <Underline />
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
            <div className="space-y-2">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">toggle group · single</p>
              <ToggleGroup type="single" defaultValue="semana">
                <ToggleGroupItem value="dia">Día</ToggleGroupItem>
                <ToggleGroupItem value="semana">Semana</ToggleGroupItem>
                <ToggleGroupItem value="mes">Mes</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── AlertDialog · HoverCard · ContextMenu ────────────────────────────── */
function Overlays2Section() {
  return (
    <Section
      id="overlays2"
      index="v0.3 · CUBRIR"
      title="AlertDialog · HoverCard · ContextMenu"
      desc="Confirmación de acciones destructivas, tarjeta de previsualización al pasar el mouse, y menú contextual con click derecho."
    >
      <Stage label="overlays">
        <div className="flex flex-wrap items-center gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="danger" leftIcon={<Trash2 />}>
                Eliminar cohorte
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>¿Eliminar esta cohorte?</AlertDialogTitle>
                <AlertDialogDescription>
                  Esta acción no se puede deshacer. Se borrarán 1 240 registros de estudiantes.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-danger hover:bg-coral-700"
                  onClick={() => toast.success("Cohorte eliminada")}
                >
                  Sí, eliminar
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="link">@marta.vega</Button>
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex gap-3">
                <Avatar size="lg">
                  <AvatarFallback className="bg-primary-soft text-primary">MV</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <p className="text-sm font-semibold">Marta Vega</p>
                  <p className="text-xs text-fg-muted">Analista · Ciencia de Datos</p>
                  <p className="text-xs text-fg-subtle">Publicó 24 reportes este mes.</p>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          <ContextMenu>
            <ContextMenuTrigger className="grid h-24 w-56 place-items-center rounded-lg border border-dashed border-border-strong text-sm text-fg-muted">
              Click derecho aquí
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuLabel>Reporte</ContextMenuLabel>
              <ContextMenuItem>
                <Eye /> Ver detalle <ContextMenuShortcut>⌘O</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <Star /> Destacar
              </ContextMenuItem>
              <ContextMenuItem>
                <Copy /> Duplicar <ContextMenuShortcut>⌘D</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem destructive>
                <Trash2 /> Eliminar
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </div>
      </Stage>
    </Section>
  );
}

/* ─── Combobox · Accordion ─────────────────────────────────────────────── */
const PROGRAMAS = [
  { value: "sistemas", label: "Ingeniería de Sistemas" },
  { value: "industrial", label: "Ingeniería Industrial" },
  { value: "psico", label: "Psicología" },
  { value: "derecho", label: "Derecho" },
  { value: "admin", label: "Administración de Empresas" },
  { value: "medicina", label: "Medicina" },
];

function ComboboxSection() {
  const [prog, setProg] = useState("");
  return (
    <Section
      id="combobox"
      index="v0.3 · SELECTORES"
      title="Combobox · Accordion"
      desc="Combobox: select con búsqueda (Popover + Command). Accordion: secciones plegables de selección única o múltiple."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label="<Combobox />" grid={false}>
          <div className="max-w-xs space-y-3">
            <p className="text-sm text-fg-muted">Busca y selecciona un programa:</p>
            <Combobox options={PROGRAMAS} value={prog} onValueChange={setProg} placeholder="Programa académico" />
            <p className="font-mono text-xs text-fg-subtle">value: {prog || "—"}</p>
          </div>
        </Stage>

        <Stage label="<Accordion />" grid={false}>
          <Accordion type="single" collapsible defaultValue="a">
            <AccordionItem value="a">
              <AccordionTrigger>¿Cómo se calcula la deserción?</AccordionTrigger>
              <AccordionContent>
                Estudiantes que no renovaron matrícula sobre el total del periodo anterior.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>¿Con qué frecuencia se actualiza?</AccordionTrigger>
              <AccordionContent>Los datos se sincronizan cada 24 horas a las 2:00 AM.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="c">
              <AccordionTrigger>¿Puedo exportar los reportes?</AccordionTrigger>
              <AccordionContent>Sí, en formato CSV y PDF desde el menú de acciones.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Breadcrumb · Pagination · EmptyState ─────────────────────────────── */
function NavDataSection() {
  const [page, setPage] = useState(2);
  return (
    <Section
      id="navdata"
      index="v0.3 · NAVEGACIÓN"
      title="Breadcrumb · Pagination · EmptyState"
      desc="Migas de navegación, paginación para tablas y un estado vacío reutilizable para listas sin datos."
    >
      <div className="space-y-6">
        <Stage label="<Breadcrumb />" grid={false}>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#overview">Inicio</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#dashboard">Cohortes</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>2024-II</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Stage>

        <div className="grid gap-6 lg:grid-cols-2">
          <Stage label="<Pagination />" grid={false}>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={() => setPage((p) => Math.max(1, p - 1))} />
                </PaginationItem>
                {[1, 2, 3].map((n) => (
                  <PaginationItem key={n}>
                    <PaginationLink isActive={page === n} onClick={() => setPage(n)}>
                      {n}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink isActive={page === 8} onClick={() => setPage(8)}>
                    8
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext onClick={() => setPage((p) => Math.min(8, p + 1))} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </Stage>

          <Stage label="<EmptyState />" grid={false}>
            <EmptyState
              icon={<Inbox />}
              title="Sin reportes aún"
              description="Cuando generes tu primer reporte, aparecerá aquí."
              action={
                <Button size="sm" leftIcon={<Plus />}>
                  Crear reporte
                </Button>
              }
            />
          </Stage>
        </div>
      </div>
    </Section>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   DATOS · v0.3
   ════════════════════════════════════════════════════════════════════════ */

/* ─── DataTable ────────────────────────────────────────────────────────── */
type Cohorte = {
  programa: string;
  facultad: string;
  matricula: number;
  desercion: number;
  promedio: number;
};

const COHORTES: Cohorte[] = [
  { programa: "Ing. de Sistemas", facultad: "Ingeniería", matricula: 1240, desercion: 4.1, promedio: 3.78 },
  { programa: "Ing. Industrial", facultad: "Ingeniería", matricula: 1510, desercion: 3.2, promedio: 3.91 },
  { programa: "Psicología", facultad: "Sociales", matricula: 980, desercion: 5.6, promedio: 3.64 },
  { programa: "Derecho", facultad: "Sociales", matricula: 870, desercion: 5.0, promedio: 3.7 },
  { programa: "Administración", facultad: "Económicas", matricula: 1320, desercion: 4.4, promedio: 3.82 },
  { programa: "Contaduría", facultad: "Económicas", matricula: 760, desercion: 4.9, promedio: 3.69 },
  { programa: "Medicina", facultad: "Salud", matricula: 640, desercion: 2.8, promedio: 4.12 },
  { programa: "Enfermería", facultad: "Salud", matricula: 520, desercion: 3.5, promedio: 3.95 },
  { programa: "Comunicación", facultad: "Sociales", matricula: 410, desercion: 6.1, promedio: 3.58 },
  { programa: "Arquitectura", facultad: "Ingeniería", matricula: 690, desercion: 4.7, promedio: 3.74 },
];

const cohorteColumns: ColumnDef<Cohorte>[] = [
  { accessorKey: "programa", header: "Programa", cell: ({ row }) => <span className="font-medium">{row.original.programa}</span> },
  { accessorKey: "facultad", header: "Facultad" },
  {
    accessorKey: "matricula",
    header: "Matrícula",
    cell: ({ row }) => <span className="tabular-nums">{row.original.matricula.toLocaleString("es")}</span>,
  },
  {
    accessorKey: "desercion",
    header: "Deserción",
    cell: ({ row }) => {
      const d = row.original.desercion;
      return (
        <Badge tone={d > 5 ? "danger" : d > 4 ? "warning" : "success"} dot>
          {d}%
        </Badge>
      );
    },
  },
  {
    accessorKey: "promedio",
    header: "Promedio",
    cell: ({ row }) => <span className="tabular-nums">{row.original.promedio.toFixed(2)}</span>,
  },
];

function DataTableSection() {
  return (
    <Section
      id="datatable"
      index="v0.3 · DATOS"
      title="DataTable"
      desc="Tabla de datos con orden (click en cabecera), filtro por columna, paginación y visibilidad de columnas — sobre TanStack Table."
    >
      <Stage label="<DataTable />" grid={false}>
        <DataTable
          columns={cohorteColumns}
          data={COHORTES}
          filterColumn="programa"
          filterPlaceholder="Filtrar por programa…"
          pageSize={6}
        />
      </Stage>
    </Section>
  );
}

/* ─── Charts ───────────────────────────────────────────────────────────── */
const barData = [
  { facultad: "Ingeniería", matricula: 3440 },
  { facultad: "Sociales", matricula: 2260 },
  { facultad: "Económicas", matricula: 2080 },
  { facultad: "Salud", matricula: 1160 },
];
const barConfig: ChartConfig = {
  matricula: { label: "Matrícula", color: "var(--metrik-teal-500)" },
};

const serieData = [
  { mes: "Ene", desercion: 4.2, matricula: 1180 },
  { mes: "Feb", desercion: 4.5, matricula: 1210 },
  { mes: "Mar", desercion: 5.1, matricula: 1190 },
  { mes: "Abr", desercion: 4.8, matricula: 1240 },
  { mes: "May", desercion: 4.3, matricula: 1290 },
  { mes: "Jun", desercion: 3.9, matricula: 1320 },
];
const lineConfig: ChartConfig = {
  desercion: { label: "Deserción %", color: "var(--metrik-coral-500)" },
};
const areaConfig: ChartConfig = {
  matricula: { label: "Matrícula", color: "var(--metrik-teal-500)" },
};

const pieData = [
  { facultad: "Ingeniería", value: 3440, fill: "var(--metrik-teal-500)" },
  { facultad: "Sociales", value: 2260, fill: "var(--metrik-coral-500)" },
  { facultad: "Económicas", value: 2080, fill: "var(--metrik-teal-300)" },
  { facultad: "Salud", value: 1160, fill: "var(--metrik-amber-500)" },
];
const pieConfig: ChartConfig = {
  Ingeniería: { label: "Ingeniería" },
  Sociales: { label: "Sociales" },
  Económicas: { label: "Económicas" },
  Salud: { label: "Salud" },
};

function ChartsSection() {
  return (
    <Section
      id="charts"
      index="v0.3 · DATOS"
      title="Charts"
      desc="Gráficos basados en recharts con tooltips y leyendas temadas a los tokens de metrik. Barras, líneas, área y dona — listos para dashboards."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Stage label="BarChart" grid={false}>
          <ChartContainer config={barConfig} className="h-[240px] w-full">
            <BarChart data={barData} margin={{ left: -12, right: 8, top: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="facultad" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="matricula" fill="var(--color-matricula)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ChartContainer>
        </Stage>

        <Stage label="LineChart" grid={false}>
          <ChartContainer config={lineConfig} className="h-[240px] w-full">
            <LineChart data={serieData} margin={{ left: -12, right: 8, top: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={40} domain={[3, 6]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line dataKey="desercion" type="monotone" stroke="var(--color-desercion)" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ChartContainer>
        </Stage>

        <Stage label="AreaChart" grid={false}>
          <ChartContainer config={areaConfig} className="h-[240px] w-full">
            <AreaChart data={serieData} margin={{ left: -12, right: 8, top: 8 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} />
              <YAxis tickLine={false} axisLine={false} width={40} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                dataKey="matricula"
                type="natural"
                fill="var(--color-matricula)"
                fillOpacity={0.25}
                stroke="var(--color-matricula)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </Stage>

        <Stage label="PieChart" grid={false}>
          <ChartContainer config={pieConfig} className="h-[240px] w-full">
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="facultad" hideLabel />} />
              <Pie data={pieData} dataKey="value" nameKey="facultad" innerRadius={48} strokeWidth={2}>
                {pieData.map((d) => (
                  <Cell key={d.facultad} fill={d.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="facultad" />} />
            </PieChart>
          </ChartContainer>
        </Stage>
      </div>
    </Section>
  );
}

/* ─── Container · Stack · Grid ─────────────────────────────────────────── */
function LayoutSection() {
  return (
    <Section
      id="layout"
      index="v0.3.1 · DISPOSICIÓN"
      title="Container · Stack · Grid"
      desc="Primitivas de layout tipadas con cva y asChild. Container centra y limita el ancho; Stack es flex en una dirección; Grid es cuadrícula CSS."
    >
      <div className="space-y-6">
        <Stage label="<Container />" grid={false}>
          <div className="space-y-2">
            {(["sm", "md", "lg", "xl"] as const).map((s) => (
              <Container
                key={s}
                size={s}
                padding="none"
                className="rounded-md border border-dashed border-primary/50 bg-primary-soft/50 py-2 text-center font-mono text-xs text-primary"
              >
                size=&quot;{s}&quot;
              </Container>
            ))}
            <p className="pt-1 text-xs text-fg-muted">
              Cada barra es el ancho máximo de ese tamaño, centrado con mx-auto. Padding horizontal
              responsive por defecto.
            </p>
          </div>
        </Stage>

        <div className="grid gap-6 lg:grid-cols-2">
          <Stage label="<Stack />" grid={false}>
            <div className="space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                direction=&quot;row&quot; · gap=&quot;sm&quot; · wrap
              </p>
              <Stack direction="row" gap="sm" wrap>
                {["A", "B", "C", "D", "E"].map((x) => (
                  <div key={x} className="grid size-11 place-items-center rounded-md bg-primary-soft font-semibold text-primary">
                    {x}
                  </div>
                ))}
              </Stack>
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                direction=&quot;col&quot; · gap=&quot;md&quot;
              </p>
              <Stack gap="md">
                {["Fila 1", "Fila 2", "Fila 3"].map((x) => (
                  <div key={x} className="rounded-md bg-surface-muted px-3 py-2 text-sm">
                    {x}
                  </div>
                ))}
              </Stack>
            </div>
          </Stage>

          <Stage label="<Grid />" grid={false}>
            <div className="space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                cols=&#123;3&#125; · gap=&quot;sm&quot;
              </p>
              <Grid cols={3} gap="sm">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="grid h-12 place-items-center rounded-md bg-accent-soft text-sm font-medium text-accent">
                    {i + 1}
                  </div>
                ))}
              </Grid>
              <p className="font-mono text-[11px] uppercase tracking-wider text-fg-subtle">
                cols=&#123;1&#125; className=&quot;md:grid-cols-2&quot;
              </p>
              <Grid cols={1} gap="sm" className="md:grid-cols-2">
                {["Responsive A", "Responsive B"].map((x) => (
                  <div key={x} className="rounded-md bg-surface-muted px-3 py-2 text-sm">
                    {x}
                  </div>
                ))}
              </Grid>
            </div>
          </Stage>
        </div>
      </div>
    </Section>
  );
}
