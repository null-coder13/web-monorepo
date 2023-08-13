import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'web-dev-feature-dog-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './feature-dog-card.component.html',
  styleUrls: ['./feature-dog-card.component.css'],
})
export class FeatureDogCardComponent {}
