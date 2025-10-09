// Splash screen functionality
document.addEventListener('DOMContentLoaded', function() {
    const splashScreen = document.querySelector('.splash-screen');
    const mainContent = document.querySelector('.main-content');
    const backToSplashBtn = document.getElementById('back-to-splash');
    let hasScrolled = false;
    let splashTouchStartY = 0;
    let splashTouchEndY = 0;

    // Function to hide splash and show main content
    function enterMainContent() {
        if (hasScrolled) return;
        hasScrolled = true;
        
        splashScreen.classList.add('hidden');
        mainContent.classList.add('visible');
        
        // Show back button after entering main content
        setTimeout(() => {
            backToSplashBtn.classList.add('visible');
        }, 500);
    }

    // Function to go back to splash screen
    function backToSplash() {
        hasScrolled = false;
        
        // Hide back button
        backToSplashBtn.classList.remove('visible');
        
        // Hide main content and show splash
        mainContent.classList.remove('visible');
        splashScreen.classList.remove('hidden');
        
        // Reset gallery state
        resetGalleryState();
        
        // Remove gallery event listeners
        window.removeEventListener("wheel", handleGalleryWheel);
        window.removeEventListener("touchstart", handleGalleryTouchStart);
        window.removeEventListener("touchmove", handleGalleryTouchMove);
        window.removeEventListener("touchend", handleGalleryTouchEnd);
        
        // Add splash event listeners back
        window.addEventListener('wheel', handleSplashWheel);
        window.addEventListener('touchstart', handleSplashTouchStart);
        window.addEventListener('touchend', handleSplashTouchEnd);
        window.addEventListener('keydown', handleSplashKeydown);
    }

    // Function to reset gallery to initial state
    function resetGalleryState() {
        prevPercentage = 0;
        
        // Reset track position
        track.animate({
            transform: `translate(-50%, 0%)`, width: '50vw', gap: '4vmin'
        }, { duration: 300, fill: "forwards" });

        // Reset image positions
        for (const image of track.getElementsByClassName("image")) {
            image.animate({
                objectPosition: `50% 100%`
            }, { duration: 300, fill: "forwards" });
        }

        // Remove dimmed class from all images
        for (const img of images) {
            img.classList.remove("dimmed");
        }

        // Hide all content divs
        hideAllContentDivs();
    }

    // Add click event listener to back button
    backToSplashBtn.addEventListener('click', backToSplash);

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
        <h2>Photograph the Optical Setups</h2>
        <p>I have built a number of optical setups for imaging prototypes. The priviledge of working with light is the convenience to create astonishing visuals with them.</p>
        <p>These photographs only capture a small portion of the beauty of these setups during their daily operation. Just for fun, I arranged them in something similar to a product brochure and captioned with ChatGPT-generated nonsense in both English and Chinese.
         Don't read, just feel it. </p>
        <img style="border: 2px solid rgba(255, 255, 255, 0.2);width: 60%" src="projects/optics-photography/page1.png">
        <img style="border: 2px solid rgba(255, 255, 255, 0.2);width: 60%" src="projects/optics-photography/page2.png">
        <img style="border: 2px solid rgba(255, 255, 255, 0.2);width: 60%" src="projects/optics-photography/page3.png">
        <img style="border: 2px solid rgba(255, 255, 255, 0.2);width: 60%" src="projects/optics-photography/page4.png">
        <img style="border: 2px solid rgba(255, 255, 255, 0.2);width: 60%" src="projects/optics-photography/page5.png">
    `,
    'content-2': `
    <h2>Make an Ad for Lab, a Parodic Experiment</h2>
    <p>Well, we have all watched some Ads from tech companies, portraying their hard-core science, nice office vibe, and futuristicvisions. Actors/actresses in the video are quickly typing in command terminal, sketching formulas on whiteboards, and dressing up in white, lab coats. Pretty cliché stuff.</p>
    <p>Key components: camera movement, soundtrack and a delicately-crafted narration with a magnetic voice. I think I can also do it, maybe with my lab. With genAI, I can even "hire" Jony Ive (unknowingly) from one of my favourite <a style="color: rgb(255, 255, 255); text-decoration: underline;" href="https://www.youtube.com/watch?v=4xzLr7xSr-g">Ads</a> to do some magic for me.</p>


    <video controls style="width: 100%;">
        <source src="projects/optics-cinematography/optics_mock_ad_compressed.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <p>There are basically two types of audio tools to create the narration: 1. Text-to-Speech (TTS), and 2. Voice conversion. TTS seems convenient, however, often makes it difficult to control the intonation, pause, rhythm and the emotion, which are critical for imitating specific storytelling style, i.e. IOS 7 Official video. Therefore, I performed the narration with my own voice and convert them into Jony Ive's voice. 
    I used <a style="color: rgb(255, 255, 255); text-decoration: underline;" href="https://github.com/Anjok07/ultimatevocalremovergui">UVR5</a> to separate the vocals from the background music. <a style="color: rgb(255, 255, 255); text-decoration: underline;" href="https://myedit.online/en/audio-editor">MyEdit</a> was used for online audio denoising. The xx-minute vocal sample has been cropped into xx clips and fed into Retrieval-based-Voice-Conversion <a style="color: rgb(255, 255, 255); text-decoration: underline;" href="https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI">RVC</a> for training.</p>

    <div class="audio-container" style="width: 100%; display:flex; flex-direction: row;">
        <div style="text-align: center; width: 50%;">
            <p style="text-align: center;">My voice</p>
            <audio controls style="width: 90%;">
                <source src="projects/optics-cinematography/my_voice.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>

        <div style="text-align: center; width: 50%;">
            <p style="text-align: center;">Jony Ive's voice</p>
            <audio controls style="width: 90%;">
                <source src="projects/optics-cinematography/jony_voice.mp3" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>
        </div>
    </div>
    `,
    'content-3': `
        <h2>Web App for Optics Schematics Drawing</h2>
        <p>Coding with LLMs (Claude Sonnet 4 and GPT-4.1), I developed a website <a style="color: rgb(255, 255, 255); text-decoration: underline;" href="https://www.schemabuild.xyz/">www.schemabuild.xyz</a> for online optics schematics drawing. A small <a style="color: rgb(255, 255, 255); text-decoration: underline;" href="https://www.reddit.com/r/Optics/comments/1n4e04t/a_web_app_for_drawing_simple_optical_schematics/">discussion</a> on reddit. </p>
        <video controls>
            <source src="projects/optics-schematics-builder/Demo_fast_short.mp4" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        
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

