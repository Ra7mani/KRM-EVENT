import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from 'src/app/services/request.service';
import { HashtagService } from 'src/app/services/hashtag.service';
import { CategoriesService } from 'src/app/services/categories.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {
  requestForm!: FormGroup;
  hashtags: any[] = []; 
  categories: any[] = [];

  constructor(
    private fb: FormBuilder,
    private requestService: RequestService,
    private hashtagService: HashtagService,
    private CategoriesService: CategoriesService,
  ) {}

  ngOnInit(): void {
    this.requestForm = this.fb.group({
      name: ['', Validators.required], 
      description: ['', Validators.required],
      date: ['', Validators.required], 
      city: ['', Validators.required],
      adresse: ['', Validators.required], 
      price: [0, [Validators.required, Validators.min(0)]], 
      capacity: [0, [Validators.required, Validators.min(1)]], 
      categoryId: [null, Validators.required], 
      hashtagsIds: [[], Validators.required], 
    });

    this.loadCategories();
    this.loadHashtags();
  }

  loadHashtags(): void {
    this.hashtagService.getallhashtags().subscribe(
      (response: any) => {
        this.hashtags = response; 
        console.log("Hashtags:", this.hashtags);
      }
    );
  }

  loadCategories(): void {
    this.CategoriesService.getallcategories().subscribe(
      (response: any) => {
        this.categories = response; 
        console.log("Categories:", this.categories);
      }
    );
  }

  addRequest(): void {
    if (this.requestForm.valid) {
      this.requestService.addrequest(this.requestForm.value).subscribe({
        error: (error) => {
          console.error('Error while adding request:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while sending your request.',
            confirmButtonText: 'OK',
          });
        }
      });

      Swal.fire({
        icon: 'success',
        title: 'Request Sent',
        text: 'Your request has been successfully sent.',
        confirmButtonText: 'OK',
      });

      this.requestForm.reset();
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Information',
        text: 'Please fill in all the required fields.',
        confirmButtonText: 'OK',
      });
    }
  }
}
 