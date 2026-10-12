import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function AnalyticsTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.gtag?.('event', 'page_view', {
      page_path: pathname + search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
}
