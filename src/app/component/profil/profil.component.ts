import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  userDetails: any = {}; 
  isEditing: boolean = false; 

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    const storedData = JSON.parse(localStorage.getItem('decodedToken')!);
    const nameId = storedData.nameid; 
    console.log(nameId);
    this.getDetailsById(nameId); 
  }

  private getDetailsById(id: string): void {
    this.accountService.detailsbyid(id).subscribe({
      next: (data) => {
        this.userDetails = Array.isArray(data) ? data[0] : data; 
        console.log('Détails utilisateur:', this.userDetails);
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des détails utilisateur :', err);
      },
    });
  }

  
  toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

 
  saveChanges(): void {
    this.accountService.update(this.userDetails).subscribe({
      next: (response) => {
        console.log('Mise à jour réussie:', response);
        this.isEditing = false; 
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour des détails utilisateur :', err);
      },
    });
  }
}
