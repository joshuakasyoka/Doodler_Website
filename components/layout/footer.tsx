import { Container, Link, Logo, Reveal, Text } from "@/components/ui";
import type { Site } from "@/lib/content";

export function Footer({ site }: { site: Site }) {
  const { footer } = site;
  return (
    <footer className="pt-3xl pb-lg md:pt-4xl md:pb-2xl">
      <Container>
        <div className="text-panel">
          <Reveal variant="clip">
            <Logo size="full" label={footer.wordmarkLabel} />
          </Reveal>
        </div>
        <nav aria-label={footer.navLabel} className="mt-lg">
          <ul className="flex flex-wrap justify-center gap-x-lg">
            {footer.links.map((link) => (
              <li key={link.label}>
                <Link href={link.href} variant="footer">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Text size="fine" tone="muted" align="center" text={footer.legal} />
      </Container>
    </footer>
  );
}
