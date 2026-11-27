'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track non-admin pages
    if (pathname.startsWith('/admin') || pathname.startsWith('/studio-admin') || pathname.startsWith('/api')) return;

    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pageview',
          path: pathname,
          referrer: document.referrer ? (document.referrer.includes(window.location.host) ? 'internal' : document.referrer) : 'direct'
        })
      }).catch(() => {});
    } catch (e) {
      // Ignore tracking errors
    }
  }, [pathname]);

  return null;
}
