"use client";

import { usePathname } from "next/navigation";
import { Link } from "@/components/ui";

type Props = { href: string; label: string; onNavigate?: () => void };

/** A main-navigation link that marks the current page for assistive tech. */
export function NavLink({ href, label }: Props) {
  const pathname = usePathname();
  return (
    <Link href={href} variant="nav" current={pathname === href}>
      {label}
    </Link>
  );
}
