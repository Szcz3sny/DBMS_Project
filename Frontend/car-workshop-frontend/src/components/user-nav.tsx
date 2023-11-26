import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Link } from "react-router-dom";
interface UserNavProps {
  username?: string;
}
export function UserNav({
  username,
  onLogout,
}: UserNavProps & { onLogout: () => void }) {
  return (
    <div className="bg-black">
      <div className="hidden md:block">
        <div className="mx-auto max-w-screen-lg flex items-center justify-between py-4 px-6">
          <div className="flex-1">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col space-y-4 md:flex-row md:space-x-10 md:space-y-0">
                <NavigationMenuItem>
                  <Link
                    to=""
                    className="block hover:bg-red-700 hover:text-white px-2 py-1 rounded transition-colors duration-150 border-b border-red-800 hover:border-red-700"
                  >
                    Strona Główna
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to=""
                    className="block hover:bg-red-700 hover:text-white px-2 py-1 rounded transition-colors duration-150 border-b border-red-800 hover:border-red-700"
                  >
                    Oferta
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to=""
                    className="block hover:bg-red-700 hover:text-white px-2 py-1 rounded transition-colors duration-150 border-b border-red-800 hover:border-red-700"
                  >
                    Dostępne części
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    to=""
                    className="block hover:bg-red-700 hover:text-white px-2 py-1 rounded transition-colors duration-150 border-b border-red-800 hover:border-red-700"
                  >
                    Kontakt i lokalizacja
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-black py-2 px-4 bg-red-800 text-white rounded hover:bg-red-600 transition-colors duration-150 border border-red-600 hover:border-red-700 shadow">
              <DropdownMenuItem>
                {username ? username : "Nieznany użytkownik"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="">Kalendarz spotkań</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>
                <Link to="">Wyloguj</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="block md:hidden">
        <div className="mx-auto max-w-screen-lg flex items-center justify-between py-4 px-6">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex flex-col space-y-1.5">
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
                <div className="w-6 h-0.5 bg-white"></div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-black">
              <DropdownMenuItem>
                <Link to="">Strona Główna</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="">Oferta</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="">Dostępne części</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link to="">Kontakt i lokalizacja</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src="" alt="Profil użytkownika" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-black py-2 px-4 bg-red-800 text-white rounded hover:bg-red-600 transition-colors duration-150 border border-red-600 hover:border-red-700 shadow">
              <DropdownMenuItem>
                {username ? username : "Nieznany użytkownik"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to="">Kalendarz spotkań</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onLogout}>
                <Link to="">Wyloguj</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
