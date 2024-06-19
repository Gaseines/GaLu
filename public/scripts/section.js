document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('.section');
    const hash = window.location.hash.substring(1);

    function showSection(sectionId) {
        sections.forEach(section => {
            if (section.id === sectionId) {
                section.style.display = 'block';
            } else {
                section.style.display = 'none';
            }
        });
    }

    // Show the section based on the hash in the URL
    if (hash) {
        showSection(hash);
    } else {
        showSection('cozinha'); // Default to 'cozinha' if no hash is present
    }

    window.showSection = showSection;
});
