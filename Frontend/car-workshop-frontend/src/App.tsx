import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import './App.css'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"


function App() {
  return (
    <>
    <ThemeProvider>
    <div className="flex items-center justify-between">
  <NavigationMenu>
    <NavigationMenuList className="flex space-x-2">
      <NavigationMenuItem>
        <NavigationMenuLink>Item One</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink>Item One</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink>Item One</NavigationMenuLink>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuLink>Item One</NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>

  <Button className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">Click me</Button>
</div>


    </ThemeProvider>
   
    </>
  )
}

export default App

