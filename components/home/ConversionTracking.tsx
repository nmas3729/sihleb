'use client'

import { track } from '@vercel/analytics'
import { useEffect } from 'react'

export function ConversionTracking() {
  useEffect(() => {
    const onConversionClick = (event: MouseEvent) => {
      const target = event.target
      if (!(target instanceof Element)) return
      if (target.closest('a.project')) track('portfolio_project_view')
      else if (target.closest('.editorial-plan .button')) track('pricing_package_click')
      else if (target.closest('#hosting .button')) track('hosting_click')
      else if (target.closest('a[href^="mailto:"]')) track('email_click')
    }
    document.addEventListener('click', onConversionClick)
    return () => document.removeEventListener('click', onConversionClick)
  }, [])

  return null
}
