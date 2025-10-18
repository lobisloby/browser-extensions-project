// LIGHT AND DARK MODE 
console.log("Script loaded successfully!");

document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded");
    
    const html = document.getElementById("htmlPage");
    const checkbox4El = document.getElementById("btn-check-4");
    const imgEl = document.querySelector('label[for="btn-check-4"] img');

    if (!html || !checkbox4El || !imgEl) {
        console.error("One or more required elements not found:", {
            html: !!html,
            checkbox: !!checkbox4El,
            image: !!imgEl
        });
        return;
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        checkbox4El.checked = true;
    }

    function updateTheme() {
        if (checkbox4El.checked) {
            html.setAttribute("data-bs-theme", "dark");
            imgEl.src = 'assets/images/icon-sun.svg';
            localStorage.setItem('theme', 'dark');
            console.log("Theme set to dark");
        } else {
            html.setAttribute("data-bs-theme", "light");
            imgEl.src = 'assets/images/icon-moon.svg';
            localStorage.setItem('theme', 'light');
            console.log("Theme set to light");
        }
    }

 
    checkbox4El.addEventListener("change", updateTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {  
            checkbox4El.checked = e.matches;
            updateTheme();
        }
    });
    
    
    updateTheme();
});
