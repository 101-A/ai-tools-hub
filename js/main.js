// AI Tools Hub — Main JavaScript

// Handle newsletter subscription
function handleSubscribe(event) {
    event.preventDefault();
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    
    // Show success message
    const btn = form.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'Subscribed!';
    btn.style.background = '#10b981';
    
    // Store in localStorage
    let subscribers = JSON.parse(localStorage.getItem('subscribers') || '[]');
    subscribers.push({
        email: email,
        date: new Date().toISOString()
    });
    localStorage.setItem('subscribers', JSON.stringify(subscribers));
    
    // Reset after 3 seconds
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        form.reset();
    }, 3000);
    
    return false;
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Lazy load images (if any)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Add scroll-to-top button
function createScrollTop() {
    const btn = document.createElement('button');
    btn.innerHTML = '↑';
    btn.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        display: none;
        z-index: 99;
        transition: background 0.2s;
    `;
    btn.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });
    btn.onmouseenter = () => btn.style.background = 'var(--primary-dark)';
    btn.onmouseleave = () => btn.style.background = 'var(--primary)';
    document.body.appendChild(btn);
    
    window.addEventListener('scroll', () => {
        btn.style.display = window.scrollY > 500 ? 'block' : 'none';
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    createScrollTop();
    
    // Add fade-in animation to cards
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
    
    // Track page views (simple analytics)
    const pageData = {
        url: window.location.href,
        title: document.title,
        timestamp: new Date().toISOString(),
        referrer: document.referrer
    };
    
    let analytics = JSON.parse(localStorage.getItem('pageViews') || '[]');
    analytics.push(pageData);
    localStorage.setItem('pageViews', JSON.stringify(analytics.slice(-100)));
});

// Copy link function (for sharing)
function copyLink(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('Link copied to clipboard!');
    });
}

// Search functionality (if search input exists)
function searchPosts(query) {
    const posts = document.querySelectorAll('.card');
    const q = query.toLowerCase();
    
    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const content = post.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(q) || content.includes(q)) {
            post.style.display = '';
        } else {
            post.style.display = 'none';
        }
    });
}
