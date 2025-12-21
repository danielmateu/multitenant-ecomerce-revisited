'use client'

import { Category } from "@/payload-types";
import CategoryDropdown from "./category-dropdown";
import { CustomCategory } from "../types";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";

interface CategoriesProps {
    data: CustomCategory[];
}

export default function Categories({ data }: CategoriesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const measureRef = useRef<HTMLDivElement>(null);
    const viewAllRef = useRef<HTMLDivElement>(null);

    const [visibleCount, setVisibleCount] = useState<number>(data.length);
    const [isAnyHovered, setIsAnyHovered] = useState<boolean>(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

    const activeCategory = "all"; // Replace with actual active category logic

    const activeCategoryIndex = data.findIndex(category => category.slug === activeCategory);
    // const isActiveCategoryVisible = activeCategoryIndex >= 0 && activeCategoryIndex < visibleCount;
    const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

    // Memorizar solo la longitud del array para evitar cambios de referencia
    const dataLength = useMemo(() => data.length, [data.length]);

    useEffect(() => {
        const calculateVisible = () => {
            if (!containerRef.current || !measureRef.current || !viewAllRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            const viewAllWidth = viewAllRef.current.offsetWidth;
            const availableWidth = containerWidth - viewAllWidth;

            const items = Array.from(measureRef.current.children) as HTMLDivElement[];
            let totalWidth = 0;
            let visible = 0;

            for (const item of items) {
                const width = item.getBoundingClientRect().width;

                if (totalWidth + width > availableWidth) break
                totalWidth += width;
                visible++;
            }

            setVisibleCount(visible);
        }

        const resizeOvserver = new ResizeObserver(() => {
            calculateVisible();
        });

        if (containerRef.current) {
            resizeOvserver.observe(containerRef.current);
        }

        return () => resizeOvserver.disconnect();

    }, [dataLength]);

    return (
        <div className="relative w-full">
            {/* Hidden for measurement */}
            <div ref={measureRef} className="absolute opacity-0 pointer-events-none flex"
                style={{ position: 'fixed', top: -9999, left: -9999 }}>
                {
                    data.map((category: Category) => (
                        <div key={category.id} className="mb-4">
                            <CategoryDropdown category={category} isActive={activeCategory === category.slug} isNavigationHovered={false} />
                        </div>
                    ))
                }
            </div>
            {/* Visible items */}
            <div
                ref={containerRef}
                className="flex flex-no-wrap items-center"
                onMouseEnter={() => setIsAnyHovered(true)}
                onMouseLeave={() => setIsAnyHovered(false)}
            >
                {
                    data.map((category: Category) => (
                        <div key={category.id} className="mb-4">
                            <CategoryDropdown
                                category={category}
                                isActive={activeCategory === category.slug}
                                isNavigationHovered={isAnyHovered} />
                        </div>
                    ))
                }

                <div ref={viewAllRef} className="shrink-0">
                    <Button
                        variant={"elevated"}
                        className={cn("h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                            isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary"
                        )}>
                        {/* {category.name} */}
                        Ver todas
                        <ListFilterIcon className="ml-2 inline-block" />
                    </Button>
                </div>
            </div>
        </div>
    );
}