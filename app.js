
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(255, 255, 255, 0.98)';
                nav.style.boxShadow = '0 5px 30px rgba(0,0,0,0.15)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.95)';
                nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
        });

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBars = entry.target.querySelectorAll('.skill-progress');
                    skillBars.forEach(bar => {
                        bar.style.width = bar.style.width || '0%';
                    });
                }
            });
        }, observerOptions);

        document.querySelectorAll('.skill-category').forEach(category => {
            observer.observe(category);
        });

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.transitionDelay = `${index * 0.1}s`;
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.project-card, .education-card, .cert-card, .timeline-content').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            cardObserver.observe(card);
        });

        const navLinks = document.querySelector('.nav-links');
        const hamburger = document.createElement('div');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.className = 'hamburger';
        hamburger.style.cssText = `
            display: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #333;
            @media (max-width: 768px) { display: block; }
        `;
        
        document.querySelector('.container').appendChild(hamburger);

        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
        });

        function animateCounters() {
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.floor(current) + '+';
                        setTimeout(updateCounter, 20);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                updateCounter();
            });
        }

        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const speed = scrolled * 0.5;
            hero.style.transform = `translateY(${speed}px)`;
        });
    
        function typeWriter(element, text, speed = 100) {
            let i = 0;
            element.innerHTML = '';
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                }
            }
            type();
        }

        window.addEventListener('load', () => {
            const introText = document.querySelector('.hero p');
            if (introText) {
                typeWriter(introText, introText.textContent, 50);
            }
        });
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            const scrollPos = window.scrollY + 200;

            sections.forEach(section => {
                if (scrollPos >= section.offsetTop) {
                    current = section.getAttribute('id');
                }
            });

            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });