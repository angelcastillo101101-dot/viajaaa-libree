Enable desktop notifications for Gmail.
   OK  No thanks

Unsubscribe from Temu?
You haven't opened any emails from this sender in the last month
Conversations
8% of 400 GB used
Terms · Privacy · Program Policies
Last account activity: 0 minutes ago
Details
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Abrir menú' : 'Cerrar menú');
  menu.classList.toggle('is-open', !isOpen);
});

menu.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Abrir menú');
    menu.classList.remove('is-open');
  }
});

const destinations = {
  parras: {
    title: 'Parras de la Fuente',
    text: 'Reserva tiempo para caminar por el centro, conocer la tradición vitivinícola y probar productos locales. Confirma horarios y recorridos con los prestadores antes de salir.'
  },
  cienegas: {
    title: 'Cuatro Ciénegas',
    text: 'Planea una visita responsable a sus pozas y dunas: sigue los senderos permitidos, evita tocar el ecosistema y revisa las reglas de acceso vigentes.'
  },
  saltillo: {
    title: 'Saltillo',
    text: 'Combina una caminata por el centro con museos, arquitectura y cocina regional. Revisa horarios de apertura para aprovechar el día.'
  },
  muzquiz: {
    title: 'Múzquiz',
    text: 'Descubre su patrimonio, tradiciones y paisajes cercanos con guías locales. Verifica las condiciones de ruta y acceso antes de cada salida.'
  }
};

const modal = document.querySelector('#modal');
const modalTitle = document.querySelector('#modal-titulo');
const modalText = document.querySelector('#modal-texto');

document.querySelectorAll('.experience-button').forEach((button) => {
  button.addEventListener('click', () => {
    const destination = destinations[button.dataset.destination];
    modalTitle.textContent = destination.title;
    modalText.textContent = destination.text;
    modal.showModal();
  });
});

document.querySelector('.modal-close').addEventListener('click', () => modal.close());
modal.addEventListener('click', (event) => {
  if (event.target === modal) modal.close();
});

const galleryPhotos = [
  { src: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=1800&q=85', alt: 'Dunas bajo el sol del desierto', caption: 'El desierto al final de la tarde' },
  { src: 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1800&q=85', alt: 'Montañas reflejadas en un lago tranquilo', caption: 'Montañas que invitan a detenerse' },
  { src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1800&q=85', alt: 'Viñedo iluminado al atardecer', caption: 'Una tarde entre viñedos' },
  { src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=85', alt: 'Paisaje de agua y montañas', caption: 'Agua, piedra y horizonte' },
  { src: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1800&q=85', alt: 'Pico de montaña bajo un cielo estrellado', caption: 'Cuando cae la noche en el norte' }
];
let currentPhoto = 0;
const galleryImage = document.querySelector('#imagenGaleria');
const galleryCaption = document.querySelector('#galeriaDescripcion');
const galleryCounter = document.querySelector('#galeriaContador');

function showPhoto(index) {
  currentPhoto = (index + galleryPhotos.length) % galleryPhotos.length;
  const photo = galleryPhotos[currentPhoto];
  galleryImage.src = photo.src;
  galleryImage.alt = photo.alt;
  galleryCaption.textContent = photo.caption;
  galleryCounter.textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(galleryPhotos.length).padStart(2, '0')}`;
}

document.querySelector('#imagenAnterior').addEventListener('click', () => showPhoto(currentPhoto - 1));
document.querySelector('#imagenSiguiente').addEventListener('click', () => showPhoto(currentPhoto + 1));

const locations = {
  saltillo: { name: 'Saltillo', latitude: 25.4232, longitude: -100.9916 },
  arteaga: { name: 'Arteaga', latitude: 25.4486, longitude: -100.8467 },
  parras: { name: 'Parras de la Fuente', latitude: 25.4381, longitude: -102.1783 },
  cienegas: { name: 'Cuatro Ciénegas', latitude: 26.9833, longitude: -102.0667 },
  muzquiz: { name: 'Múzquiz', latitude: 27.8789, longitude: -101.5167 }
};

const weatherDescriptions = {
  0: 'Despejado', 1: 'Mayormente despejado', 2: 'Parcialmente nublado', 3: 'Nublado',
  45: 'Neblina', 48: 'Neblina', 51: 'Llovizna ligera', 53: 'Llovizna', 55: 'Llovizna intensa',
  56: 'Llovizna helada', 57: 'Llovizna helada intensa', 61: 'Lluvia ligera', 63: 'Lluvia',
  65: 'Lluvia intensa', 66: 'Lluvia helada', 67: 'Lluvia helada intensa', 71: 'Nevada ligera',
  73: 'Nevada', 75: 'Nevada intensa', 77: 'Granos de nieve', 80: 'Chubascos ligeros',
  81: 'Chubascos', 82: 'Chubascos intensos', 85: 'Chubascos de nieve', 86: 'Chubascos de nieve intensos',
  95: 'Tormenta', 96: 'Tormenta con granizo', 99: 'Tormenta intensa con granizo'
};

const weatherButton = document.querySelector('#consultarClima');
const weatherResult = document.querySelector('#resultadoClima');

weatherButton.addEventListener('click', async () => {
  const location = locations[document.querySelector('#ciudad').value];
  weatherButton.disabled = true;
  weatherButton.textContent = 'Consultando…';
  weatherResult.classList.remove('is-loaded');
  weatherResult.textContent = 'Buscando las condiciones actuales…';

  try {
    const params = new URLSearchParams({
      latitude: location.latitude,
      longitude: location.longitude,
      current: 'temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m',
      timezone: 'America/Monterrey'
    });
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error('No fue posible consultar el clima.');
    const data = await response.json();
    const current = data.current;
    const description = weatherDescriptions[current.weather_code] || 'Condiciones variables';
    weatherResult.classList.add('is-loaded');
    weatherResult.innerHTML = `<div class="weather-reading"><span class="weather-temperature">${Math.round(current.temperature_2m)}°</span><div><div class="weather-condition">${description}</div><div>${location.name}</div></div></div><p class="weather-details">Sensación ${Math.round(current.apparent_temperature)}° · Humedad ${current.relative_humidity_2m}% · Viento ${Math.round(current.wind_speed_10m)} km/h</p>`;
  } catch (error) {
    weatherResult.classList.remove('is-loaded');
    weatherResult.textContent = 'No se pudo consultar el tiempo. Revisa tu conexión e inténtalo de nuevo.';
  } finally {
    weatherButton.disabled = false;
    weatherButton.innerHTML = 'Consultar <span aria-hidden="true">↗</span>';
  }
});