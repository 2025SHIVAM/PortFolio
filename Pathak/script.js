// ======================================
// 1. MOBILE NAVIGATION
// ======================================

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.textContent = isOpen ? "✕" : "☰";
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// ======================================
// 2. SCROLL REVEAL ANIMATIONS
// ======================================

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => {
    element.classList.add("visible");
  });
}


// ======================================
// 3. COPYRIGHT YEAR
// ======================================

document.getElementById("year").textContent =
  new Date().getFullYear();


// ======================================
// 4. WEB3FORMS CONTACT FORM
// ======================================

const contactForm = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");
const formStatus = document.getElementById("formStatus");

const WEB3FORMS_ACCESS_KEY =
  "af641d5d-8e8b-45a9-a0e4-9fd01cdec4b4";

contactForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (!contactForm.reportValidity()) {
    return;
  }

  const originalText = submitButton.textContent;

  submitButton.disabled = true;
  submitButton.textContent = "SENDING MESSAGE...";

  formStatus.textContent = "Sending your message...";
  formStatus.className = "form-status";

  try {
    const formData = new FormData(contactForm);

    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append(
      "subject",
      "New Portfolio Message - Shivam Pathak"
    );

    const response = await fetch(
      "https://api.web3forms.com/submit",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to send your message."
      );
    }

    formStatus.textContent =
      "Success! Your message has been sent. Thank you for contacting me!";

    formStatus.className = "form-status success";
    contactForm.reset();

  } catch (error) {
    console.error("Contact form error:", error);

    formStatus.textContent =
      "Message could not be sent. Check your internet connection, Access Key and Web3Forms configuration.";

    formStatus.className = "form-status error";

  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});