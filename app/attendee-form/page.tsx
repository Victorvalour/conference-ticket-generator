import { Header } from "@/app/components/header"
import { AttendeeForm } from "@/app/components/attendee-form"

export default function AttendeePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <Header />
      <div className="mt-8">
        <AttendeeForm />
      </div>
    </main>
  )
}

