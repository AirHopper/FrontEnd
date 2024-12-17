// Mengecek apakah browser support service worker dan push notification
const checkPersmission = () => {
    if (!('serviceWorker' in navigator)) {
      throw new Error("No support for service worker!");
    }
  
    if (!('Notification' in window)) {
      throw new Error("No support for notification API");
    }
  }
  
  // Membuat service worker
  const registerSW = async () => {
    // Mendaftarkan service worker, lanjut ke file sw.js
    const registration = await navigator.serviceWorker.register('src/sw.js', { type: 'module' })
  
    // Mengambil jwt token dari local storage
    const token = localStorage.getItem('token');
  
    // Mengirimkan token ke service worker melalui message (karena service worker tidak bisa mengakes local storage)
    if (registration.active) {
      registration.active.postMessage({ type: 'SET_TOKEN', token: token });
    } else if (registration.installing) {
      registration.installing.postMessage({ type: 'SET_TOKEN', token: token });
    }
  
    return registration;
  }
  
  // Meminta akses notifikasi ke user, pilihan allow atau deny
  const requestNotificationPermission = async () => {
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      throw new Error("Notification permission not granted");
    }
  }
  
  // Button Enable Notification
  export const enableNotification = async () => {
    checkPersmission();
    await requestNotificationPermission();
    await registerSW();
  }

