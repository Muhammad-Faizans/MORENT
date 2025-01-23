'use client'

import Link from "next/link"
import { useState } from "react"
import { Home, Car, BarChart2, RefreshCw, MessageSquare, Calendar, Settings, HelpCircle, Moon, LogOut, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const mainMenuItems = [
  { icon: Home, label: "Dashboard", href: "/admin", active: true },
  { icon: Car, label: "Car Rent", href: "/admin/" },
  { icon: BarChart2, label: "Insight", href: "/admin/" },
  { icon: RefreshCw, label: "Reimburse", href: "/admin/" },
  { icon: MessageSquare, label: "Inbox", href: "/admin/" },
  { icon: Calendar, label: "Calendar", href: "/admin/" },
]

const preferenceItems = [
  { icon: Settings, label: "Settings", href: "/admin/settings" },
  { icon: HelpCircle, label: "Help & Center", href: "/admin/help" },
]

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const SidebarContent = () => (
    <>
      <Link href={"/"}><div className="text-[32px] font-bold text-[#3563E9] mb-12">MORENT</div></Link>
      
      <div className="flex-1">
        <div className="space-y-1 mb-8">
          <h3 className="text-xs text-[#90A3BF] font-medium px-4 mb-4">MAIN MENU</h3>
          {mainMenuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg text-[16px] ${
                item.active 
                  ? "bg-[#3563E9] text-white" 
                  : "text-[#596780] hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-6 h-6" />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="space-y-1">
          <h3 className="text-xs text-[#90A3BF] font-medium px-4 mb-4">PREFERENCES</h3>
          {preferenceItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#596780] hover:bg-gray-100"
            >
              <item.icon className="w-6 h-6" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="border-t border-[#F3F5F7] pt-6 space-y-4">
        <button className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#596780] hover:bg-gray-100 w-full">
          <Moon className="w-6 h-6" />
          Dark Mode
        </button>
        <button className="flex items-center gap-4 px-4 py-3 rounded-lg text-[#596780] hover:bg-gray-100 w-full">
          <LogOut className="w-6 h-6" />
          Log Out
        </button>
      </div>
    </>
  )

  return (
    <>
      <aside className="hidden md:flex w-[280px] bg-white h-screen p-6 flex-col fixed left-0 top-0 z-50 overflow-y-auto">
    <SidebarContent />
</aside>
<div className="md:hidden">
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="fixed top-4 left-4 z-50">
                <Menu className="h-6 w-6" />
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[280px] p-6">
            <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-4"
                onClick={() => setIsOpen(false)}
            >
                <X className="h-6 w-6" />
            </Button>
            <SidebarContent />
        </SheetContent>
    </Sheet>
</div>

    </>
  )
}

