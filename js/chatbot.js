// JavaScript for the Chatbot page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize 3D avatar
    if (document.getElementById('avatar-3d')) {
        initAvatar3D();
    }
    
    // Chat functionality
    initChat();
});

// Initialize the 3D avatar
function initAvatar3D() {
    const container = document.getElementById('avatar-3d');
    
    // Create scene
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 2;
    
    // Create renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(50, 50);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    
    // Create a simple robot head
    const headGroup = new THREE.Group();
    scene.add(headGroup);
    
    // Head base
    const headGeometry = new THREE.BoxGeometry(1, 1, 1);
    const headMaterial = new THREE.MeshBasicMaterial({ color: 0x3F72AF });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    headGroup.add(head);
    
    // Eyes
    const eyeGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xDBE2EF });
    
    const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    leftEye.position.set(-0.25, 0.2, 0.5);
    headGroup.add(leftEye);
    
    const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
    rightEye.position.set(0.25, 0.2, 0.5);
    headGroup.add(rightEye);
    
    // Mouth
    const mouthGeometry = new THREE.BoxGeometry(0.5, 0.1, 0.1);
    const mouthMaterial = new THREE.MeshBasicMaterial({ color: 0xDBE2EF });
    const mouth = new THREE.Mesh(mouthGeometry, mouthMaterial);
    mouth.position.set(0, -0.2, 0.5);
    headGroup.add(mouth);
    
    // Antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.3, 16);
    const antennaMaterial = new THREE.MeshBasicMaterial({ color: 0x112D4E });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(0, 0.65, 0);
    headGroup.add(antenna);
    
    const antennaTipGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const antennaTipMaterial = new THREE.MeshBasicMaterial({ color: 0xDBE2EF });
    const antennaTip = new THREE.Mesh(antennaTipGeometry, antennaTipMaterial);
    antennaTip.position.set(0, 0.8, 0);
    headGroup.add(antennaTip);
    
    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        
        // Rotate the head slightly
        headGroup.rotation.y = Math.sin(Date.now() * 0.001) * 0.5;
        headGroup.rotation.x = Math.sin(Date.now() * 0.0015) * 0.2;
        
        // Pulse the antenna tip
        const scale = 1 + Math.sin(Date.now() * 0.005) * 0.2;
        antennaTip.scale.set(scale, scale, scale);
        
        renderer.render(scene, camera);
    }
    
    animate();
}

// Initialize the chat functionality
function initChat() {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const typingIndicator = document.querySelector('.typing-indicator');
    const suggestedPrompts = document.querySelectorAll('.prompt-btn');
    const newChatButton = document.getElementById('new-chat');
    
    // Sample responses for the AI assistant
    const responses = {
        greeting: [
            "Hello! I'm your AI Career Assistant. How can I help you today?",
            "Hi there! I'm here to help with your career questions. What would you like to know?",
            "Welcome! I'm your AI guide to career development. What can I assist you with?"
        ],
        career_path: [
            "Based on your interests, you might consider these career paths:\n\n1. Software Developer - Focus on building applications\n2. Data Scientist - Analyze data and build predictive models\n3. UX Designer - Create user-centered designs\n\nWould you like more information about any of these?",
            "Given what you've shared, these career paths might be a good fit:\n\n1. Product Manager - Guide product development\n2. Digital Marketer - Grow businesses online\n3. Data Analyst - Extract insights from data\n\nI can provide more details about any of these paths."
        ],
        skills: [
            "To develop skills in that area, I recommend:\n\n1. Start with online courses from platforms like Coursera or Udemy\n2. Build personal projects to apply what you've learned\n3. Join communities like GitHub, Stack Overflow, or relevant Discord servers\n4. Follow industry experts on social media\n\nWould you like specific course recommendations?",
            "Here are the key skills you should focus on developing:\n\n• Technical skills: Programming, data analysis, design tools\n• Soft skills: Communication, problem-solving, teamwork\n• Industry knowledge: Stay updated with trends and best practices\n\nOur roadmaps provide structured learning paths for each of these areas."
        ],
        transition: [
            "Transitioning to a new career is definitely possible! Here's a step-by-step approach:\n\n1. Identify transferable skills from your current role\n2. Fill skill gaps through courses and projects\n3. Build a portfolio showcasing relevant work\n4. Network with professionals in your target field\n5. Consider starting with freelance or volunteer work\n\nWould you like to explore a specific roadmap for this transition?",
            "Career transitions are challenging but rewarding. Here's how to approach it:\n\n1. Research the new field thoroughly\n2. Set realistic timeline expectations (typically 6-12 months)\n3. Find a mentor in your target field\n4. Rebrand your resume and online presence\n5. Be prepared to start in an entry-level position\n\nOur roadmaps can help guide your learning journey."
        ],
        roadmap: [
            "The roadmap for that career includes these key steps:\n\n1. Learn fundamental concepts and theory\n2. Master essential tools and technologies\n3. Build projects for your portfolio\n4. Develop specialized knowledge\n5. Network and gain practical experience\n\nWould you like me to recommend a specific roadmap from our collection?",
            "Our roadmap for this career path is comprehensive and includes:\n\n• Structured learning sequence\n• Recommended resources for each step\n• Project ideas to build your portfolio\n• Estimated time commitments\n• Industry certifications to consider\n\nYou can view the full roadmap on our website for detailed guidance."
        ],
        fallback: [
            "That's an interesting question about career development. Could you provide more details about what you're looking to learn?",
            "I'm here to help with career guidance. Could you tell me more about your background and specific questions?",
            "To better assist you with career planning, I'd like to know more about your interests and goals. What field are you currently in or interested in exploring?"
        ]
    };
    
    // Add event listener for chat form submission
    if (chatForm) {
        chatForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const message = chatInput.value.trim();
            
            if (message) {
                // Add user message to chat
                addMessage(message, 'user');
                
                // Clear input
                chatInput.value = '';
                
                // Show typing indicator
                if (typingIndicator) {
                    typingIndicator.classList.add('active');
                }
                
                // Simulate AI response after a delay
                setTimeout(function() {
                    // Hide typing indicator
                    if (typingIndicator) {
                        typingIndicator.classList.remove('active');
                    }
                    
                    // Generate AI response
                    const response = generateResponse(message);
                    
                    // Add AI response to chat
                    addMessage(response, 'bot');
                    
                    // Scroll to bottom
                    scrollToBottom();
                }, 1500);
            }
        });
    }
    
    // Add event listeners for suggested prompts
    suggestedPrompts.forEach(prompt => {
        prompt.addEventListener('click', function() {
            const message = this.textContent;
            
            // Add user message to chat
            addMessage(message, 'user');
            
            // Show typing indicator
            if (typingIndicator) {
                typingIndicator.classList.add('active');
            }
            
            // Simulate AI response after a delay
            setTimeout(function() {
                // Hide typing indicator
                if (typingIndicator) {
                    typingIndicator.classList.remove('active');
                }
                
                // Generate AI response
                const response = generateResponse(message);
                
                // Add AI response to chat
                addMessage(response, 'bot');
                
                // Scroll to bottom
                scrollToBottom();
            }, 1500);
            
            // Remove suggested prompts after clicking
            document.querySelector('.suggested-prompts').style.display = 'none';
        });
    });
    
    // Add event listener for new chat button
    if (newChatButton) {
        newChatButton.addEventListener('click', function() {
            // Clear chat messages except the first one (welcome message)
            const messages = chatMessages.querySelectorAll('.message');
            
            for (let i = 1; i < messages.length; i++) {
                messages[i].remove();
            }
            
            // Show suggested prompts again
            const suggestedPromptsContainer = document.querySelector('.suggested-prompts');
            if (suggestedPromptsContainer) {
                suggestedPromptsContainer.style.display = 'flex';
            }
            
            // Add to chat history
            addChatToHistory();
        });
    }
    
    // Add a message to the chat
    function addMessage(message, sender) {
        if (!chatMessages) return;
        
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <div class="${sender}-avatar">${sender === 'user' ? '<i class="fas fa-user"></i>' : ''}</div>
            </div>
            <div class="message-content">
                <div class="message-text">
                    <p>${formatMessage(message)}</p>
                </div>
                <div class="message-time">${currentTime}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        scrollToBottom();
    }
    
    // Format message with line breaks and links
    function formatMessage(message) {
        // Convert line breaks to <br>
        let formattedMessage = message.replace(/\n/g, '<br>');
        
        // Convert URLs to links
        formattedMessage = formattedMessage.replace(
            /(https?:\/\/[^\s]+)/g, 
            '<a href="$1" target="_blank" class="text-link">$1</a>'
        );
        
        return formattedMessage;
    }
    
    // Scroll chat to bottom
    function scrollToBottom() {
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }
    
    // Generate AI response based on user message
    function generateResponse(message) {
        message = message.toLowerCase();
        
        // Check for greeting
        if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
            return getRandomResponse('greeting');
        }
        
        // Check for career path questions
        if (message.includes('career path') || message.includes('which career') || message.includes('recommend') || 
            message.includes('suggest') || message.includes('not sure')) {
            return getRandomResponse('career_path');
        }
        
        // Check for skills questions
        if (message.includes('skill') || message.includes('learn') || message.includes('improve') || 
            message.includes('develop')) {
            return getRandomResponse('skills');
        }
        
        // Check for transition questions
        if (message.includes('transition') || message.includes('change career') || message.includes('switch') || 
            message.includes('move from')) {
            return getRandomResponse('transition');
        }
        
        // Check for roadmap questions
        if (message.includes('roadmap') || message.includes('path') || message.includes('steps') || 
            message.includes('guide') || message.includes('how to become')) {
            return getRandomResponse('roadmap');
        }
        
        // Fallback response
        return getRandomResponse('fallback');
    }
    
    // Get a random response from the category
    function getRandomResponse(category) {
        const responseArray = responses[category];
        const randomIndex = Math.floor(Math.random() * responseArray.length);
        return responseArray[randomIndex];
    }
    
    // Add current chat to history
    function addChatToHistory() {
        const historyList = document.getElementById('chat-history-list');
        
        if (historyList) {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            const historyItem = document.createElement('li');
            historyItem.innerHTML = `<i class="fas fa-comment"></i> Chat ${timeString}`;
            
            // Insert after the first item (current session)
            if (historyList.children.length > 1) {
                historyList.insertBefore(historyItem, historyList.children[1]);
            } else {
                historyList.appendChild(historyItem);
            }
        }
    }
    
    // Auto-resize textarea as user types
    if (chatInput) {
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
}

import * as THREE from 'three';