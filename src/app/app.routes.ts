import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { hasClaimGuard } from '../app/core/auth/guards/has-claim.guard';
import { AuthErrorComponent } from '../components/auth-error/auth-error.component';
 



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
      canActivate: [hasClaimGuard],
      data: { label: 'Contact' }
    },
    {
      path: 'auth-error', component: AuthErrorComponent,
      data: { label: 'Auth Error' }
    }
];
