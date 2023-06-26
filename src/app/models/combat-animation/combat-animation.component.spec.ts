import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombatAnimationComponent } from './combat-animation.component';

describe('CombatAnimationComponent', () => {
  let component: CombatAnimationComponent;
  let fixture: ComponentFixture<CombatAnimationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombatAnimationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CombatAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
