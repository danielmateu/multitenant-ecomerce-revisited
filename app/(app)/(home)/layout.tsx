import Footer from "@/components/footer";
import Navbar from "./navbar";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <main className="flex-1 p-24 bg-rose-100 dark:bg-rose-800 space-y-20">
                {children}
            </main>
            <Footer />
        </div>
    );
}