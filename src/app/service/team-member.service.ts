import { Injectable } from '@angular/core';
import { ApiConfigService } from './api-config-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TeamMemberService {
  private apiUrl: string;

  constructor(private http: HttpClient, private apiConfig: ApiConfigService) {
    this.apiUrl = this.apiConfig.getTeamMembersUrl();
  }

  getTeamMembersUrl(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/getAll');
  }

  addNewMember(newMember: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-member`, newMember);
  }

  updateMember(updatedMember: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update-member`, updatedMember);
  }

  banMember(memberId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/banMember/${memberId}`, { role: 'reject' });
  }
}
