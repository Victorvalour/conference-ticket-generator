"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function TicketDisplay() {
  const router = useRouter()

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white">Your Ticket is Booked!</h1>
        <p className="text-gray-400">
          Check your email for a copy or you can <button className="text-teal-400 hover:underline">download</button>
        </p>
      </div>

      <Card className="bg-[#002626] border-teal-900">
        <CardContent className="p-8">
          <div className="relative max-w-md mx-auto">
            {/* Ticket Design */}
            <div className="bg-[#001A1A] rounded-lg p-6 border border-teal-900">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-white">Techember Fest &apos;25</h2>
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
                    <span>📍 G4 Partners meet, Royal, Lagos</span>
                    <span className="text-teal-400">|</span>
                    <span>March 15, 2025 | 7:00 PM</span>
                  </div>
                </div>

                <div className="flex justify-center">
                  <div className="h-24 w-24 rounded-lg bg-teal-400/10 border border-teal-400/30" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Full Name</p>
                    <p className="text-white">John Doe</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-white">john@example.com</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Ticket Type</p>
                    <p className="text-white">VIP</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Ticket ID</p>
                    <p className="text-white">#1</p>
                  </div>
                </div>

                {/* Special Request */}
                <div className="text-sm">
                  <p className="text-gray-400">Special Request</p>
                  <p className="text-white">No special requests</p>
                </div>

                {/* Barcode */}
                <div className="pt-4 border-t border-teal-900">
                  <div className="h-16 bg-white rounded">{/* In a real app, generate a proper barcode here */}</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          className="w-[200px] border-teal-900 text-gray-400 hover:text-white hover:border-teal-400"
          onClick={() => router.push("/")}
        >
          Book Another Ticket
        </Button>
        <Button className="w-[200px] bg-teal-400 text-black hover:bg-teal-500">Download Ticket</Button>
      </div>
    </div>
  )
}

