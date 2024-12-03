import { Component, OnInit } from '@angular/core';
import { EventListService } from 'src/app/services/event-list.service';

@Component({
  selector: 'app-annonceur-list-events',
  templateUrl: './annonceur-list-events.component.html',
  styleUrls: ['./annonceur-list-events.component.css']
})
export class AnnonceurListEventsComponent implements OnInit {
  events: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 3;
  totalPages: number = 0;
  pages: number[] = [];
  moisNoms: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(private eventListService: EventListService) {}

  ngOnInit(): void {
    const storedData = JSON.parse(localStorage.getItem('decodedToken')!);
    const nameId = storedData.nameid;
    this.getAllEvents(nameId);
  }

  getAllEvents(nameId: string): void {
    this.eventListService.getalleventsbyannouncerid(nameId).subscribe(
      (response: any) => {
        this.events = response;
        this.calculatePagination();
      },
      (error) => {
        console.error('Error fetching events:', error);
      }
    );
  }

  getMonth(date: string): string {
    const dateObj = new Date(date);
    return this.moisNoms[dateObj.getMonth()];
  }

  getday(date: string): number {
    const dateObj = new Date(date);
    return dateObj.getDate();
  }

  calculatePagination(): void {
    this.totalPages = Math.ceil(this.events.length / this.itemsPerPage);
    this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  currentPageEvents(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.events.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }
}
