import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTeamComponent } from './generate-team.component';

describe('GenerateTeamComponent', () => {
  let component: GenerateTeamComponent;
  let fixture: ComponentFixture<GenerateTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenerateTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
