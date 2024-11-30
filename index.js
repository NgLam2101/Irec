document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".img_bottom_js");
    const slides = Array.from(document.querySelectorAll(".img_bottom_body1"));
    const slideWidth = slides[0].offsetWidth; // Get the width of a single slide

    // Duplicate the slides for seamless infinite scrolling
    slider.innerHTML += slider.innerHTML; // Duplicate the entire slide content
    const totalWidth = slideWidth * slides.length * 2; // Total width of all slides, including duplicates
    slider.style.width = `${totalWidth}px`; // Set the container's total width

    // Variables for auto-scrolling
    let scrollSpeed = 0.5; // Adjust speed as needed
    let position = 0;
    let isDragging = false;
    let startX = 0;
    let currentTranslate = 0;
    let previousTranslate = 0;

    // Auto-scrolling function
    function autoScroll() {
        if (!isDragging) { // Only scroll if not dragging
            position -= scrollSpeed;
            if (Math.abs(position) >= slideWidth * slides.length) {
                position = 0; // Reset position after scrolling through all original slides
            }
            slider.style.transform = `translateX(${position}px)`;
        }
        requestAnimationFrame(autoScroll); // Continue animation
    }

    // Dragging events
    function handleMouseDown(e) {
        isDragging = true;
        startX = e.pageX; // Capture starting X position
        previousTranslate = position;
    }

    function handleMouseMove(e) {
        if (!isDragging) return;
        const currentX = e.pageX;
        const diff = currentX - startX;
        position = previousTranslate + diff; // Update position while dragging
        slider.style.transform = `translateX(${position}px)`;
    }

    function handleMouseUp() {
        isDragging = false;
    }

    // Event Listeners
    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    // Touch Events for mobile compatibility
    slider.addEventListener("touchstart", (e) => {
        isDragging = true;
        startX = e.touches[0].clientX; // Capture starting touch position
        previousTranslate = position;
    });
    slider.addEventListener("touchmove", (e) => {
        if (!isDragging) return;
        const currentX = e.touches[0].clientX;
        const diff = currentX - startX;
        position = previousTranslate + diff; // Update position while dragging
        slider.style.transform = `translateX(${position}px)`;
    });
    slider.addEventListener("touchend", () => {
        isDragging = false;
    });

    // Start the auto-scroll
    autoScroll();
});
