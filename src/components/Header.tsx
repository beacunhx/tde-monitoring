import { Dot } from "lucide-react";
import { Button } from "./ui/button";

type HeaderProps = {
  title: string;
  amount: number;
};

export function Header({ title, amount }: HeaderProps) {
  return (
    <header className="flex items-center p-2">
      <div className="flex items-center gap-1">
        <span className="font-semibold">{title}</span>
        <Dot size={16} />
        <span className="text-xs">
          {amount} {amount === 1 ? "item" : "itens"}
        </span>
      </div>

      <Button className="ml-auto">Criar</Button>
    </header>
  );
}
