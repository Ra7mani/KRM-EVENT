import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { LayoutComponent } from './component/layout/layout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AboutComponent } from './component/about/about.component';
import { DetailsComponent } from './component/details/details.component';
import { EventsComponent } from './component/events/events.component';
import { EventDetailsComponent } from './component/event-details/event-details.component';
import { BookingComponent } from './component/booking/booking.component';
import { BlogComponent } from './component/blog/blog.component';
import { GalleryComponent } from './component/gallery/gallery.component';
import { ContactComponent } from './component/contact/contact.component';
import { ServiceComponent } from './component/service/service.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { RequestComponent } from './component/request/request.component';
import { AnnonceurListEventsComponent } from './component/annonceur-list-events/annonceur-list-events.component';

import { AnnonceurListRequestComponent } from './component/annonceur-list-request/annonceur-list-request.component';
import { ProfilComponent } from './component/profil/profil.component';
import { AuthInterceptor } from './interceptor/contactauth.interceptor';
import { EventAnnonceurDetailsComponent } from './component/event-annonceur-details/event-annonceur-details.component';
import { ViewprofilComponent } from './component/viewprofil/viewprofil.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LayoutComponent,
    AboutComponent,
    DetailsComponent,
    EventsComponent,
    EventDetailsComponent,
    BookingComponent,
    BlogComponent,
    GalleryComponent,
    ContactComponent,
    ServiceComponent,
    LoginComponent,
    SignupComponent,
    RequestComponent,
    AnnonceurListEventsComponent,
    AnnonceurListRequestComponent,
    ProfilComponent,
    EventAnnonceurDetailsComponent,
    ViewprofilComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },],
  bootstrap: [AppComponent]
})
export class AppModule { }
