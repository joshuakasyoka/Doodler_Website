import { Button, Container, Link, Logo } from "@/components/ui";
import type { Site } from "@/lib/content";
import { HeaderTone } from "./header-tone";
import { MobileMenu } from "./mobile-menu";
import { NavLink } from "./nav-link";

export function Header({ site }: { site: Site }) {
  const { header, ui } = site;
  const links = header.nav.map((item) => (
    <li key={item.href}>
      <NavLink href={item.href} label={item.label} />
    </li>
  ));
  return (
    <header
      id="site-header"
      className="site-header fixed inset-x-0 top-0 z-40 py-header-pad text-text header-glass data-on-dark:text-text-on-media"
    >
      <HeaderTone />
      <Container size="full">
        <div className="relative flex items-center justify-between gap-sm lg:grid lg:grid-cols-3">
          <Link href="/" label={header.logoLabel} variant="plain">
            <Logo />
          </Link>
          <nav aria-label={header.navLabel} className="hidden justify-self-center lg:block">
            <ul className="flex items-center gap-2xs">{links}</ul>
          </nav>
          <div className="flex items-center justify-end gap-xs">
            {!header.languageToggle.hidden && (
              <Button
                label={header.languageToggle.label}
                icon="translate"
                variant="pill"
                size="md"
                scribble={false}
              />
            )}
            {header.actions.map((action) => (
              <Button
                key={action.href}
                href={action.href}
                label={action.label}
                icon={action.icon}
                variant={action.primary ? "pill-dark" : "pill"}
                size="md"
                scribble={false}
              />
            ))}
            <MobileMenu openLabel={ui.menuOpen} closeLabel={ui.menuClose}>
              <nav aria-label={header.navLabel}>
                <ul className="flex flex-col">{links}</ul>
              </nav>
            </MobileMenu>
          </div>
        </div>
      </Container>
    </header>
  );
}
