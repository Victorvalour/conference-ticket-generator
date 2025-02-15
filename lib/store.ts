import { create } from "zustand"
import { persist } from "zustand/middleware"

interface TicketState {
  name: string
  email: string
  avatarUrl: string
  specialRequest: string
  ticketType: string
  quantity: number
  setField: (field: string, value: string | number) => void
  reset: () => void
}

export const useTicketStore = create<TicketState>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      avatarUrl: '',
      specialRequest: '',
      ticketType: '',
      quantity: 1,
      setField: (field, value) => set((state) => ({ ...state, [field]: value })),
      reset: () => set({ name: '', email: '', avatarUrl: '', specialRequest: '', ticketType: '', quantity: 1 }),
    }),
    {
      name: 'ticket-storage',
    }
  )
)

