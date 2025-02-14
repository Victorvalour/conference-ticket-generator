/* "use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { type TicketFormValues, ticketFormSchema, defaultFormValues } from "@/lib/types"
import { TicketSelection } from "@/app/components/ticket-selection"
import { AttendeeDetails } from "@/app/components/"
import { TicketDisplay } from "@/app/components/ticket-display"

export function TicketForm() {
  const form = useForm<TicketFormValues>({
    resolver: zodResolver(ticketFormSchema),
    defaultValues: defaultFormValues,
  })

  const step = form.watch("step")

  // Load saved form data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("ticketForm")
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      Object.keys(parsedData).forEach((key) => {
        form.setValue(key as keyof TicketFormValues, parsedData[key])
      })
    }
  }, [form])

  // Save form data to localStorage on change
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem("ticketForm", JSON.stringify(value))
    })
    return () => subscription.unsubscribe()
  }, [form])

  const onSubmit = (data: TicketFormValues) => {
    if (step < 3) {
      form.setValue("step", step + 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#001a1a] text-white">
      <header className="border-b border-teal-800">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🎫</span>
            <span className="text-xl font-semibold">tiez</span>
          </div>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-teal-300 hover:text-teal-200">
              Events
            </a>
            <a href="#" className="text-teal-300 hover:text-teal-200">
              My Tickets
            </a>
            <a href="#" className="text-teal-300 hover:text-teal-200">
              About Project
            </a>
            <button className="rounded-full bg-white px-4 py-2 text-black hover:bg-gray-100">MY TICKETS →</button>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-2xl rounded-lg bg-[#002626] p-8">
          {step === 1 && <TicketSelection form={form} onSubmit={onSubmit} />}
          {step === 2 && <AttendeeDetails form={form} onSubmit={onSubmit} />}
          {step === 3 && <TicketDisplay form={form} />}
        </div>
      </main>
    </div>
  )
}

 */