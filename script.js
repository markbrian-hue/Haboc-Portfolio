// --- Interactive Typing Effect ---
const subtitleText = "Information Technology Professional | Highly Motivated & Detail-Oriented";
let charIndex = 0;
const speed = 50; // typing speed in milliseconds
const typewriterElement = document.getElementById("typewriter");

function typeWriter() {
    if (charIndex < subtitleText.length) {
        typewriterElement.innerHTML += subtitleText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    }
}

// Start typing effect slightly after page loads
setTimeout(typeWriter, 500);

// --- Scroll Progress Bar ---
window.addEventListener("scroll", () => {
    const scrollProgress = document.getElementById("scroll-progress");
    const scrollPx = document.documentElement.scrollTop;
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollLen = `${(scrollPx / winHeightPx) * 100}%`;
    scrollProgress.style.width = scrollLen;
});

// --- Scroll Reveal Animation ---
function reveal() {
    const reveals = document.querySelectorAll(".reveal");
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}

window.addEventListener("scroll", reveal);

// Trigger once on load to reveal immediate elements
reveal();

// --- Modal Logic ---

// Function to open a specific modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent scrolling in the background
}

// Function to close a specific modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove("show");
    document.body.style.overflow = "auto"; // Restore background scrolling
}

// Function to close the modal if the user clicks outside the modal content window
function closeOutside(event, modalId) {
    const modal = document.getElementById(modalId);
    if (event.target === modal) {
        closeModal(modalId);
    }
}