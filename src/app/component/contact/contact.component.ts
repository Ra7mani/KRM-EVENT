import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from 'src/app/services/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent  implements OnInit{

  contactform!:FormGroup;

  constructor(private service:ContactService , private fb:FormBuilder ){}
  ngOnInit(): void {
      this.contactform=this.fb.group({
        content:['',Validators.required],
        
      
      
      
      });

  }

  get content(){
    return this.contactform.get('content')
  }
  addcontact(){
    this.service.addcontact(this.contactform.value).subscribe( 
      response => {

        console.log("contact added",response);
        this.contactform.reset();
        Swal.fire({
          icon: 'success',
        title: 'Message Sent',
        text: 'Your message has been successfully sent.',
        confirmButtonText: 'OK',
        });

      },
      error=>{
        console.error('error',error);
      }
      
    );

        


  }



}
