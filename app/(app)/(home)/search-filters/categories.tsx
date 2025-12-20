import { Category } from "@/payload-types";
import CategoryDropdown from "./category-dropdown";

interface CategoriesProps {
    data: any;
}

export default function Categories({ data }: CategoriesProps) {
    return (
        <div>
            {
                data.map((category: Category) => (
                    <div key={category.id} className="mb-4">
                        <CategoryDropdown category={category} isActive={true} isNavigationHovered={false} />
                    </div>
                ))
            }
        </div>
    );
}