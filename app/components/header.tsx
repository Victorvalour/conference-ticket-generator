import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import ticket from "@/app/images/ticket-icon.svg"
import ticz from "@/app/images/ticz.svg"



export function Header() {
  return (
    <header className="flex items-center justify-between   border-[1.5px] rounded-3xl px-3 py-3 border-[#197686] font-jeju">
      <div className="flex items-center space-x-2 ">
      
      <div className="bg-[#052F35] border-2 border-[#0E464F] p-2 rounded-2xl">
          <Image src={ticket} alt="Icon" />
          </div>
      
          <Image src={ticz} alt="ticz" />
       
      </div>
      <nav className="hidden md:flex items-center space-x-6">
        <Link className="text-gray-300 hover:text-white transition-colors" href="/events">
          Events
        </Link>
        <Link className="text-gray-300 hover:text-white transition-colors" href="/my-tickets">
          My Tickets
        </Link>
        <Link className="text-gray-300 hover:text-white transition-colors" href="/about">
          About Project
        </Link>
      </nav>
      <Button variant="outline" className="bg-white text-black hover:bg-gray-100 h-12">
        MY TICKETS →
      </Button>
    </header>
  )
}

