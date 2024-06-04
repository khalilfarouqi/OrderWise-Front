import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DestinationsService } from '../service/destinations.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-tarif-page',
  templateUrl: './tarif-page.component.html',
  styleUrl: './tarif-page.component.css'
})
export class TarifPageComponent implements OnInit {
  destinations: any[] = [];
  searchQuery: string = '';
  filteredDestinations: any[] = [];

  pageSize: number = 10;
  currentPage: number = 1;

  constructor(private destinationsService: DestinationsService) {
  }

  ngOnInit(): void {
    this.getDestinations();
  }

  getDestinations() {
    this.destinationsService.getDestinationsUrl().subscribe(
      (data) => {
        this.destinations = data;
        this.filteredDestinations = data; 
      },
      (error) => {
        console.error('Error fetching destinations:', error);
      }
    );
  }
  
  filterData() {
    this.currentPage = 1; // Reset to first page when filtering
    this.filteredDestinations = this.destinations.filter(destination =>
      destination.city.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

}
