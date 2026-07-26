// ABOUTME: Client-side behavior for the pantelicu.space portfolio site
// ABOUTME: theme toggle, mobile nav, scroll effects, and the interactive Belgrade places map

(function () {
  "use strict";

  // ---- theme toggle (persisted) ----
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) root.setAttribute("data-theme", savedTheme);

  themeToggle.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  // ---- mobile nav ----
  const navToggle = document.getElementById("nav-toggle");
  const navLinks = document.getElementById("nav-links");
  navToggle.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  // ---- scroll progress bar ----
  const progressBar = document.getElementById("progress-bar");
  function updateProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // ---- scrollspy: highlight active nav link ----
  const sections = Array.from(document.querySelectorAll("main section[id], main .hero[id]"));
  const navAnchors = Array.from(navLinks.querySelectorAll("a"));
  const spyObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            a.classList.toggle("active", a.getAttribute("href") === "#" + id);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((s) => spyObserver.observe(s));

  // ---- reveal-on-scroll ----
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // ---- back to top ----
  document.getElementById("back-to-top").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // ---- footer year ----
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---- places map ----
  const PLACES = [
    {
      id: "climb",
      name: "Sektor44",
      label: "Where I climb",
      emoji: "🧗",
      lat: 44.8010511,
      lng: 20.3839711,
      desc: "Bouldering gym, Blok 44, Novi Beograd.",
    },
    {
      id: "padel",
      name: "Padel Space",
      label: "Where I play padel",
      emoji: "🎾",
      lat: 44.8340367,
      lng: 20.3593217,
      desc: "Padel courts in Zemun.",
    },
    {
      id: "home",
      name: "Studentski Grad",
      label: "Where I live",
      emoji: "🏠",
      lat: 44.8239656,
      lng: 20.3992163,
      desc: "Student dormitory district, Novi Beograd.",
    },
    {
      id: "food",
      name: "Žabac",
      label: "Where I eat",
      emoji: "🍔",
      lat: 44.8221865,
      lng: 20.4068978,
      desc: "Go-to fast food spot on Bulevar Zorana Đinđića.",
    },
    {
      id: "run",
      name: "Ada Ciganlija",
      label: "Where I run",
      emoji: "🏃",
      lat: 44.7844366,
      lng: 20.3810367,
      desc: "River island loop around the lake — my running route.",
    },
    {
      id: "gym",
      name: "Ahilej",
      label: "Where I lift",
      emoji: "💪",
      lat: 44.8296388,
      lng: 20.4015235,
      desc: "Gym next to the Ninth Belgrade Gymnasium, Novi Beograd.",
    },
    {
      id: "university",
      name: "School of Electrical Engineering",
      label: "Where I study",
      emoji: "🎓",
      lat: 44.8057154,
      lng: 20.4762358,
      desc: "University of Belgrade — B.Sc. Electrical Engineering, Bulevar kralja Aleksandra 73.",
    },
    {
      id: "hometown",
      name: "Šabac",
      label: "Where I'm from",
      emoji: "🏡",
      lat: 44.7571535,
      lng: 19.6953972,
      desc: "My hometown, western Serbia, on the Sava river.",
    },
  ];

  const mapEl = document.getElementById("map");
  const listEl = document.getElementById("place-list");
  if (!mapEl || !listEl) return;
  const markerById = {};

  const map = L.map(mapEl, { scrollWheelZoom: false });
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  function emojiIcon(emoji) {
    return L.divIcon({
      html: `<div class="pin-emoji">${emoji}</div>`,
      className: "pin-icon",
      iconSize: [34, 34],
      iconAnchor: [17, 17],
    });
  }

  function setActiveCard(id) {
    listEl.querySelectorAll(".place-card").forEach((card) => {
      card.classList.toggle("active", card.dataset.id === id);
    });
  }

  PLACES.forEach((place) => {
    const marker = L.marker([place.lat, place.lng], { icon: emojiIcon(place.emoji) })
      .addTo(map)
      .bindPopup(`<strong>${place.name}</strong><br>${place.label}<br><small>${place.desc}</small>`);

    marker.on("click", () => setActiveCard(place.id));
    markerById[place.id] = marker;

    const li = document.createElement("li");
    li.className = "place-card";
    li.dataset.id = place.id;
    li.innerHTML = `
      <span class="place-emoji">${place.emoji}</span>
      <div>
        <div class="place-label">${place.label}</div>
        <div class="place-name">${place.name}</div>
        <div class="place-desc">${place.desc}</div>
      </div>
    `;
    li.addEventListener("click", () => {
      map.flyTo([place.lat, place.lng], 15, { duration: 0.8 });
      marker.openPopup();
      setActiveCard(place.id);
    });
    listEl.appendChild(li);
  });

  map.fitBounds(
    L.latLngBounds(PLACES.map((place) => [place.lat, place.lng])),
    { padding: [28, 28] }
  );

  // re-enable scroll zoom once the user actually interacts with the map
  map.on("click", () => map.scrollWheelZoom.enable());
})();
