import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamMemberProfilComponent } from './team-member-profil.component';

describe('TeamMemberProfilComponent', () => {
  let component: TeamMemberProfilComponent;
  let fixture: ComponentFixture<TeamMemberProfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TeamMemberProfilComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeamMemberProfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
