// Handle navigation
document.querySelectorAll('.nav-links li').forEach(link => {
    link.addEventListener('click', () => {
        // Remove active class from all links and pages
        document.querySelectorAll('.nav-links li').forEach(l => l.classList.remove('active'));
        document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked link and corresponding page
        link.classList.add('active');
        const page = link.dataset.page;
        document.getElementById(page).classList.add('active');
    });
});