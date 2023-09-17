import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DogService, Entry } from '@web-dev/shared/data-access'
import { Subscription } from 'rxjs';

@Component({
  selector: 'web-dev-feature-dog-card',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './feature-dog-card.component.html',
  styleUrls: ['./feature-dog-card.component.css'],
})
export class FeatureDogCardComponent implements OnInit, OnDestroy {
  @Input() name!: string;
  @Input() imgPath!: string;
  hasPeed = false;
  hasPooped = false;

  lastPoo: Entry | null = { dateTimeId: new Date(), hasPeed: false, hasPooped: false, name: '' }
  lastPee: Entry | null = { dateTimeId: new Date(), hasPeed: false, hasPooped: false, name: '' }

  lastEntry!: Entry;

  lastPeeSub!: Subscription;
  lastPooSub!: Subscription;
  postEntrySub!: Subscription;
  deleteEntrySub!: Subscription;


  constructor(private dogService: DogService) { }

  togglePeed() {
    this.hasPeed = !this.hasPeed;
  }

  togglePooped() {
    this.hasPooped = !this.hasPooped;
  }

  ngOnInit() {
    this.getLastPeeAndPoo();
  }

  ngOnDestroy() {
    if (this.lastPeeSub) this.lastPeeSub.unsubscribe();
    if (this.lastPooSub) this.lastPooSub.unsubscribe();
    if (this.postEntrySub) this.postEntrySub.unsubscribe();
    if (this.deleteEntrySub) this.deleteEntrySub.unsubscribe();
  }

  getLastPeeAndPoo() {
    this.lastPeeSub = this.dogService.getLastPeeForDog(this.name).subscribe({
      next: (entry: Entry) => {
        this.lastPee = entry
        this.lastPooSub = this.dogService.getLastPooForDog(this.name).subscribe({
          next: (entry: Entry) => {
            this.lastPoo = entry
            this.setLastEntry()
          },
          error: () => this.lastPoo = null
        });
      },
      error: () => this.lastPee = null
    })
  }

  setLastEntry() {
    if (this.lastPoo && this.lastPee) {
      if (this.lastPoo.dateTimeId < this.lastPee.dateTimeId) {
        this.lastEntry = this.lastPoo;
      } else {
        this.lastEntry = this.lastPee;
      }
    } else {
      if (this.lastPoo && !this.lastPee) {
        this.lastEntry = this.lastPoo;
      } else if (this.lastPee && !this.lastPoo) {
        this.lastEntry = this.lastPee;
      }
    }
  }

  submit() {
    if (!this.hasPooped && !this.hasPeed) return;

    const dateTimeId = new Date();

    this.postEntrySub = this.dogService.postEntry({
      dateTimeId,
      hasPeed: this.hasPeed,
      hasPooped: this.hasPooped,
      name: this.name
    }).subscribe(
      {
        next: (res: Entry) => {
          this.updateTimes(res);
        },
        error: () => console.log('error contacting server')
      });
  }

  updateTimes(entry: Entry) {
    if (this.hasPeed && this.hasPooped) {
      this.lastPee = entry;
      this.lastPoo = entry;
      this.togglePeed();
      this.togglePooped();
    } else if (this.hasPooped && !this.hasPeed) {
      this.lastPoo = entry;
      this.togglePooped();
    } else if (this.hasPeed && !this.hasPooped) {
      this.lastPee = entry;
      this.togglePeed();
    }
    this.lastEntry = entry;
  }

  deleteLastEntry() {
    if (!this.lastEntry) return;

    this.deleteEntrySub = this.dogService.deleteEntryById(this.lastEntry).subscribe({
      next: () => {
        this.getLastPeeAndPoo();
        this.setLastEntry();
      },
      error: (err: any) => console.log(err)
    });
  }
}
