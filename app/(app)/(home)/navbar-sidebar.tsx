"use client"

import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { is } from "date-fns/locale";
import Link from "next/link";
import { usePathname } from "next/navigation";


interface NavbarItem {
    href: string;
    children: React.ReactNode;
    isActive: boolean;
}

interface NavbarSidebarProps {
    items: NavbarItem[];
    open: boolean;
    onOpenChange: (open: boolean) => void;
    // isActive: boolean;
}

export const NavbarSidebar = ({ items, open, onOpenChange }: NavbarSidebarProps) => {

    // console.log("NavbarSidebar items:", items);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent side="left" className="p-0 transition-none">
                <SheetHeader className="p-4 border-b">
                    <div className="flex items-center">
                        <SheetTitle>
                            Menu
                        </SheetTitle>



                    </div>
                </SheetHeader>
                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {items.map((item) => (
                        <Link href={item.href} key={item.href} className={cn("w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium",
                            item.isActive && "bg-black text-white"
                        )}
                            onClick={() => onOpenChange(false)}
                        >
                            {item.children}
                        </Link>
                    ))}
                    <div className="border-t">
                        <Link href={'/sign-in'} className={cn("w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium",
                            // isActive && "bg-black text-white"
                        )} onClick={() => onOpenChange(false)}>Sign In</Link>
                        <Link href={'/sign-in'} className={cn("w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium",
                            // isActive && "bg-black text-white"
                        )} onClick={() => onOpenChange(false)}>Sign Up</Link>
                    </div>
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}