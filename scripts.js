// Preloader
window.addEventListener('load', function() {
    const preloader = document.getElementById('preloader');
    
    // Mostrar contenido cuando todo esté cargado
    setTimeout(() => {
      preloader.classList.add('fade-out');
      
      setTimeout(() => {
        document.getElementById('header').classList.add('visible');
        preloader.style.display = 'none';
        
        // Iniciar animaciones después del preloader
        initAnimations();
      }, 1000);
    }, 1500);
  });
  
  // Navegación móvil
  function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      mobileMenuBtn.innerHTML = navMenu.classList.contains('active') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Cerrar menú al hacer clic en un enlace
    document.querySelectorAll('.nav-menu a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
  
  // Transiciones entre páginas
  function initPageTransitions() {
    document.querySelectorAll('.page-transition-link').forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        const pageTransition = document.querySelector('.page-transition');
        pageTransition.classList.add('active');
        
        setTimeout(() => {
          window.location.href = href;
        }, 800);
      });
    });
  }
  
  // Scroll suave
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  // Animaciones al hacer scroll
  function initAnimations() {
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animateElements.forEach(element => {
      observer.observe(element);
    });
  }
  
  // Chatbot mejorado para móviles
  function initChatbot() {
    const chatbotBtn = document.getElementById('chatbotBtn');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    
    // Toggle chatbot
    chatbotBtn.addEventListener('click', () => {
      chatbotWindow.classList.toggle('active');
    });
    
    // Cerrar chatbot
    chatbotClose.addEventListener('click', () => {
      chatbotWindow.classList.remove('active');
    });
    
    // Respuestas del chatbot
    const chatbotResponses = {
      "hola": "¡Hola! ¿En qué puedo ayudarte sobre la Laguna de Huacarpay?",
      "horario": "La laguna está abierta al público de 6:00 AM a 6:00 PM todos los días.",
      "precio": "La entrada general cuesta S/10.00 y para estudiantes S/5.00.",
      "como llegar": "Desde Cusco, puedes tomar buses hacia Urcos/Lucre (1 hora aprox.). La laguna está a 30 km al sureste de Cusco.",
      "aves": "La laguna alberga más de 100 especies de aves, incluyendo el pato colorado, gallareta gigante y zambullidor de Junín.",
      "actividades": "Puedes hacer observación de aves, caminatas, fotografía, picnic y visitar los restos arqueológicos cercanos.",
      "mejor epoca": "La mejor época para visitar es de abril a octubre (estación seca), especialmente temprano en la mañana para ver aves.",
      "contacto": "Puedes contactarnos al (084) 231961 - Anexo 123 o al correo huacarpay@municusco.gob.pe",
      "gracias": "¡De nada! ¿En qué más puedo ayudarte?",
      "adios": "¡Hasta luego! Que tengas un buen día. Recuerda cuidar la naturaleza."
    };
    
    // Enviar mensaje
    function sendMessage() {
      const message = chatbotInput.value.trim();
      if (message === '') return;
      
      addMessage(message, 'user');
      chatbotInput.value = '';
      
      setTimeout(() => {
        let response = "Lo siento, no entendí tu pregunta. ¿Podrías reformularla?";
        
        // Buscar respuesta
        Object.keys(chatbotResponses).forEach(key => {
          if (message.toLowerCase().includes(key)) {
            response = chatbotResponses[key];
          }
        });
        
        addMessage(response, 'bot');
      }, 1000);
    }
    
    // Añadir mensaje al chat
    function addMessage(text, sender) {
      const messageDiv = document.createElement('div');
      messageDiv.classList.add('message');
      messageDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
      messageDiv.textContent = text;
      chatbotMessages.appendChild(messageDiv);
      chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }
    
    // Event listeners
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
  
  // Google Maps
  function initMap() {
    try {
      const huacarpay = { lat: -13.615278, lng: -71.7275 };
      const mapContainer = document.getElementById('map');
      
      if (mapContainer) {
        // Eliminar loader si existe
        if (mapContainer.querySelector('.loading')) {
          mapContainer.querySelector('.loading').remove();
        }
        
        const map = new google.maps.Map(mapContainer, {
          zoom: 14,
          center: huacarpay,
          gestureHandling: "cooperative",
          mapTypeControl: false,
          styles: [/* estilos del mapa */]
        });
        
        // Marcador
        const marker = new google.maps.Marker({
          position: huacarpay,
          map: map,
          title: "Laguna de Huacarpay",
          icon: {
            url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          }
        });
        
        // Ventana de información
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="padding: 10px; max-width: 250px;">
              <h3 style="margin: 0 0 5px; color: #1E88E5;">Laguna de Huacarpay</h3>
              <p style="margin: 0; font-size: 0.9rem;">Humedal Ramsar en el valle de Lucre, Cusco</p>
              <a href="https://goo.gl/maps/XYZ123" target="_blank" 
                style="display: inline-block; margin-top: 8px; color: #1E88E5; text-decoration: none;">
                <i class="fas fa-external-link-alt"></i> Ver en Google Maps
              </a>
            </div>
          `
        });
        
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        
        setTimeout(() => {
          infoWindow.open(map, marker);
        }, 1000);
      }
    } catch (error) {
      console.error('Map initialization error:', error);
      showMapError();
    }
  }
  
  // Mostrar error si falla el mapa
  function showMapError() {
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
      mapContainer.innerHTML = `
        <div class="map-error">
          <i class="fas fa-exclamation-triangle"></i>
          <h3>Error al cargar el mapa</h3>
          <p>No se pudo cargar Google Maps. Por favor intenta recargar la página.</p>
          <a href="https://goo.gl/maps/XYZ123" target="_blank" class="map-btn">
            <i class="fas fa-external-link-alt"></i> Ver ubicación en Google Maps
          </a>
        </div>
      `;
    }
  }
  
  // Inicialización cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initPageTransitions();
    initSmoothScroll();
    initChatbot();
    
    // Header scroll effect
    const header = document.getElementById('header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
    
    // Botón "volver arriba"
    const backToTopBtn = document.querySelector('.back-to-top');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
          backToTopBtn.classList.add('active');
        } else {
          backToTopBtn.classList.remove('active');
        }
      });
      
      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }
    
    // Manejar error de autenticación de Google Maps
    window.gm_authFailure = function() {
      showMapError();
    };
  });
  
  // Optimización para móviles
  function checkMobileFeatures() {
    // Detectar touch
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    
    if (isTouchDevice) {
      document.body.classList.add('touch-device');
      
      // Mejorar feedback táctil
      const buttons = document.querySelectorAll('button, a[href], .card-btn, .hero-btn');
      
      buttons.forEach(button => {
        button.addEventListener('touchstart', function() {
          this.classList.add('touched');
        });
        
        button.addEventListener('touchend', function() {
          setTimeout(() => {
            this.classList.remove('touched');
          }, 200);
        });
      });
      
      // Manejar video en móviles
      const heroVideo = document.querySelector('.hero-video');
      if (heroVideo) {
        heroVideo.muted = true;
        
        const unmuteButton = document.createElement('button');
        unmuteButton.innerHTML = '<i class="fas fa-volume-mute"></i>';
        unmuteButton.className = 'unmute-button';
        unmuteButton.style.cssText = `
          position: absolute;
          bottom: 20px;
          right: 20px;
          z-index: 10;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: rgba(0,0,0,0.5);
          color: white;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        `;
        
        unmuteButton.addEventListener('click', () => {
          heroVideo.muted = !heroVideo.muted;
          unmuteButton.innerHTML = heroVideo.muted ? 
            '<i class="fas fa-volume-mute"></i>' : '<i class="fas fa-volume-up"></i>';
        });
        
        document.querySelector('.hero-section').appendChild(unmuteButton);
      }
    }
  }
  
  // Ejecutar cuando todo esté cargado
  window.addEventListener('load', function() {
    checkMobileFeatures();
    
    // Manejar cambio de orientación en móviles
    window.addEventListener('orientationchange', function() {
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });
  });