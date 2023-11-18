import { MainNav } from "@/components/main-nav";
import { LogNav } from "@/components/log-nav";
export default function DashboardPage() {
  return (
    <>
      <div className=" flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4  ">
            <MainNav className="mx-1 " />
            <LogNav className="ml-auto" />
          </div>
        </div>
      </div>
    </>
  );
}
