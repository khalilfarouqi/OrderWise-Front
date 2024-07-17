import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DestinationsService } from '../service/destinations.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tarif-page',
  templateUrl: './tarif-page.component.html',
  styleUrls: ['./tarif-page.component.css']
})
export class TarifPageComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['city', 'shippingCost', 'deliveryDays'];
  dataSource = new MatTableDataSource<any>();
  searchQuery: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private destinationsService: DestinationsService) { }

  ngOnInit(): void {
    this.getDestinations();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getDestinations() {
    this.destinationsService.getDestinationsUrl().subscribe(
      (data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching destinations:', error);
      }
    );
  }

  filterData() {
    this.dataSource.filter = this.searchQuery.trim().toLowerCase();
  }
}
