import { Dot } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

type HeaderProps = {
  title?: string;
  amount?: number;
  loading?: boolean;
  buttons?: { label: string; href: string }[];
};

export function Header({ title, amount, loading, buttons = [] }: HeaderProps) {
  return (
    <header className="flex h-13 items-center p-2">
      <SidebarTrigger className="mr-4" />
      <div className="flex items-center gap-1">
        {title ? (
          <span className="font-semibold">{title}</span>
        ) : loading ? (
          <Skeleton className="h-4 w-40" />
        ) : null}
        {typeof amount === "number" ? (
          <>
            <Dot size={16} />
            {loading ? (
              <Skeleton className="h-4 w-9" />
            ) : (
              <span className="text-xs">
                {amount} {amount === 1 ? "item" : "itens"}
              </span>
            )}
          </>
        ) : null}
      </div>
      {buttons.map(({ href, label }, index) => {
        return (
          <Button
            key={"button_" + index}
            asChild
            disabled={loading}
            className={index === 0 ? "ml-auto" : ""}
          >
            <Link href={"." + href}>{label}</Link>
          </Button>
        );
      })}
    </header>
  );
}
