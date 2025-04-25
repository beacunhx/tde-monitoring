"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { label: "Monitoramento", href: "/" },
  { label: "Configurações", href: "/configurations" },
];

export function SideMenu() {
  const pathname = usePathname();
  return (
    <aside className="bg-gray-400 p-4 w-64 flex flex-col gap-4 sticky top-2 m-2 rounded-lg">
      <span className="mb-4">TDE-Monitoring</span>

      <nav className="contents">
        <ul className="font-medium text-lg contents">
          {items.map(({ label, href }) => {
            return (
              <li
                key={href}
                className={clsx("px-4 py-2 rounded-lg", {
                  "bg-gray-500": href === pathname,
                })}
              >
                <Link href={href}>{label}</Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
