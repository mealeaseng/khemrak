import { Component,OnInit } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [ NgClass, RouterOutlet, RouterLink ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout {
  isMenuOpen = false;
  count: number = 0;
  isVisitble = false
 

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

    closeMenu() {
    this.isMenuOpen = false;
  }

}
