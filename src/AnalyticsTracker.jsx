import { logEvent } from 'firebase/analytics';
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { analytics } from './Component/confgSDK/SDK';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_path: location.pathname,
      page_location: window.location.href,
      page_title: document.title,
      timestamp: new Date().toISOString() 
    });
  }, [location]);

  return null;
};

export default AnalyticsTracker;
