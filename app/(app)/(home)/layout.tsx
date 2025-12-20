import Footer from "@/components/footer";
import Navbar from "./navbar";
import SearchFilters from "./search-filters";
import { getPayloadClient } from "@/lib/payload";
import { Category } from "@/payload-types";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default async function HomeLayout({ children }: HomeLayoutProps) {

    const payload = await getPayloadClient();

    const data = await payload.find({
        collection: 'categories',
        depth: 1, // Populate subcategories, subcategories of 0 wil be a type of Category
        where: {
            parent: {
                exists: false
            }
        },
    });

    // const formattedData = data.docs.map((category: any) => ({
    //     ...category,
    //     subcategories: category.subcategories || []
    // }));

    const formattedData = data.docs.map((doc) => ({
        ...doc,
        subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category),
            subcategories: undefined
        }))
    }))

    console.log("Fetched categories data:", data);
    console.log("Formatted categories data:", formattedData);

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