export const BUSINESS = {
  name: 'SihleB Digital Studio',
  legalName: 'NMAS INNOVATIONS (Pty) Ltd',
  registrationNumber: 'TODO_CIPC_REG',
  address: 'TODO_REGISTERED_ADDRESS',
}

export const HOSTING_RENEWAL = {
  amount: 'R350.00',
  period: 'per month',
}

export const DOMAIN_RENEWAL_NOTE =
  'Domain renewal fees vary by registrar and change over time. We confirm the current price with you before any renewal is processed.'

export type Testimonial = {
  quote: string
  name: string
  role: string
  business: string
  outcome?: string
  consent: boolean
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'SihleB Digital Studio developed and hosts our website, giving Travel Class SA a professional online presence.',
    name: 'Levy',
    role: 'CEO',
    business: 'Travel Class SA',
    consent: false,
  },
  {
    quote:
      'SihleB Digital Studio developed and hosts our website, helping Eclipse Power Energy present our business online.',
    name: 'Vee',
    role: 'Executive Director',
    business: 'Eclipse Power Energy',
    consent: false,
  },
  {
    quote:
      'SihleB Digital Studio developed and hosts our website, giving Siko Mining Services a professional online presence.',
    name: 'Banani',
    role: 'CEO / Executive Director',
    business: 'Siko Mining Services',
    consent: false,
  },
]
