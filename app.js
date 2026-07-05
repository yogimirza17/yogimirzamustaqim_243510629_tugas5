document.addEventListener("DOMContentLoaded", () => {

    // --- 1. STICKY NAVBAR TRANSITION ---
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 80) {
            navbar.classList.add("solid");
        } else {
            navbar.classList.remove("solid");
        }
    });


    // --- 2. SMOOTH SCROLL & ACTIVE NAV HIGHLIGHT ---
    const sections = document.querySelectorAll("section, header");
    const navItems = document.querySelectorAll(".nav-item");

    function highlightNav() {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // Deteksi posisi scroll saat ini relatif terhadap section (menggunakan scrollY yang standar)
            if (window.scrollY >= (sectionTop - 160)) {
                current = section.getAttribute("id");
            }
        });

        navItems.forEach(item => {
            item.classList.remove("active");
            if (item.getAttribute("href") === `#${current}`) {
                item.classList.add("active");
            }
        });
    }

    window.addEventListener("scroll", highlightNav);
    // Jalankan highlightNav sekali saat load pertama kali untuk menandai menu aktif jika di-load di tengah halaman
    highlightNav();


    // --- 3. MOBILE HAMBURGER MENU TOGGLE ---
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");

    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        // Ubah ikon hamburger ke penutup (X) saat terbuka
        const icon = hamburger.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.className = "fa-solid fa-xmark";
        } else {
            icon.className = "fa-solid fa-bars";
        }
    });

    // Tutup menu seluler setelah mengklik link tautan
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.querySelector("i").className = "fa-solid fa-bars";
        });
    });


    // --- 4. SCROLL REVEAL ANIMATIONS (Intersection Observer) ---
    const revealElements = document.querySelectorAll(".reveal");

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Hanya animasi satu kali
            }
        });
    }, revealOptions);

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });


    // --- 5. GALLERY MASONRY LIGHTBOX PREVIEW ---
    const galleryItems = document.querySelectorAll(".gallery-item");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxClose = document.querySelector(".lightbox-close");

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const src = item.querySelector("img").getAttribute("src");
            const alt = item.querySelector("img").getAttribute("alt");
            lightboxImg.setAttribute("src", src);
            lightboxImg.setAttribute("alt", alt);
            lightbox.classList.add("active");
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove("active");
    };

    lightboxClose.addEventListener("click", closeLightbox);
    
    // Tutup lightbox ketika klik di luar area gambar
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });


    // --- 6. BACK TO TOP BUTTON CONTROL ---
    const backToTopBtn = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 400) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
