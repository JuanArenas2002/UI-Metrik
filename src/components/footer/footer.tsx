import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../lib";

export interface FooterLinkItem {
  label: string;
  href: string;
  /** Fuerza `target="_blank"`. Si se omite, se detecta por el `href`. */
  external?: boolean;
}

export interface FooterLinkGroup {
  title?: string;
  items: FooterLinkItem[];
}

export interface FooterSocialLink {
  /** Icono a renderizar (p. ej. `<Github />`). */
  icon: ReactNode;
  href: string;
  /** Texto accesible del enlace (aria-label). */
  label: string;
}

export interface FooterProps extends HTMLAttributes<HTMLElement> {
  /** Logo o isotipo (p. ej. `<MetrikLogo />` o `<MetrikMark />`). */
  logo?: ReactNode;
  /** Nombre de marca junto al logo. */
  brand?: ReactNode;
  /** Texto descriptivo bajo la marca. */
  description?: ReactNode;
  /** Grupos de enlaces de navegación. */
  links?: FooterLinkGroup[];
  /** Enlaces a redes sociales (icono + aria-label). */
  socialLinks?: FooterSocialLink[];
  /** Aviso de copyright en la barra inferior. */
  copyright?: ReactNode;
}

/** Enlaces con protocolo/esquema absoluto se tratan como externos. */
function isExternalHref(href: string): boolean {
  return /^(https?:)?\/\//.test(href) || /^(mailto|tel):/.test(href);
}

/** Props de apertura segura para enlaces externos. */
function externalProps(external: boolean) {
  return external ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

/**
 * Pie de página del sitio · responsive y accesible. Landmark `contentinfo`
 * (`<footer>`) con navegación semántica, listas y enlaces externos seguros.
 * Todas las secciones son opcionales; combina datos dinámicos con `children`.
 *
 * @example
 *   <Footer
 *     logo={<MetrikLogo />}
 *     description="Librería de componentes React."
 *     links={[{ title: "Recursos", items: [{ label: "Docs", href: "/docs" }] }]}
 *     socialLinks={[{ icon: <Github />, href: "https://github.com", label: "GitHub" }]}
 *     copyright="© 2026 Metri-K"
 *   />
 */
export const Footer = forwardRef<HTMLElement, FooterProps>(function Footer(
  { logo, brand, description, links, socialLinks, copyright, className, children, ...props },
  ref,
) {
  const hasBrand = Boolean(logo || brand || description || socialLinks?.length);
  const hasLinks = Boolean(links?.length);
  const hasBottom = Boolean(copyright || children);

  return (
    <footer ref={ref} className={cn("border-t border-border bg-surface text-fg", className)} {...props}>
      <div className="mx-auto w-full max-w-screen-xl px-4 py-12 sm:px-6 lg:px-8">
        {(hasBrand || hasLinks) && (
          <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-4">
            {hasBrand && (
              <div className="md:col-span-1">
                {(logo || brand) && (
                  <div className="flex items-center gap-2.5">
                    {logo}
                    {brand && <span className="font-display text-base font-semibold text-fg">{brand}</span>}
                  </div>
                )}
                {description && (
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-fg-muted">{description}</p>
                )}
                {socialLinks?.length ? (
                  <ul role="list" className="mt-5 flex flex-wrap gap-1.5">
                    {socialLinks.map((social) => (
                      <li key={social.href}>
                        <a
                          href={social.href}
                          aria-label={social.label}
                          {...externalProps(isExternalHref(social.href))}
                          className="grid size-9 place-items-center rounded-md text-fg-muted transition-colors duration-fast hover:bg-surface-muted hover:text-fg [&_svg]:size-4"
                        >
                          {social.icon}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            )}

            {links && links.length > 0 && (
              <nav
                aria-label="Enlaces del pie de página"
                className={cn(
                  "grid grid-cols-2 gap-8 sm:grid-cols-3",
                  hasBrand ? "md:col-span-2 lg:col-span-3" : "md:col-span-3 lg:col-span-4",
                )}
              >
                {links.map((group, i) => (
                  <div key={group.title ?? i}>
                    {group.title && (
                      <h2 className="text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
                        {group.title}
                      </h2>
                    )}
                    <ul role="list" className="mt-3 space-y-2.5">
                      {group.items.map((item) => (
                        <li key={item.href}>
                          <a
                            href={item.href}
                            {...externalProps(item.external ?? isExternalHref(item.href))}
                            className="rounded-sm text-sm text-fg-muted transition-colors duration-fast hover:text-fg"
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </nav>
            )}
          </div>
        )}

        {hasBottom && (
          <div
            className={cn(
              "flex flex-col gap-3 border-t border-border pt-6 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between",
              (hasBrand || hasLinks) && "mt-10",
            )}
          >
            {copyright && <p>{copyright}</p>}
            {children}
          </div>
        )}
      </div>
    </footer>
  );
});
