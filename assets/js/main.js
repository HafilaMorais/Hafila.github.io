/*
	ZeroFour by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
	
	// Smooth scrolling for anchor links
	const anchorLinks = document.querySelectorAll('a[href^="#"]');
	anchorLinks.forEach(link => {
		link.addEventListener('click', function(e) {
			e.preventDefault();
			const targetId = this.getAttribute('href');
			const targetSection = document.querySelector(targetId);
			
			if (targetSection) {
				targetSection.scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				});
			}
		});
	});

	// Intersection Observer for animations
	const observerOptions = {
		threshold: 0.1,
		rootMargin: '0px 0px -50px 0px'
	};

	const observer = new IntersectionObserver(function(entries) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.style.opacity = '1';
				entry.target.style.transform = 'translateY(0)';
			}
		});
	}, observerOptions);

	// Observe all cards and sections
	const animatedElements = document.querySelectorAll('.education-card, .project-card, .contact-item');
	animatedElements.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = 'translateY(30px)';
		el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
		observer.observe(el);
	});

	// Parallax effect for hero background
	const heroBackground = document.querySelector('.hero-background');
	if (heroBackground) {
		window.addEventListener('scroll', function() {
			const scrolled = window.pageYOffset;
			const rate = scrolled * -0.5;
			heroBackground.style.transform = `translateY(${rate}px)`;
		});
	}

	// Add hover effects to project cards
	const projectCards = document.querySelectorAll('.project-card');
	projectCards.forEach(card => {
		card.addEventListener('mouseenter', function() {
			this.style.transform = 'translateY(-10px) scale(1.02)';
		});
		
		card.addEventListener('mouseleave', function() {
			this.style.transform = 'translateY(0) scale(1)';
		});
	});

	// Rotating text effect for hero subtitle
	const heroSubtitle = document.querySelector('.hero-subtitle');
	if (heroSubtitle) {
		const titles = [
			"Data Scientist",
			"Data Analyst", 
			"Business Analyst",
			"Machine Learning Engineer",
			"Research Assistant",
			"Analytics Specialist",
			"Predictive Modeler",
			"Business Intelligence Analyst",
			"Statistical Analyst",
			"Data Engineer"
		];
		
		let currentTitleIndex = 0;
		let currentCharIndex = 0;
		let isDeleting = false;
		
		const typeWriter = () => {
			const currentTitle = titles[currentTitleIndex];
			
			if (isDeleting) {
				// Delete characters
				heroSubtitle.textContent = currentTitle.substring(0, currentCharIndex - 1);
				currentCharIndex--;
			} else {
				// Type characters
				heroSubtitle.textContent = currentTitle.substring(0, currentCharIndex + 1);
				currentCharIndex++;
			}
			
			// Set typing speed
			let typeSpeed = isDeleting ? 50 : 100;
			
			// Add extra pause at the end of typing
			if (!isDeleting && currentCharIndex === currentTitle.length) {
				typeSpeed = 2000; // Pause for 2 seconds
				isDeleting = true;
			} else if (isDeleting && currentCharIndex === 0) {
				isDeleting = false;
				currentTitleIndex = (currentTitleIndex + 1) % titles.length;
				typeSpeed = 500; // Pause before starting next title
			}
			
			setTimeout(typeWriter, typeSpeed);
		};
		
		// Start the rotating text effect after a short delay
		setTimeout(typeWriter, 1000);
	}

	// Add loading animation
	window.addEventListener('load', function() {
		document.body.classList.remove('is-preload');
		
		// Ensure main content is visible
		const mainContent = document.querySelector('#main');
		if (mainContent) {
			mainContent.style.opacity = '1';
			mainContent.style.visibility = 'visible';
		}
	});

	// Scroll to top functionality
	const scrollToTopBtn = document.createElement('button');
	scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
	scrollToTopBtn.className = 'scroll-to-top';
	scrollToTopBtn.style.cssText = `
		position: fixed;
		bottom: 20px;
		right: 20px;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		color: white;
		border: none;
		cursor: pointer;
		opacity: 0;
		visibility: hidden;
		transition: all 0.3s ease;
		z-index: 1000;
		box-shadow: 0 4px 12px rgba(0,0,0,0.15);
	`;
	
	document.body.appendChild(scrollToTopBtn);

	// Show/hide scroll to top button
	window.addEventListener('scroll', function() {
		if (window.pageYOffset > 300) {
			scrollToTopBtn.style.opacity = '1';
			scrollToTopBtn.style.visibility = 'visible';
		} else {
			scrollToTopBtn.style.opacity = '0';
			scrollToTopBtn.style.visibility = 'hidden';
		}
	});

	// Scroll to top functionality
	scrollToTopBtn.addEventListener('click', function() {
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	// Add hover effect to scroll to top button
	scrollToTopBtn.addEventListener('mouseenter', function() {
		this.style.transform = 'translateY(-2px) scale(1.1)';
	});
	
	scrollToTopBtn.addEventListener('mouseleave', function() {
		this.style.transform = 'translateY(0) scale(1)';
	});

	// Add CSS for scroll to top button
	const style = document.createElement('style');
	style.textContent = `
		.scroll-to-top:hover {
			box-shadow: 0 6px 20px rgba(0,0,0,0.25) !important;
		}
		
		@media (max-width: 768px) {
			.scroll-to-top {
				bottom: 15px !important;
				right: 15px !important;
				width: 45px !important;
				height: 45px !important;
			}
		}
	`;
	document.head.appendChild(style);

	// Add active state to navigation links
	const sections = document.querySelectorAll('section[id]');
	const navLinks = document.querySelectorAll('a[href^="#"]');
	
	window.addEventListener('scroll', function() {
		let current = '';
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.clientHeight;
			if (window.pageYOffset >= sectionTop - 200) {
				current = section.getAttribute('id');
			}
		});
		
		navLinks.forEach(link => {
			link.classList.remove('active');
			if (link.getAttribute('href') === `#${current}`) {
				link.classList.add('active');
			}
		});
	});

	// Ensure all images are visible (no loading animation)
	const allImages = document.querySelectorAll('img');
	allImages.forEach(img => {
		img.style.opacity = '1';
		img.style.visibility = 'visible';
	});

	// Add click effect to buttons
	const buttons = document.querySelectorAll('.btn');
	buttons.forEach(button => {
		button.addEventListener('click', function(e) {
			const ripple = document.createElement('span');
			const rect = this.getBoundingClientRect();
			const size = Math.max(rect.width, rect.height);
			const x = e.clientX - rect.left - size / 2;
			const y = e.clientY - rect.top - size / 2;
			
			ripple.style.cssText = `
				position: absolute;
				width: ${size}px;
				height: ${size}px;
				left: ${x}px;
				top: ${y}px;
				background: rgba(255,255,255,0.3);
				border-radius: 50%;
				transform: scale(0);
				animation: ripple 0.6s linear;
				pointer-events: none;
			`;
			
			this.appendChild(ripple);
			
			setTimeout(() => {
				ripple.remove();
			}, 600);
		});
	});

	// Add ripple animation CSS
	const rippleStyle = document.createElement('style');
	rippleStyle.textContent = `
		@keyframes ripple {
			to {
				transform: scale(4);
				opacity: 0;
			}
		}
		
		.btn {
			position: relative;
			overflow: hidden;
		}
	`;
	document.head.appendChild(rippleStyle);

	console.log('Portfolio enhanced with modern JavaScript! 🚀');
});