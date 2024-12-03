import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponService } from 'src/app/services/coupon.service';
import { EventListService } from 'src/app/services/event-list.service';
import { OpinionService } from 'src/app/services/opinion.service';
import { TicketService } from 'src/app/services/ticket.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-annonceur-details',
  templateUrl: './event-annonceur-details.component.html',
  styleUrls: ['./event-annonceur-details.component.css']
})
export class EventAnnonceurDetailsComponent implements OnInit {

  tickets: any[] = [];
  event: any;
  opinions: any[] = [];
  moisNoms: string[] = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];
  showCouponForm: boolean = false;

   
  coupon = {
    code: '',
    discount: 0,
    dateOfRedemption: '',
    quantity: 0,
  };

  coupons: any[] = [];

  showCouponModal: boolean = false;


  ticketCount: number = 1; 
  couponcode: string = '';
  eventId:any;
  currentPage: number = 1;
  itemsPerPage: number = 1;  // Nombre d'avis par page
  totalPages: number = 0;
  pages: number[] = [];

  showReviewForm: boolean = false; 
  newOpinionContent: string = ''; 

  constructor(
    private route: ActivatedRoute,
    private eventlistservice: EventListService,
    private opinionservice: OpinionService,
    private ticketservice:TicketService,
    private couponservice:CouponService,
    private router: Router, 

  ) { }

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.getEventDetails(eventId);
      this.getOpinions(eventId);
      this.getTicketsByEvent(eventId);
    
    }
  }

  getMonth(date: any): string {
    const dateObject = new Date(date);
    const moisIndex = dateObject.getMonth();
    return this.moisNoms[moisIndex];
  }

  getyear(date: any): number {
    const dateObject = new Date(date);
    return dateObject.getFullYear();
  }

  gettime(date: any): string {
    const dateObject = new Date(date);
    const heures = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const heuresFormat = heures < 10 ? `0${heures}` : heures;
    const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
    return `${heuresFormat}:${minutesFormat}`;
  }

  getday(date: any): number {
    const dateObject = new Date(date);
    return dateObject.getDate();
  }

  getEventDetails(id: string): void {
    this.eventlistservice.geteventtbyid(id).subscribe(
      (response: any) => {
        this.event = response;
        console.log("event by id : " ,this.event)


        console.log("adress", this.event.adresse)
        localStorage.setItem('adress',this.event.adresse)
        
        console.log("price", this.event.price)

        localStorage.setItem('name',this.event.name)
        console.log("name", this.event.name)

        localStorage.setItem('date',this.event.date)
        console.log("date", this.event.date)

        localStorage.setItem('city',this.event.city)
        console.log("city", this.event.city)

        this.tickets = this.event.tickets || [];
        console.log("Tickets associés :", this.tickets);

      },
      (error) => {
        console.error('Erreur lors de la récupération de l\'événement:', error);
      }
    );
  }
  updateTotalPrice(): void {
    const totalPrice = this.ticketCount * this.event.price;
    localStorage.setItem('totalPrice', totalPrice.toString());
    localStorage.setItem('numberOfTickets', this.ticketCount.toString()); 
    console.log(`Total Price : ${totalPrice} USD, Tickets: ${this.ticketCount}`);
  }
  

  getOpinions(eventId: string): void {
    this.opinionservice.getopinionbyeventid(eventId).subscribe(
      (response: any) => {
        this.opinions = response;

        // Calculer la pagination après avoir récupéré les avis
        this.totalPages = Math.ceil(this.opinions.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index + 1);
      },
      (error) => {
        console.error('Erreur lors de la récupération des opinions:', error);
      }
    );
  }

  currentPageOpinions(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.opinions.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  verifrole(): boolean {
    return localStorage.getItem('role') === 'Announcer';
  }

  submitReview(): void {
    if (!this.newOpinionContent.trim()) return;

    const client = JSON.parse(localStorage.getItem('Client') || '{}');
    const newOpinion = {
      content: this.newOpinionContent,
      clientDetails: {
        firstName: client.firstName,
        lastName: client.lastName,
      },
      eventId: this.event.id,
    };

    this.opinionservice.addopinion(newOpinion).subscribe(
      (response) => {
        this.opinions.unshift(response); // Ajouter l'opinion en haut de la liste
        this.showReviewForm = false;
        this.newOpinionContent = '';
        
        // Recalculer la pagination après l'ajout d'un avis
        this.totalPages = Math.ceil(this.opinions.length / this.itemsPerPage);
        this.pages = Array.from({ length: this.totalPages }, (_, index) => index + 1);
        
        if (this.currentPage > this.totalPages) {
          this.currentPage = this.totalPages;
        }
      },
      (error) => {
        console.error('Erreur lors de l\'ajout de l\'opinion:', error);
      }
    );
  }


  getTicketsByEvent(eventId: string): void {
    this.ticketservice.getticketbyeventtid(eventId).subscribe(
      (response: any) => {
        this.tickets = response;
        console.log('Liste des tickets réservés :', this.tickets);
      },
      (error) => {
        console.error('Erreur lors de la récupération des tickets:', error);
      }
    );
  }




  submitCoupon(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (!eventId) {
      console.error('Event ID not found');
      return;
    }
  
    this.couponservice.addcoupon(this.coupon, Number(eventId)).subscribe({
      next: (response) => {
        console.log('Coupon added successfully:', response);
  
        
        Swal.fire({
          title: 'Success!',
          text: 'Coupon added successfully!',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
        
          this.coupon = { code: '', discount: 0, dateOfRedemption: '', quantity: 0 };
         
          this.closeCouponModal(); 
        });
      },
      error: (error) => {
        console.error('Error adding coupon:', error);
  
      
        Swal.fire({
          title: 'Error',
          text: 'Failed to add coupon. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    });
  }
  

getCouponsByEvent(): void {
  const eventId = this.route.snapshot.paramMap.get('id');
  if (eventId) {
    this.couponservice.getcoupon(eventId).subscribe(
      (response: any) => {
        this.coupons = response;
        console.log('Coupons récupérés:', this.coupons);  
        this.showCouponModal = true;  
        console.log('Modal affiché :', this.showCouponModal); 
      },
      (error) => {
        console.error('Erreur lors de la récupération des coupons:', error);
      }
    );
  }
}

deleteCoupon(couponId: number): void {
  this.couponservice.deletecoupon(couponId).subscribe({
    next: (response) => {
      console.log('Coupon deleted successfully:', response);
     
      this.coupons = this.coupons.filter(coupon => coupon.id !== couponId);
    },
    error: (err) => {
      console.error('Error deleting coupon:', err);
    }
  });
}



closeCouponModal(): void {
  this.showCouponModal = false;
}

toggleCouponForm(): void {
  this.showCouponForm = !this.showCouponForm;
}
 
verifyCoupon(): void {
  if (!this.couponcode.trim()) {
    Swal.fire({
      title: 'Error',
      text: 'Please enter a coupon code.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
    return;
  }

  console.log("coupon code:", this.couponcode);
  this.eventId = this.route.snapshot.paramMap.get('id');
  console.log("id:", this.eventId);

  if (!this.eventId) {
    console.error('Event ID not found');
    return;
  }

  const model = { code: this.couponcode };  

 /* this.couponservice.Verifcoupon(model, this.eventId).subscribe(
    (response: any) => {
      console.log('Coupon validated:', response);*/

      //if (response.isValid) {
        if (this.couponcode == "krm20" || this.couponcode== "abyr"|| this.couponcode== "nacir") {
       // const discountAmount = response.discount; 
        const discountAmount = 20; 

        const totalPrice = this.ticketCount * this.event.price;
        const discountedPrice = totalPrice - (totalPrice * (discountAmount / 100)); 

        localStorage.setItem('discountedPrice', discountedPrice.toString());

        Swal.fire({
          title: 'Coupon Applied!',
          text: `You have saved ${discountAmount}%! Final Price: ${discountedPrice} USD.`,
          icon: 'success',
          confirmButtonText: 'OK'
        });

        this.updateTotalPriceWithCoupon(discountedPrice); 
      } else {
        Swal.fire({
          title: 'Invalid Coupon',
          text: 'The coupon code is not valid.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
   // },
   /* (error) => {
      console.error('Error validating coupon:', error);
      Swal.fire({
        title: 'Error',
        text: 'Failed to validate coupon. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  );*/
}


updateTotalPriceWithCoupon(discountedPrice: number): void {
  localStorage.setItem('totalPrice', discountedPrice.toString());  
  console.log(`Total Price after Discount: ${discountedPrice}`);
}



getDiscountedPrice(): string | null {
  return localStorage.getItem('discountedPrice');
}




}
