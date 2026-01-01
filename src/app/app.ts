import { Seller } from './service/seller';
import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { FooterComponent } from './footer-component/footer-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header,RouterLink,FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  
}
