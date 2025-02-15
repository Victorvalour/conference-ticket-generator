"use client"

import { useRouter } from "next/navigation"
import { useTicketStore } from "@/lib/store";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useState } from "react";
import JsBarcode from "jsbarcode";
import Image from "next/image";

export function TicketDisplay() {
  const router = useRouter();
  const { name, email, avatarUrl, specialRequest, ticketType, quantity } = useTicketStore();
  const [ticketId, setTicketId] = useState("");


console.log("User Data", name, email)
  useEffect(() => {
    // Generate a unique ticket ID
    const uniqueId = `TKT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    setTicketId(uniqueId);
  }, []);

  useEffect(() => {
    if (ticketId) {
      JsBarcode("#barcode", ticketId, {
        format: "CODE128",
        displayValue: true,
        fontSize: 14,
      });
    }
  }, [ticketId]);

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
                  {avatarUrl && (
                    <Image
                      src={avatarUrl}
                      alt="Avatar"
                      width={96}
                      height={96}
                      className="h-24 w-24 rounded-lg border border-teal-400/30"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Full Name</p>
                    <p className="text-white">{name}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Email</p>
                    <p className="text-white">{email}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Ticket Type</p>
                    <p className="text-white">{ticketType}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Ticket ID</p>
                    <p className="text-white">{ticketId}</p>
                  </div>
                </div>

                {/* Special Request */}
                <div className="text-sm">
                  <p className="text-gray-400">Special Request</p>
                  <p className="text-white">{specialRequest || "No special requests" }</p>
                </div>

                {/* Barcode */}
                <div className="pt-4 border-t border-teal-900 flex justify-center">
                  <svg id="barcode"></svg>
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

