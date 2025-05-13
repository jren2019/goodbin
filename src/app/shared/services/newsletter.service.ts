import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {
  // A subject to track whether the modal should be shown
  private showModalSubject = new BehaviorSubject<boolean>(false);

  // Track whether the modal has already been shown in this session
  private modalShownBefore = false;

  // Track if the user has already subscribed or dismissed the modal
  private hasSubscribed = false;

  constructor() {
    // Check if user has previously subscribed
    const hasSubscribed = localStorage.getItem('newsletter_subscribed');
    if (hasSubscribed === 'true') {
      this.hasSubscribed = true;
    }
  }

  /**
   * Get an observable that indicates whether the modal should be shown
   */
  get showModal$(): Observable<boolean> {
    return this.showModalSubject.asObservable();
  }

  /**
   * Initialize exit intent detection for the newsletter modal
   */
  initExitIntentDetection(): void {
    // Only set up detection if user hasn't subscribed or seen the modal this session
    if (!this.hasSubscribed && !this.modalShownBefore) {
      document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }
  }

  /**
   * Handle mouse leave event (exit intent)
   */
  private handleMouseLeave(e: MouseEvent): void {
    // Only trigger if the mouse leaves from the top of the window
    if (e.clientY <= 0) {
      // Show the modal after a short delay (feels more natural)
      setTimeout(() => {
        this.showModalSubject.next(true);
        this.modalShownBefore = true;

        // Remove the event listener to prevent showing modal multiple times
        document.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
      }, 300);
    }
  }

  /**
   * Close the modal
   */
  closeModal(): void {
    this.showModalSubject.next(false);
  }

  /**
   * Mark the user as subscribed
   */
  markAsSubscribed(): void {
    this.hasSubscribed = true;
    localStorage.setItem('newsletter_subscribed', 'true');
    this.closeModal();
  }

  /**
   * Submit a newsletter subscription
   * In a real app, this would call an API endpoint
   */
  subscribeToNewsletter(email: string, options?: { updates?: boolean, offers?: boolean }): Promise<boolean> {
    return new Promise((resolve) => {
      // Simulate API call with a delay
      setTimeout(() => {
        console.log('Subscribing to newsletter with:', { email, options });

        // Mark as subscribed
        this.markAsSubscribed();

        // Simulate successful subscription
        resolve(true);
      }, 1500);
    });
  }
}
