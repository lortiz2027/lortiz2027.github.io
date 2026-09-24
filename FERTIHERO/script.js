const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => navLinks.classList.remove("open"));
});

const sections = document.querySelectorAll("section[id]");
const links = document.querySelectorAll(".nav-links a");

function updateActiveLink() {
  let current = "home";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 160) current = section.id;
  });
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
}
window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, {threshold:.12});
revealItems.forEach(el => observer.observe(el));

/*
FIREBASE DEMO LSITENER PLACEHOLDER  
*/

const demoBtn = document.getElementById("demoBtn");
const nValue = document.getElementById("nValue");
const pValue = document.getElementById("pValue");
const kValue = document.getElementById("kValue");
const timestamp = document.getElementById("timestamp");
const recommendationText = document.getElementById("recommendationText");
const adjustmentValue = document.getElementById("adjustmentValue");

const targetN = document.getElementById("targetN");
const targetP = document.getElementById("targetP");
const targetK = document.getElementById("targetK");
const targetValue = document.getElementById("targetValue");
const setTargetBtn = document.getElementById("setTargetBtn");

let targetNPK = {
  n: Number(targetN.value),
  p: Number(targetP.value),
  k: Number(targetK.value)
};

function updateTargetDisplay() {
  targetValue.textContent =
    `${targetNPK.n.toFixed(1)} — ${targetNPK.p.toFixed(1)} — ${targetNPK.k.toFixed(1)}`;
}

function setTargetNPK() {
  const n = Number(targetN.value);
  const p = Number(targetP.value);
  const k = Number(targetK.value);

  if (![n, p, k].every(value => Number.isFinite(value) && value >= 0)) {
    return;
  }

  targetNPK = { n, p, k };
  updateTargetDisplay();

  // Recalculate the recommendation using the newest target if a reading exists.
  if (lastReading) {
    showReading(lastReading.n, lastReading.p, lastReading.k);
  }
}

let lastReading = null;

function showReading(n, p, k) {
  lastReading = {n: Number(n), p: Number(p), k: Number(k)};

  nValue.textContent = lastReading.n.toFixed(1);
  pValue.textContent = lastReading.p.toFixed(1);
  kValue.textContent = lastReading.k.toFixed(1);
  timestamp.textContent = new Date().toLocaleTimeString([], {hour:"2-digit", minute:"2-digit"});

  const deficits = [
    Math.max(0, targetNPK.n - lastReading.n),
    Math.max(0, targetNPK.p - lastReading.p),
    Math.max(0, targetNPK.k - lastReading.k)
  ];

  const names = ["nitrogen", "phosphorus", "potassium"];
  const symbols = ["N", "P", "K"];
  const largest = deficits.indexOf(Math.max(...deficits));

  if (Math.max(...deficits) < 0.1) {
    recommendationText.textContent =
      "The current reading meets the selected target NPK. Continue monitoring before applying additional fertilizer.";
    adjustmentValue.textContent = "Target reached";
  } else {
    const nutrientName = names[largest];
    const amount = deficits[largest].toFixed(1);
    recommendationText.textContent =
      `${nutrientName[0].toUpperCase() + nutrientName.slice(1)} is below your selected target by ${amount} mg/kg. Review the fertilizer plan before application.`;
    adjustmentValue.textContent =
      `${symbols[largest]} is ${amount} mg/kg below target`;
  }
}

setTargetBtn.addEventListener("click", setTargetNPK);

[targetN, targetP, targetK].forEach(input => {
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") setTargetNPK();
  });
});

updateTargetDisplay();

demoBtn.addEventListener("click", () => {
  showReading(14.8, 12.4, 16.1);
});

/*
  Firebase integration example:
  onValue(ref(db, "nitrogen"), snap => nValue.textContent = snap.val());
  Repeat for phosphorus and potassium, then call showReading(n, p, k).
*/
