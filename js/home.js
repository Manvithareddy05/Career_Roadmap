// JavaScript for the Home page

document.addEventListener('DOMContentLoaded', function() {
    // Hero 3D animation
    if (document.getElementById('hero-3d')) {
        initHero3D();
    }
    
    // Testimonial slider
    initTestimonialSlider();
});

// Initialize the 3D hero animation
// testing it out for myself
//testing for creating Pull request
function initHero3D() {
    const container = document.getElementById('hero-3d');
    
    // Import Three.js library
    const THREE = window.THREE;

    if (!THREE) {
        console.error('Three.js library not found. Make sure it is included in your HTML.');
        return;
    }
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create a group to hold all objects
    const group = new THREE.Group();
    scene.add(group);
    
    // Create road/path geometry
    const roadGeometry = new THREE.PlaneGeometry(10, 2);
    const roadMaterial = new THREE.MeshBasicMaterial({ 
        color: 0x3F72AF,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.7
    });
    const road = new THREE.Mesh(roadGeometry, roadMaterial);
    road.rotation.x = Math.PI / 2;
    road.position.y = -1;
    group.add(road);
    
    // Create milestones along the road
    const milestoneCount = 5;
    const milestones = [];
    
    for (let i = 0; i < milestoneCount; i++) {
        const milestoneGeometry = new THREE.SphereGeometry(0.2, 16, 16);
        const milestoneMaterial = new THREE.MeshBasicMaterial({ color: 0xDBE2EF });
        const milestone = new THREE.Mesh(milestoneGeometry, milestoneMaterial);
        
        // Position milestones along the road
        milestone.position.x = -4 + (i * 2);
        milestone.position.y = -0.8;
        
        group.add(milestone);
        milestones.push(milestone);
    }
    
    // Create floating icons
    const iconGeometries = [
        new THREE.BoxGeometry(0.5, 0.5, 0.5),
        new THREE.ConeGeometry(0.3, 0.5, 32),
        new THREE.TorusGeometry(0.3, 0.1, 16, 100),
        new THREE.TetrahedronGeometry(0.4),
        new THREE.OctahedronGeometry(0.4)
    ];
    
    const iconMaterials = [
        new THREE.MeshBasicMaterial({ color: 0x3F72AF }),
        new THREE.MeshBasicMaterial({ color: 0x112D4E }),
        new THREE.MeshBasicMaterial({ color: 0xDBE2EF })
    ];
    
    const icons = [];
    
    for (let i = 0; i < 15; i++) {
        const geometryIndex = Math.floor(Math.random() * iconGeometries.length);
        const materialIndex = Math.floor(Math.random() * iconMaterials.length);
        
        const icon = new THREE.Mesh(iconGeometries[geometryIndex], iconMaterials[materialIndex]);
        
        // Random positions
        icon.position.x = Math.random() * 10 - 5;
        icon.position.y = Math.random() * 4 - 1;
        icon.position.z = Math.random() * 4 - 2;
        
        // Random rotation
        icon.rotation.x = Math.random() * Math.PI;
        icon.rotation.y = Math.random() * Math.PI;
        
        // Store initial position for animation
        icon.userData = {
            initialY: icon.position.y,
            speed: 0.005 + Math.random() * 0.01,
            rotationSpeed: 0.01 + Math.random() * 0.02
        };
        
        group.add(icon);
        icons.push(icon);
    }
    
    // Handle window resize
    window.addEventListener('resize', function() {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the entire group slowly
        group.rotation.y += 0.002;
        
        // Animate milestones
        milestones.forEach((milestone, index) => {
            milestone.position.y = -0.8 + Math.sin(Date.now() * 0.001 + index) * 0.1;
        });
        
        // Animate floating icons
        icons.forEach(icon => {
            // Floating animation
            icon.position.y = icon.userData.initialY + Math.sin(Date.now() * icon.userData.speed) * 0.3;
            
            // Rotation animation
            icon.rotation.x += icon.userData.rotationSpeed;
            icon.rotation.y += icon.userData.rotationSpeed;
        });
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize the testimonial slider
function initTestimonialSlider() {
    const slider = document.getElementById('testimonial-slider');
    
    if (!slider) return;
    
    const testimonials = slider.querySelectorAll('.testimonial');
    const dotsContainer = document.getElementById('slider-dots');
    const prevButton = document.getElementById('prev-testimonial');
    const nextButton = document.getElementById('next-testimonial');
    
    let currentIndex = 0;
    
    // Create dots
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        
        if (index === 0) {
            dot.classList.add('active');
        }
        
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        
        dotsContainer.appendChild(dot);
    });
    
    // Update the slider display
    function updateSlider() {
        // Hide all testimonials
        testimonials.forEach(testimonial => {
            testimonial.style.display = 'none';
        });
        
        // Show current testimonial
        testimonials[currentIndex].style.display = 'block';
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Go to a specific slide
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    // Go to the next slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }
    
    // Go to the previous slide
    function prevSlide() {
        currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        updateSlider();
    }
    
    // Add event listeners to buttons
    if (prevButton) {
        prevButton.addEventListener('click', prevSlide);
    }
    
    if (nextButton) {
        nextButton.addEventListener('click', nextSlide);
    }
    
    // Auto-advance the slider every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Initialize the slider
    updateSlider();
}