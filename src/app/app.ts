import { Component, signal } from '@angular/core';
import { ProductCard } from './product-card/product-card';
import { Product } from './product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductCard],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly products: Product[] = [
    {
      id: 1,
      name: 'Headphones',
      price: 59.99,
      image: 'https://placehold.co/300x200?text=Headphones'
    },
    {
      id: 2,
      name: 'Keyboard',
      price: 34.5,
      image: 'https://placehold.co/300x200?text=Keyboard'
    },
    {
      id: 3,
      name: 'Mouse',
      price: 19.0,
      image: 'https://placehold.co/300x200?text=Mouse'
    },
  ];

  readonly message = signal('');

  onProductAdded(name: string): void {
    this.message.set(`Added: ${name}`);
  }
}
