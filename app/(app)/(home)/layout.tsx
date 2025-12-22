import Footer from "@/components/footer";
import Navbar from "./navbar";
import SearchFilters from "./search-filters";
import { getPayloadClient } from "@/lib/payload";
import { Category } from "@/payload-types";
import { CustomCategory } from "./types";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {

    const payload = await getPayloadClient();

    // console.log("Fetching categories from Payload CMS...", payload);

    const { docs } = await payload.find({
        collection: 'categories',
        depth: 1, // Populate subcategories, subcategories of 0 wil be a type of Category
        where: {
            parent: {
                exists: false
            }
        },
        sort: 'name'
    });

    // const formattedData = data.docs.map((category: any) => ({
    //     ...category,
    //     subcategories: category.subcategories || []
    // }));

    const formattedData: CustomCategory[] = docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories && typeof doc.subcategories === 'object' && 'docs' in doc.subcategories)
            ? (doc.subcategories.docs as Category[]).map((sub) => ({
                ...sub,
                subcategories: undefined
            }))
            : []
    }))

    // console.log("Fetched categories docs:", docs);
    // console.log("Formatted categories data:", formattedData);

    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
                <SearchFilters data={formattedData} />
            </header>
            <main className="flex-1 p-24 bg-rose-100 dark:bg-rose-800 space-y-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}