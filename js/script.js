// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Navigation menu toggle
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });
  }
  
  // Close menu when clicking a nav link
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      navMenu.classList.remove('active');
    });
  });
  
  // Header scroll effect
  const header = document.querySelector('header');
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Hero background image slider
  const heroBackgrounds = [
    'images/placeholder1.jpg',
    'images/placeholder2.jpg',
    'images/placeholder3.jpg',
    'images/placeholder4.jpg'
  ];
  
  let currentBgIndex = 0;
  const hero = document.querySelector('.hero');
  
  // Set initial background
  hero.style.backgroundImage = `url('${heroBackgrounds[currentBgIndex]}')`;
  
  // Add navigation arrows to hero
  const arrowsContainer = document.createElement('div');
  arrowsContainer.className = 'hero-arrows';
  arrowsContainer.innerHTML = `
    <div class="arrow left-arrow"><i class="fas fa-chevron-left"></i></div>
    <div class="arrow right-arrow"><i class="fas fa-chevron-right"></i></div>
  `;
  hero.appendChild(arrowsContainer);
  
  // Arrow click events
  const leftArrow = document.querySelector('.left-arrow');
  const rightArrow = document.querySelector('.right-arrow');
  
  leftArrow.addEventListener('click', function() {
    currentBgIndex = (currentBgIndex - 1 + heroBackgrounds.length) % heroBackgrounds.length;
    hero.style.backgroundImage = `url('${heroBackgrounds[currentBgIndex]}')`;
  });
  
  rightArrow.addEventListener('click', function() {
    currentBgIndex = (currentBgIndex + 1) % heroBackgrounds.length;
    hero.style.backgroundImage = `url('${heroBackgrounds[currentBgIndex]}')`;
  });
  
  // Auto change background every 5 seconds
  setInterval(function() {
    currentBgIndex = (currentBgIndex + 1) % heroBackgrounds.length;
    hero.style.backgroundImage = `url('${heroBackgrounds[currentBgIndex]}')`;
  }, 5000);
  
  // Showreel video player
  const videoContainer = document.querySelector('.video-container');
  if (videoContainer) {
    const videoId = 'dQw4w9WgXcQ'; // Example YouTube video ID
    
    // Create play button overlay
    const playOverlay = document.createElement('div');
    playOverlay.className = 'play-overlay';
    playOverlay.innerHTML = `
      <div class="play-button">
        <i class="fab fa-youtube"></i>
      </div>
    `;
    
    // Add play overlay to container
    videoContainer.appendChild(playOverlay);
    
    // Play button click event
    playOverlay.addEventListener('click', function() {
      // Create and add iframe when play button is clicked
      const iframe = document.createElement('iframe');
      iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
      iframe.title = 'Aymeric Perceval VFX Showreel';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      
      // Replace overlay with iframe
      videoContainer.innerHTML = '';
      videoContainer.appendChild(iframe);
    });
  }
  
  // Project Modal
  const modal = document.getElementById('projectModal');
  const projectBtns = document.querySelectorAll('.project-btn');
  const closeModal = document.querySelector('.close-modal');
  
  // Project data store
  let projectData = {};

  // Fetch project data from JSON file
  fetch('data/projectData.json')
    .then(response => response.json())
    .then(data => {
      projectData = data;
    })
    .catch(error => console.error('Error loading project data:', error));

  projectBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      const projectId = this.getAttribute('data-project');

      // Load project data based on projectId
      const project = projectData[projectId];

      if (project) {
        // Update modal title based on project
        const modalTitle = modal.querySelector('#modal-TITLE');
        modalTitle.textContent = project.title;

        // Update modal content
        const modalRole = modal.querySelector('#modal-ROLE');
        modalRole.textContent = project.role;
        const modalClientType = modal.querySelector('#modal-CLIENTTYPE');
        modalClientType.textContent = project.clientType;
        const modalClient = modal.querySelector('#modal-CLIENT');
        modalClient.textContent = project.client;
        const modalStudio = modal.querySelector('#modal-STUDIO');
        modalStudio.textContent = project.studio;
        const modalYear = modal.querySelector('#modal-YEAR');
        modalYear.textContent = project.year;

        // Update modal description
        const modalDescription = modal.querySelector('.modal-description');
        modalDescription.textContent = project.description;

        // Show modal
        modal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
      } else {
        console.error(`Project with ID ${projectId} not found.`);
      }
    });
  });
  
  // Close modal when clicking on close button
  if (closeModal) {
    closeModal.addEventListener('click', function() {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto'; // Enable scrolling again
    });
  }
  
  // Close modal when clicking outside the modal content
  window.addEventListener('click', function(e) {
    if (e.target === modal) {
      modal.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Form submission
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      // Basic validation
      if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
      }
      
      // In a real scenario, you would send this data to a server
      // For now, just display a success message
      alert('Thank you for your message! I will get back to you soon.');
      contactForm.reset();
    });
  }
  
  // Project filtering (if implemented)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectItems = document.querySelectorAll('.project-item');
  
  if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Get filter value
        const filterValue = this.getAttribute('data-filter');
        
        // Filter projects
        projectItems.forEach(item => {
          if (filterValue === 'all' || item.classList.contains(filterValue)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }
});
