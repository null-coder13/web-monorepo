import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FeatureDogCardComponent } from '@web-dev/boba-tracker/feature-dog-card';

@Component({
  standalone: true,
  imports: [RouterModule, FeatureDogCardComponent],
  selector: 'web-dev-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'boba-tracker';
}
