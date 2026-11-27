/**
 * Shared Configuration & Utilities
 * Nadia Collective (Afisa Bouquet & Nadia Artistry)
 */

const APP_CONFIG = {
  // Nomor WhatsApp utama (Nadia)
  // Format internasional tanpa tanda '+' (contoh: 6282154309113)
  whatsappNumber: '6282154309113',
  whatsappDisplay: '0821-5430-9113',
  contactName: 'Nadia',
  
  // Social Links
  instagramAfisa: 'https://www.instagram.com/afisabouquet/',
  instagramNadia: 'https://www.instagram.com/nadiaanfh/',
  
  // Location
  locationText: 'Jl. Revolusi, arah Gg. Kasih (samping Dama Parfume), Samarinda',
  city: 'Samarinda, Kalimantan Timur'
};

/**
 * Generate Direct WhatsApp Link with prefilled encoded message
 */
function createWhatsAppUrl(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${APP_CONFIG.whatsappNumber}?text=${encoded}`;
}

/**
 * Initialize Mobile Navigation Toggle
 */
function initMobileNav() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden');
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      document.body.classList.remove('overflow-hidden');
    });
  }

  // Close when clicking a link inside mobile menu
  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      });
    });
  }
}

/**
 * Image Lightbox Modal Handlers
 */
let activeLightboxModal = null;

function openLightbox(imageUrl, title, category, price, orderWaMsg) {
  const modal = document.getElementById('imageLightboxModal');
  if (!modal) return;

  const imgEl = modal.querySelector('#lightboxImage');
  const titleEl = modal.querySelector('#lightboxTitle');
  const catEl = modal.querySelector('#lightboxCategory');
  const priceEl = modal.querySelector('#lightboxPrice');
  const waBtnEl = modal.querySelector('#lightboxWaBtn');

  if (imgEl) imgEl.src = imageUrl;
  if (titleEl) titleEl.textContent = title;
  if (catEl) catEl.textContent = category;
  if (priceEl) priceEl.textContent = price || 'Konsultasi via WhatsApp';

  if (waBtnEl) {
    const defaultMsg = orderWaMsg || `Halo ${APP_CONFIG.contactName}, saya tertarik ingin pesan/tanya tentang "${title}". Apakah masih ada slot untuk tanggal ... ?`;
    waBtnEl.href = createWhatsAppUrl(defaultMsg);
  }

  modal.classList.add('active');
  document.body.classList.add('overflow-hidden');
  activeLightboxModal = modal;
}

function closeLightbox() {
  const modal = document.getElementById('imageLightboxModal');
  if (!modal) return;
  modal.classList.remove('active');
  document.body.classList.remove('overflow-hidden');
  activeLightboxModal = null;
}

// Global modal event listeners
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && activeLightboxModal) {
    closeLightbox();
  }
});

// Update dynamic footer year & contacts
document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();

  // Set current year
  const yearEls = document.querySelectorAll('.current-year');
  yearEls.forEach(el => el.textContent = new Date().getFullYear());

  // Set WhatsApp button links that have data-wa-type
  const waButtons = document.querySelectorAll('[data-wa-type]');
  waButtons.forEach(btn => {
    const type = btn.getAttribute('data-wa-type');
    let message = `Halo ${APP_CONFIG.contactName}, saya ingin bertanya tentang layanan Anda.`;
    
    if (type === 'general') {
      message = `Halo Kak ${APP_CONFIG.contactName}, saya ingin berkonsultasi mengenai layanan Nadia Collective (Afisa Bouquet / Nadia Artistry).`;
    } else if (type === 'afisa-general') {
      message = `Halo Kak ${APP_CONFIG.contactName} & Afisa Bouquet, saya ingin pesan/konsultasi buket untuk acara tanggal [isi tanggal di sini]. Boleh minta info katalog & ketersediaan slotnya?`;
    } else if (type === 'mua-general') {
      message = `Halo Kak ${APP_CONFIG.contactName} (Nadia Artistry), saya ingin tanya ketersediaan jadwal makeup untuk acara [Wisuda / Lamaran / Wedding] pada tanggal [isi tanggal] di area [lokasi acara]. Boleh minta info pricelist lengkapnya?`;
    } else if (type === 'combo-package') {
      message = `Halo Kak ${APP_CONFIG.contactName}, saya sangat tertarik dengan "Paket Kombo Wisuda / Event (Makeup by Nadia + Buket by Afisa Bouquet)". Boleh info ketersediaan slot & promo bundlingnya untuk tanggal [isi tanggal]?`;
    }

    btn.href = createWhatsAppUrl(message);
  });
});
