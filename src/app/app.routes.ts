import { Routes } from '@angular/router';
import { Homecomponent } from './homecomponent/homecomponent';
import { ProductsComponent } from './products-component/products-component';
import { CartComponent } from './cart-component/cart-component';
import { LoginComponent } from './login-component/login-component';
import { Page404 } from './page404/page404';
import { Sellerauthcomponent } from './sellerauthcomponent/sellerauthcomponent';
import { Sellerhome } from './sellerhome/sellerhome';
import { AuthGuard } from './auth-guard';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product';
import { Updateproductdata } from './updateproductdata/updateproductdata';
import { Searchcomponent } from './searchcomponent/searchcomponent';
import { Productdetailcomponent } from './productdetailcomponent/productdetailcomponent';
import { Checkoutcomponent } from './checkoutcomponent/checkoutcomponent';
import { Myordercomponent } from './myordercomponent/myordercomponent';

export const routes: Routes = [
  { path: '', component: Homecomponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'seller', component: Sellerauthcomponent },
  { path: 'seller/seller-add-product', component: SellerAddProductComponent, canActivate: [AuthGuard] },
  { path: 'sellerhome', component: Sellerhome, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'checkout', component: Checkoutcomponent },
  { path: 'myorders', component: Myordercomponent },
  { path: 'search/:query', component: Searchcomponent },
  { path: 'product/:id', component: Productdetailcomponent },
  { path: 'sellerhome/seller-update-product/:id', component: Updateproductdata, canActivate: [AuthGuard] },
  {
    path: '**',
    component: Page404,
  },
];
