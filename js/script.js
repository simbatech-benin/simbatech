
// Landing SliderShow:
const list = document.querySelector('.slider .list');
const item = document.querySelectorAll('.slider .list .item');
const prev = document.getElementById('prev');
const next = document.getElementById('next');

let active = 0;
let lengthItem = item.length - 1;

next.onclick = function(){
    if(active + 1 > lengthItem){
        active = 0;
    }else{
        active = active + 1;
    }
    
    reloadSlider();
}

prev.onclick = function(){
    if(active - 1 < 0){
        active = lengthItem;
    }else{
        active = active - 1;
    }
    reloadSlider();
}
let refreshSlider = setInterval(()=> {next.click()}, 5000);
function reloadSlider(){
    let checkLeft = item[active].offsetLeft;
    list.style.left = -checkLeft + 'px'

    clearInterval(refreshSlider);
    refreshSlider = setInterval(()=> {next.click()}, 5000);

}

// ------------------------------------------------------------
// Scroll Up Button:

const scrollUpButton = document.getElementById('scroll-up');

window.onscroll = function(){
    scrollFunc();
};

function scrollFunc(){
    if( document.body.scrollTop > 20 || document.documentElement.scrollTop > 20){
        scrollUpButton.style.display = "block";
    }else{
        scrollUpButton.style.display = "none";
    }
};

function topScroll(){
    document.documentElement.scrollTop = 0;
};

// ------------------------------------------------------------
// Event Countdown:

const eventTime = new Date("Jan 1, 2025 15:30:00").getTime();

const interval = setInterval(() => {
    const now = new Date().getTime();
    const duration = eventTime - now;

    // If the countdown is finished
    if(duration < 0){
        clearInterval(interval);
        updateDuration(0);
        return;
    }

    updateDuration(duration);

}, 1000);

function updateDuration(duration){

    //imp:
    // 1000 milliseconds = 1 second
    // 60 * 1000 milliseconds = 1 minute
    // 60 * 60 * 1000 milliseconds = 1 hour
    // 24 * 60 * 60 * 1000 milliseconds = 1 day

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((duration % (1000 * 60)) / 1000);

    document.getElementById('days').innerHTML = days;
    document.getElementById('hours').innerHTML = hours;
    document.getElementById('minutes').innerHTML = minutes;
    document.getElementById('seconds').innerHTML = seconds;
}

// ------------------------------------------------------------
// FAQs:

const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
    faq.addEventListener("click", () => {
        faq.classList.toggle("active");
    })
})




        document.addEventListener('DOMContentLoaded', function() {
  // Intersection Observer for animation on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  // Create observer for all animated elements
  const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate');
        observer.unobserve(entry.target); // Stop observing once animated
      }
    });
  }, observerOptions);

  // Observe gallery items
  document.querySelectorAll('.gallery .box').forEach(item => {
    observer.observe(item);
  });

  // Observe services boxes
  document.querySelectorAll('.services .box').forEach(item => {
    observer.observe(item);
  });

  // Observe feature cards
  document.querySelectorAll('.feature-card').forEach(item => {
    observer.observe(item);
  });

  // Observe stat boxes
  document.querySelectorAll('.stat-box').forEach(item => {
    observer.observe(item);
  });

  // Observe pricing boxes
  document.querySelectorAll('.pricing .box').forEach(item => {
    observer.observe(item);
  });

  // Animated counter for stats
  const animateCounters = () => {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
      // Get target number from text content
      const target = counter.textContent;
      // Remove any non-numeric characters
      const numericTarget = parseFloat(target.replace(/\D/g, ''));
      // Check if it has a plus sign
      const hasPlus = target.includes('+');
      
      // Start from zero
      counter.textContent = '0';
      
      // Increment counter
      const updateCounter = () => {
        const currentValue = parseInt(counter.textContent);
        const increment = Math.ceil(numericTarget / 25); // Adjust for animation speed
        
        if (currentValue < numericTarget) {
          counter.textContent = currentValue + increment;
          // Add plus sign back if it was there
          if (hasPlus && currentValue + increment >= numericTarget) {
            counter.textContent += '+';
          }
          setTimeout(updateCounter, 50);
        } else {
          // Make sure we land exactly on the target number
          counter.textContent = hasPlus ? numericTarget + '+' : numericTarget;
        }
      };
      
      // Only start animation when element is visible
      const statsSection = document.querySelector('#stats');
      const statsSectionObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          updateCounter();
          statsSectionObserver.unobserve(statsSection);
        }
      });
      
      statsSectionObserver.observe(statsSection);
    });
  };
  
  animateCounters();

  // Animated typed text for hero section
  const heroText = document.querySelector('.hero-content p');
  if (heroText) {
    const text = heroText.textContent;
    heroText.textContent = '';
    
    let charIndex = 0;
    function typeWriter() {
      if (charIndex < text.length) {
        heroText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 100);
      }
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1500);
  }

  // Testimonial slider animation
  let testimonialIndex = 0;
  const testimonials = document.querySelectorAll('.testimonial-slide');
  
  if (testimonials.length > 1) {
    function showNextTestimonial() {
      testimonials.forEach(slide => {
        slide.style.display = 'none';
        slide.style.opacity = '0';
      });
      
      testimonialIndex = (testimonialIndex + 1) % testimonials.length;
      testimonials[testimonialIndex].style.display = 'block';
      
      // Trigger fade in animation
      setTimeout(() => {
        testimonials[testimonialIndex].style.opacity = '1';
      }, 100);
    }
    
    // Initialize first testimonial
    testimonials[0].style.display = 'block';
    setTimeout(() => {
      testimonials[0].style.opacity = '1';
    }, 100);
    
    // Change testimonial every 5 seconds
    setInterval(showNextTestimonial, 5000);
  }

  // Landing slider enhanced animations
  const sliderItems = document.querySelectorAll('.landing .slider .item');
  const prevBtn = document.getElementById('prev');
  const nextBtn = document.getElementById('next');
  
  if (sliderItems.length > 0 && prevBtn && nextBtn) {
    let currentIndex = 0;
    
    // Show current slide with animation
    function showSlide(index) {
      // Hide all slides
      sliderItems.forEach(item => {
        item.style.opacity = '0';
        item.style.display = 'none';
      });
      
      // Show current slide
      sliderItems[index].style.display = 'flex';
      
      // Trigger animations
      setTimeout(() => {
        sliderItems[index].style.opacity = '1';
        
        // Animate text elements
        const heading = sliderItems[index].querySelector('h1');
        const paragraph = sliderItems[index].querySelector('p');
        
        if (heading) {
          heading.style.transform = 'translateY(30px)';
          heading.style.opacity = '0';
          
          setTimeout(() => {
            heading.style.transition = 'all 0.8s ease-out';
            heading.style.transform = 'translateY(0)';
            heading.style.opacity = '1';
          }, 300);
        }
        
        if (paragraph) {
          paragraph.style.transform = 'translateY(30px)';
          paragraph.style.opacity = '0';
          
          setTimeout(() => {
            paragraph.style.transition = 'all 0.8s ease-out';
            paragraph.style.transform = 'translateY(0)';
            paragraph.style.opacity = '1';
          }, 600);
        }
      }, 100);
    }
    
    // Initialize first slide
    showSlide(currentIndex);
    
    // Next slide
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % sliderItems.length;
      showSlide(currentIndex);
    });
    
    // Previous slide
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
      showSlide(currentIndex);
    });
    
    // Auto-advance slides every 7 seconds
    setInterval(() => {
      currentIndex = (currentIndex + 1) % sliderItems.length;
      showSlide(currentIndex);
    }, 7000);
  }

  // Animated background gradient for the header
  const header = document.querySelector('.header');
  if (header) {
    let hue = 0;
    
    function updateGradient() {
      hue = (hue + 1) % 360;
      const color1 = `hsla(${hue}, 100%, 50%, 0.05)`;
      const color2 = `hsla(${(hue + 180) % 360}, 100%, 50%, 0.05)`;
      
      header.style.background = `linear-gradient(45deg, ${color1}, ${color2})`;
      requestAnimationFrame(updateGradient);
    }
    
    // Only update on hover to save performance
    header.addEventListener('mouseenter', () => {
      requestAnimationFrame(updateGradient);
    });
    
    header.addEventListener('mouseleave', () => {
      header.style.background = '';
    });
  }

  // Scroll to section with smooth animation
  const navLinks = document.querySelectorAll('.main-nav a, .cta-button');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only process internal links
      if (href.startsWith('#')) {
        e.preventDefault();
        
        const targetSection = document.querySelector(href);
        if (targetSection) {
          window.scrollTo({
            top: targetSection.offsetTop - 70, // Adjust for fixed header
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Particle animation for hero section
  const heroSection = document.querySelector('.hero-section');
  
  if (heroSection) {
    // Create particle container
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.overflow = 'hidden';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '1';
    
    heroSection.insertBefore(particleContainer, heroSection.firstChild);
    
    // Create particles
    for (let i = 0; i < 50; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.position = 'absolute';
      particle.style.width = Math.random() * 5 + 'px';
      particle.style.height = particle.style.width;
      particle.style.background = 'rgba(255, 255, 255, 0.5)';
      particle.style.borderRadius = '50%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animation = `float ${Math.random() * 10 + 5}s linear infinite`;
      particle.style.opacity = Math.random() * 0.5;
      
      particleContainer.appendChild(particle);
    }
    
    // Add float animation
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes float {
        0% {
          transform: translateY(0) translateX(0);
          opacity: 0;
        }
        50% {
          opacity: 0.8;
        }
        100% {
          transform: translateY(-100px) translateX(${Math.random() * 100 - 50}px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(styleSheet);
  }
  
  // Initialize scroll-up button
  const scrollUpBtn = document.getElementById('scroll-up');
  
  if (scrollUpBtn) {
    // Show/hide based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollUpBtn.style.display = 'block';
        scrollUpBtn.style.opacity = '1';
      } else {
        scrollUpBtn.style.opacity = '0';
        setTimeout(() => {
          if (window.scrollY <= 500) {
            scrollUpBtn.style.display = 'none';
          }
        }, 300);
      }
    });
  }
  
  // Custom cursor effect for interactive elements
  const customCursor = document.createElement('div');
  customCursor.className = 'custom-cursor';
  customCursor.style.position = 'fixed';
  customCursor.style.width = '40px';
  customCursor.style.height = '40px';
  customCursor.style.borderRadius = '50%';
  customCursor.style.border = '2px solid var(--main-color)';
  customCursor.style.pointerEvents = 'none';
  customCursor.style.transform = 'translate(-50%, -50%)';
  customCursor.style.zIndex = '9999';
  customCursor.style.opacity = '0';
  customCursor.style.transition = 'width 0.3s, height 0.3s, opacity 0.3s';
  
  //document.body.appendChild(customCursor);
  
  // Interactive elements to track
  const interactiveElements = document.querySelectorAll('a, button, .box, .feature-card');
  
  document.addEventListener('mousemove', (e) => {
    customCursor.style.left = e.clientX + 'px';
    customCursor.style.top = e.clientY + 'px';
  });
  
  interactiveElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
      customCursor.style.opacity = '1';
      customCursor.style.width = '50px';
      customCursor.style.height = '50px';
      customCursor.style.backgroundColor = 'rgba(var(--main-color-rgb), 0.1)';
      element.style.cursor = 'none';
    });
    
    element.addEventListener('mouseleave', () => {
      customCursor.style.opacity = '0';
      customCursor.style.width = '40px';
      customCursor.style.height = '40px';
      customCursor.style.backgroundColor = 'transparent';
      element.style.cursor = 'auto';
    });
  });
  
  // Add a parallax effect to the hero section
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    
    if (heroSection) {
      heroSection.style.backgroundPositionY = -scrollPosition * 0.2 + 'px';
    }
  });
});

// Function for the scroll-up button
function topScroll() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
document.addEventListener('DOMContentLoaded', function() {
  // Get all "Choose" buttons
  const chooseButtons = document.querySelectorAll('.pricing .box a');

  // Add click event to each button
  chooseButtons.forEach(button => {
    if (button.getAttribute('href') === '#contact') {
      button.addEventListener('click', function(e) {
        e.preventDefault();

        // Get the course title from the parent box
        const courseBox = this.closest('.box');
        const courseTitle = courseBox.querySelector('.titel').textContent;

        // Set the course title in the modal form
        document.getElementById('course-input').value = courseTitle;

        // Show the modal
        document.getElementById('enrollment-modal').style.display = 'flex';
      });
    }
  });

  // Close modal when clicking on the close button
  document.querySelector('.close-modal').addEventListener('click', function() {
    document.getElementById('enrollment-modal').style.display = 'none';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('enrollment-modal')) {
      document.getElementById('enrollment-modal').style.display = 'none';
    }
  });

  // Handle form submission
  document.getElementById('enrollment-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(this);

    // Submit form data using fetch
    fetch('save_enrollment.php', {
        method: 'POST',
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Enrollment submitted successfully! You will be redirected to our WhatsApp group.');
          document.getElementById('enrollment-modal').style.display = 'none';
          document.getElementById('enrollment-form').reset();

          // Redirect to WhatsApp group after successful submission
          window.location.href = 'https://chat.whatsapp.com/F5V0QId4C3W5ndaymQDP6H';
        } else {
          alert('Error: ' + data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
      });
  });
});

        document.addEventListener('DOMContentLoaded', function() {
            const slides = document.querySelectorAll('.slide');
            const dots = document.querySelectorAll('.slider-dot');
            let currentSlide = 0;
            
            // Auto slide functionality
            let slideInterval = setInterval(nextSlide, 5000);
            
            // Function to change slide
            function changeSlide(n) {
                slides[currentSlide].classList.remove('active');
                dots[currentSlide].classList.remove('active');
                
                currentSlide = (n + slides.length) % slides.length;
                
                slides[currentSlide].classList.remove('fade-in');
                void slides[currentSlide].offsetWidth; // Trigger reflow
                slides[currentSlide].classList.add('active', 'fade-in');
                dots[currentSlide].classList.add('active');
                
                // Reset interval timer
                clearInterval(slideInterval);
                slideInterval = setInterval(nextSlide, 5000);
            }
            
            // Next slide function
            function nextSlide() {
                changeSlide(currentSlide + 1);
            }
            
            // Add click event to dots
            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    changeSlide(index);
                });
            });
            
            // Add swipe functionality for mobile
            let touchStartX = 0;
            let touchEndX = 0;
            
            const sliderContainer = document.querySelector('.slider-container');
            
            sliderContainer.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            sliderContainer.addEventListener('touchend', e => {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe();
            });
            
            function handleSwipe() {
                const swipeThreshold = 50;
                if (touchEndX < touchStartX - swipeThreshold) {
                    // Swipe left - next slide
                    changeSlide(currentSlide + 1);
                } else if (touchEndX > touchStartX + swipeThreshold) {
                    // Swipe right - previous slide
                    changeSlide(currentSlide - 1);
                }
            }
            
            // Pause slider on hover
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
        });
    
                 
                document.addEventListener('DOMContentLoaded', function() {
                  const form = document.querySelector('.contact-form form');
                
                  form.addEventListener('submit', function(event) {
                    event.preventDefault();
                
                    // Create a modal element
                    const modal = document.createElement('div');
                    modal.className = 'success-modal';
                    modal.innerHTML = `
                      <div class="modal-content">
                        <h3>Success!</h3>
                        <p>Your message has been sent successfully.</p>
                        <button id="modal-close-btn">Close</button>
                      </div>
                    `;
                
                    // Add modal styles
                    const modalStyle = document.createElement('style');
                    modalStyle.textContent = `
                      .success-modal {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        z-index: 1000;
                      }
                      .modal-content {
                        background-color: white;
                        padding: 30px;
                        border-radius: 5px;
                        text-align: center;
                        max-width: 400px;
                      }
                      #modal-close-btn {
                        margin-top: 15px;
                        padding: 8px 20px;
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                      }
                    `;
                    document.head.appendChild(modalStyle);
                
                    // Submit form data using fetch
                    fetch(form.getAttribute('action'), {
                        method: 'POST',
                        body: new FormData(form),
                        headers: {
                          'Accept': 'application/json'
                        }
                      })
                      .then(response => {
                        if (response.ok) {
                          // Add modal to the DOM
                          document.body.appendChild(modal);
                
                          // Reset the form
                          form.reset();
                
                          // Add event listener to close button
                          document.getElementById('modal-close-btn').addEventListener('click', function() {
                            // Redirect to WhatsApp group
                            window.location.href = 'https://chat.whatsapp.com/F5V0QId4C3W5ndaymQDP6H';
                          });
                        } else {
                          throw new Error('Form submission failed');
                        }
                      })
                      .catch(error => {
                        console.error('Error:', error);
                        alert('There was an error submitting your form. Please try again.');
                      });
                  });
                });


      