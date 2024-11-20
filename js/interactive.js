// Theme Management
const themeManager = {
    init() {
        this.fontSizeControls = document.querySelectorAll('.font-size-control');
        
        this.setupFontSizeControls();
        this.loadUserPreferences();
    },

    setupFontSizeControls() {
        this.fontSizeControls.forEach(control => {
            control.addEventListener('click', (e) => {
                const size = e.target.dataset.size;
                document.documentElement.style.fontSize = size;
                localStorage.setItem('fontSize', size);
            });
        });
    },

    loadUserPreferences() {
        // Load font size preference
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            document.documentElement.style.fontSize = savedFontSize;
        }
    },
};

// Tab System
class TabSystem {
    constructor(container) {
        this.container = container;
        this.tabs = container.querySelectorAll('.tab');
        this.panels = container.querySelectorAll('.tab-panel');
        this.init();
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab));
        });
    }

    switchTab(selectedTab) {
        this.tabs.forEach(tab => tab.classList.remove('active'));
        this.panels.forEach(panel => panel.classList.remove('active'));

        selectedTab.classList.add('active');
        const targetPanel = this.container.querySelector(selectedTab.dataset.target);
        if (targetPanel) targetPanel.classList.add('active');
    }
}

// Accordion System
class Accordion {
    constructor(container) {
        this.container = container;
        this.items = container.querySelectorAll('.accordion-item');
        this.init();
    }

    init() {
        this.items.forEach(item => {
            const header = item.querySelector('.accordion-header');
            header.addEventListener('click', () => this.toggleItem(item));
        });
    }

    toggleItem(item) {
        const content = item.querySelector('.accordion-content');
        const isOpen = item.classList.contains('open');

        // Close all items
        this.items.forEach(i => {
            i.classList.remove('open');
            i.querySelector('.accordion-content').style.maxHeight = null;
        });

        // Open clicked item if it was closed
        if (!isOpen) {
            item.classList.add('open');
            content.style.maxHeight = content.scrollHeight + 'px';
        }
    }
}

// Search Functionality
const searchManager = {
    init() {
        this.searchInput = document.getElementById('siteSearch');
        this.searchResults = document.getElementById('searchResults');
        this.setupSearch();
    },

    setupSearch() {
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase();
                this.performSearch(query);
            });
        }
    },

    performSearch(query) {
        if (!query) {
            this.searchResults.innerHTML = '';
            return;
        }

        const searchableElements = document.querySelectorAll('[data-searchable]');
        const results = Array.from(searchableElements)
            .filter(element => element.textContent.toLowerCase().includes(query))
            .map(element => {
                return `<div class="search-result">
                    <h4>${element.querySelector('h1, h2, h3, h4, h5, h6')?.textContent || 'Result'}</h4>
                    <p>${element.textContent.substring(0, 150)}...</p>
                </div>`;
            });

        this.searchResults.innerHTML = results.join('') || '<p>No results found</p>';
    }
};

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
    themeManager.init();
    searchManager.init();

    // Initialize tab systems
    document.querySelectorAll('.tab-container').forEach(container => {
        new TabSystem(container);
    });

    // Initialize accordions
    document.querySelectorAll('.accordion-container').forEach(container => {
        new Accordion(container);
    });
});