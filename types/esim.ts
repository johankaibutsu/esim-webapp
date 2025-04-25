export interface Plan {
  name: string;
  price: string;
  validFrom?: string;
  validUntil?: string;
  remainingData?: string;
  data?: string;
  validity?: string;
  speed?: string;
  support?: string;
  roaming?: boolean;
}

export interface Usage {
  totalData: string;
  usedData: string;
  smsTotal: number;
  smsUsed: number;
  voiceTotal: string;
  voiceUsed: string;
}

export interface CurrentSession {
  sessionId: string;
  started: string;
  usageMB: number;
}

export interface EsimData {
  bookingId: string;
  plan: Plan;
  usage: Usage;
  currentSession: CurrentSession;
  availablePlans: Plan[];
}
