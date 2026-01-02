import { NgForOf, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Seller } from '../service/seller';
import { Productdata } from '../service/productdata';
import { Product } from '../interface/productdata';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf,FormsModule,
  NgForOf,
],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  menustyle: string = 'default';
  isSellerLoggedIn: boolean = false;
  sellerName: string = '';
  menuOpen: boolean = false;
searchTerm = '';
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
isUserLoggedIn: boolean = false;
userName: string = '';

  constructor(private router: Router, private seller: Seller, private product: Productdata) {}

  ngOnInit(): void {
    //  this.product.productlist().subscribe(data => {
    //   this.allProducts = data;
    // });
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd) {
    //     // 🔐 Check seller login from localStorage
    //     const sellerData = localStorage.getItem('seller');
    //     this.isSellerLoggedIn = !!sellerData;

    //     // 👤 Get seller name safely
    //     if (sellerData) {
    //       try {
    //         const sellerObj = JSON.parse(sellerData);
    //         this.sellerName = sellerObj?.name || '';
    //       } catch {
    //         console.error('Invalid seller data in localStorage');
    //         this.sellerName = '';
    //       }
    //     } else {
    //       this.sellerName = '';
    //     }

    //     // 🎨 Navbar style
    //     if (this.isSellerLoggedIn && event.url.includes('seller')) {
    //       this.menustyle = 'seller';
    //     } else {
    //       this.menustyle = 'default';
    //     }

    //     console.log('URL:', event.url);
    //     console.log('Seller Logged In:', this.isSellerLoggedIn);
    //     console.log('Seller Name:', this.sellerName);
    //   }
    // });
    this.router.events.subscribe((event) => {
  if (event instanceof NavigationEnd) {

    /* ---------- SELLER AUTH ---------- */
    const sellerData = localStorage.getItem('seller');
    this.isSellerLoggedIn = !!sellerData;

    if (sellerData) {
      try {
        const sellerObj = JSON.parse(sellerData);
        this.sellerName = sellerObj?.name || '';
      } catch {
        this.sellerName = '';
      }
    } else {
      this.sellerName = '';
    }

    /* ---------- USER AUTH ---------- */
    const userData = localStorage.getItem('user');
    this.isUserLoggedIn = !!userData;

    if (userData) {
      try {
        const userObj = JSON.parse(userData);
        this.userName = userObj?.name || '';
      } catch {
        this.userName = '';
      }
    } else {
      this.userName = '';
    }

    /* ---------- MENU STYLE ---------- */
    if (this.isSellerLoggedIn && event.url.includes('seller')) {
      this.menustyle = 'seller';
    } else {
      this.menustyle = 'default';
    }
  }
});

  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
logout(): void {
  localStorage.removeItem('seller');
  localStorage.removeItem('user');

  this.isSellerLoggedIn = false;
  this.isUserLoggedIn = false;

  this.sellerName = '';
  this.userName = '';

  this.menuOpen = false;
  this.router.navigate(['/']);
}
  // logout(): void {
  //   localStorage.removeItem('seller');
  //   this.seller.issellerloggedin.next(false);
  //   this.isSellerLoggedIn = false;
  //   this.sellerName = '';
  //   this.router.navigate(['/']);
  // }
  onSearchChange() {
  const term = this.searchTerm.trim().toLowerCase();

  if (!term) {
    this.filteredProducts = [];
    return;
  }

  // live suggestions (max 5)
  this.filteredProducts = this.allProducts
    .filter(product =>
      product.name.toLowerCase().includes(term)
    )
    .slice(0, 5);
}

onSearchEnter() {
  const term = this.searchTerm.trim();

  if (!term) return;

  // clear suggestion dropdown
  this.filteredProducts = [];

  // navigate to search page
  this.router.navigate(['/search'], {
    queryParams: { q: term }
  });

  // optional: clear input
  this.searchTerm = '';
}


  clearSearch() {
    this.searchTerm = '';
    this.filteredProducts = [];
  }
}
