import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { EventListService } from 'src/app/services/event-list.service';
import { FavorisService } from 'src/app/services/favoris.service';
import { FollowService } from 'src/app/services/follow.service';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  categories: any[] = [];
  paginatedEvents: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4; // Nombre d'éléments par page
  moisNoms: string[] = [
    'jan', 'fév', 'mars', 'avr', 'mai', 'juin',
    'juil', 'août', 'sept', 'oct', 'nov', 'déc'
  ];
  selectedCategory: any = null;
  favoriteEvents: Set<number> = new Set(); // Set pour stocker les événements favoris
  showFavorites: boolean = false; // Variable pour basculer entre tous les événements et les favoris
  favorislist: any[] = [];

  //view profil
  announcerdetails:any = {};
  requestdetails:any;
  idrequest:any;
  eventdetails:any;
 isfollow:any;
 nbrfollowers:any
  constructor(private eventservice: EventListService,
    private CategoriesService: CategoriesService,private router: Router,
    private favorisservice: FavorisService,private service : FollowService ,private serviceaccount : AccountService ,  
          private route: ActivatedRoute,
    private serviceevent : EventListService , private servicerequest : RequestService) {}

  ngOnInit(): void {
    this.getEvents();
    this.loadCategories();
    this.chargerfavoris();
   // this.loadFavorites();  // Charger les favoris à l'initialisation
   // view profil modification 
   this.getprofileinfo();  
    this.getrequestid();
    this.getannouncerid();
    this.getfollowers();
  }
  openModal(id: string) {
    console.log("display id",id);
    localStorage.setItem("EVENT-ID",id);
    this.router.navigate([], {
      queryParams: { id: id },
      queryParamsHandling: 'merge', 
    });
  }
  // view profile modification 
  getrequestid(){
    const eventId =localStorage.getItem("EVENT-ID");
    this.serviceevent.geteventtbyid(eventId).subscribe(
      (res:any)=>{
        this.eventdetails=res;
        this.idrequest=this.eventdetails.eventRequestId;
        console.log("id request : ",this.idrequest);
        localStorage.setItem("idreq",this.idrequest);
        console.log("event details : ",this.eventdetails);
      }
    )
  }
  getannouncerid(){
    const idreq =localStorage.getItem("idreq");
    this.servicerequest.getrequestbyid(idreq).subscribe(
      (res:any)=>{
        this.requestdetails=res;
        const announcerid = localStorage.setItem("idannouncer",this.requestdetails.announcerId);
        console.log("announcer id: ",this.requestdetails.announcerId);
  
        console.log("request details: ",this.requestdetails);
  
      }
    )
  }
  getprofileinfo(){
    const idann= localStorage.getItem("idannouncer");
    this.serviceaccount.detailsbyid(idann).subscribe(
      (res:any)=>{
        this.announcerdetails=res;
        console.log("announcer details : ",this.announcerdetails);
      }
    )
  }
  getfollowers(){
    console.log("hello")
    const idann= localStorage.getItem("idannouncer");
    this.service.getfollowers(idann).subscribe(
      (res:any)=>{
        if (res.length === 0) {
          this.nbrfollowers = 0; 
        } else {
          this.nbrfollowers = res.length; 
        }
        
  
        console.log("followers",this.nbrfollowers)
        //console.log("followers",this.nbrfollowers.length)
      }
    )
  }
 


  // Charger les catégories
  loadCategories(): void {
    this.CategoriesService.getallcategories().subscribe(
      (response: any) => {
        this.categories = response;
        console.log("Categories:", this.categories);
      }
    );
  }

  // Charger les favoris depuis l'API et les localStorage
  loadFavorites(): void {
    // Vérifier si des favoris sont stockés dans localStorage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      this.favoriteEvents = new Set(JSON.parse(storedFavorites));  // Charger les favoris depuis localStorage
      console.log('Favoris chargés depuis localStorage:', this.favoriteEvents);
    } 
    
    
    // Charger les favoris depuis l'API et ajouter à l'état local
    this.favorisservice.getallfavoris().subscribe({
      next: (favorites: any) => {
        favorites.forEach((favorite: any) => {
          this.favoriteEvents.add(favorite.eventId); // Ajouter les événements favoris
        });
        
        // Sauvegarder dans localStorage
        localStorage.setItem('favorites', JSON.stringify(Array.from(this.favoriteEvents)));
        console.log('Favoris chargés:', this.favoriteEvents);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des favoris:', err);
      }
    });
  }

  // me

  chargerfavoris(){
    this.favorisservice.getallfavoris().subscribe(
      (res:any)=>{
        this.favorislist=res;
        console.log('Favoris chargés:', this.favorislist);
        localStorage.setItem("Favoris",JSON.stringify(this.favorislist)) 
        const ids = this.favorislist.map((favoris: { id: number }) => favoris.id);
        localStorage.setItem("id favoris", JSON.stringify(ids));
      }
    )
  }


addToFavorites(eventId: number): void {
  for (let i = 0; i < this.favorislist.length; i++) {
    if (this.favorislist[i].id === eventId) {
      console.log("id", this.favorislist[i].id);
      console.log(`L'événement ${eventId} est déjà dans les favoris.`);
      
    }
  }
  this.favorisservice.addtofavoris(eventId).subscribe({
    next: () => {
      console.log(`L'événement ${eventId} a été ajouté aux favoris.`);
      this.favorislist.push({ id: eventId }); // Ajouter à la liste locale
      localStorage.setItem('favorites', JSON.stringify(this.favorislist));
    },
    error: (err) => {
      console.error(`Erreur lors de l'ajout de l'événement ${eventId} aux favoris.`, err);
    }
  });
}


removeFromFavorites(eventId: any): void {
  this.favorisservice.deleteFromFavoris(eventId).subscribe({
    next: () => {
      console.log(`L'événement ${eventId} a été retiré des favoris.`);
      this.favorislist = this.favorislist.filter((favoris: any) => favoris.id !== eventId);

      localStorage.setItem('favorites', JSON.stringify(this.favorislist));
    },
    error: (err) => {
      console.error(`Erreur lors du retrait de l'événement ${eventId} des favoris.`, err);
      alert(`Erreur lors du retrait de l'événement des favoris: ${err.message}`);
    }
  });
 
}


  isFavorite(eventId: number): boolean {
    for (let i = 0; i < this.favorislist.length; i++) {
      if (this.favorislist[i].id === eventId) {
        return true;  
      }
    }
    return false; 
  }

  verifconnect(){
    return localStorage.getItem('state');
  }
  
// end me
  
  getEvents(): void {
    if (this.showFavorites) {
      this.favorisservice.getallfavoris().subscribe({
        next: (data) => {
          this.events = data;
          this.updatePaginatedEvents();
        },
        error: (err) => {
          console.error('Error loading favorite events:', err);
        }
      });
    } else {
      // Charger tous les événements
      this.eventservice.getallevents().subscribe({
        next: (data) => {
          this.events = data;
          this.updatePaginatedEvents();
        },
        error: (err) => {
          console.error('Error loading events:', err);
        }
      });
    }
  }

  // Mettre à jour les événements paginés
  updatePaginatedEvents(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedEvents = this.events.slice(startIndex, endIndex);
  }

  // Changer de page dans la pagination
  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedEvents();
  }

  // Aller à la page précédente
  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedEvents();
    }
  }

  // Aller à la page suivante
  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedEvents();
    }
  }

  // Obtenir le nombre total de pages pour la pagination
  get totalPages(): number {
    return Math.ceil(this.events.length / this.itemsPerPage);
  }

  // Fonction utilitaire pour récupérer la date, l'heure, etc.
  getMonth(date: any): string {
    const dateObject = new Date(date);
    const moisIndex = dateObject.getMonth();
    return this.moisNoms[moisIndex];
  }

  getYear(date: any): number {
    const dateObject = new Date(date);
    return dateObject.getFullYear();
  }

  getDay(date: any): number {
    const dateObject = new Date(date);
    return dateObject.getDate();
  }

  getTime(date: any): string {
    const dateObject = new Date(date);
    const heures = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const heuresFormat = heures < 10 ? `0${heures}` : heures;
    const minutesFormat = minutes < 10 ? `0${minutes}` : minutes;
    return `${heuresFormat}:${minutesFormat}`;
  }

  // Fonction pour basculer entre tous les événements et les événements favoris
  toggleFavoritesView(): void {
    this.showFavorites = !this.showFavorites;
    this.getEvents();
  }

  
  searchEventsByCategory(): void {
    if (this.selectedCategory) {
      this.eventservice.getalleventsbyCategoryName(this.selectedCategory.id).subscribe(
        (response) => {
          this.events = response;
          this.updatePaginatedEvents();
        },
        (error) => {
          console.log('Erreur lors de la recherche par catégorie', error);
        }
      );
    } else {
      this.getEvents();  
    }
  }

 
  onCategorySelect(event: any): void {
    const categoryId = event.target.value;
    if (categoryId) {
      this.selectedCategory = this.categories.find(category => category.id === categoryId);
      this.searchEventsByCategory();  
    } else {
      this.selectedCategory = null;
      this.getEvents(); 
    }
  }


  verifRole(role: string): boolean {
    
    const userRole = localStorage.getItem('role'); 
    return userRole === role;
  }
}
