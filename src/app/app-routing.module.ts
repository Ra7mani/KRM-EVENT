import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { DetailsComponent } from './component/details/details.component';
import { EventsComponent } from './component/events/events.component';
import { EventDetailsComponent } from './component/event-details/event-details.component';
import { BookingComponent } from './component/booking/booking.component';
import { BlogComponent } from './component/blog/blog.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { ContactComponent } from './component/contact/contact.component';
import { ServiceComponent } from './component/service/service.component';
import { AboutComponent } from './component/about/about.component';
import { AnnonceurListEventsComponent } from './component/annonceur-list-events/annonceur-list-events.component';
import { EventAnnonceurDetailsComponent } from './component/event-annonceur-details/event-annonceur-details.component';
import { RequestComponent } from './component/request/request.component';
import { AnnonceurListRequestComponent } from './component/annonceur-list-request/annonceur-list-request.component';
import { LoginComponent } from './component/login/login.component';
import { ProfilComponent } from './component/profil/profil.component';
import { ViewprofilComponent } from './component/viewprofil/viewprofil.component';

const routes: Routes = [
  {
    path: 'home' , component: HomeComponent,
    children: [
      { path: '', component: LayoutComponent },
      { path: 'details', component: DetailsComponent },
      { 
        path: 'events', component: EventsComponent,
        children: [
          
          
        ],
      },
      { path: 'blogs', component: BlogComponent },
      { path: 'gallery', component: GalleryComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'service', component: ServiceComponent },

      { path: 'event-booking/:id', component: BookingComponent },
      { path: 'event-details', component: EventDetailsComponent },
      {path: 'annonceur-list-event', component:AnnonceurListEventsComponent},
      { path: 'event-annonceur-details/:id', component: EventAnnonceurDetailsComponent },
      {path: 'request' , component:RequestComponent },

      {path: 'annonceur-list-request', component:AnnonceurListRequestComponent},
      {path:'profil' ,component:ProfilComponent},
     {path:'viewprofil/:id' ,component:ViewprofilComponent}




      



      
    ],
  }, { path: '', redirectTo: '/home', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
