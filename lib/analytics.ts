export type AnalyticsEventName =
  | 'enquiry_started'
  | 'enquiry_submitted'
  | 'enquiry_failed'
  | 'whatsapp_click'
  | 'email_click'
  | 'package_interest'
  | 'service_interest'
  | 'portfolio_project_view'
  | 'pricing_package_click'
  | 'hosting_click'

type AnalyticsWindow = Window & {
  dataLayer?: unknown[]
  gtag?: (...args: unknown[]) => void
}

export function trackEvent(eventName: AnalyticsEventName, parameters?: Record<string, string>) {
  if (typeof window === 'undefined') return

  const analyticsWindow = window as AnalyticsWindow
  analyticsWindow.dataLayer ??= []
  analyticsWindow.gtag ??= (...args: unknown[]) => {
    analyticsWindow.dataLayer?.push(args)
  }
  analyticsWindow.gtag('event', eventName, parameters)
}
