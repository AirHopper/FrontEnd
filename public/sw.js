let token = null;
let VITE_API_URL = null;
let VITE_WEB_PUSH_PUBLIC_KEY = null;

// Convert Base64 URL to Uint8Array
const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = atob(base64);
  return Uint8Array.from(rawData, (char) => char.charCodeAt(0));
};

// Save subscription to backend
const saveSubscription = async (subscription) => {
  if (!token) {
    throw new Error('Token is not available.');
  }
  const response = await fetch(`${VITE_API_URL}/api/v1/users/notification`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subscription),
  });
  return response.json();
};

// Handle messages from the main thread
self.addEventListener('message', (event) => {
  const { type, data } = event.data;
  if (type === 'SET_ENV') {
    VITE_API_URL = data.VITE_API_URL;
    VITE_WEB_PUSH_PUBLIC_KEY = data.VITE_WEB_PUSH_PUBLIC_KEY;
  } else if (type === 'SET_TOKEN') {
    token = data.token;
  }
});

// Activate service worker
self.addEventListener('activate', async () => {
  if (!VITE_WEB_PUSH_PUBLIC_KEY) {
    console.error('Public key is not set.');
    return;
  }
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VITE_WEB_PUSH_PUBLIC_KEY),
  });

  // Save subscription to backend
  const response = await saveSubscription(subscription);
  console.log(response);
});

// Handle push notifications
self.addEventListener('push', (event) => {
  self.registration.showNotification('AirHopper Notification', {
    body: event.data.text(),
  });
});
