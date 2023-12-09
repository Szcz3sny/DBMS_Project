import { MainNav } from "@/components/main/main-nav";
import { UserNav } from "@/components/user/user-nav";

interface MainNavProps {
  isLoggedIn: boolean;
  username?: string;
}

export function NavBar({
  isLoggedIn,
  username,
  onLogout,
}: MainNavProps & { onLogout: () => void }) {
  if (isLoggedIn) {
    return <UserNav username={username} onLogout={onLogout}></UserNav>;
  } else {
    return <MainNav></MainNav>;
  }
}
