import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { logoutGuard } from './core/guards/logout.guard';
import { DetailsComponent } from './pages/details/details.component';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
        canActivate: [logoutGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
        canActivate: [logoutGuard],
      },

      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
        title: 'Reset Password',
        canActivate: [logoutGuard],
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Home',
        canActivate: [authGuard],
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart',
        children: [
          {
            path: 'checkout/:id',
            component: CheckoutComponent,
            title: 'Checkout',
            canActivate: [authGuard],
          },
        ],
        canActivate: [authGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products',
        canActivate: [authGuard],
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories',
        canActivate: [authGuard],
      },
      {
        path: 'brands',
        component: BrandsComponent,
        title: 'Brands',
        canActivate: [authGuard],
      },
      {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Product',
        canActivate: [authGuard],
      },

      {
        path: '**',
        component: NotfoundComponent,
        title: 'Page Not Found',
        canActivate: [authGuard],
      },
    ],
  },
];
