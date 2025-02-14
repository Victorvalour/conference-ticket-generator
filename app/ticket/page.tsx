import { Header } from "@/app/components/header"
import { TicketDisplay } from "@/app/components/ticket-display"

export default function TicketPage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <div className="mt-8">
        <TicketDisplay />
      </div>
    </main>
  )
}

