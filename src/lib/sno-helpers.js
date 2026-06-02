// SNO Helper Functions - Search, Navigation, Organization
// For your static HTML website

// Get navigation items
function getNavigation(type = 'main') {
    const navigation = {
        main: [
            { id: 'home', label: 'Home', link: '#home' },
            { id: 'about', label: 'About', link: '#about' },
            { id: 'education', label: 'Education', link: '#education' },
            { id: 'projects', label: 'Projects', link: '#projects' },
            { id: 'skills', label: 'Skills', link: '#skills' },
            { id: 'contact', label: 'Contact', link: '#contact' },
        ]
    };
    return navigation[type] || [];
}

// Generate breadcrumbs
function generateBreadcrumbs(currentId) {
    const crumbs = [{ label: 'Home', link: '/' }];
    const nav = getNavigation();
    const item = nav.find((n) => n.id === currentId);
    
    if (item) {
        crumbs.push({ label: item.label, link: item.link });
    }
    
    return crumbs;
}

// Get SEO metadata
function getSEOMetadata() {
    return {
        title: 'Kamran Abro Adv - Professional Advocate | Legal Educator | Developer',
        description: 'Premium personal portfolio combining legal expertise with cutting-edge technology',
        keywords: ['advocate', 'developer', 'legal', 'portfolio'],
    };
}

// Get keyboard shortcuts
function getShortcuts() {
    return [
        { key: 'Ctrl+K', action: 'Open search' },
        { key: 'Esc', action: 'Close search' },
    ];
}

console.log('%c✅ SNO System Initialized', 'color: #d4af37; font-weight: bold;');
