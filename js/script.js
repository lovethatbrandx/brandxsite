/* ============================================================
   BRAND X — Terminal Portfolio Scripts
   Author: Brand X
   Description: Project rendering, contact, typewriter effect
   ============================================================ */

// --- Data Layer ---
const projectsData = [
    {
        title: "Hombre",
        url: "https://github.com/lovethatbrandx/hombre",
        description: "A self-hosted web UI for Honcho, because the official dashboard isn't self-hostable."
    },
    {
        title: "PolitiScrape: Political Speech Archive → LLM Dataset Builder",
        url: "https://github.com/lovethatbrandx/poltiscrape",
        description: "PolitiTweet hasn't updated since 2023. That's exactly why this tool exists."
    },
	{
        title: "Static Site Generator",
        description: "Content-to-HTML conversion engine. Accepts markdown input, outputs minimal HTML/CSS. No dynamic features. No JavaScript dependencies. Maximum efficiency, zero runtime overhead."
    }
];

const contactData = {
    email: "heyyo@lovethatbrandx.site"
};

const githubData = {
    url: "https://github.com/lovethatbrandx",
    displayText: "github.com/lovethatbrandx"
};

// --- Render Functions ---
function renderProjects(projects) {
    return projects.map(project => {
        const titleContent = project.url
            ? `<a href="${project.url}" target="_blank" rel="noopener noreferrer" class="project-link">${project.title}</a>`
            : project.title;
        return `
        <li>
            <div class="project-title terminal-text">${titleContent}</div>
            <div class="project-desc terminal-text">${project.description}</div>
        </li>`;
    }).join('');
}

function renderContact(info) {
    return info.email;
}

// --- Initialize Content ---
document.addEventListener('DOMContentLoaded', function() {
    // Render projects list
    const projectsList = document.getElementById('projects-list');
    if (projectsList) {
        projectsList.innerHTML = renderProjects(projectsData);
    }
    
    // Render contact info
    const contactInfo = document.getElementById('contact-info');
    if (contactInfo) {
        contactInfo.textContent = renderContact(contactData);
    }
    
    // Render GitHub link
    const githubLink = document.getElementById('github-link');
    if (githubLink) {
        githubLink.href = githubData.url;
        githubLink.textContent = githubData.displayText;
    }
    
    // Dynamic copyright year
    const footerYear = document.querySelector('.terminal-footer p');
    if (footerYear) {
        footerYear.textContent = footerYear.textContent.replace('2026', new Date().getFullYear());
    }

    // Typewriter effect with blinking terminal cursor
    const headerText = document.querySelector('h1');
    if (headerText) {
        const originalText = headerText.textContent;
        headerText.textContent = '';

        // Create text span and blinking cursor
        const textSpan = document.createElement('span');
        textSpan.className = 'type-text';
        const cursorSpan = document.createElement('span');
        cursorSpan.className = 'cursor blink';
        cursorSpan.textContent = '|';

        headerText.appendChild(textSpan);
        headerText.appendChild(cursorSpan);

        let i = 0;
        const typeSpeed = 130; // ms per character

        const typeWriter = () => {
            if (i < originalText.length) {
                textSpan.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, typeSpeed);
            } else {
                // Done typing — let cursor blink a few more times, then fade
                setTimeout(() => {
                    cursorSpan.classList.remove('blink');
                    cursorSpan.classList.add('fade');
                }, 2500);
            }
        };

        // Start after brief delay (cursor blinks during this time)
        setTimeout(typeWriter, 500);
    }
});
