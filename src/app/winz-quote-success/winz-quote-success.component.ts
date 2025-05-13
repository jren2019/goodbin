import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winz-quote-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './winz-quote-success.component.html',
  styleUrls: ['./winz-quote-success.component.scss']
})
export class WinzQuoteSuccessComponent {
  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }
}
