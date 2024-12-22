const checkPermission = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error('No support for service worker!');
  }
  if (!('Notification' in window)) {
    throw new Error('No support for notification API');
  }
};

const registerSW = async () => {
  const registration = await navigator.serviceWorker.register('/sw.js', {
    type: 'module',
  });

  const token = localStorage.getItem('token');

  // Pass environment variables to the service worker
  const envData = {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    VITE_WEB_PUSH_PUBLIC_KEY: import.meta.env.VITE_WEB_PUSH_PUBLIC_KEY,
  };

  if (registration.active) {
    registration.active.postMessage({ type: 'SET_ENV', data: envData });
    registration.active.postMessage({ type: 'SET_TOKEN', data: { token } });
  } else if (registration.installing) {
    registration.installing.postMessage({ type: 'SET_ENV', data: envData });
    registration.installing.postMessage({ type: 'SET_TOKEN', data: { token } });
  }

  return registration;
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error('Notification permission not granted');
  }
};

export const enableNotification = async () => {
  checkPermission();
  await requestNotificationPermission();
  await registerSW();
};
