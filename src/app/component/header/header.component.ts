import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isScrolled = false;
  activeMenu: string = 'home';

  constructor(private router: Router, private service: AccountService) {}

  ngOnInit() {
    this.onScroll();
    this.setActiveMenuOnRouteChange();
    
    // Abonnement aux changements de route pour mettre à jour le menu actif
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.setActiveMenuOnRouteChange();
      }
    });
  }

  // Gérer le changement de style de l'en-tête lors du défilement
  @HostListener('window:scroll', [])
  onScroll(): void {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.isScrolled = scrollTop > 0;
  }

  // Définit le menu actif en fonction de la sélection de l'utilisateur
  setActive(menuItem: string) {
    this.activeMenu = menuItem;
  }

  // Définit le menu actif en fonction de la route actuelle
  private setActiveMenuOnRouteChange(): void {
    const currentUrl = this.router.url;
    
    if (currentUrl.includes('details')) {
      this.activeMenu = 'about';
    } else if (currentUrl.includes('service')) {
      this.activeMenu = 'speaker';
    } else if (currentUrl.includes('events')) {
      this.activeMenu = 'events';
    } else if (currentUrl.includes('blogs')) {
      this.activeMenu = 'blogs';
    } else if (currentUrl.includes('gallery')) {
      this.activeMenu = 'gallery';
    } else if (currentUrl.includes('contact')) {
      this.activeMenu = 'contact';
    } else if (currentUrl.includes('event-booking')) {
      this.activeMenu = 'event-booking';
    } else if (currentUrl.includes('annonceur-list-event')) {
      this.activeMenu = 'annonceur-list-event';
    } else if (currentUrl.includes('event-annonceur-details')) {
      this.activeMenu = 'event-annonceur-details';
    } else if (currentUrl.includes('request')) {
      this.activeMenu = 'request';
    } else if (currentUrl.includes('annonceur-list-request')) {
      this.activeMenu = 'annonceur-list-request';
    } else if (currentUrl.includes('profil')) {
      this.activeMenu = 'profil';
    } else {
      this.activeMenu = 'home';
    }
  }

  verif() {
    return localStorage.getItem('state') === '0';
  }

  logOut() {
    // Log out logic
    localStorage.clear();
    this.router.navigateByUrl('/home');
  }

  verifrole() {
    return localStorage.getItem('role') === 'Announcer';
  }
}
