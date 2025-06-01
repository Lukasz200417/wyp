
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



document.addEventListener('DOMContentLoaded', () => {
  updateDateTime();
  setInterval(updateDateTime, 1000);

  updateVisitCount();

  initSessionTimer();

  initGallery();
});

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("insurance-form");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault(); 

      const carPrice = parseFloat(document.getElementById("carPrice").value);
      const horsePower = parseFloat(document.getElementById("horsePower").value);
      const brand = document.getElementById("brand").value;
      const birthYear = parseInt(document.getElementById("birthYear").value);

      const currentYear = new Date().getFullYear();
      const age = currentYear - birthYear;

      let baseRate = 0.01;

      if (horsePower > 150) baseRate += 0.005;
      else if (horsePower > 100) baseRate += 0.003;

      if (brand === "premium") baseRate += 0.004;

      if (age < 25) baseRate += 0.006;
      else if (age > 65) baseRate += 0.004;

      const insuranceCost = carPrice * baseRate;

      const resultBox = document.getElementById("result");
      resultBox.textContent = `Koszt ubezpieczenia na 1 dzień: ${insuranceCost.toFixed(2)} PLN`;
    });
  }
});