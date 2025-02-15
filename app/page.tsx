import { Header } from "@/app/components/header"
import { TicketSelection } from "@/app/components/ticket-selection"

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <div className="mt-4 pb-4">
        <TicketSelection />
      </div>
    </main>
  )
}

