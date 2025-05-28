import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CategoriesComponent } from './admin/pages/categories/categories.component';
import { FavoriteUserProductsComponent } from './pages/favorite-user-products/favorite-user-products.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'products/:slug',
        component: ProductDetailsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {path: 'categories', component: CategoriesComponent},
    {path: 'favorites', component: FavoriteUserProductsComponent},
    {path: 'cart', component: CartComponent},
    
];
