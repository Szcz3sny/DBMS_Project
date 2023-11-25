import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export function MainNav({}: React.HTMLAttributes<HTMLElement>) {
  const navigate = useNavigate();

  const handleHomePageClick = () => {
    navigate("/HomePage");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="bg-black">
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
        <Button
          onClick={handleLoginClick}
          className="py-2 px-4 bg-red-800 text-white rounded hover:bg-red-600 transition-colors duration-150 border border-red-600 hover:border-red-700 shadow md:ml-4"
        >
          Logowanie
        </Button>
      </div>
    </div>
  );
}
