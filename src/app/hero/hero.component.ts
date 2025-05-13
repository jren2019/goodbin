import { Component, OnInit, OnDestroy, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AddressDialogComponent } from '../address-dialog/address-dialog.component';
import { WinzDialogComponent } from '../winz-dialog/winz-dialog.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterModule, AddressDialogComponent, WinzDialogComponent],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit, AfterViewInit, OnDestroy {
  showAddressDialog = false;
  showWinzDialog = false;
  private particleInterval: any;
  private resizeHandler: any;
  private scrollHandler: any;
  private touchStartY = 0;
  private parallaxHandler: any;
  private sparkleInterval: any;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.initializeCustomDropdowns();
    }, 0);
  }

  ngAfterViewInit(): void {
    this.initParticles();
    this.initCTACardClickHandler();
    this.initTouchEvents();
    this.initScrollHandler();
    this.addResizeHandler();
    this.initParallaxEffect();
    this.initSparkleEffect();
  }

  ngOnDestroy(): void {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }

    if (this.sparkleInterval) {
      clearInterval(this.sparkleInterval);
    }

    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }

    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
    }

    if (this.parallaxHandler) {
      window.removeEventListener('scroll', this.parallaxHandler);
      window.removeEventListener('mousemove', this.parallaxHandler);
    }
  }

  private initParticles(): void {
    const particlesContainer = document.getElementById('particles-container');
    if (!particlesContainer) return;

    this.particleInterval = setInterval(() => {
      this.createParticle(particlesContainer);
    }, 200);

    for (let i = 0; i < 15; i++) {
      this.createParticle(particlesContainer);
    }
  }

  private createParticle(container: HTMLElement): void {
    const particle = this.renderer.createElement('div');
    this.renderer.addClass(particle, 'particle');

    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const opacity = Math.random() * 0.3 + 0.1;
    const duration = Math.random() * 15 + 10;
    const travelX = (Math.random() - 0.5) * 200;
    const travelY = (Math.random() * -100) - 50;

    this.renderer.setStyle(particle, 'width', `${size}px`);
    this.renderer.setStyle(particle, 'height', `${size}px`);
    this.renderer.setStyle(particle, 'left', `${posX}%`);
    this.renderer.setStyle(particle, 'bottom', `${posY}%`);
    this.renderer.setStyle(particle, '--duration', `${duration}s`);
    this.renderer.setStyle(particle, '--opacity', `${opacity}`);
    this.renderer.setStyle(particle, '--travel-x', `${travelX}px`);
    this.renderer.setStyle(particle, '--travel-y', `${travelY}px`);

    this.renderer.appendChild(container, particle);

    setTimeout(() => {
      if (container.contains(particle)) {
        this.renderer.removeChild(container, particle);
      }
    }, duration * 1000);
  }

  private initCTACardClickHandler(): void {
    const ctaCard = document.getElementById('ctaCard');
    if (!ctaCard) return;

    ctaCard.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).closest('a')) return;

      ctaCard.classList.remove('floating');
      ctaCard.classList.add('clicked');

      setTimeout(() => {
        ctaCard.classList.remove('clicked');
        ctaCard.classList.add('floating');
      }, 500);
    });
  }

  private initTouchEvents(): void {
    const heroElement = this.el.nativeElement.querySelector('.hero');
    if (!heroElement) return;

    heroElement.addEventListener('touchstart', (e: TouchEvent) => {
      this.touchStartY = e.touches[0].clientY;
    });

    heroElement.addEventListener('touchmove', (e: TouchEvent) => {
      const touchY = e.touches[0].clientY;
      const diff = this.touchStartY - touchY;

      if (diff > 50) {
        window.scrollTo({
          top: heroElement.offsetHeight,
          behavior: 'smooth'
        });
      }
    });
  }

  private initScrollHandler(): void {
    const scrollIndicator = this.el.nativeElement.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    this.scrollHandler = () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    };

    window.addEventListener('scroll', this.scrollHandler);
  }

  private addResizeHandler(): void {
    this.resizeHandler = () => {
      const isMobile = window.innerWidth < 768;
      const particlesContainer = document.getElementById('particles-container');

      if (particlesContainer) {
        if (isMobile) {
          clearInterval(this.particleInterval);
          this.particleInterval = setInterval(() => {
            this.createParticle(particlesContainer);
          }, 500);
        } else {
          clearInterval(this.particleInterval);
          this.particleInterval = setInterval(() => {
            this.createParticle(particlesContainer);
          }, 200);
        }
      }
    };

    window.addEventListener('resize', this.resizeHandler);
    this.resizeHandler();
  }

  openAddressDialog() {
    this.showAddressDialog = true;
    this.toggleCtaCardVisibility(false);
  }

  openWinzDialog() {
    this.showWinzDialog = true;
    this.toggleCtaCardVisibility(false);
  }

  handleBookingDataSubmitted(bookingData: any) {
    console.log('Booking data submitted:', bookingData);
    this.router.navigate(['/shop'], {
      queryParams: {
        address: bookingData.address,
        wasteType: bookingData.wasteType,
        binSize: bookingData.binSize,
        deliveryDate: bookingData.deliveryDate,
        hirePeriod: bookingData.hirePeriod,
        extraDays: bookingData.extraDays || '0',
        specialInstructions: bookingData.specialInstructions || ''
      }
    });
    this.toggleCtaCardVisibility(true);
  }

  handleWinzQuoteSubmitted(quoteData: any) {
    console.log('WINZ Quote submitted:', quoteData);
    this.router.navigate(['/winz-quote-submitted-successfully']);
    this.toggleCtaCardVisibility(true);
  }

  handleDialogOpenChange(isOpen: boolean) {
    this.toggleCtaCardVisibility(!isOpen);
  }

  private toggleCtaCardVisibility(show: boolean) {
    const ctaCard = document.getElementById('ctaCard');
    if (ctaCard) {
      if (show) {
        this.renderer.removeClass(ctaCard, 'hidden');
        setTimeout(() => {
          this.renderer.removeClass(ctaCard, 'fade-out');
          this.renderer.addClass(ctaCard, 'fade-in');
        }, 10);
      } else {
        this.renderer.addClass(ctaCard, 'fade-out');
        this.renderer.removeClass(ctaCard, 'fade-in');
        setTimeout(() => {
          this.renderer.addClass(ctaCard, 'hidden');
        }, 300);
      }
    }
  }

  initializeCustomDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown-with-icons') as NodeListOf<HTMLElement>;
    const quotationCard = document.querySelector('.quotation-card') as HTMLElement;

    if (!dropdowns.length) return;

    let supportsHasSelector = false;
    try {
      supportsHasSelector = CSS && CSS.supports && CSS.supports('selector(:has(div))');
    } catch (e) {
      supportsHasSelector = false;
    }

    dropdowns.forEach(dropdown => {
      const options = dropdown.querySelectorAll('.dropdown-option') as NodeListOf<HTMLElement>;
      const hiddenSelect = dropdown.querySelector('.hidden-select') as HTMLSelectElement;

      if (!options.length || !hiddenSelect) return;

      dropdown.addEventListener('click', (e) => {
        e.stopPropagation();

        dropdowns.forEach(d => {
          if (d !== dropdown) {
            d.classList.remove('open');
          }
        });

        const wasOpen = dropdown.classList.contains('open');
        dropdown.classList.toggle('open');

        if (!supportsHasSelector && quotationCard) {
          if (!wasOpen) {
            quotationCard.style.zIndex = '9990';
          } else {
            const anyOpen = Array.from(dropdowns).some(d => d.classList.contains('open'));
            if (!anyOpen) {
              quotationCard.style.zIndex = '1';
            }
          }
        }
      });

      options.forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();

          const value = option.getAttribute('data-value');
          if (value) {
            hiddenSelect.value = value;

            const selectValue = dropdown.querySelector('.select-value') as HTMLElement;
            if (selectValue) {
              selectValue.innerHTML = option.innerHTML;
            }

            options.forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            dropdown.classList.remove('open');

            if (!supportsHasSelector && quotationCard) {
              const anyOpen = Array.from(dropdowns).some(d => d.classList.contains('open'));
              if (!anyOpen) {
                quotationCard.style.zIndex = '1';
              }
            }

            const event = new Event('change', { bubbles: true });
            hiddenSelect.dispatchEvent(event);
          }
        });
      });
    });

    document.addEventListener('click', () => {
      const wasAnyOpen = Array.from(dropdowns).some(d => d.classList.contains('open'));

      dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
      });

      if (!supportsHasSelector && quotationCard && wasAnyOpen) {
        quotationCard.style.zIndex = '1';
      }
    });
  }

  private initParallaxEffect(): void {
    const layer1 = this.el.nativeElement.querySelector('.layer-1');
    const layer2 = this.el.nativeElement.querySelector('.layer-2');
    const layer3 = this.el.nativeElement.querySelector('.layer-3');
    const heroElement = this.el.nativeElement.querySelector('.hero');

    if (!layer1 || !layer2 || !layer3 || !heroElement) return;

    const handleMouseMove = (e: MouseEvent) => {
      const heroRect = heroElement.getBoundingClientRect();

      if (
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right &&
        e.clientY >= heroRect.top &&
        e.clientY <= heroRect.bottom
      ) {
        const x = (e.clientX - heroRect.left) / heroRect.width - 0.5;
        const y = (e.clientY - heroRect.top) / heroRect.height - 0.5;

        requestAnimationFrame(() => {
          if (layer1) layer1.style.transform = `translate(${x * -15}px, ${y * -15}px) scale(1.05)`;
          if (layer2) layer2.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
          if (layer3) layer3.style.transform = `translate(${x * -5}px, ${y * -5}px)`;
        });
      }
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const heroHeight = heroElement.offsetHeight;

      if (scrollY <= heroHeight) {
        const scrollProgress = scrollY / heroHeight;

        requestAnimationFrame(() => {
          if (layer1) layer1.style.transform = `translateY(${scrollProgress * 50}px) scale(${1 + scrollProgress * 0.05})`;
          if (layer2) layer2.style.transform = `translateY(${scrollProgress * 30}px)`;
          if (layer3) layer3.style.transform = `translateY(${scrollProgress * 20}px)`;
        });
      }
    };

    this.parallaxHandler = (e: Event) => {
      if (e.type === 'mousemove') {
        handleMouseMove(e as MouseEvent);
      } else if (e.type === 'scroll') {
        handleScroll();
      }
    };

    window.addEventListener('mousemove', this.parallaxHandler);
    window.addEventListener('scroll', this.parallaxHandler);

    handleScroll();
  }

  private initSparkleEffect(): void {
    const ctaCard = document.getElementById('ctaCard');
    if (!ctaCard) return;

    // Add an inner sparkle container
    const sparkleContainer = this.renderer.createElement('div');
    this.renderer.addClass(sparkleContainer, 'sparkle-container');
    this.renderer.setStyle(sparkleContainer, 'position', 'absolute');
    this.renderer.setStyle(sparkleContainer, 'inset', '-30px');
    this.renderer.setStyle(sparkleContainer, 'overflow', 'hidden');
    this.renderer.setStyle(sparkleContainer, 'pointer-events', 'none');
    this.renderer.setStyle(sparkleContainer, 'z-index', '1');
    this.renderer.appendChild(ctaCard, sparkleContainer);

    const createSparkle = () => {
      // Only create sparkles when card is visible
      if (ctaCard.classList.contains('hidden') || ctaCard.classList.contains('fade-out')) {
        return;
      }

      const sparkle = this.renderer.createElement('div');

      // Random position around the card
      const posX = Math.random() * 140 - 20; // -20% to 120%
      const posY = Math.random() * 140 - 20; // -20% to 120%

      // Create sparkle with random properties
      const size = Math.random() * 8 + 2;
      const opacity = Math.random() * 0.6 + 0.2;
      const duration = Math.random() * 2 + 1;

      this.renderer.setStyle(sparkle, 'position', 'absolute');
      this.renderer.setStyle(sparkle, 'width', `${size}px`);
      this.renderer.setStyle(sparkle, 'height', `${size}px`);
      this.renderer.setStyle(sparkle, 'left', `${posX}%`);
      this.renderer.setStyle(sparkle, 'top', `${posY}%`);
      this.renderer.setStyle(sparkle, 'background-color', 'rgba(255, 255, 255, 0.8)');
      this.renderer.setStyle(sparkle, 'border-radius', '50%');
      this.renderer.setStyle(sparkle, 'box-shadow', '0 0 8px rgba(255, 255, 255, 0.8)');
      this.renderer.setStyle(sparkle, 'opacity', '0');
      this.renderer.setStyle(sparkle, 'animation', `sparkle-fade ${duration}s ease-in-out`);

      this.renderer.appendChild(sparkleContainer, sparkle);

      // Remove sparkle after animation is done
      setTimeout(() => {
        if (sparkleContainer.contains(sparkle)) {
          this.renderer.removeChild(sparkleContainer, sparkle);
        }
      }, duration * 1000);
    };

    // Create custom keyframes for sparkle animation
    const style = this.renderer.createElement('style');
    this.renderer.setAttribute(style, 'type', 'text/css');
    const css = `
      @keyframes sparkle-fade {
        0% { transform: scale(0); opacity: 0; }
        25% { opacity: ${Math.random() * 0.6 + 0.4}; }
        50% { transform: scale(1.2); opacity: ${Math.random() * 0.8 + 0.2}; }
        100% { transform: scale(0); opacity: 0; }
      }
    `;
    this.renderer.appendChild(style, this.renderer.createText(css));
    this.renderer.appendChild(document.head, style);

    // Create sparkles at random intervals
    this.sparkleInterval = setInterval(() => {
      // Generate 1-3 sparkles at a time
      const count = Math.floor(Math.random() * 3) + 1;
      for (let i = 0; i < count; i++) {
        createSparkle();
      }
    }, 300);

    // Add 3D perspective effect on hover
    ctaCard.addEventListener('mousemove', (e: MouseEvent) => {
      const rect = ctaCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;

      // Calculate rotation based on cursor position
      const tiltX = (y - 0.5) * 10; // Tilt -5 to 5 degrees
      const tiltY = (x - 0.5) * -10; // Tilt -5 to 5 degrees

      this.renderer.setStyle(ctaCard, 'transform', `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.05)`);
    });

    // Reset transform on mouse leave
    ctaCard.addEventListener('mouseleave', () => {
      this.renderer.removeStyle(ctaCard, 'transform');
      this.renderer.addClass(ctaCard, 'floating');
    });
  }
}
