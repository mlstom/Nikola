'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CalendarArrowDown, Package,Tags } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const links = [
    { path: '/admin/page/proizvodi', icon: Package },
    { path: '/admin/page/narudzbine', icon: CalendarArrowDown },
    { path: '/admin/page/kuponi', icon: Tags },
  ];

  return (
    <div className="h-full w-14 flex flex-col items-center justify-between bg-gray-900 text-white py-4 space-y-4 px-6">
      <div className="flex flex-col gap-4">
        {links.map(({ path, icon: Icon }) => {
          const isActive = pathname === path;
          return (
            <Link
              key={path}
              href={path}
              className={`p-2 rounded-lg transition-all ${
                isActive ? 'bg-orange-500 scale-110' : 'hover:bg-gray-700'
              }`}
            >
              <Icon size={isActive ? 28 : 24} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
