import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketService } from 'src/app/services/ticket.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  adress:any;
  name:any;
  city:any;
  date:any;
  totalPrice:any;
  ticketCount:any;
  bookingForm: FormGroup;


    moisNoms: string[] = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ];

  model: any = {
    eventId: '',
    clientId: '',
    numberOfTickets: 0,
   totalPrice: 0,
    isUsedCouponCode: false,
    couponCodeId: 0,

    
  };


   
constructor( private ticketservice: TicketService,
  private route: ActivatedRoute,
  private router:Router,
  private fb: FormBuilder


){
  this.bookingForm = this.fb.group({
    address: ['', [Validators.required, Validators.minLength(5)]],
    city: ['', Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
    creditCard: ['', Validators.required],
    cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
    month: ['', Validators.required],
    year: ['', Validators.required],
    csc: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
  });
  
}



  ngOnInit(): void {


    this.totalPrice = localStorage.getItem('totalPrice');
    console.log("totalPrice : " , this.totalPrice);

    this.adress = localStorage.getItem('adress');
    console.log("adresse : " , this.adress);

    this.name = localStorage.getItem('name');
    console.log("name : " , this.name);

    this.city = localStorage.getItem('city');
    console.log("city : " , this.city);

    this.date = localStorage.getItem('date');
    console.log("date : " , this.date);
    
    this.ticketCount = localStorage.getItem('numberOfTickets');
    console.log("ticketCount : " , this.ticketCount);



    const eventId = this.route.snapshot.paramMap.get('id');
    if (!eventId) {
      alert('ID de l\'événement manquant. Redirection vers la page d\'accueil...');
      this.router.navigate(['/home']);
      return;
    }

    console.log("evntid ", eventId )


      
      const decodedToken = JSON.parse(localStorage.getItem('decodedToken') || '{}');
      const clientId = decodedToken.nameid;
      if (!clientId) {
        alert('Utilisateur non identifié. Veuillez vous reconnecter.');
        this.router.navigate(['/login']);
        return;
      }
  
      console.log('Client ID :', clientId);


    this.model.eventId = eventId;
    this.model.clientId = clientId;
    this.model.numberOfTickets = this.ticketCount;
  this.model.totalPrice=this.totalPrice


  }


 
  bookTickets(): void {
    
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
     
      return; 
    }
  
    //if (!this.model.clientId || !this.model.eventId || this.model.numberOfTickets <= 0) {

    if ((!this.model.clientId || !this.model.eventId || this.model.numberOfTickets <= 0)) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Details',
        text: 'Please ensure all booking details are complete.'
      });
      return; 
    }
  
    
    this.ticketservice.addticket(this.model).subscribe({
      next: (response) => {
        console.log('Ticket booked successfully', response);
        Swal.fire({
          icon: 'success',
          title: 'Booking Confirmed!',
          text: 'Your tickets have been successfully booked!',
          confirmButtonText: 'OK'
        });
      },
      error: (err) => {
        console.error('Error booking ticket', err);
        Swal.fire({
          icon: 'error',
          title: 'Booking Failed',
          text: 'An error occurred during the booking process. Please try again later.'
        });
      }
    });
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
  
  
}
