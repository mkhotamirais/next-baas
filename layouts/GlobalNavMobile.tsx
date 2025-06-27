import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

interface GlobalNavMobileProps {
  logo: React.ReactNode;
  menu: Record<string, string>[];
}

export default function GlobalNavMobile({ logo, menu }: GlobalNavMobileProps) {
  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size={"icon"}>
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <SheetHeader>
            <SheetTitle>{logo}</SheetTitle>
            <SheetDescription className="hidden"></SheetDescription>
          </SheetHeader>
          <nav className="flex flex-col gap-1 px-3">
            {menu.map((item, i) => (
              <SheetClose asChild key={i}>
                <Link href={item.url} className="flex items-center gap-2 leading-6 text-muted-foreground">
                  <Button variant={"outline"} className="w-full justify-start text-left">
                    {item.label}
                  </Button>
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}
