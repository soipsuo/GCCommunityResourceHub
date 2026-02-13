const menuBtn = document.getElementById("menuBtn");
const closeBtn = document.getElementById("closeBtn");
const sidebar = document.getElementById("sidebar");
const scrim = document.getElementById("scrim");
const dropButtons = document.querySelectorAll(".drop-btn");

if (menuBtn && sidebar && scrim) {
    const closeAllDropdowns = (exceptId = null) => {
        dropButtons.forEach((btn) => {
            const id = btn.dataset.drop;
            const panel = document.getElementById(id);
            if (!panel) return;

            if (id !== exceptId) {
                btn.setAttribute("aria-expanded", "false");
                panel.classList.remove("open");
            }
        });
    };

    const openMenu = () => {
        sidebar.classList.add("open");
        sidebar.setAttribute("aria-hidden", "false");
        scrim.hidden = false;
        menuBtn.classList.add("is-open");
    };

    const closeMenu = () => {
        sidebar.classList.remove("open");
        sidebar.setAttribute("aria-hidden", "true");
        scrim.hidden = true;
        menuBtn.classList.remove("is-open");
        closeAllDropdowns();
    };

    menuBtn.addEventListener("click", openMenu);
    if (closeBtn) closeBtn.addEventListener("click", closeMenu);
    scrim.addEventListener("click", closeMenu);

    dropButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const id = btn.dataset.drop;
            const panel = document.getElementById(id);
            if (!panel) return;

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

    closeAllDropdowns();

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMenu();
    });
}
