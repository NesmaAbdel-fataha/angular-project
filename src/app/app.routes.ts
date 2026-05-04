import { Routes } from '@angular/router';
import { ProductDetails } from './components/product-details/product-details';
import { ParentComponent } from './components/parent-component/parent-component';
import { Home } from './components/home/home';
// import { TemplateDrivenForm } from './components/template-driven-form/template-driven-form';
import { ReactiveFormSignUp } from './components/reactive-form-sign-up/reactive-form-sign-up';
import { Login } from './components/login/login';
import { authGuard } from './components/Guardes/auth-guard';
import { InsertProduct } from './components/insert-product/insert-product';

export const routes: Routes = [
    //routes
    { path: '', redirectTo: '/app-home', pathMatch: 'full' },
    { path: 'app-home', component: Home},
    { path: 'product-parent', component: ParentComponent , canActivate:[authGuard]},
    { path: 'product-parent/:id', component: ProductDetails ,canActivate:[authGuard]},
    { path: 'insertproduct', component: InsertProduct ,canActivate:[authGuard]},
    { path: 'insertproduct/:id', component: InsertProduct ,canActivate:[authGuard]},
    { path: 'signup', component: ReactiveFormSignUp ,canActivate:[authGuard] },
    { path: 'login', component: Login }
];
