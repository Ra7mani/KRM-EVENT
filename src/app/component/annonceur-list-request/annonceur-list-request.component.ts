import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-annonceur-list-request',
  templateUrl: './annonceur-list-request.component.html',
  styleUrls: ['./annonceur-list-request.component.css']
})
export class AnnonceurListRequestComponent implements OnInit {
  requests: any[] = []; 
  paginatedRequests: any[] = []; 
  currentPage: number = 1;
  itemsPerPage: number = 4; 

  constructor(private requestService: RequestService) {}

  ngOnInit(): void {
    const storedData = JSON.parse(localStorage.getItem('decodedToken')!); 
    const nameId = storedData.nameid;
    console.log('nameid:', nameId);

    this.getallrequest(nameId);
    
  }

  getallrequest(nameId: string): void {
    this.requestService.getallrequest(nameId).subscribe(
      (response: any[]) => {
        this.requests = response.map(request => ({
          ...request, 
          status: request.status ? 'Accepted' : 'En attente', 
          eventDTO: {
            ...request.eventDTO, 
            date: request.eventDTO.date.slice(0, 7) 
          }
        }));

        this.updatePaginatedRequests(); 
        console.log("Transformed requests:", this.requests);
      }
    );
  }

  deleteRequest(request: any): void {
    const requestId = request.id;  
    
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {

        this.requestService.deleterequest(requestId).subscribe(
          () => {
            this.requests = this.requests.filter(r => r.id !== requestId);
            this.updatePaginatedRequests();
            Swal.fire(
              'Deleted!',
              'The request has been deleted.',
              'success'
            );
            console.log(`Request with id ${requestId} deleted`);
          },
          (error) => {
            console.error('Error deleting request:', error);
            Swal.fire(
              'Error!',
              'There was a problem deleting the request.',
              'error'
            );
          }
        );
      }
    });
  }
  

  //pagination
  get totalPages(): number {
    return Math.ceil(this.requests.length / this.itemsPerPage);
  }

  updatePaginatedRequests(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedRequests = this.requests.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedRequests();
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedRequests();
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedRequests();
    }
  }
}
