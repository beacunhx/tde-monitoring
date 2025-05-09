import { Dot } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

type HeaderProps = {
  title: string;
  amount?: number;
  loading?: boolean;
  buttons?: { label: string; href: string }[];
};

export function Header({ title, amount, loading, buttons = [] }: HeaderProps) {
  return (
    <header className="flex items-center p-2">
      <div className="flex items-center gap-1">
        <span className="font-semibold">{title}</span>
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
