document.addEventListener("DOMContentLoaded", function () {
  // Initialize Swiper with custom settings
  const constructionSwiper = new Swiper(".hero-main", {
    // Only 2 slides as requested
    slidesPerView: 1,
    loop: true,
    speed: 1200,
    autoplay: {
      delay: 8000,
      disableOnInteraction: false,
    },

    // Custom fade + scale effect
    effect: "creative",
    creativeEffect: {
      prev: {
        shadow: true,
        translate: [0, 0, -400],
        opacity: 0,
      },
      next: {
        translate: ["100%", 0, 0],
        opacity: 0,
      },
    },

    // Custom pagination
    pagination: {
      el: ".construction-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },

    // Custom navigation
    navigation: {
      nextEl: ".construction-next",
      prevEl: ".construction-prev",
    },

    // Keyboard control
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    // Accessibility
    a11y: {
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
      paginationBulletMessage: "Go to slide {{index}}",
    },
  });

  // Content animation on slide change
  constructionSwiper.on("slideChange", function () {
    const activeSlide = this.slides[this.activeIndex];
    const content = activeSlide.querySelector(".slide-content");

    // Reset animation
    content.style.opacity = "0";
    content.style.transform = "translateY(50px)";

    // Trigger reflow
    void content.offsetWidth;

    // Apply animation
    content.style.opacity = "1";
    content.style.transform = "translateY(0)";
  });
});
// contact page JS
document.addEventListener("DOMContentLoaded", function () {
  // Check if we're on the contact page by looking for unique contact page elements
  const contactPageChecker = document.querySelector(".contact-form-section, .contact-info-section");
  if (!contactPageChecker) return;

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const projectType = document.getElementById("projectType").value;
      const budget = document.getElementById("budget").value;
      const message = document.getElementById("message").value;

      // Basic validation
      if (!firstName || !lastName || !email || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Simulate form submission
      const submitBtn = document.querySelector(".btn-submit");
      const originalText = submitBtn.innerHTML;

      submitBtn.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>Sending...';
      submitBtn.disabled = true;

      setTimeout(function () {
        alert("Thank you for your message! We will get back to you within 24 hours.");
        contactForm.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Phone number formatting
  const phoneInput = document.getElementById("phone");
  if (phoneInput) {
    phoneInput.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");
      if (value.length >= 6) {
        value = value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      } else if (value.length >= 3) {
        value = value.replace(/(\d{3})(\d{3})/, "($1) $2");
      }
      e.target.value = value;
    });
  }

  // Form field focus effects
  document.querySelectorAll(".form-control").forEach((input) => {
    input.addEventListener("focus", function () {
      const label = this.parentNode.querySelector("label");
      if (label) label.style.color = "#fdc348";
    });

    input.addEventListener("blur", function () {
      const label = this.parentNode.querySelector("label");
      if (label) label.style.color = "#01548d";
    });
  });

  // Animation functions
  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".contact-card, .contact-form, .contact-info-box, .hours-card"
    );
    const windowHeight = window.innerHeight;

    elements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  }

  // Initialize animation styles
  document.querySelectorAll(
    ".contact-card, .contact-form, .contact-info-box, .hours-card"
  ).forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "all 0.6s ease";
  });

  // Business hours current day highlighting
  function highlightCurrentDay() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const today = new Date().getDay();
    const todayName = days[today];

    document.querySelectorAll(".hours-item").forEach((item) => {
      const daySpan = item.querySelector(".day");
      if (daySpan && daySpan.textContent === todayName) {
        item.style.backgroundColor = "#fdc348";
        item.style.borderRadius = "8px";
        item.style.padding = "12px 15px";
        item.style.fontWeight = "600";
        daySpan.style.color = "#01548d";
        const timeSpan = item.querySelector(".time");
        if (timeSpan) timeSpan.style.color = "#01548d";
      }
    });
  }

  // Social links hover effect with counter
  let socialHoverCount = 0;
  document.querySelectorAll(".social-link").forEach((link) => {
    link.addEventListener("mouseenter", function () {
      socialHoverCount++;
      if (socialHoverCount === 1) {
        console.log("User is exploring our social media presence!");
      }
    });
  });

  // Map interaction
  const mapContainer = document.querySelector(".map-container");
  if (mapContainer) {
    mapContainer.addEventListener("click", function () {
      console.log("User clicked on the map");
    });
  }

  // Accessibility improvements
  document.querySelectorAll(".contact-card, .social-link").forEach((element) => {
    element.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        this.click();
      }
    });
  });

  // Contact card click to action
  document.querySelectorAll(".contact-card").forEach((card) => {
    card.addEventListener("click", function () {
      const link = this.querySelector(".contact-link");
      if (link) {
        link.click();
      }
    });
  });

  // Run animations and highlight current day
  window.addEventListener("load", function() {
    animateOnScroll();
    highlightCurrentDay();
  });
  window.addEventListener("scroll", animateOnScroll);
});
// gallery page JS
// Gallery JavaScript functionality
document.addEventListener("DOMContentLoaded", function () {
  const galleryGrid = document.getElementById("galleryGrid");
  if (!galleryGrid) return;

  // Project data for modal
  const projectData = {
    1: {
      title: "Modern Family Home",
      category: "Residential",
      description: "A stunning contemporary family home featuring open-plan living spaces, large windows, and sustainable design elements. This project showcases modern architecture with functionality.",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop",
      specs: {
        Area: "2,500 sq ft",
        Bedrooms: "4",
        Bathrooms: "3",
        Completion: "2024",
        Location: "Sivakasi, Tamil Nadu",
      },
    },
    2: {
      title: "Corporate Office Complex",
      category: "Commercial",
      description: "A modern office complex designed to accommodate growing businesses with flexible workspaces, conference facilities, and state-of-the-art infrastructure.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
      specs: {
        Area: "15,000 sq ft",
        Floors: "5",
        Offices: "25",
        Completion: "2024",
        Location: "Madurai, Tamil Nadu",
      },
    },
    3: {
      title: "Manufacturing Facility",
      category: "Industrial",
      description: "A large-scale manufacturing facility built to meet industry standards with proper ventilation, safety systems, and efficient workflow design.",
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=600&h=400&fit=crop",
      specs: {
        Area: "50,000 sq ft",
        Height: "25 ft",
        Capacity: "500 workers",
        Completion: "2023",
        Location: "Coimbatore, Tamil Nadu",
      },
    },
    4: {
      title: "Luxury Villa",
      category: "Residential",
      description: "An elegant luxury villa with premium finishes, landscaped gardens, and resort-style amenities for discerning homeowners.",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=600&h=400&fit=crop",
      specs: {
        Area: "4,000 sq ft",
        Bedrooms: "5",
        Bathrooms: "4",
        Completion: "2024",
        Location: "Chennai, Tamil Nadu",
      },
    },
    5: {
      title: "Kitchen Renovation",
      category: "Renovation",
      description: "Complete kitchen transformation with modern appliances, custom cabinetry, and efficient layout design for enhanced functionality.",
      image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=600&h=400&fit=crop",
      specs: {
        Area: "200 sq ft",
        Duration: "3 weeks",
        Style: "Modern",
        Completion: "2024",
        Location: "Sivakasi, Tamil Nadu",
      },
    },
    6: {
      title: "Shopping Center",
      category: "Commercial",
      description: "A vibrant shopping center featuring retail spaces, food courts, and entertainment facilities designed to attract visitors and businesses.",
      image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=600&h=400&fit=crop",
      specs: {
        Area: "25,000 sq ft",
        Stores: "40",
        Floors: "3",
        Completion: "2023",
        Location: "Tirunelveli, Tamil Nadu",
      },
    },
    7: {
      title: "Apartment Complex",
      category: "Residential",
      description: "A modern apartment complex offering comfortable living spaces with shared amenities and landscaped common areas.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
      specs: {
        Units: "24",
        Floors: "6",
        Amenities: "Gym, Pool, Garden",
        Completion: "2024",
        Location: "Thoothukudi, Tamil Nadu",
      },
    },
    8: {
      title: "Warehouse Complex",
      category: "Industrial",
      description: "Strategic warehouse facility with loading docks, office spaces, and modern storage solutions for logistics operations.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
      specs: {
        Area: "75,000 sq ft",
        "Loading Docks": "12",
        "Office Space": "2,000 sq ft",
        Completion: "2023",
        Location: "Salem, Tamil Nadu",
      },
    },
    9: {
      title: "Bathroom Renovation",
      category: "Renovation",
      description: "Luxurious bathroom renovation featuring premium fixtures, elegant tilework, and spa-like ambiance for ultimate relaxation.",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=400&fit=crop",
      specs: {
        Area: "80 sq ft",
        Duration: "2 weeks",
        Style: "Luxury",
        Completion: "2024",
        Location: "Sivakasi, Tamil Nadu",
      },
    },
  };

  // Initialize Bootstrap modal
  const projectModal = new bootstrap.Modal(document.getElementById('projectModal'));
  const modalBody = document.getElementById('modalBody');
  const modalTitle = document.getElementById('projectModalLabel');

  // Handle view button clicks with event delegation
  document.addEventListener('click', function(e) {
    const button = e.target.closest('.view-btn');
    if (!button) return;
    
    const projectId = button.getAttribute('data-project');
    const project = projectData[projectId];
    if (!project) return;

    // Update modal content
    modalTitle.textContent = project.title;
    modalBody.innerHTML = `
      <div class="project-details">
        <div class="row">
          <div class="col-12 col-md-6">
            <img src="${project.image}" alt="${project.title}" class="img-fluid rounded mb-3">
          </div>
          <div class="col-12 col-md-6">
            <h6>Project Overview</h6>
            <p>${project.description}</p>
            <div class="project-specs">
              <h6>Project Specifications</h6>
              ${Object.entries(project.specs).map(([key, value]) => `
                <div class="spec-item">
                  <span class="spec-label">${key}:</span>
                  <span class="spec-value">${value}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </div>
    `;
    
    // Show the modal
    projectModal.show();
  });
  // Fix for close button functionality
  const closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
  closeButtons.forEach(button => {
    button.addEventListener('click', function() {
      projectModal.hide();
    });
  });

  // Filter functionality
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      const filter = this.getAttribute('data-filter');
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      
      // Filter items
      galleryItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.classList.remove('filtered-out');
          setTimeout(() => {
            item.style.display = 'block';
          }, 100);
        } else {
          item.classList.add('filtered-out');
          setTimeout(() => {
            if (item.classList.contains('filtered-out')) {
              item.style.display = 'none';
            }
          }, 500);
        }
      });
      
      // Re-run animations
      setTimeout(animateFilteredItems, 300);
    });
  });

  // Load more functionality
  const loadMoreBtn = document.getElementById('loadMoreBtn');
  let isLoading = false;
  
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      if (isLoading) return;
      isLoading = true;
      
      this.innerHTML = '<i class="bi bi-arrow-clockwise"></i> Loading...';
      this.disabled = true;
      
      setTimeout(() => {
        this.innerHTML = '<i class="bi bi-check-circle"></i> All Projects Loaded';
        
        setTimeout(() => {
          this.innerHTML = '<i class="bi bi-plus-circle"></i> Load More Projects';
          this.disabled = false;
          isLoading = false;
        }, 2000);
      }, 1500);
    });
  }

  // Animation functions
  function animateFilteredItems() {
    const visibleItems = document.querySelectorAll('.gallery-item:not(.filtered-out)');
    
    visibleItems.forEach((item, index) => {
      item.style.animationDelay = `${index * 0.1}s`;
      item.classList.add('fade-in-up');
    });
  }

  // Add CSS animation styles
  const style = document.createElement('style');
  style.textContent = `
    .fade-in-up {
      animation: fadeInUp 0.6s ease forwards;
    }
    
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `;
  document.head.appendChild(style);

  // Initialize animations on page load
  setTimeout(animateFilteredItems, 100);

  // Gallery item hover effects
  galleryItems.forEach(item => {
    const card = item.querySelector('.gallery-card');
    
    if (card) {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    }
  });

  // Lazy loading for images
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.style.opacity = '0';
          img.style.transition = 'opacity 0.3s ease';
          
          setTimeout(() => {
            img.style.opacity = '1';
          }, 100);
          
          observer.unobserve(img);
        }
      });
    });
    
    document.querySelectorAll('.gallery-image img').forEach(img => {
      lazyImageObserver.observe(img);
    });
  }
});

/// Why Choose Us section JS
$(document).ready(function () {
    const $whySection = $('.whychoose-section');
    if ($whySection.length === 0) return;

    const animateOdometers = () => {
        $('.odometer:not(.animated)').each(function () {
            const $this = $(this);
            const position = $this.offset().top;
            const scroll = $(window).scrollTop();
            const windowHeight = $(window).height();

            if (scroll + windowHeight > position) {
                const finalValue = $this.attr('data-odometer-final') || '0';
                new Odometer({
                    el: this,
                    value: 0,
                    format: '(,ddd)',
                    theme: 'minimal'
                }).update(finalValue);
                $this.addClass('animated');
            }
        });
    };

    // Initial check + on scroll
    $(window).on('scroll', animateOdometers);
    animateOdometers(); // Trigger once on load

    // Hover effects for cards
    $('.text-card').hover(
        function () {
            $(this).find('.whychoose-card').css({
                'background-color': 'var(--color-2)',
                'transform': 'translateY(-5px)'
            });
            $(this).find('.card-icon, .card-title, .odometer').css('color', 'var(--color-3)');
            $(this).find('.card-text, .counter-text').css('color', 'rgba(255, 255, 255, 0.8)');
            $(this).find('.divider').css('background-color', 'var(--color-3)');
        },
        function () {
            $(this).find('.whychoose-card').css({
                'background-color': 'var(--color-3)',
                'transform': 'translateY(0)'
            });
            $(this).find('.card-icon').css('color', 'var(--color-1)');
            $(this).find('.card-title, .card-text, .counter-text').css('color', 'var(--color-4)');
            $(this).find('.odometer').css('color', 'var(--color-1)');
            $(this).find('.divider').css('background-color', 'var(--color-1)');
        }
    );
});
// testimonials swiper JS
// Custom Swiper with unique effects
new WOW().init();

    const testimonialSwiper = new Swiper('.testimonials-swiper', {
        slidesPerView: 3,
        spaceBetween: 40,
        loop: true,
        centeredSlides: true,
        autoplay: { delay: 5000 },
        speed: 1000,
        effect: 'creative',
        creativeEffect: {
            prev: {
                translate: ['-100%', 0, -800],
                rotate: [0, 0, -10],
                opacity: 0.6,
            },
            next: {
                translate: ['100%', 0, -800],
                rotate: [0, 0, 10],
                opacity: 0.6,
            }
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        breakpoints: {
            992: {
                slidesPerView: 3,
            },
            768: {
                slidesPerView: 2,
            },
            0: {
                slidesPerView: 1,
            }
        },
        on: {
            init: function () {
                this.slides.forEach((slide, index) => {
                    const card = slide.querySelector('.testimonial-card');
                    if (card) {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(50px)';
                        setTimeout(() => {
                            card.style.transition = 'all 0.6s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 200);
                    }
                });
            }
        }
    });

    // Hover Effects
    document.querySelectorAll('.testimonial-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            testimonialSwiper.autoplay.stop();
            const stars = card.querySelectorAll('.star.active');
            stars.forEach((star, i) => {
                setTimeout(() => {
                    star.style.animation = 'pulse 0.6s ease';
                }, i * 50);
            });
        });
        card.addEventListener('mouseleave', () => {
            testimonialSwiper.autoplay.start();
            const stars = card.querySelectorAll('.star.active');
            stars.forEach(star => {
                star.style.animation = '';
            });
        });
    });

    // Add Animation Keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // about last counter section 

document.addEventListener('DOMContentLoaded', function () {
  const chartSection = document.querySelector('.construction-chart-section');

  if (!chartSection) {
    console.warn("⚠️ Section .construction-chart-section NOT found");
    return;
  }

  const counters = chartSection.querySelectorAll('.counter');
  const duration = 3500; // Slowed down from 2000ms to 3500ms (3.5 seconds)

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-count'));
      const increment = target / (duration / 10); // smaller steps = slower count
      let current = 0;

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = current.toFixed(target % 1 !== 0 ? 1 : 0); // support decimals
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toFixed(target % 1 !== 0 ? 1 : 0);
        }
      };

      updateCounter();
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("🟢 Section in view — starting counter animation");
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  observer.observe(chartSection);
});
// services swiper
// Initialize Swiper
document.addEventListener('DOMContentLoaded', function() {
  // Service Page Swiper
  let serviceSwiper = new Swiper('.service-slider .swiper-container', {
  effect: 'coverflow', // or 'flip', 'cube', 'fade'
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: 'auto',
  loop: true,
  speed: 2000,
  coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
    
  });
  
  // Initialize WOW.js
  new WOW({
    offset: 100,
    mobile: true
  }).init();
  
  // Lightbox initialization (if using lightbox plugin)
  if (typeof lightbox !== 'undefined') {
    lightbox.option({
      'resizeDuration': 200,
      'wrapAround': true,
      'albumLabel': 'Image %1 of %2'
    });
  }
});
// navbar fixed to top
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar-construction');
    let lastScrollTop = 0;
    
    // Make navbar fixed when scrolling down
    window.addEventListener('scroll', function() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      if (scrollTop > 100) {
        navbar.style.position = 'fixed';
        navbar.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.2)';
        navbar.style.transition = 'all 0.3s ease-in-out';
      } else {
        navbar.style.position = 'absolute';
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
      }
      
      lastScrollTop = scrollTop;
    });
  });