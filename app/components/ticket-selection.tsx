"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTicketStore } from "@/lib/store"
import { Progress } from "@/components/ui/progress"

interface TicketType {
  type: string
  price: number
  access: string
  available: number
}

const ticketTypes: TicketType[] = [
  { type: "Regular", price: 0, access: "REGULAR ACCESS", available: 20 },
  { type: "VIP", price: 150, access: "VIP ACCESS", available: 20 },
  { type: "VVIP", price: 150, access: "VVIP ACCESS", available: 20 },
]

export function TicketSelection() {
  const router = useRouter()
  const [selectedTicket, setSelectedTicket] = useState<string>("")
  const [quantity, setQuantity] = useState("1")
  const { setField } = useTicketStore()

  const handleSubmit = () => {
    if (selectedTicket) {
      setField("ticketType", selectedTicket)
      router.push("/attendee-form")
    }
  }

  return (
    <Card className="max-w-3xl mx-auto bg-[#041E23] text-white border-[#0E464F] px-20">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-normal font-jeju  ">Ticket Selection</CardTitle>
          <span className="text-sm text-gray-400">Step 1/3</span>
        </div>
        <Progress value={33} className="h-1" />
      </CardHeader>
      <CardContent className="space-y-8 bg-[#08252B] border-[#0E464F] border-[1.5px]">
        <div className="space-y-4 border-[#07373F] mt-6 border-[1.5px] px-6 rounded-2xl py-4">
          <h1 className="text-4xl font-bold text-center">Techember Fest &apos;25</h1>
          <p className="text-center text-gray-400">
            Join us for an unforgettable experience at Techember Fest. Secure your spot now.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
            <span>📍 G4 Partners meet, Royal, Lagos</span>
            <span>|</span>
            <span>March 15, 2025 | 7:00 PM</span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm text-gray-400">Select Ticket Type:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {ticketTypes.map((ticket) => (
              <button
                key={ticket.type}
                onClick={() => setSelectedTicket(ticket.type)}
                className={`p-4 rounded-lg border transition-all ${
                  selectedTicket === ticket.type
                    ? "border-teal-400 bg-teal-400/10"
                    : "border-teal-900 hover:border-teal-400"
                }`}
              >
                <div className="text-xl font-bold">{ticket.price === 0 ? "Free" : `$${ticket.price}`}</div>
                <div className="text-sm text-gray-400">{ticket.access}</div>
                <div className="text-xs text-gray-500 mt-2">{ticket.available}/52</div>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm text-gray-400">Number of Tickets</h3>
          <Select value={quantity} onValueChange={setQuantity}>
            <SelectTrigger className="w-full bg-transparent border-teal-900 text-white">
              <SelectValue placeholder="Select quantity" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            className="w-[200px] border-teal-900 text-gray-400 hover:text-white hover:border-teal-400"
          >
            Cancel
          </Button>
          <Button
            className="w-[200px] bg-teal-400 text-black hover:bg-teal-500"
            onClick={handleSubmit}
            disabled={!selectedTicket}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

