import Navbar from "./navbar";

interface HomeLayoutProps {
    children: React.ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
    return (
        <>
            <Navbar />
            <main className="flex min-h-screen flex-col items-center p-24 bg-rose-200 dark:bg-rose-700 space-y-20">{children}</main>
        </>
    );
}