import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../configSDK/SDK';

const AnalyticsTracker = () => {
  const location = useLocation();

  useEffect(() => {
    logEvent(analytics, 'page_view', {
      page_path: location.pathname,
      page_location: window.location.href,
      page_title: document.title
    });
  }, [location]);

  return null;
};

export default AnalyticsTracker;
