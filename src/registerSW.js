const checkPersmission = () => {
  if (!('serviceWorker' in navigator)) {
    throw new Error("No support for service worker!");
  }

  if (!('Notification' in window)) {
    throw new Error("No support for notification API");
  }
};

const registerSW = async () => {
  // Use the correct path to your sw.js file
  const registration = await navigator.serviceWorker.register('/sw.js', { type: 'module' });

  const token = localStorage.getItem('token');

  if (registration.active) {
    registration.active.postMessage({ type: 'SET_TOKEN', token });
  } else if (registration.installing) {
    registration.installing.postMessage({ type: 'SET_TOKEN', token });
  }

  return registration;
};

const requestNotificationPermission = async () => {
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    throw new Error("Notification permission not granted");
  }
};

export const enableNotification = async () => {
  checkPersmission();
  await requestNotificationPermission();
  await registerSW();
};
