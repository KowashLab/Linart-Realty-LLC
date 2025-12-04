import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

/*
═══════════════════════════════════════════════════════════════════
  ANALYTICS & TRACKING
  - Google Analytics 4
  - Yandex Metrika
  - Custom event tracking
═══════════════════════════════════════════════════════════════════
*/

interface AnalyticsProps {
  googleAnalyticsId?: string; // e.g., 'G-XXXXXXXXXX'
  yandexMetrikaId?: string;   // e.g., '12345678'
}

export function Analytics({ 
  googleAnalyticsId = '',
  yandexMetrikaId = '' 
}: AnalyticsProps) {
  
  useEffect(() => {
    // Track page views on route change
    const handleRouteChange = () => {
      // Google Analytics pageview
      if (googleAnalyticsId && (window as any).gtag) {
        (window as any).gtag('config', googleAnalyticsId, {
          page_path: window.location.pathname,
        });
      }

      // Yandex Metrika pageview
      if (yandexMetrikaId && (window as any).ym) {
        (window as any).ym(yandexMetrikaId, 'hit', window.location.href);
      }
    };

    // Listen for custom navigation events
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  }, [googleAnalyticsId, yandexMetrikaId]);

  return (
    <Helmet>
      {/* Google Analytics 4 */}
      {googleAnalyticsId && (
        <>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          />
          <script>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `}
          </script>
        </>
      )}

      {/* Yandex Metrika */}
      {yandexMetrikaId && (
        <script>
          {`
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${yandexMetrikaId}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true
            });
          `}
        </script>
      )}
    </Helmet>
  );
}

// Custom event tracking helper
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  // Google Analytics
  if ((window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams);
  }

  // Yandex Metrika
  if ((window as any).ym && eventParams?.yandexMetrikaId) {
    (window as any).ym(eventParams.yandexMetrikaId, 'reachGoal', eventName);
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics Event]', eventName, eventParams);
  }
};

// Predefined event trackers
export const trackPropertyView = (propertyId: string, propertyName: string) => {
  trackEvent('property_view', {
    property_id: propertyId,
    property_name: propertyName,
  });
};

export const trackConsultationRequest = (page: string) => {
  trackEvent('consultation_request', {
    page_location: page,
  });
};

export const trackServiceClick = (serviceName: string) => {
  trackEvent('service_click', {
    service_name: serviceName,
  });
};

export const trackContactForm = (formType: string) => {
  trackEvent('contact_form_submit', {
    form_type: formType,
  });
};
