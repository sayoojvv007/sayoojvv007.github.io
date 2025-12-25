// Christmas Snowflakes Effect - Only active in December
(function() {
    // Check if current month is December
    const currentMonth = new Date().getMonth();
    if (currentMonth !== 11) return; // 11 = December (0-indexed)

    // Create snowflakes container
    const snowContainer = document.createElement('div');
    snowContainer.id = 'snowflakes-container';
    snowContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(snowContainer);

    // Snowflake characters (mix of different snowflake symbols)
    const snowflakeChars = ['❅', '❆', '❄'];
    
    // Create a snowflake element
    function createSnowflake() {
        const snowflake = document.createElement('div');
        const char = snowflakeChars[Math.floor(Math.random() * snowflakeChars.length)];
        
        // Random properties
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 1.5 + 0.5; // 0.5 to 2
        const duration = Math.random() * 10 + 10; // 10-20 seconds
        const delay = Math.random() * 5; // 0-5 seconds delay
        const opacity = Math.random() * 0.6 + 0.4; // 0.4 to 1
        const drift = (Math.random() - 0.5) * 100; // -50 to 50px horizontal drift
        
        snowflake.textContent = char;
        snowflake.style.cssText = `
            position: absolute;
            top: -20px;
            left: ${startX}px;
            font-size: ${size}rem;
            color: #fff;
            opacity: ${opacity};
            text-shadow: 0 0 5px rgba(255, 255, 255, 0.8);
            animation: snowfall ${duration}s linear ${delay}s infinite;
            pointer-events: none;
        `;
        
        // Set custom property for drift
        snowflake.style.setProperty('--drift', `${drift}px`);
        
        return snowflake;
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes snowfall {
            0% {
                transform: translateY(0) translateX(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) translateX(var(--drift)) rotate(360deg);
            }
        }
    `;
    document.head.appendChild(style);

    // Generate initial snowflakes
    const numberOfSnowflakes = 50;
    for (let i = 0; i < numberOfSnowflakes; i++) {
        snowContainer.appendChild(createSnowflake());
    }

    // Regenerate snowflakes periodically to maintain effect
    setInterval(() => {
        if (snowContainer.children.length < numberOfSnowflakes) {
            snowContainer.appendChild(createSnowflake());
        }
    }, 500);

    // Clean up old snowflakes that have fallen
    setInterval(() => {
        const snowflakes = snowContainer.children;
        for (let i = snowflakes.length - 1; i >= 0; i--) {
            const rect = snowflakes[i].getBoundingClientRect();
            if (rect.top > window.innerHeight + 50) {
                snowflakes[i].remove();
            }
        }
    }, 2000);

    // Handle window resize
    window.addEventListener('resize', () => {
        // Adjust snowflakes on resize if needed
        const snowflakes = snowContainer.children;
        for (let i = 0; i < snowflakes.length; i++) {
            const currentLeft = parseFloat(snowflakes[i].style.left);
            if (currentLeft > window.innerWidth) {
                snowflakes[i].style.left = window.innerWidth - 50 + 'px';
            }
        }
    });

    console.log('🎄 Merry Christmas! Snowflakes effect activated for December! ❄️');
})();
