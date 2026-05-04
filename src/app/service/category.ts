import { Injectable } from '@angular/core';
import { Icategory } from '../models/icategory';

@Injectable({
  providedIn: 'root',
})
export class Category {
  private categories: Icategory[] = [
    { id: 1, name: 'Mobiles' },
    { id: 2, name: 'Cameras' },
    { id: 3, name: 'Laptops' },
  ];

  getAllCategories(): Icategory[] {
    return this.categories;
  }
}
