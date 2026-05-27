import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
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
  useDisclosure,
  useTheme,
} from "@unisimon/metrik-ui";
import { Download, MoreHorizontal, Plus, Search, TrendingDown, TrendingUp } from "lucide-react";

export function App() {
  const { resolvedTheme, toggleTheme } = useTheme();
  const archive = useDisclosure();
  const [tab, setTab] = useState("resumen");

  return (
    <div className="min-h-screen bg-bg text-fg">
      {/* Topbar */}
      <header className="sticky top-0 z-sticky border-b border-border bg-surface/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <span className="grid size-7 place-items-center rounded-full border-2 border-primary">
              <span className="size-3 rounded-full bg-accent" />
            </span>
            <span className="text-lg font-semibold tracking-tight">Metrik · UI</span>
            <Badge tone="primary" size="sm" className="ml-2">v0.1</Badge>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Cambiar tema">
                  {resolvedTheme === "dark" ? "🌙" : "☀️"}
                </Button>
              </TooltipTrigger>
              <TooltipContent>Cambiar tema</TooltipContent>
            </Tooltip>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" rightIcon={<MoreHorizontal />}>Acciones</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>General</DropdownMenuLabel>
                <DropdownMenuItem>
                  Editar <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Duplicar <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem destructive>Archivar</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Avatar size="md">
              <AvatarFallback className="bg-primary-soft text-primary">MV</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
        <section className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-fg-subtle">Playground</p>
          <h1 className="text-3xl font-semibold tracking-tight">Cohorte 2024-II</h1>
          <p className="text-fg-muted">
            Una página de ejemplo que usa la mayoría de los componentes de la librería.
          </p>
        </section>

        {/* KPI row */}
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>Matrícula</CardDescription>
                <Badge tone="primary" dot>+4.2%</Badge>
              </div>
              <CardTitle className="text-3xl tabular-nums">12 488</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-fg-muted flex items-center gap-1">
              <TrendingUp className="size-3.5 text-success" />vs. periodo anterior
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>Deserción</CardDescription>
                <Badge tone="danger" dot>+0.8 pts</Badge>
              </div>
              <CardTitle className="text-3xl tabular-nums text-danger">5.1%</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-fg-muted flex items-center gap-1">
              <TrendingDown className="size-3.5 text-danger" />umbral 5%
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardDescription>Promedio</CardDescription>
                <Badge>estable</Badge>
              </div>
              <CardTitle className="text-3xl tabular-nums">3.78</CardTitle>
            </CardHeader>
            <CardContent className="text-xs text-fg-muted">14 cohortes monitoreadas</CardContent>
          </Card>
        </section>

        {/* Tabs + Form */}
        <section className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
              <CardDescription>Configura el reporte semanal.</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={tab} onValueChange={setTab}>
                <TabsList variant="pill">
                  <TabsTrigger value="resumen">Resumen</TabsTrigger>
                  <TabsTrigger value="filtros">Filtros</TabsTrigger>
                  <TabsTrigger value="acciones">Acciones</TabsTrigger>
                </TabsList>
                <TabsContent value="resumen">
                  <div className="space-y-3 text-sm">
                    <Alert tone="success">
                      <AlertTitle>Datos sincronizados</AlertTitle>
                      <AlertDescription>Última actualización hace 2 minutos.</AlertDescription>
                    </Alert>
                    <Alert tone="warning">
                      <AlertTitle>Reporte automático</AlertTitle>
                      <AlertDescription>Se enviará mañana 8:00 AM.</AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
                <TabsContent value="filtros">
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="q" required>Búsqueda</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-fg-subtle" />
                        <Input id="q" placeholder="cohorte 2024-II" className="pl-9" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="prog">Programa</Label>
                      <Select defaultValue="sistemas">
                        <SelectTrigger id="prog"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sistemas">Ingeniería de Sistemas</SelectItem>
                          <SelectItem value="admin">Administración</SelectItem>
                          <SelectItem value="psico">Psicología</SelectItem>
                          <SelectItem value="derecho">Derecho</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Checkbox id="risk" defaultChecked />
                      <Label htmlFor="risk">Solo estudiantes en riesgo</Label>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Switch id="live" defaultChecked />
                      <Label htmlFor="live">Live data</Label>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="acciones">
                  <Textarea placeholder="Notas para el equipo…" />
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="justify-end">
              <Button variant="ghost" size="sm">Limpiar</Button>
              <Button size="sm">Aplicar</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Actividad reciente</CardTitle>
              <CardDescription>Movimientos del último día.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { c: "primary", t: "Marta V. publicó el reporte Q3", time: "hace 2 min" },
                { c: "danger",  t: "KPI deserción superó el 5%",      time: "hace 18 min" },
                { c: "subtle",  t: "Reporte mensual enviado",         time: "ayer" },
              ].map((row, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className={
                    "mt-1.5 size-2 shrink-0 rounded-full " +
                    (row.c === "primary" ? "bg-primary" : row.c === "danger" ? "bg-danger" : "bg-border-strong")
                  } />
                  <div className="flex-1">
                    <div>{row.t}</div>
                    <div className="text-xs text-fg-subtle">{row.time}</div>
                  </div>
                </div>
              ))}
              <Separator />
              <div className="flex items-center gap-2">
                <Spinner size="sm" />
                <span className="text-xs text-fg-muted">Sincronizando…</span>
              </div>
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="h-3 w-1/2" />
            </CardContent>
            <CardFooter className="justify-between">
              <Button variant="link" size="sm">Ver todo →</Button>
              <Dialog open={archive.isOpen} onOpenChange={archive.setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" leftIcon={<Download />}>Archivar</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Archivar reportes</DialogTitle>
                    <DialogDescription>
                      Se moverán al baúl y podrás recuperarlos en 30 días.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex items-center gap-3 text-sm py-2">
                    <Checkbox id="notify" defaultChecked />
                    <Label htmlFor="notify">Notificar a los tutores</Label>
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" size="sm" onClick={archive.close}>Cancelar</Button>
                    <Button variant="danger" size="sm" onClick={archive.close}>Sí, archivar</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardFooter>
          </Card>
        </section>

        {/* Button gallery */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Buttons</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="link">Link →</Button>
            <Separator orientation="vertical" className="h-8 mx-2" />
            <Button size="sm" leftIcon={<Plus />}>Nuevo</Button>
            <Button loading>Cargando</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>
      </main>
    </div>
  );
}
