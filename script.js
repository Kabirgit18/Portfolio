// Hamburger
const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobileMenu");
hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});
function closeMobile() {
  mobileMenu.classList.remove("open");
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, i * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 },
);
reveals.forEach((el) => observer.observe(el));

// Scroll Spy
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a, .mobile-menu a");

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href").substring(1) === entry.target.id) {
            link.classList.add("active");
          }
        });
      }
    });
  },
  { threshold: 0, rootMargin: "-20% 0px -80% 0px" },
);

sections.forEach((section) => spyObserver.observe(section));

// Contact form handling
const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = "Sending...";

  const formData = new FormData(contactForm);

  try {
    const response = await fetch(contactForm.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      submitBtn.textContent = "Message Sent! ✓";
      submitBtn.style.background = "#4ecdc4";
      contactForm.reset();
      setTimeout(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.style.background = "";
        submitBtn.disabled = false;
      }, 5000);
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    submitBtn.textContent = "Error! Try again";
    submitBtn.style.background = "#ff6b6b";
    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.style.background = "";
      submitBtn.disabled = false;
    }, 3000);
  }
});

// Current Year
document.getElementById("currentYear").textContent = new Date().getFullYear();
