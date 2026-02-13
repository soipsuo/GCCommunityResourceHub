// Sidebar
const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const scrim = document.getElementById("scrim");

menuBtn.onclick = () => {
    sidebar.classList.add("open");
    scrim.hidden = false;
    menuBtn.classList.add("is-open"); // <-- animate to X
};

function closeMenu() {
    sidebar.classList.remove("open");
    scrim.hidden = true;
    menuBtn.classList.remove("is-open"); // <-- back to burger
    closeAllDropdowns();
}

closeBtn.onclick = closeMenu;
scrim.onclick = closeMenu;

// Optional: Escape key closes menu too
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
});


const burgerBtn = document.getElementById("menuBtn");

// Dropdown logic
const dropButtons = document.querySelectorAll(".drop-btn");

function closeAllDropdowns(exceptId = null) {
    dropButtons.forEach(btn => {
        const id = btn.dataset.drop;
        const panel = document.getElementById(id);

        if (id !== exceptId) {
            btn.setAttribute("aria-expanded", "false");
            panel.classList.remove("open");
        }
    });
}

// Force-close everything on page load
closeAllDropdowns(null);

dropButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.dataset.drop;
        const panel = document.getElementById(id);
        const isOpen = panel.classList.contains("open");

        if (isOpen) {
            btn.setAttribute("aria-expanded", "false");
            panel.classList.remove("open");
        } else {
            closeAllDropdowns(id);
            btn.setAttribute("aria-expanded", "true");
            panel.classList.add("open");
        }
    });
});


// Slideshow
const slideImg = document.getElementById("slideImg");
const slideFrame = document.querySelector(".slide-frame");
const slideOverlay = document.querySelector(".slide-overlay");
const slideTitle = document.getElementById("slideTitle");
const slideDesc = document.getElementById("slideDesc");
const slideActions = document.getElementById("slideActions");
const dots = document.getElementById("dots");

const slides = [{
        title: "Welcome",
        desc: "Explore Gwinnett County student resources.",
        img: "Images/your-left-photo.jpg",
        buttons: []
    },
    {
        title: "Tutoring",
        desc: "Academic support resources.",
        img: "Images/slide1.jpg",
        buttons: [{ label: "Tutoring", href: "Connecting/tutoring.html" }]
    },
    {
        title: "Forum / News",
        desc: "Community updates and discussions.",
        img: "Images/slide2.jpg",
        buttons: [
            { label: "Forum", href: "Connecting/forum.html" },
            { label: "News", href: "County-Wide/news.html" }
        ]
    },
    {
        title: "Mental Support",
        desc: "Emotional and mental health programs.",
        img: "Images/slide3.jpg",
        buttons: [{ label: "Support", href: "mentalhealth.html" }]
    },
    {
        title: "Awards",
        desc: "County-wide awards.",
        img: "Images/slide4.jpg",
        buttons: [{ label: "Awards", href: "County-Wide/awards.html" }]
    }
];

let current = 0;
const FADE = 400;
const AUTO = 4000;
let timer;

function renderDots() {
    dots.innerHTML = "";
    slides.forEach((_, i) => {
        const d = document.createElement("div");
        d.className = "dot" + (i === current ? " active" : "");
        d.onclick = () => goTo(i, true);
        dots.appendChild(d);
    });
}

function render() {
    const s = slides[current];
    slideImg.src = s.img;
    slideTitle.textContent = s.title;
    slideDesc.textContent = s.desc;
    slideOverlay.classList.remove("is-entering");
    void slideOverlay.offsetWidth;
    slideOverlay.classList.add("is-entering");
    slideFrame.classList.toggle("is-clickable", Boolean(s.buttons[0]?.href));
    slideActions.innerHTML = "";
    s.buttons.forEach(b => {
        const a = document.createElement("a");
        a.href = b.href;
        a.textContent = b.label;
        slideActions.appendChild(a);
    });
    renderDots();
}

function goTo(i, user = false) {
    if (user) restart();
    slideImg.classList.add("fading");
    setTimeout(() => {
        current = (i + slides.length) % slides.length;
        render();
        slideImg.classList.remove("fading");
    }, FADE);
}

function next(user = false) { goTo(current + 1, user); }

slideFrame.addEventListener("click", (e) => {
    if (e.target.closest(".arrow") || e.target.closest(".slide-actions a") || e.target.closest(".dot")) {
        return;
    }

    const primaryHref = slides[current].buttons[0]?.href;
    if (primaryHref) {
        window.location.href = primaryHref;
    }
});

document.getElementById("nextBtn").onclick = () => next(true);
document.getElementById("prevBtn").onclick = () => goTo(current - 1, true);

function start() {
    timer = setInterval(() => next(false), AUTO);
}

function restart() {
    clearInterval(timer);
    start();
}

const revealEls = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealEls.forEach((el) => revealObserver.observe(el));

start();
render();
