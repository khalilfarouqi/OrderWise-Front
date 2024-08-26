import { Component, OnInit } from '@angular/core';
import { TeamMemberService } from '../service/team-member.service';
import Swal from 'sweetalert2';
import { TeamMemberProfilComponent } from '../team-member-profil/team-member-profil.component';
import { TeamMembers } from '../models/TeamMembers';
import { MatDialog } from '@angular/material/dialog';
import { UserType } from '../enum/userType.enum';

@Component({
  selector: 'app-team-member',
  templateUrl: './team-member.component.html',
  styleUrls: ['./team-member.component.css']
})
export class TeamMemberComponent implements OnInit {
  teamMembers: TeamMembers[] = [];
  teamMembersNull!: TeamMembers;
  isSidebarOpen = true;

  constructor(private teamMemberService: TeamMemberService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllTeamMembers();
  }

  onSidebarToggled(isOpen: boolean) {
    this.isSidebarOpen = isOpen;
  }

  getAllTeamMembers() {
    this.teamMemberService.getTeamMembersUrl().subscribe(
      (data) => {
        this.teamMembers = data;
      },
      (error) => {
        console.error('Error fetching team members:', error);
      }
    );
  }

  // Method to add a new team member
  addMember(form: any): void {
    // Add the new member to the teamMembers array
    this.teamMemberService.addNewMember(form).subscribe({
      next: (newMember) => {
        this.teamMembers.push(newMember);
        this.showAlert('Member added successfully!', '', 'success');
      },
      error: (error) => {
        console.error('Error adding new member:', error);
      }
    });
  }

  updateMember(form: any): void {
    // Update the existing member in the teamMembers array
    this.teamMemberService.updateMember(form).subscribe({
      next: (updatedMember) => {
        this.showAlert('Member updated successfully!', '', 'success');
      },
      error: (error) => {
        console.error('Error updating member:', error);
      }
    });
  }

  // Method to ban a team member
  banMember(form: any): void {
    const confirmed = confirm('Are you sure you want to ban this member?');
    if (confirmed) {
      form.user.userType = UserType.HOLD;
      this.updateMember(form);
    }
  }

  openModal(teamMember: TeamMembers | null): void {
    const dialogRef = this.dialog.open(TeamMemberProfilComponent, {
      width: '600px',
      data: { teamMember }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (teamMember) {
          this.updateMember(result);
        } else {
          this.addMember(result);
        }
        this.ngOnInit();
      }
    });
  }

  showAlert(title: string, text: string, icon: any) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
      confirmButtonText: 'OK'
    });
  }
}
