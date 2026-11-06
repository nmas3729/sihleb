'use client'

import { trackEvent } from '@/lib/analytics'
import { useEffect } from 'react'

export function ConversionTracking() {
  useEffect(() => {
    const onConversionClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('a.project')) trackEvent('portfolio_project_view')
      else if (target.closest('.editorial-plan .button')) trackEvent('pricing_package_click')
      else if (target.closest('#hosting .button')) trackEvent('hosting_click')
      else if (target.closest('a[href^="mailto:"]')) trackEvent('email_click')
    }
    document.addEventListener('click', onConversionClick)
    return () => document.removeEventListener('click', onConversionClick)
  }, [])

  return null
}
