// import { NgIf } from '@angular/common';
// import { Component } from '@angular/core';
// import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
// import { Seller } from '../service/seller';

// @Component({
//   selector: 'app-header',
//   imports: [RouterLink, RouterOutlet,NgIf],
//   templateUrl: './header.html',
//   styleUrl: './header.css',
// })
// export class Header {
//   menustyle : string = 'default'
//     isSellerLoggedIn = false;

//     sellerName = '';

//   constructor(private router: Router, private seller: Seller) {}
//   menuOpen = false;

//   // ngOnInit(): void {

//   //   // 🔁 Listen to router changes
//   //   this.router.events.subscribe((event: any) => {
//   //     if (event instanceof NavigationEnd) {

//   //       // 🔐 Check seller login
//   //       const sellerData = localStorage.getItem('seller');
//   //       this.isSellerLoggedIn = !!sellerData;

//   //       // 👤 Retrieve seller name safely
//   //       if (sellerData) {
//   //         try {
//   //           const sellerObj = JSON.parse(sellerData);
//   //           this.sellerName = sellerObj?.name || '';
//   //           console.log(this.sellerName);
            
//   //         } catch (error) {
//   //           console.error('Invalid seller data in localStorage');
//   //           this.sellerName = '';
//   //         }
//   //       } else {
//   //         this.sellerName = '';
//   //       }

//   //       // 🎨 Navbar style logic
//   //       if (this.isSellerLoggedIn && event.url.includes('seller')) {
//   //         this.menustyle = 'seller';
//   //       } else {
//   //         this.menustyle = 'default';
//   //       }

//   //       console.log('URL:', event.url);
//   //       console.log('Seller Logged In:', this.isSellerLoggedIn);
//   //       console.log('Seller Name:', this.sellerName);
//   //     }
//   //   });
//   // }
// ngOnInit(): void {
//     this.router.events.subscribe(event => {

//       if (event instanceof NavigationEnd) {

//         // 🔐 Check seller login from localStorage
//         const sellerData = localStorage.getItem('seller');
//         this.isSellerLoggedIn = !!sellerData;

//         // 👤 Get seller name safely
//         if (sellerData) {
//           try {
//             const sellerObj = JSON.parse(sellerData);
//             this.sellerName = sellerObj?.name || '';
//           } catch {
//             console.error('Invalid seller data in localStorage');
//             this.sellerName = '';
//           }
//         } else {
//           this.sellerName = '';
//         }

//         // 🎨 Navbar style
//         if (this.isSellerLoggedIn && event.url.includes('seller')) {
//           this.menustyle = 'seller';
//         } else {
//           this.menustyle = 'default';
//         }

//         console.log('URL:', event.url);
//         console.log('Seller Logged In:', this.isSellerLoggedIn);
//         console.log('Seller Name:', this.sellerName);
//       }
//     });
//   }

//   toggleMenu(): void {
//     this.menuOpen = !this.menuOpen;
//   }

//   closeMenu(): void {
//     this.menuOpen = false;
//   }

//   logout(): void {
//     localStorage.removeItem('seller');
//     this.seller.issellerloggedin.next(false);
//     this.isSellerLoggedIn = false;
//     this.sellerName = '';
//     this.router.navigate(['/']);
//   }

// // ngOnInit(): void {
// //   this.router.events.subscribe((event: any) => {

// //     if (event instanceof NavigationEnd) {

// //       // Check seller login
// //       this.isSellerLoggedIn = !!localStorage.getItem('seller');

// //       // Seller navbar style
// //       if (this.isSellerLoggedIn && event.url.includes('seller')) {
// //         this.menustyle = 'seller';
// //       } else {
// //         this.menustyle = 'default';
// //       }

// //       console.log('Current URL:', event.url);
// //       console.log('Menu Style:', this.menustyle);
// //     }
// //   });
// // }



// //   // ngOnInit() {
// //   //   this.router.events.subscribe((data: any) => {   

// //   //     if (data.url) {
// //   //       console.log(data.url);
        
// //   //       if (localStorage.getItem('seller')&& data.url.includes('seller')) {
// //   //         this.menustyle = 'seller';
// //   //       } else {
// //   //         this.menustyle = 'default';
// //   //       }
// //   //     }
// //   //   });
// //   // }
// //   toggleMenu() {
// //     this.menuOpen = !this.menuOpen;
// //   }
// // logout() {
// //     localStorage.removeItem('seller');
// //     this.seller.issellerloggedin.next(false);
// //     this.router.navigate(['/']);
// //   }

// //   closeMenu() {
// //     this.menuOpen = false;
// //   }
// }
import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { Seller } from '../service/seller';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NgIf],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {

  menustyle: string = 'default';
  isSellerLoggedIn: boolean = false;
  sellerName: string = '';
  menuOpen: boolean = false;

  constructor(
    private router: Router,
    private seller: Seller
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationEnd) {

        // 🔐 Check seller login from localStorage
        const sellerData = localStorage.getItem('seller');
        this.isSellerLoggedIn = !!sellerData;

        // 👤 Get seller name safely
        if (sellerData) {
          try {
            const sellerObj = JSON.parse(sellerData);
            this.sellerName = sellerObj?.name || '';
          } catch {
            console.error('Invalid seller data in localStorage');
            this.sellerName = '';
          }
        } else {
          this.sellerName = '';
        }

        // 🎨 Navbar style
        if (this.isSellerLoggedIn && event.url.includes('seller')) {
          this.menustyle = 'seller';
        } else {
          this.menustyle = 'default';
        }

        console.log('URL:', event.url);
        console.log('Seller Logged In:', this.isSellerLoggedIn);
        console.log('Seller Name:', this.sellerName);
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
    this.seller.issellerloggedin.next(false);
    this.isSellerLoggedIn = false;
    this.sellerName = '';
    this.router.navigate(['/']);
  }
}
