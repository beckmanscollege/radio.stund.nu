const player = document.querySelector("#player");
const prevTriangle = document.querySelector("#prev-triangle");
const nextTriangle = document.querySelector("#next-triangle");
const message = document.querySelector("#message");
const hamburgerButton = document.querySelector("#hamburger-button");
const nav = document.querySelector('nav');
const infoBtn = document.getElementById('info-btn');
const infoContent = document.getElementById('info-content-allt');
const songList = document.querySelectorAll('ul li a');

let currentIndex = 0;
let currentPlayingIndex = currentIndex;
let isFirstNextClick = false;



const urls = Array.from(songList).map(song => {
  return {url: song.getAttribute('data-sound'), name: song.textContent};
});

player.src = urls[currentIndex].url;

function playSong(index) {
  currentIndex = index;
  player.src = urls[currentIndex].url;
  player.play();
  showMessage(urls[currentIndex].name);
}

prevTriangle.addEventListener("click", function() {
  let prevIndex = currentIndex - 1;
  if (prevIndex < 0) {
    prevIndex = urls.length - 1;
  }
  playSong(prevIndex);
});

nextTriangle.addEventListener("click", function() {
if (!isFirstNextClick) {
playSong(0);
isFirstNextClick = true;
} else {
let nextIndex = currentIndex + 1;
if (nextIndex === urls.length) {
playSong(0);
} else {
playSong(nextIndex);
}
}
});

nav.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const index = Array.from(songList).findIndex(song => song === event.target);
    playSong(index);
    nav.style.opacity = 0;
    setTimeout(() => {
      nav.classList.remove('show');
    }, 1000);
  }
});

function showMessage(text) {
  message.innerHTML = text;
  message.style.opacity = 1;
  setTimeout(function() {
    message.style.opacity = 0;
  }, 2500);
}



hamburgerButton.addEventListener('click', () => {
  nav.classList.toggle('show');
  if (nav.classList.contains('show')) {
    setTimeout(() => {
      nav.style.opacity = 1;
    }, 10); 
  } else {
    nav.style.opacity = 0;
  }
  
});


document.addEventListener('click', (event) => {
  if (event.target !== hamburgerButton && !nav.contains(event.target)) {
    nav.style.opacity = 0;
    setTimeout(() => {
      nav.classList.remove('show');
    }, 1000); 
  }
});

nav.addEventListener('click', (event) => {
  if (nav.classList.contains('show')) {
    nav.style.opacity = 0;
    setTimeout(() => {
      nav.classList.remove('show');
    }, 1000); 
  }
});


infoBtn.addEventListener('click', function() {
  infoContent.style.display = 'block';
  infoContent.style.opacity = 0;
  let opacity = 0;
  let intervalID = setInterval(function() {
    opacity += 0.05;
    infoContent.style.opacity = opacity;
    if (opacity >= 0.7) {
      clearInterval(intervalID);
    }
  }, 50);
});

infoContent.addEventListener('click', function(event) {
  if (event.target === infoContent) {
    let opacity = 0.5;
    let intervalID = setInterval(function() {
      opacity -= 0.05;
      infoContent.style.opacity = opacity;
      if (opacity <= 0) {
        clearInterval(intervalID);
        infoContent.style.display = 'none';
      }
    }, 50);
  }
});

const infoContent2 = document.querySelector('.info-content2');

infoContent2.addEventListener('click', function() {
  let opacity = 0.5;
  let intervalID = setInterval(function() {
    opacity -= 0.05;
    infoContent.style.opacity = opacity;
    if (opacity <= 0) {
      clearInterval(intervalID);
      infoContent.style.display = 'none';
    }
  }, 50);
});




const volumeSlider = document.querySelector("#volume");

volumeSlider.addEventListener('input', (event) => {
  const value = event.target.value;
  const percentage = (value - event.target.min) / (event.target.max - event.target.min) * 100;
  volumeSlider.style.setProperty('--value', `${percentage}%`);
});
volumeSlider.addEventListener("input", () => {
  player.volume = volumeSlider.value;
});
