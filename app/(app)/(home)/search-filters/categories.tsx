import { Category } from "@/payload-types";
import CategoryDropdown from "./category-dropdown";

interface CategoriesProps {
    data: any;
}

export default function Categories({ data }: CategoriesProps) {
    return (
        <div className="relative w-full">
            <div className="flex flex-no-wrap items-center">
                {
                    data.map((category: Category) => (
                        <div key={category.id} className="mb-4">
                            <CategoryDropdown category={category} isActive={true} isNavigationHovered={false} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}