// Current language
let currentLanguage = 'es';

// Change language function
function changeLanguage(lang) {
    currentLanguage = lang;
    document.documentElement.lang = lang;
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.lang === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Save language preference
    localStorage.setItem('preferredLanguage', lang);
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved language preference
    const savedLang = localStorage.getItem('preferredLanguage') || 'es';
    changeLanguage(savedLang);
    
    // Smooth scrolling for navigation links
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
});

// Initialize Google Map
function initMap() {
    // Default coordinates - replace with actual location
    const fincaLocation = { lat: 40.4168, lng: -3.7038 }; // Madrid coordinates as placeholder
    
    const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: fincaLocation,
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [{"color": "#f5f5f5"}]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#c9e5ff"}]
            }
        ]
    });
    
    const marker = new google.maps.Marker({
        position: fincaLocation,
        map: map,
        title: 'Finca La Riberita'
    });
    
    // Info window
    const infoWindow = new google.maps.InfoWindow({
        content: '<div style="padding: 10px;"><h3>Finca La Riberita</h3><p>Tu lugar para eventos especiales</p></div>'
    });
    
    marker.addListener('click', function() {
        infoWindow.open(map, marker);
    });
}