
function updateDateTime() {
  const now = new Date();
  document.getElementById('current-date').textContent = now.toLocaleDateString('pl-PL');
  document.getElementById('current-time').textContent = now.toLocaleTimeString('pl-PL');
}


function updateVisitCount() {
  if (!sessionStorage.getItem('visitCounted')) {
    let count = localStorage.getItem('visitCount');
    count = count ? parseInt(count, 10) : 0;
    count++;
    localStorage.setItem('visitCount', count);
    sessionStorage.setItem('visitCounted', 'true'); 
  }

  const countDisplay = document.getElementById('visit-count');
  if (countDisplay) {
    countDisplay.textContent = localStorage.getItem('visitCount') || '0';
  }
}


function initSessionTimer() {
  if (!sessionStorage.getItem('startTime')) {
    sessionStorage.setItem('startTime', Date.now());
  }

  function updateTimer() {
    const startTime = parseInt(sessionStorage.getItem('startTime'), 10);
    const elapsedMs = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const display = document.getElementById('time-on-page');
    if (display) {
      display.textContent = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
    }
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}


const gallery = [
  {
    src: "images/Wyp1.png",
    caption: "Nasza wypożyczalnia samochodów rozpoczęła       działalność w 1990 roku z inicjatywy Kazimierza Nowaka, pasjonata  motoryzacji i przedsiębiorcy z wizją."
  },
  {
    src: "images/wyp2.png",
    caption: "Z małego garażu na przedmieściach przekształciliśmy się w ogólnopolską firmę z pięcioma oddziałami w największych miastach."
  },
  {
    src: "images/wyp3.png",
    caption: "Od początku stawiamy na jakość, niezawodność i przyjazną obsługę klienta."
  },
    {
    src: "images/Wyp4.png",
    caption: "W naszej flocie znajduje się ponad 100 pojazdów różnych klas i marek od ekonomicznych po luksusowe.."
  },  {
    src: "images/Wyp5.png",
    caption: "Dbamy o regularny serwis i czystość każdego samochodu. Nasi stali klienci mogą liczyć na atrakcyjne rabaty i indywidualne podejście. Zaufaj nam Twoja podróż zaczyna się właśnie tutaj."
  }
  
];

let current = 0;

function showImage(index) {
  const img = document.getElementById("gal-img");
  const caption = document.getElementById("gal-cap");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  if (img && caption && gallery[index]) {
    img.src = gallery[index].src;
    caption.textContent = gallery[index].caption;
  }

  
  if (prevBtn) prevBtn.disabled = index === 0;

 
  if (nextBtn) nextBtn.disabled = index === gallery.length - 1;
}

function initGallery() {
  document.getElementById("prev").addEventListener("click", () => {
    current = (current - 1 + gallery.length) % gallery.length;
    showImage(current);
  });

  document.getElementById("next").addEventListener("click", () => {
    current = (current + 1) % gallery.length;
    showImage(current);
  });

  showImage(current);
}


document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
  setInterval(updateDateTime, 1000);

  updateVisitCount();

  initSessionTimer();

  initGallery();
});