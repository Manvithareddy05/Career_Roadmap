// JavaScript for the Browse page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize roadmap data
    const roadmapsData = [
        {
            id: 'software-developer',
            title: 'Software Developer',
            description: 'Learn to build software applications from scratch with this comprehensive roadmap.',
            categories: ['tech', 'programming'],
            difficulty: 'beginner-advanced',
            duration: '12-18 months',
            steps: 12,
            resources: 45,
            image: null
        },
        {
            id: 'data-scientist',
            title: 'Data Scientist',
            description: 'Master data analysis, machine learning, and statistical modeling to become a data scientist.',
            categories: ['data', 'tech'],
            difficulty: 'intermediate',
            duration: '10-14 months',
            steps: 10,
            resources: 38,
            image: null
        },
        {
            id: 'fullstack-developer',
            title: 'Fullstack Developer',
            description: 'Develop both frontend and backend skills to build complete web applications.',
            categories: ['tech', 'programming'],
            difficulty: 'intermediate',
            duration: '12-16 months',
            steps: 15,
            resources: 52,
            image: null
        },
        {
            id: 'devops-engineer',
            title: 'DevOps Engineer',
            description: 'Learn to automate and optimize the software development lifecycle.',
            categories: ['tech', 'operations'],
            difficulty: 'intermediate-advanced',
            duration: '10-14 months',
            steps: 11,
            resources: 40,
            image: null
        },
        {
            id: 'ai-engineer',
            title: 'AI Engineer',
            description: 'Build intelligent systems and applications using artificial intelligence techniques.',
            categories: ['tech', 'ai', 'data'],
            difficulty: 'advanced',
            duration: '14-18 months',
            steps: 14,
            resources: 48,
            image: null
        },
        {
            id: 'ux-designer',
            title: 'UX Designer',
            description: 'Create user-centered designs and experiences for digital products.',
            categories: ['design', 'tech'],
            difficulty: 'beginner-intermediate',
            duration: '8-12 months',
            steps: 10,
            resources: 35,
            image: null
        },
        {
            id: 'digital-marketer',
            title: 'Digital Marketer',
            description: 'Master digital marketing channels, analytics, and strategies to grow businesses online.',
            categories: ['marketing', 'business'],
            difficulty: 'beginner-intermediate',
            duration: '6-10 months',
            steps: 8,
            resources: 30,
            image: null
        },
        {
            id: 'product-manager',
            title: 'Product Manager',
            description: 'Learn to lead product development, from ideation to launch and beyond.',
            categories: ['business', 'tech'],
            difficulty: 'intermediate',
            duration: '8-12 months',
            steps: 9,
            resources: 32,
            image: null
        },
        {
            id: 'cybersecurity-specialist',
            title: 'Cybersecurity Specialist',
            description: 'Protect systems and networks from digital attacks and security breaches.',
            categories: ['tech', 'security'],
            difficulty: 'intermediate-advanced',
            duration: '10-14 months',
            steps: 12,
            resources: 42,
            image: null
        },
        {
            id: 'blockchain-developer',
            title: 'Blockchain Developer',
            description: 'Build decentralized applications and smart contracts on blockchain platforms.',
            categories: ['tech', 'programming'],
            difficulty: 'advanced',
            duration: '12-16 months',
            steps: 10,
            resources: 38,
            image: null
        },
        {
            id: 'cloud-architect',
            title: 'Cloud Architect',
            description: 'Design and implement cloud infrastructure and solutions for organizations.',
            categories: ['tech', 'operations'],
            difficulty: 'advanced',
            duration: '12-18 months',
            steps: 11,
            resources: 40,
            image: null
        },
        {
            id: 'data-analyst',
            title: 'Data Analyst',
            description: 'Learn to collect, process, and analyze data to help organizations make data-driven decisions.',
            categories: ['data', 'business'],
            difficulty: 'beginner-intermediate',
            duration: '6-10 months',
            steps: 8,
            resources: 28,
            image: null
        }
    ];
    
    // DOM elements
    const roadmapsGrid = document.getElementById('roadmaps-grid');
    const roadmapsCount = document.getElementById('roadmaps-count');
    const searchInput = document.getElementById('roadmap-search');
    const sortSelect = document.getElementById('sort-select');
    const filterOptions = document.querySelectorAll('.filter-option input');
    const clearFiltersBtn = document.getElementById('clear-filters');
    const noResults = document.getElementById('no-results');
    
    // Filter and search state
    let filters = {
        categories: [],
        difficulty: [],
        duration: []
    };
    let searchTerm = '';
    let sortBy = 'popular';
    
    // Initialize the page
    function init() {
        renderRoadmaps(roadmapsData);
        setupEventListeners();
    }
    
    // Render roadmap cards
    function renderRoadmaps(roadmaps) {
        if (!roadmapsGrid) return;
        
        // Clear existing content
        roadmapsGrid.innerHTML = '';
        
        if (roadmaps.length === 0) {
            if (noResults) {
                noResults.style.display = 'block';
            }
            if (roadmapsCount) {
                roadmapsCount.textContent = '0';
            }
            return;
        }
        
        if (noResults) {
            noResults.style.display = 'none';
        }
        
        if (roadmapsCount) {
            roadmapsCount.textContent = roadmaps.length;
        }
        
        // Create and append roadmap cards
        roadmaps.forEach(roadmap => {
            const card = createRoadmapCard(roadmap);
            roadmapsGrid.appendChild(card);
        });
    }
    
    // Create a roadmap card element
    function createRoadmapCard(roadmap) {
        const card = document.createElement('div');
        card.className = 'roadmap-grid-card';
        
        // Determine difficulty class and text
        let difficultyClass = '';
        let difficultyText = roadmap.difficulty;
        
        if (roadmap.difficulty.includes('beginner')) {
            difficultyClass = 'beginner';
        } else if (roadmap.difficulty.includes('intermediate')) {
            difficultyClass = 'intermediate';
        } else if (roadmap.difficulty.includes('advanced')) {
            difficultyClass = 'advanced';
        }
        
        // Create card HTML
        card.innerHTML = `
            <div class="roadmap-card-header">
                <span class="roadmap-card-category">${roadmap.categories[0]}</span>
                <h3 class="roadmap-card-title">${roadmap.title}</h3>
                <p class="roadmap-card-description">${roadmap.description}</p>
                <div class="roadmap-card-meta">
                    <div class="roadmap-card-meta-item">
                        <i class="fas fa-list"></i>
                        <span>${roadmap.steps} steps</span>
                    </div>
                    <div class="roadmap-card-meta-item">
                        <i class="fas fa-book"></i>
                        <span>${roadmap.resources} resources</span>
                    </div>
                </div>
            </div>
            <div class="roadmap-card-content">
                <div class="roadmap-card-tags">
                    ${roadmap.categories.map(category => `<span class="roadmap-card-tag">${category}</span>`).join('')}
                </div>
            </div>
            <div class="roadmap-card-footer">
                <div class="roadmap-card-difficulty ${difficultyClass}">
                    <i class="fas fa-signal"></i>
                    <span>${difficultyText}</span>
                </div>
                <a href="roadmaps/${roadmap.id}.html" class="roadmap-card-link">
                    View Roadmap <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
        
        return card;
    }
    
    // Filter roadmaps based on current filters and search term
    function filterRoadmaps() {
        let filteredRoadmaps = roadmapsData;
        
        // Filter by categories
        if (filters.categories.length > 0) {
            filteredRoadmaps = filteredRoadmaps.filter(roadmap => {
                return roadmap.categories.some(category => filters.categories.includes(category));
            });
        }
        
        // Filter by difficulty
        if (filters.difficulty.length > 0) {
            filteredRoadmaps = filteredRoadmaps.filter(roadmap => {
                return filters.difficulty.some(diff => roadmap.difficulty.includes(diff));
            });
        }
        
        // Filter by duration
        if (filters.duration.length > 0) {
            filteredRoadmaps = filteredRoadmaps.filter(roadmap => {
                if (filters.duration.includes('short') && parseInt(roadmap.duration) <= 6) return true;
                if (filters.duration.includes('medium') && parseInt(roadmap.duration) > 6 && parseInt(roadmap.duration) <= 12) return true;
                if (filters.duration.includes('long') && parseInt(roadmap.duration) > 12) return true;
                return false;
            });
        }
        
        // Filter by search term
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filteredRoadmaps = filteredRoadmaps.filter(roadmap => {
                return (
                    roadmap.title.toLowerCase().includes(term) ||
                    roadmap.description.toLowerCase().includes(term) ||
                    roadmap.categories.some(category => category.toLowerCase().includes(term))
                );
            });
        }
        
        // Sort roadmaps
        sortRoadmaps(filteredRoadmaps);
        
        // Render filtered roadmaps
        renderRoadmaps(filteredRoadmaps);
    }
    
    // Sort roadmaps based on selected sort option
    function sortRoadmaps(roadmaps) {
        switch (sortBy) {
            case 'popular':
                // For demo purposes, we'll assume the order in the array represents popularity
                break;
            case 'newest':
                // For demo purposes, we'll reverse the array to simulate "newest"
                roadmaps.reverse();
                break;
            case 'a-z':
                roadmaps.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'z-a':
                roadmaps.sort((a, b) => b.title.localeCompare(a.title));
                break;
        }
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Search input
        if (searchInput) {
            searchInput.addEventListener('input', function() {
                searchTerm = this.value.trim();
                filterRoadmaps();
            });
        }
        
        // Sort select
        if (sortSelect) {
            sortSelect.addEventListener('change', function() {
                sortBy = this.value;
                filterRoadmaps();
            });
        }
        
        // Filter checkboxes
        filterOptions.forEach(option => {
            option.addEventListener('change', function() {
                const value = this.value;
                const category = this.closest('.filter-group').querySelector('h3').textContent.toLowerCase();
                
                if (category.includes('categories')) {
                    updateFilter('categories', value, this.checked);
                } else if (category.includes('experience')) {
                    updateFilter('difficulty', value, this.checked);
                } else if (category.includes('time')) {
                    updateFilter('duration', value, this.checked);
                }
                
                filterRoadmaps();
            });
        });
        
        // Clear filters button
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', function() {
                // Reset search input
                if (searchInput) {
                    searchInput.value = '';
                    searchTerm = '';
                }
                
                // Reset filter checkboxes
                filterOptions.forEach(option => {
                    option.checked = true;
                });
                
                // Reset filters object
                filters = {
                    categories: [],
                    difficulty: [],
                    duration: []
                };
                
                // Reset sort select
                if (sortSelect) {
                    sortSelect.value = 'popular';
                    sortBy = 'popular';
                }
                
                // Re-render roadmaps
                renderRoadmaps(roadmapsData);
            });
        }
    }
    
    // Update filter arrays based on checkbox changes
    function updateFilter(filterType, value, isChecked) {
        if (isChecked) {
            // Add value to filter array if not already present
            if (!filters[filterType].includes(value)) {
                filters[filterType].push(value);
            }
        } else {
            // Remove value from filter array
            filters[filterType] = filters[filterType].filter(item => item !== value);
        }
    }
    
    // Check URL parameters for pre-filtering
    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
        
        if (categoryParam) {
            // Update UI to reflect the selected category
            filterOptions.forEach(option => {
                if (option.value === categoryParam) {
                    option.checked = true;
                    
                    // Update filters object
                    updateFilter('categories', categoryParam, true);
                }
            });
            
            // Apply filters
            filterRoadmaps();
        }
    }
    
    // Initialize the page
    init();
    
    // Check URL parameters
    checkUrlParams();
});