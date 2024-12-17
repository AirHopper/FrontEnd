let token = null;

// Fungsi untuk konversi public key dari base 64 ke Uint8Array (untuk menyesuaikan format subscription)
const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}

// Hit API backend untuk menyimpan informasi subscription ke database
const saveSubscription = async (subscription) => {
  if (!token) {
    throw new Error('Token is not available.');
  }
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/users/notification`, {
    method: 'POST',
    headers: { 
      'Content-type': "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify(subscription)
  })
  return response.json();
}

// Ketika event pengiriman message terjadi, simpan token user ke variabel jwtToken
self.addEventListener('message', async (event) => {
  if (event.data.type === 'SET_TOKEN') {
    token = event.data.token;
  }
});

// Ketika service worker mulai aktif, daftarkan subscription dan jalankan fungsi untuk menyimpan ke database
self.addEventListener("activate", async (e) => {
  // Registrasi subscription
  const subscription = await self.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(`${import.meta.env.VITE_WEB_PUSH_PUBLIC_KEY}`)
  })

  // Menyimpan ke database
  const response = await saveSubscription(subscription)
  console.log(response);
})

// Push terjadi ketika backend mengirimkan notifikasi ke service worker
self.addEventListener("push", e => {
  self.registration.showNotification("AirHopper Notification", { body: e.data.text() }); 
  // Eksplorasi parameter dari fungsi showNotification untuk mengatur title, gambar, dan pesan dari notifikasi 
})