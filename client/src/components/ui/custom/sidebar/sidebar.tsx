import { sidebarData } from "./sidebar.data";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 overflow-y-auto" key={sidebarData.length}>
      <nav className="flex flex-col p-4 space-y-2">
        <Link href="/news" className="items-center">
            <div className="flex items-center gap-2">
                <Image priority src="/logo.svg" alt="logo" width={45} height={45} className="invert"/>
                <h1 className="text-2xl font-bold">Matrix</h1>
            </div>
        </Link>

        <div className="flex flex-col gap-2 pt-10">
            {sidebarData.map((item, index) => (
            <Link href={item.href} key={index}>
                <Button variant="ghost" className="w-full justify-start text-lg font-medium">
                <item.icon className="w-6 h-6 mr-4" />
                {item.name}
                </Button>
            </Link>
            ))}
        </div>
      </nav>
    </aside>
  )
}
