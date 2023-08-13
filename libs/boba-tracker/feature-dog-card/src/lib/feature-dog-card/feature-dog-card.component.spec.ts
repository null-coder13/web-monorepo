import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeatureDogCardComponent } from './feature-dog-card.component';

describe('FeatureDogCardComponent', () => {
  let component: FeatureDogCardComponent;
  let fixture: ComponentFixture<FeatureDogCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeatureDogCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeatureDogCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
