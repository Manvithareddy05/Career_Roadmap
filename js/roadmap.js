// JavaScript for the Roadmap page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize roadmap steps
    initRoadmapSteps();
    
    // Initialize progress tracking
    initProgressTracking();
    
    // Initialize star rating
    initStarRating();
    
    // Initialize feedback form
    initFeedbackForm();
});

// Initialize roadmap steps accordion
function initRoadmapSteps() {
    const roadmapSteps = document.querySelectorAll('.roadmap-step');
    
    roadmapSteps.forEach((step, index) => {
        const header = step.querySelector('.step-header');
        const content = step.querySelector('.step-content');
        const toggle = step.querySelector('.step-toggle');
        
        // Open first step by default
        if (index === 0) {
            step.classList.add('active');
        }
        
        if (header && content && toggle) {
            header.addEventListener('click', function() {
                // Toggle active class
                step.classList.toggle('active');
                
                // Toggle icon
                if (step.classList.contains('active')) {
                    toggle.innerHTML = '<i class="fas fa-chevron-up"></i>';
                } else {
                    toggle.innerHTML = '<i class="fas fa-chevron-down"></i>';
                }
            });
        }
    });
}

// Initialize progress tracking
function initProgressTracking() {
    const completeButtons = document.querySelectorAll('.mark-complete-btn');
    const progressBar = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    // Load saved progress from localStorage
    loadProgress();
    
    completeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const stepId = this.getAttribute('data-step');
            const step = document.getElementById(`step-${stepId}`);
            
            // Toggle completed state
            if (this.classList.contains('completed')) {
                this.classList.remove('completed');
                this.innerHTML = 'Mark as Complete';
                
                if (step) {
                    step.classList.remove('completed');
                }
                
                // Update localStorage
                updateProgress(stepId, false);
            } else {
                this.classList.add('completed');
                this.innerHTML = '<i class="fas fa-check"></i> Completed';
                
                if (step) {
                    step.classList.add('completed');
                }
                
                // Show congratulation message
                showCompletionMessage(stepId);
                
                // Update localStorage
                updateProgress(stepId, true);
            }
            
            // Update progress bar
            updateProgressBar();
        });
    });
    
    // Show completion message
    function showCompletionMessage(stepId) {
        const step = document.getElementById(`step-${stepId}`);
        
        if (step) {
            const stepTitle = step.querySelector('h3').textContent;
            
            const message = document.createElement('div');
            message.className = 'completion-message';
            message.innerHTML = `
                <div class="completion-icon"><i class="fas fa-trophy"></i></div>
                <p>Congratulations! You've completed "${stepTitle}"</p>
                <button class="btn small-btn close-message">Continue</button>
            `;
            
            document.body.appendChild(message);
            
            // Add event listener to close button
            const closeButton = message.querySelector('.close-message');
            if (closeButton) {
                closeButton.addEventListener('click', function() {
                    document.body.removeChild(message);
                });
            }
            
            // Auto-remove after 5 seconds
            setTimeout(function() {
                if (document.body.contains(message)) {
                    document.body.removeChild(message);
                }
            }, 5000);
        }
    }
    
    // Update progress in localStorage
    function updateProgress(stepId, completed) {
        // Get existing progress
        let progress = JSON.parse(localStorage.getItem('roadmapProgress')) || {};
        
        // Get current roadmap ID from URL
        const roadmapId = window.location.pathname.split('/').pop().replace('.html', '');
        
        // Initialize roadmap progress if not exists
        if (!progress[roadmapId]) {
            progress[roadmapId] = {};
        }
        
        // Update step progress
        progress[roadmapId][stepId] = completed;
        
        // Save to localStorage
        localStorage.setItem('roadmapProgress', JSON.stringify(progress));
    }
    
    // Load progress from localStorage
    function loadProgress() {
        // Get saved progress
        const progress = JSON.parse(localStorage.getItem('roadmapProgress')) || {};
        
        // Get current roadmap ID from URL
        const roadmapId = window.location.pathname.split('/').pop().replace('.html', '');
        
        // If no progress for this roadmap, return
        if (!progress[roadmapId]) return;
        
        // Apply progress to UI
        for (const stepId in progress[roadmapId]) {
            if (progress[roadmapId][stepId]) {
                const button = document.querySelector(`.mark-complete-btn[data-step="${stepId}"]`);
                const step = document.getElementById(`step-${stepId}`);
                
                if (button) {
                    button.classList.add('completed');
                    button.innerHTML = '<i class="fas fa-check"></i> Completed';
                }
                
                if (step) {
                    step.classList.add('completed');
                }
            }
        }
        
        // Update progress bar
        updateProgressBar();
    }
    
    // Update progress bar
    function updateProgressBar() {
        if (!progressBar || !progressText) return;
        
        const totalSteps = completeButtons.length;
        const completedSteps = document.querySelectorAll('.mark-complete-btn.completed').length;
        
        const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;
        
        progressBar.style.width = `${progressPercentage}%`;
        progressText.textContent = `${Math.round(progressPercentage)}% Complete`;
    }
}

// Initialize star rating
function initStarRating() {
    const stars = document.querySelectorAll('.star-rating input');
    
    stars.forEach(star => {
        star.addEventListener('change', function() {
            // Visual feedback
            const rating = this.value;
            console.log(`User rated: ${rating} stars`);
            
            // You could send this to a server in a real application
        });
    });
}

// Initialize feedback form
function initFeedbackForm() {
    const feedbackForm = document.querySelector('.feedback-form');
    
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const rating = document.querySelector('.star-rating input:checked')?.value || 0;
            const message = document.getElementById('feedback-message')?.value || '';
            
            // Validate
            if (rating === 0) {
                alert('Please select a rating.');
                return;
            }
            
            // In a real application, you would send this data to a server
            console.log('Feedback submitted:', { rating, message });
            
            // Show success message
            const successMessage = document.createElement('p');
            successMessage.textContent = 'Thank you for your feedback!';
            successMessage.style.color = '#4CAF50';
            successMessage.style.textAlign = 'center';
            successMessage.style.marginTop = '16px';
            
            // Reset form
            feedbackForm.reset();
            
            // Add success message
            feedbackForm.appendChild(successMessage);
            
            // Remove message after 3 seconds
            setTimeout(function() {
                feedbackForm.removeChild(successMessage);
            }, 3000);
        });
    }
}