const player = document.querySelector("#player");
const prevTriangle = document.querySelector("#prev-triangle");
const nextTriangle = document.querySelector("#next-triangle");
const message = document.querySelector("#message");
const hamburgerButton = document.querySelector("#hamburger-button");
const nav = document.querySelector('nav');
const infoBtn = document.getElementById('info-btn');
const infoContent = document.getElementById('info-content');


// Use const instead of let for the urls array since it doesn't change.
const urls = [
  {
    url: "https://http-live.sr.se/p1-mp3-192",
    name: "P1"
  },
  {
    url: "https://http-live.sr.se/p2musik-aac-320",
    name: "P2 Musik"
  },
  {
    url: "https://http-live.sr.se/p3-mp3-192",
    name: "P3"
  },
  {
    url: "https://http-live.sr.se/p4stockholm-mp3-192",
    name: "P4 Stockholm"
  },
  {
    url: "https://ice2.somafm.com/missioncontrol-128-mp3",
    name: "Mission Control"
  },
  {
    url: "https://audiotainment-sw.streamabc.net/atsw-oldschoolhiphop-mp3-128-3940912?sABC=63ronq5r%230%23n2382qro0prr58q1pqqr25378sors240%23enqvbqr&aw_0_1st.playerid=radiode&amsparams=playerid:radiode;skey:1676389726",
    name: "bigFM Oldschool Rap & Hip-Hop"
  },
  {
    url: "https://strw1.openstream.co/938?",
    name: "House & Techno Classics"
  },
  {
    url: "https://listen.soulradio.us/us",
    name: "Soul Radio Classics US"
  },
  {
    url: "http://fm05-ice.stream.khz.se/fm05_mp3",
    name: "Star FM"
  },
  {
    url: "http://wr08-ice.stream.khz.se/wr08_mp3",
    name: "Soul Classics SWE"
  }
];

let currentIndex = 0;

player.src = urls[currentIndex].url;

prevTriangle.addEventListener("click", function() {
  currentIndex--;
  if (currentIndex < 0) {
    currentIndex = urls.length - 1;
  }
  player.src = urls[currentIndex].url;
  player.play();
  showMessage("Playing: " + urls[currentIndex].name);
});

nextTriangle.addEventListener("click", function() {
  currentIndex++;
  if (currentIndex === urls.length) {
    currentIndex = 0;
  }
  player.src = urls[currentIndex].url;
  player.play();
  showMessage(urls[currentIndex].name);

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

nav.addEventListener('click', (event) => {
  if (event.target.tagName === 'A') {
    event.preventDefault();
    const soundUrl = event.target.getAttribute('data-sound');
    player.src = soundUrl;
    player.play();
     nav.style.opacity = 0;
    setTimeout(() => {
      nav.classList.remove('show');
    }, 1000);
     showMessage(event.target.textContent);
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


infoBtn.addEventListener('click', function() {
  infoContent.style.display = 'block';
  infoContent.style.opacity = 0;
  let opacity = 0;
  let intervalID = setInterval(function() {
    opacity += 0.05;
    infoContent.style.opacity = opacity;
    if (opacity >= 0.5) {
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

