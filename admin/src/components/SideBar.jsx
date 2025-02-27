import { CalendarArrowDown, Package, Settings } from "lucide-react";
import { NavLink, useLocation,Link } from "react-router-dom";
const Sidebar = () => {
    const location = useLocation();

    const links = [
        { path: "/proizvodi", icon: Package },
        { path: "/narudzbine", icon: CalendarArrowDown }
    ];

    return (
        <div className="h-screen w-16 flex flex-col  items-center justify-between bg-gray-900 text-white py-4 space-y-4 px-2">
           
                {links.map(({ path, icon: Icon }) => (
                    <Link
                        key={path}
                        to={path}
                        className={
                           `p-2 rounded-lg transition-all ${location.pathname === path ? "bg-orange-500 scale-110" : "hover:bg-gray-700"}`
            
                        }
                    >
                        <Icon size={location.pathname === path ? 28 : 24} />
                    </Link>
                ))}
                <Link to={"/settings"} className="cursor-pointer hover:scale-105" ><Settings size={24} /></Link>
            
        </div>
    );
};

export default Sidebar;
