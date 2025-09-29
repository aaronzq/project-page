// Splash screen functionality
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.querySelector('.splash-screen');
    const mainContent = document.querySelector('.main-content');
    let hasScrolled = false;
    let splashTouchStartY = 0;
    let splashTouchEndY = 0;

    // Function to hide splash and show main content
    function enterMainContent() {
        if (hasScrolled) return;
        hasScrolled = true;
        
        splashScreen.classList.add('hidden');
        mainContent.classList.add('visible');
    }

    // Mouse wheel event for splash screen
    function handleSplashWheel(e) {
        if (!hasScrolled && e.deltaY > 0) {
            enterMainContent();
        }
    }

    // Touch events for splash screen (mobile)
    function handleSplashTouchStart(e) {
        if (!hasScrolled) {
            splashTouchStartY = e.touches[0].clientY;
        }
    }

    function handleSplashTouchEnd(e) {
        if (!hasScrolled) {
            splashTouchEndY = e.changedTouches[0].clientY;
            
            // Check if user swiped down
            if (splashTouchStartY > splashTouchEndY && (splashTouchStartY - splashTouchEndY) > 50) {
                enterMainContent();
            }
        }
    }

    // Keyboard event for splash screen (optional - arrow down or space)
    function handleSplashKeydown(e) {
        if (!hasScrolled && (e.key === 'ArrowDown' || e.key === ' ')) {
            e.preventDefault();
            enterMainContent();
        }
    }

    // Add event listeners for splash screen
    window.addEventListener('wheel', handleSplashWheel);
    window.addEventListener('touchstart', handleSplashTouchStart);
    window.addEventListener('touchend', handleSplashTouchEnd);
    window.addEventListener('keydown', handleSplashKeydown);

    // Remove splash event listeners and add gallery event listeners after splash is hidden
    splashScreen.addEventListener('transitionend', function() {
        if (hasScrolled) {
            window.removeEventListener('wheel', handleSplashWheel);
            window.removeEventListener('touchstart', handleSplashTouchStart);
            window.removeEventListener('touchend', handleSplashTouchEnd);
            window.removeEventListener('keydown', handleSplashKeydown);
            
            // Add gallery event listeners
            window.addEventListener("wheel", handleGalleryWheel);
            window.addEventListener("touchstart", handleGalleryTouchStart);
            window.addEventListener("touchmove", handleGalleryTouchMove);
            window.addEventListener("touchend", handleGalleryTouchEnd);
        }
    });
});

// Gallery functionality (existing code with function wrappers)
const track = document.getElementById("image-track");
const images = track.getElementsByClassName("image");

let touchStartY = 0;
let prevPercentage = 0;

// Content templates - stored in JS, not in HTML
const contentTemplates = {
    'content-1': `
        <h2>Photos of Optical Setups</h2>
        <p>The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog. The quick brown fox jumps over the lazy dog.</p>
        <img src="projects/optics-photography/page1.png">
        <p></p>
        <img src="projects/optics-photography/page2.png">
        <p></p>
        <img src="projects/optics-photography/page3.png">
        <p></p>
        <img src="projects/optics-photography/page4.png">
        <p></p>
        <img src="projects/optics-photography/page5.png">
    `,
    'content-2': `
        <h2>Shoot a videography of setup mocking ads</h2>
        <p>The quick brown fox jumps over the lazy dog. So what's this what's that? So what's this what's that? So what's this what's that? So what's this what's that? 
            The quick brown fox jumps over the lazy dog. So what's this what's that? So what's this what's that? So what's this what's that? So what's this what's that?
            The quick brown fox jumps over the lazy dog. So what's this what's that? So what's this what's that? So what's this what's that? So what's this what's that?
            The quick brown fox jumps over the lazy dog. So what's this what's that? So what's this what's that? So what's this what's that? So what's this what's that?
            The quick brown fox jumps over the lazy dog. So what's this what's that? So what's this what's that? So what's this what's that? So what's this what's that?
            The quick brown fox jumps over the lazy dog. So what's this what's that? So what's this what's that? So what's this what's that? So what's this what's that?
        </p>
    `,
    'content-3': `
        <h2>Project 3 Title</h2>
        <video controls>
            <source src="projects/optics-schematics-builder/Demo_fast_short.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <p>This is the content for project 3. You can include images, text, videos, or any other HTML elements here.</p>
    `,
};

// Track which content has been loaded to avoid reloading
const loadedContent = new Set();

// Function to load content only when needed
function loadContentIfNeeded(contentId) {
    if (loadedContent.has(contentId)) return;
    
    const contentElement = document.getElementById(contentId);
    const contentBlock = contentElement.querySelector('.content-display-block');
    
    if (contentTemplates[contentId]) {
        contentBlock.innerHTML = contentTemplates[contentId];
        loadedContent.add(contentId);
    }
}

// Function to check if event target is inside content display
function isInsideContentDisplay(e) {
    const contentDisplay = document.querySelector('.content-display.active');
    if (!contentDisplay) return false;
    
    const rect = contentDisplay.getBoundingClientRect();
    const clientX = e.clientX || (e.touches && e.touches[0].clientX); // Support both mouse and touch events
    const clientY = e.clientY || (e.touches && e.touches[0].clientY); // e.clienX returns mouse position; e.touches[0].clientX returns touch position

    console.log(`ClientX: ${clientX}, not triggering track movement`);

    return clientX >= rect.left;
}

// Handle mouse wheel event for gallery
function handleGalleryWheel(e) {
    // Don't handle wheel event if inside active content display
    if (isInsideContentDisplay(e)) return;
    
    const deltaPercentage = -e.deltaY / 100 * 5; // Amount of vertical scroll (positive or negative)
    const percentage = Math.max(Math.min(prevPercentage + deltaPercentage, 0), -100);

    prevPercentage = percentage;
    console.log(`Mouse wheel delta: ${percentage}`);

    // Use the updated prevPercentage to trigger your animations or logic  
    track.animate({
        transform: `translate(-50%, ${percentage}%)`, width: '50vw', gap: '4vmin'
    }, { duration: 600, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `50% ${100 + percentage}%`
        }, { duration: 600, fill: "forwards" });
    }

    for (const img of images) {
        img.classList.remove("dimmed");
    }

    // Hide all content divs when scrolling
    hideAllContentDivs();
}

// Handle touch events for gallery
function handleGalleryTouchStart(e) {
    // Don't handle touch event if inside active content display
    if (isInsideContentDisplay(e)) return;
    
    touchStartY = e.touches[0].clientY; // Record the starting Y position
}

function handleGalleryTouchMove(e) {
    // Don't handle touch event if inside active content display
    if (isInsideContentDisplay(e)) return;
    
    const touchEndY = e.touches[0].clientY; // Current Y position
    const deltaY = -touchStartY + touchEndY; // Calculate the drag distance
    const deltaPercentage = (deltaY / window.innerHeight) * 100 * 1.25; // Convert drag distance to percentage
    const percentage = Math.max(Math.min(prevPercentage + deltaPercentage, 0), -100);

    prevPercentage = percentage;
    touchStartY = touchEndY; // Update the starting position for the next move

    // Use the updated prevPercentage to trigger your animations or logic  
    track.animate({
        transform: `translate(-50%, ${percentage}%)`, width: '50vw', gap: '4vmin'
    }, { duration: 600, fill: "forwards" });

    for (const image of track.getElementsByClassName("image")) {
        image.animate({
            objectPosition: `50% ${100 + percentage}%`
        }, { duration: 600, fill: "forwards" });
    }

    for (const img of images) {
        img.classList.remove("dimmed");
    }

    hideAllContentDivs();
}

function handleGalleryTouchEnd() {
    // console.log("Touch drag ended");
}

// Add click event listener to each image
for (const image of images) {
    image.addEventListener("click", () => {
        // Get bounding rectangles
        const trackRect = track.getBoundingClientRect();
        const imageRect = image.getBoundingClientRect();
        const trackTopY = trackRect.top;
        const imageTopY = imageRect.top;
        const imageOffsetY = imageTopY - trackTopY;

        // console.log(`Relative CenterY of clicked image in track: ${imageOffsetY}`);

        const currentImageCenterYGlobal = prevPercentage / 100 * trackRect.height + window.innerHeight / 2 + imageOffsetY + imageRect.height / 2;
        const deltaY = window.innerHeight / 2 - currentImageCenterYGlobal;
        const deltaPercentage = (deltaY / trackRect.height) * 100;

        const percentage = Math.max(Math.min(prevPercentage + deltaPercentage, 0), -100);
        prevPercentage = percentage;

        // console.log(`Current CenterY of track: ${currentImageCenterYGlobal}`);
        // console.log(`Track Rect: ${JSON.stringify(trackRect)}`);
        // console.log(`DeltaY to center the clicked image: ${deltaY}`);
        // console.log(`OffsetY: ${imageCenterY-trackCenterY}`);
        // // // Scale down and move the track to the left, and center the clicked image

        const deltaX = 5 / 100 * window.innerWidth - window.innerWidth / 2; // Move to 5% of viewport width from the left

        track.animate({
            transform: `translate(${deltaX}px, ${percentage}%)`, width: '15vw', gap: '2vmin'
        }, { duration: 200, fill: "forwards" });

        for (const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `50% ${100 + percentage}%`
            }, { duration: 200, fill: "forwards" });
        }

        // Dim all images except the clicked one
        for (const img of images) {
            if (img !== image) {
                img.classList.add("dimmed");
            } else {
                img.classList.remove("dimmed");
            }
        }

        // Show the corresponding content div based on image data-content attribute
        const contentId = image.getAttribute('data-content');
        if (contentId) {
            // Load content only when clicked
            loadContentIfNeeded(contentId);
            showContentDiv(contentId);
        }

    });
}

// Function to show specific content div
function showContentDiv(contentId) {
    // Hide all content divs first
    hideAllContentDivs()

    // Show the specific content div with a slight delay to coordinate with track animation
    setTimeout(() => {
        const targetContentDiv = document.getElementById(contentId);
        if (targetContentDiv) {
            targetContentDiv.classList.add('active');
            targetContentDiv.scrollTop = 0; // <-- Always scroll to top when shown
        }
        
        // Show the close button
        const closeButton = document.getElementById('close-button');
        closeButton.classList.add('active');
    }, 100); // Small delay to let track animation start first
}

// Function to hide all content divs and reset the track
function hideAllContentDivs() {
    const allContentDivs = document.querySelectorAll('.content-display');
    allContentDivs.forEach(div => {
        // Pause and reset all videos inside this content div
        const videos = div.querySelectorAll('video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });
        // (Optional) Pause and reset all audio elements as well
        const audios = div.querySelectorAll('audio');
        audios.forEach(audio => {
            audio.pause();
            audio.currentTime = 0;
        });

        // Stop iframe videos (like Bilibili) by clearing and resetting src
        const iframes = div.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            const src = iframe.src;
            iframe.src = '';
            // Small delay to ensure it stops, then restore src
            setTimeout(() => {
                iframe.src = src;
            }, 100);
        });

        div.classList.remove('active');
    });
    // Hide the close button
    const closeButton = document.getElementById('close-button');
    closeButton.classList.remove('active');
}

// Add click event listener for the close button
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close-btn');
    closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        // Hide all content divs when scrolling
        hideAllContentDivs();
        
        // Add delay before resetting track animation
        setTimeout(() => {
            // Use the updated prevPercentage to trigger your animations or logic  
            track.animate({
                transform: `translate(-50%, ${prevPercentage}%)`, width: '50vw', gap: '4vmin'
            }, { duration: 300, fill: "forwards" });

            for (const image of track.getElementsByClassName("image")) {
                image.animate({
                    objectPosition: `50% ${100 + prevPercentage}%`
                }, { duration: 300, fill: "forwards" });
            }

            for (const img of images) {
                img.classList.remove("dimmed");
            }
        }, 100); // 100ms delay - adjust as needed
    });
});

