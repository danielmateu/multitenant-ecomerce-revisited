import { CustomCategory } from "../types";
import Categories from "./categories";
import SearchInput from "./search-input";


interface SearchFiltersProps {
    data: CustomCategory[];
}

export default function SearchFilters({ data }: SearchFiltersProps) {
    return (
        <div className="flex flex-col gap-4 w-full px-4 lg:px-12 py-8 border-b">
            <SearchInput data={data} />
            <div className="hidden lg:block">
                <Categories data={data} />
            </div>
            {/* {JSON.stringify(data, null, 2)} */}
            {/* <h1>
            </h1> */}
        </div>
    );
}