import { Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryProductsComponent } from './pages/category-products/category-products.component';
import { CompareProductsComponent } from './pages/compare-products/compare-products.component';
import { FavoriteUserProductsComponent } from './pages/favorite-user-products/favorite-user-products.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { RegisterComponent } from './pages/register/register.component';

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
        path: 'categories/:slug',
        component: CategoryProductsComponent
    },
    {
        path: 'compare',
        component: CompareProductsComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: RegisterComponent
    },
    {
        path: 'favorites', 
        component: FavoriteUserProductsComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },    
];
