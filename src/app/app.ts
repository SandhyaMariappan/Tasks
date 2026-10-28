import { Component, computed, signal } from '@angular/core';
import type { Item, CategoryFilter } from './item.model';
import { TruncatePipe } from './truncate-pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TruncatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  readonly items: Item[] = [
    {
      id: 1,
      name: 'Angular in Action',
      category: 'Books',
      description:
        'A practical guide to building web applications with Angular and TypeScript.',
    },
    {
      id: 2,
      name: 'Wireless Mouse',
      category: 'Electronics',
      description:
        'An ergonomic wireless mouse with long battery life and silent clicks.',
    },
    {
      id: 3,
      name: 'Denim Jacket',
      category: 'Clothing',
      description:
        'A classic fit denim jacket suitable for everyday wear and every season.',
    },
    {
      id: 4,
      name: 'USB-C Hub',
      category: 'Electronics',
      description:
        'A compact seven-port hub for connecting accessories to laptops and tablets.',
    },
    {
      id: 5,
      name: 'Clean Code',
      category: 'Books',
      description:
        'A handbook about writing readable, maintainable, and well-structured software.',
    },
  ];

  readonly categories: CategoryFilter[] = [
    'All',
    'Books',
    'Electronics',
    'Clothing',
  ];

  readonly searchText = signal('');
  readonly selectedCategory = signal<CategoryFilter>('All');

  readonly filteredItems = computed(() => {
    const search = this.searchText().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.items.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(search); //checks whether the product name contains the search text.
      const matchesCategory = category === 'All' || item.category === category;
      return matchesName && matchesCategory;
    });
  });

  onCategoryChange(value: string): void {
    const category = this.categories.find(
      (item) => item === value,
    );

    if (category !== undefined) {
      this.selectedCategory.set(category);
    }
  }

  resetFilters(): void {
    this.searchText.set('');
    this.selectedCategory.set('All');
  }
}