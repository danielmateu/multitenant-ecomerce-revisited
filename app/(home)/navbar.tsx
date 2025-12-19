"use client"

// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { NavbarSidebar } from "./navbar-sidebar";
import { useState } from "react";

const poppins = Poppins({ subsets: ["latin"], weight: ["700"] });

interface NavbarItemProps {
    href: string,
    children: React.ReactNode,
    isActive: boolean
}

const NavbarItem = ({
    href, children, isActive
}: NavbarItemProps) => {
    return (
        <Button variant={"outline"} className={cn("bg-transparent hover:bg-transparent rounded-full hover:border-primary border-transparent px-3.5 text-lg", isActive && "bg-black text-white hover:bg-black hover:text-white")}>
            <Link href={href}>
                {children}
            </Link>
        </Button>
    )
}

const navbarItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
]

export default function Navbar() {
    const { setTheme } = useTheme()
    const pathname = usePathname();
    // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    return (
        <nav className="p-4 flex justify-between items-center bg-rose-300 dark:bg-rose-800">
            <Link href="/" className="pl-6 flex items-center">
                <span className={cn("text-5xl font-semibold", poppins.className)}>
                    FunRoad
                </span>
            </Link>

            <NavbarSidebar
                open={isSidebarOpen}
                onOpenChange={setIsSidebarOpen}
                items={[]}
            // items={navbarItems}
            />

            <div className="items-center gap-4 hidden lg:flex">
                {navbarItems.map((item) => (
                    <NavbarItem
                        key={item.href}
                        href={item.href}
                        isActive={pathname === item.href}
                    >
                        {item.label}
                    </NavbarItem>
                ))}
                {/* <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="themeToggle">
                            <Sun />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => setTheme("light")}>
                            <Sun />
                            Light
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("dark")}>
                            <Moon />
                            Dark
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> */}
                <div className="hidden lg:flex">
                    <Button variant={"secondary"} className="border-l border-t-0 border-r-0 px-6 h-full rounded-none bg-white hover:bg-pink-400 transition text-lg w-fit">
                        <Link href="/sign-in">
                            Login
                        </Link>
                    </Button>
                    <Button variant={"ghost"} className="border-l border-t-0 border-r-0 px-6 h-full rounded-none bg-black text-white hover:bg-pink-400 transition text-lg w-fit"
                    >
                        <Link href="/sign-up">
                            Sign up
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="flex lg:hidden items-center justify-center">
                <Button variant={"ghost"} className="size-12 border-transparent bg-white">
                    <MenuIcon onClick={() => setIsSidebarOpen(true)} />
                </Button>
            </div>

        </nav>
    );
}