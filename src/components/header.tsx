import { useTheme } from "@/context/theme-provider"
import { Moon, Sun } from "lucide-react";
import { Link } from "react-router-dom"
import CitySearch from "./city-search";


const header = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {theme , setTheme} = useTheme();
    const isDark = theme === "dark";
  return (
   <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2 supports-[backdrop-filter]:bg-background/60">
   <div className="container mx-auto flex h-16 items-center justify-between px-4">
    <Link to={"/"}>
    <h1 className="text-blue-700 font-bold text-3xl p-2">Forcastify</h1>
    <img src={isDark ? "/logo.png" : "/logo.png"} alt="logo" />
    </Link>
    <div>
        {/* search  */}
        <CitySearch/>
        {/* theme toggle  */}
        <div onClick={()=>setTheme(isDark ? 'light' : 'dark')}
            className={`flex items-center cursor-pointer transition-transform duration-500 ${isDark ? 'rotate-180' : 'rotate-0'}`}>
            {isDark ? <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"/> : <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all"/>}
            </div>
    </div>
   </div>
   </header>
  )
}

export default header
