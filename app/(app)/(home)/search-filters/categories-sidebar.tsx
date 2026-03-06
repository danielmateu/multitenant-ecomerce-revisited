'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Sheet,
    SheetTitle,
    // SheetTrigger,
    SheetContent,
    // SheetClose,
    // SheetDescription,
    // SheetFooter,
    SheetHeader,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CustomCategory } from "../types";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CategoriesSidebarProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    data: CustomCategory[] // TODO: Eliminar más tarde
}


export default function CategoriesSidebar({ open, onOpenChange, data }: CategoriesSidebarProps) {

    const router = useRouter();

    const [parentCategories, setParentCategories] = useState<CustomCategory[] | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<CustomCategory | null>(null);

    //  if we have parent categories show them. Otherwise show root categories
    const currentCategoriess = parentCategories ?? data ?? [];

    const handleOpenChange = (open: boolean) => {
        setSelectedCategory(null);
        setParentCategories(null);
        onOpenChange(open);
    }

    const handleCategoryClick = (category: CustomCategory) => {
        // console.log("Clicked category:", category);
        if (category.subcategories && category.subcategories.length > 0) {
            setParentCategories(category.subcategories as CustomCategory[]);
            setSelectedCategory(category)
        } else {
            // This is a leaf category (no subcategories)   
            if (parentCategories && selectedCategory) {
                // THis is a subcategory - navigate to the category page
                router.push(`/${selectedCategory.slug}/${category.slug}`);
            } else {
                // This is a main category with no subcategories - navigate to the category page
                if (category.slug === 'all') {
                    router.push(`/`);
                } else {
                    router.push(`/${category.slug}`);
                }
            }

            handleOpenChange(false);
        }
    }

    const handleBackClick = () => {
        if (parentCategories) {
            // Go back to root categories
            setParentCategories(null);
            setSelectedCategory(null);
        } else {
            // We are already in root categories, just close the sidebar
            handleOpenChange(false);
        }
    }

    const backgroundColor = selectedCategory?.color || "white"

    return (
        <Sheet open={open} onOpenChange={handleOpenChange} >
            <SheetContent
                side='left'
                className="p-0 transition-none"
                style={{ backgroundColor }}
            >
                <SheetHeader className="p-4 border-b">
                    <SheetTitle>Categories</SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
                    {parentCategories && (
                        <button
                            onClick={handleBackClick}
                            className='w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer'
                        >
                            <ChevronLeftIcon className='size-4 mr-2' />
                            Back
                        </button>
                    )}
                    {currentCategoriess.map((category) => (
                        <button
                            key={category.slug}
                            onClick={() => handleCategoryClick(category)}
                            className='w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center text-base font-medium cursor-pointer'
                        >
                            {category.name}
                            {category.subcategories && category.subcategories.length > 0 && (
                                <ChevronRightIcon className='size-4' />
                            )}
                        </button>
                    ))}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
}