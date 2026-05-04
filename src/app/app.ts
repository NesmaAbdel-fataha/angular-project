import { Component, signal } from '@angular/core';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
// import { Home } from './components/home/home';
// import { Product } from './components/product/product';
// import { ParentComponent } from "./components/parent-component/parent-component";
import {  RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [Navbar, Footer ,RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular2');
}
