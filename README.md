# Wellness Tracker 🌿

[✨ Coba Live Demo](https://wellness-tracker-nu.vercel.app/)

---

## Techstacks
- **Next.js** → Framework untuk performa 
- **Tailwind CSS** → Styling simpel dan fleksibel  
- **Lucide React** → Ikon ringan  
- **Framer Motion** → Animasi smooth dan interaktif 
- **Gemini Ai**  → Integrasi Gemini Ai untuk memberikan Quotes Harian

---

## Project Structure
lib/api/ → Tempat logika pengambilan & pemrosesan data
components/ → Komponen besar yang muncul di halaman
components/[folder]/ → Komponen kecil yang bisa dipakai ulang

## Design Structure
- Ringkas dan mudah dipahami 
- Warna lembut  
- Fully responsive  
- Animasi halus dengan Framer Motion  
- Tata letak intuitif dan ramah pengguna  

---
## Highlight Teknis

| Komponen/Lib | Fungsi | Konfigurasi | Tujuan
| --- | --- | --- | --- |
| `mood.ts` | `fetchMoodData()` | Permintaan fetch dikonfigurasi : `cache: "no-store"` | Untuk memastikan data terbaru terload
| `summary.ts` | `fetchHistoryData()` | Permintaan fetch dikonfigurasi : `cache: "no-store"` | Untuk memastikan data terbaru terload
| `QuotesCard` | `isValidCache()` | Melakukan cache dengan :  `localStorage.getItem()` | Untuk menjaga request pada API gemini ai
| `MoodModal` | `handleMoodSelect()` | Melakukan : window.dispatchEvent(new Event("moodUpdated"));| Untuk memberikan trigger bahwa mood telah berubah
| `NotificationCard`| `addEventListener()` | Melakukan : window.addEventListener("moodUpdated", loadData);| Mengupdate data setelah menerima triger
| `TrackerCard`| `addEventListener()` | Melakukan : window.addEventListener("moodUpdated", loadData);| Mengupdate data setelah menerima triger


## Development Plan
- Pindahkan perhitungan berat ke server biar lebih cepat  
- Tambah fitur analytics & rekomendasi personal  
- Dashboard lebih lengkap & interaktif  