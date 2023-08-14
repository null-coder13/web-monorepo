import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'web-dev-feature-dog-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './feature-dog-card.component.html',
  styleUrls: ['./feature-dog-card.component.css'],
})
export class FeatureDogCardComponent {
  peed = false;
  pooped = false;

  togglePeed() {
    this.peed = !this.peed;
  }

  togglePooped() {
    this.pooped = !this.pooped;
  }
}

//TODO: Add edit button to top right
