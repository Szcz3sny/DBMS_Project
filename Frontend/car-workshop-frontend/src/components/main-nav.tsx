import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";

export function MainNav({}: React.HTMLAttributes<HTMLElement>) {
  return (
    <div className="bg-black">
      <div className="mx-auto max-w-screen-lg flex items-center justify-between py-4 px-6">
        <div className="flex-1">
          <NavigationMenu>
            <NavigationMenuList className="flex flex-col space-y-4 md:flex-row md:space-x-10 md:space-y-0">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href=""
                  className="block hover:bg-red-700 hover:text-white px-2 py-1 rounded transition-colors duration-150 border-b border-red-800 hover:border-red-700"
                >
                  Strona Główna
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href=""
                  className="block hover:bg-red-700 hover:text-white px-2 py-1 rounded transition-colors duration-150 border-b border-red-800 hover:border-red-700"
                >
                  Oferta
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href=""
                  className="block hover:bg-red-700 hover:text-white px-2 py-1 rounded transition-colors duration-150 border-b border-red-800 hover:border-red-700"
                >
                  Dostępne części
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href=""
                  className="block hover:bg-red-700 hover:text-white px-2 py-1 rounded transition-colors duration-150 border-b border-red-800 hover:border-red-700"
                >
                  Kontakt i lokalizacja
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <Button className="py-2 px-4 bg-red-800 text-white rounded hover:bg-red-600 transition-colors duration-150 border border-red-600 hover:border-red-700 shadow md:ml-4">
          Logowanie
        </Button>
      </div>
    </div>
  );
}
