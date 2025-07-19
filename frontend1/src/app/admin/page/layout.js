import Sidebar from '@/components/Sidebar';

export default async function AdminLayout({ children }) {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <main className="flex-1 p-8 overflow-scroll">{children}</main>
        </div>
    );
}
