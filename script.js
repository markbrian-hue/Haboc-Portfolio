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

// ==========================================
// GOD TIER: DARK MATTER ELASTIC FABRIC
// ==========================================
const canvas = document.getElementById('interactive-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Mouse configuration
const mouse = {
    x: -1000, 
    y: -1000, 
    radius: 200, // How far the "flashlight" and physics reach
    clicked: false
};

window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Move mouse off-screen when it leaves the window
window.addEventListener('mouseout', () => {
    mouse.x = -1000;
    mouse.y = -1000;
});

// Handle Singularity clicks
window.addEventListener('mousedown', () => mouse.clicked = true);
window.addEventListener('mouseup', () => mouse.clicked = false);

window.addEventListener('touchstart', e => {
    mouse.x = e.touches[0].clientX;
    mouse.y = e.touches[0].clientY;
    mouse.clicked = true;
});
window.addEventListener('touchend', () => {
    mouse.x = -1000;
    mouse.y = -1000;
    mouse.clicked = false;
});

class DarkMatterNode {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // Base positions to snap back to
        this.baseX = x;
        this.baseY = y;
        // Velocity
        this.vx = 0;
        this.vy = 0;
        // Node properties
        this.size = Math.random() * 1.5 + 0.5;
        this.friction = 0.85; // How bouncy the elastic is
        this.springFactor = 0.05; // How fast it snaps back
    }

    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        // Calculate force based on mouse distance
        if (distance < mouse.radius) {
            let forceDirectionX = dx / distance;
            let forceDirectionY = dy / distance;
            
            // Magic formula for smooth falloff
            let force = (mouse.radius - distance) / mouse.radius;
            
            // If clicked, suck in (Black hole). If hovering, push away (Repel).
            let pushForce = mouse.clicked ? -4 : 3;

            this.vx -= forceDirectionX * force * pushForce;
            this.vy -= forceDirectionY * force * pushForce;
        }

        // Apply spring logic to pull particle back to its original spot
        this.vx += (this.baseX - this.x) * this.springFactor;
        this.vy += (this.baseY - this.y) * this.springFactor;

        // Apply friction to velocity so it doesn't vibrate forever
        this.vx *= this.friction;
        this.vy *= this.friction;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw() {
        // Calculate illumination based on distance to mouse
        let dx = mouse.x - this.baseX;
        let dy = mouse.y - this.baseY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Only render the particle if it's somewhat near the mouse to create a stealth effect
        let opacity = 0;
        if (distance < mouse.radius * 1.5) {
            opacity = 1 - (distance / (mouse.radius * 1.5));
        } else {
            opacity = 0.03; // Barely visible when far away
        }

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
    }
}

function initDarkMatter() {
    particles = [];
    
    // Create a uniform grid of particles
    let spacing = window.innerWidth < 768 ? 35 : 30; // Closer together on mobile
    
    for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
            // Add slight randomness to the grid so it looks organic, not rigid
            let randomX = x + (Math.random() * 10 - 5);
            let randomY = y + (Math.random() * 10 - 5);
            particles.push(new DarkMatterNode(randomX, randomY));
        }
    }
}

function connectNodes() {
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let dx = particles[a].x - particles[b].x;
            let dy = particles[a].y - particles[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            // Only connect nearby nodes
            if (distance < 45) {
                // Flashlight illumination logic for lines
                let mouseDx = mouse.x - particles[a].x;
                let mouseDy = mouse.y - particles[a].y;
                let mouseDistance = Math.sqrt(mouseDx * mouseDx + mouseDy * mouseDy);
                
                let opacity = 0;
                if (mouseDistance < mouse.radius) {
                    opacity = 1 - (mouseDistance / mouse.radius);
                    // Fade line based on connection distance
                    opacity = opacity * (1 - distance / 45); 
                    
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.5})`; // 0.5 keeps lines subtle
                    ctx.lineWidth = 1;
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }
}

function animateDarkMatter() {
    requestAnimationFrame(animateDarkMatter);
    // Hard clear the canvas every frame to prevent trailing/fogging
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
    }
    
    connectNodes();
}

// Start the engine
initDarkMatter();
animateDarkMatter();

// Handle browser resizing
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initDarkMatter();
});