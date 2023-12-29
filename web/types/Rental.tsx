export type Member = {
  shortName?: string;
  names: string;
  apartmentNr?: string;
  email: string;
  notes?: string;
}

export type GarageParkingSlot = {
  id: string;
  description: string;
  type: string;
  notes?: string;
}

export type GarageParkingSlotRental = {
  member: Member;
  garageParkingSlot: GarageParkingSlot;
  queueDate?: string;
  startDate?: string;
}