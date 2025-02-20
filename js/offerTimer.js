function updateTime() {
  const now = new Date();

  // Offer deadline
  const deadline = new Date("2025-03-18T12:00:00"); 

  const diff = deadline - now;

  if (diff <= 0) {
    document.getElementById("offer-timer").textContent = "Offer Expired";
    return;
  }

  // Calculate remaining days, hours, minutes, and seconds
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  const timeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;
  document.getElementById("offer-timer").innerHTML = `
        <div class="time-container">
            <div class="time">${days}</div>
            <div class="time-format">Days</div>
        </div>
        <div class="time-container">
            <div class="time">${hours}</div>
            <div class="time-format">hours</div>
        </div>
        <div class="time-container">
            <div class="time">${minutes}</div>
            <div class="time-format">mins</div>
        </div>
        <div class="time-container">
            <div class="time">${seconds}</div>
            <div class="time-format">sec</div>
        </div>
    
    `;
}

setInterval(updateTime, 1000);

updateTime();
