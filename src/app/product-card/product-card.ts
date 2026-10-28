import { Component, input, output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  name = input.required<string>();  //receive input from parent
  price = input.required<number>();
  image = input<string | undefined>('https://placehold.co/300x200?text=Product',);

  addToCart = output<string>();  // child to parent

  onAddToCart(): void {
    this.addToCart.emit(this.name()); //triggers the event and sends the value
  }
}
