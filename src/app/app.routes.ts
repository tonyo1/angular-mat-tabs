import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';





export const routes: Routes = [
   {
      path: '', component: HomeComponent
   }, // Root path loads HomeComponent
   {
      path: 'home', component: HomeComponent,
      data: { label: 'Home' }
   }, // Optional: named home path
   {
      path: 'about', component: AboutComponent,
      data: { label: 'About' }
   },
   {
      path: 'contact', component: ContactComponent,
      data: { label: 'Contact' }
   }


];
