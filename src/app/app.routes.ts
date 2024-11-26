import { Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './login/login.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CharComponent } from './char/char.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    { 
        path: '', 
        component: AppComponent,
        children: [
            { path: '', component: HomeComponent},
            { path: 'cart', component: CharComponent, canActivate: [AuthGuard] },
            { path: 'checkout', component: CheckoutComponent, canActivate: [AuthGuard] },
            { path: 'login', component: LoginComponent },
            { path: '**', redirectTo: '/login', pathMatch: 'full' },
        ]
    },
];
