# Angular 20 - Quick Reference Guide

## 🎯 10 Core Concepts at a Glance

### 1. **INTERPOLATION {{ }}**
```typescript
// Component
appTitle: string = 'Smart Expense Tracker';

// Template
<h1>{{ appTitle }}</h1>  <!-- Displays: Smart Expense Tracker -->
```
✨ **Use for:** Displaying component values in templates

---

### 2. **PROPERTY BINDING [property]**
```typescript
// Component
cardData = { title: 'Income', amount: 50000, color: 'green' };

// Template
<app-card 
  [title]="cardData.title"    <!-- Binds property -->
  [amount]="cardData.amount"
></app-card>
```
✨ **Use for:** Passing data from parent to child components

---

### 3. **EVENT BINDING (event)**
```typescript
// Component
onMenuClick(item: any): void {
  console.log(`Clicked: ${item.name}`);
}

// Template
<button (click)="onMenuClick(item)">{{ item.name }}</button>
```
✨ **Use for:** Responding to user interactions

---

### 4. **TWO-WAY BINDING [(ngModel)]**
```typescript
// Component
searchText: string = '';

// Template
<input [(ngModel)]="searchText" />
<p>Searching for: {{ searchText }}</p>
```
✨ **Use for:** Syncing input values with component properties

---

### 5. **@Input() - Receive Data**
```typescript
// Child Component
@Input() title: string = 'Card Title';
@Input() amount: number = 0;

// Parent Component
<app-card [title]="'Income'" [amount]="50000"></app-card>
```
✨ **Use for:** Receiving data from parent components

---

### 6. **@Output() - Send Events**
```typescript
// Child Component
@Output() cardClicked = new EventEmitter<string>();

onCardClick(): void {
  this.cardClicked.emit(this.title);
}

// Parent Component
<app-card (cardClicked)="handleCardClick($event)"></app-card>
```
✨ **Use for:** Sending events to parent components

---

### 7. **ngOnInit() - Lifecycle Hook**
```typescript
export class Dashboard implements OnInit {
  ngOnInit(): void {
    console.log('Component initialized');
    // Load data here
    this.loadTransactions();
  }
}
```
✨ **Use for:** Initial setup and data loading

---

### 8. **\*ngFor - Loop through Arrays**
```typescript
// Component
menuItems = [
  { id: 1, name: 'Dashboard' },
  { id: 2, name: 'Expenses' },
  { id: 3, name: 'Reports' }
];

// Template
<div *ngFor="let item of menuItems; let i = index">
  {{ i + 1 }}. {{ item.name }}
</div>
```
✨ **Use for:** Rendering lists of items

---

### 9. **\*ngIf - Conditional Rendering**
```typescript
// Component
hasTransactions: boolean = true;

// Template
<div *ngIf="hasTransactions">
  Transactions found
</div>

<div *ngIf="!hasTransactions">
  No transactions
</div>
```
✨ **Use for:** Showing/hiding content based on conditions

---

### 10. **[ngClass] - Conditional Styling**
```typescript
// Component
isHighExpense(amount: number): boolean {
  return amount > 5000;
}

// Template
<div [ngClass]="isHighExpense(amount) ? 'high-expense' : 'normal-expense'">
  {{ amount | currency }}
</div>
```
✨ **Use for:** Applying CSS classes conditionally

---

## 📺 Pipes - Data Formatting

### **Date Pipe**
```html
{{ currentDate | date:'fullDate' }}    <!-- Sunday, June 22, 2026 -->
{{ currentDate | date:'short' }}       <!-- 6/22/26, 9:16 AM -->
{{ currentDate | date:'HH:mm:ss' }}    <!-- 09:16:08 -->
```

### **Currency Pipe**
```html
{{ amount | currency:'INR':'₹':'1.0-0' }}     <!-- ₹50,000 -->
{{ amount | currency:'USD':'$':'1.0-0' }}     <!-- $50,000 -->
{{ amount | currency:'EUR':'€':'1.2-2' }}     <!-- €50,000.00 -->
```

### **Number Pipe**
```html
{{ 12345.67 | number:'1.0-0' }}       <!-- 12,346 -->
{{ 0.5 | number:'0.0-2' }}            <!-- 0.50 -->
```

---

## 🎨 CSS Flexbox Cheatsheet

```css
/* Container */
.container {
  display: flex;
  justify-content: space-between;  /* Space between items */
  align-items: center;              /* Vertical center */
  gap: 1rem;                        /* Space between items */
  flex-direction: column;            /* Stack vertically */
  flex-wrap: wrap;                  /* Wrap to next line */
}

/* Item */
.item {
  flex: 1;                          /* Equal width */
  flex-grow: 2;                     /* Grow 2x faster */
  flex-basis: 200px;                /* Base width */
}
```

---

## 🎨 CSS Grid Cheatsheet

```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);    /* 3 equal columns */
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));  /* Responsive */
  gap: 2rem;                                 /* Space between cells */
  grid-auto-rows: minmax(200px, auto);      /* Min height */
}
```

---

## 📱 Responsive Design Pattern

```scss
// Desktop First (or Mobile First)
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  
  // Tablet
  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  // Mobile
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}
```

---

## 🔧 Standalone Component Template

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Import dependencies
  templateUrl: './example.html',
  styleUrl: './example.scss'
})
export class Example {
  // Component logic
}
```

---

## 🚀 Service Pattern

```typescript
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'  // Available throughout app
})
export class DataService {
  private data = [];

  constructor() {}

  getData() {
    return this.data;
  }

  addData(item: any) {
    this.data.push(item);
  }
}

// In Component
export class MyComponent {
  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getData();
  }
}
```

---

## 💡 Common Patterns

### **Parent → Child Communication**
```html
<!-- Parent -->
<app-child [inputData]="parentData"></app-child>

<!-- Child Component -->
@Input() inputData: any;
```

### **Child → Parent Communication**
```html
<!-- Parent -->
<app-child (eventName)="handleEvent($event)"></app-child>

<!-- Child Component -->
@Output() eventName = new EventEmitter<string>();
handleClick() { this.eventName.emit('data'); }
```

### **Conditional List Rendering**
```html
<div *ngIf="items.length > 0">
  <div *ngFor="let item of items">
    {{ item.name }}
  </div>
</div>
<div *ngIf="items.length === 0">
  No items found
</div>
```

### **Search Filtering**
```typescript
filteredItems = [];

onSearchChange(searchText: string) {
  this.filteredItems = this.items.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );
}
```

---

## 🎯 File Structure Best Practices

```
src/
├── app/
│   ├── components/
│   │   ├── header/
│   │   │   ├── header.ts       (Component logic)
│   │   │   ├── header.html     (Template)
│   │   │   └── header.scss     (Styles)
│   │   └── card/
│   ├── services/
│   │   └── data.ts             (Business logic)
│   ├── models/
│   │   └── types.ts            (Interfaces/Types)
│   ├── app.ts                  (Root component)
│   └── app.html                (Root template)
├── styles.scss                 (Global styles)
└── main.ts                     (Entry point)
```

---

## ✅ Development Checklist

- [ ] Imports all needed modules in `imports` array
- [ ] All components are standalone
- [ ] Services use `providedIn: 'root'`
- [ ] Event handlers have proper event typing
- [ ] Templates use Safe Navigation Operator `?.`
- [ ] Lists have trackBy function for performance
- [ ] Responsive breakpoints at 768px
- [ ] Accessibility attributes added
- [ ] No console errors/warnings
- [ ] Build completes successfully

---

## 🐛 Common Mistakes to Avoid

❌ **Mistake:** Mutating input properties
```typescript
// Wrong
@Input() data: any;
ngOnInit() { this.data.property = 'new'; }

// Right
@Input() data: any;
handleChange() { 
  const newData = {...this.data, property: 'new'};
  this.dataChanged.emit(newData);
}
```

❌ **Mistake:** Using string references instead of property binding
```html
<!-- Wrong -->
<div class="{{ myClass }}"></div>

<!-- Right -->
<div [class]="myClass"></div>
<div [ngClass]="myClass"></div>
```

❌ **Mistake:** Forgetting to import CommonModule
```typescript
// Wrong
@Component({
  imports: []
})

// Right
@Component({
  imports: [CommonModule]  // *ngIf, *ngFor, etc.
})
```

---

## 🚀 Performance Tips

1. **Use TrackBy with *ngFor**
   ```html
   <div *ngFor="let item of items; trackBy: trackByFn">
     {{ item.name }}
   </div>
   ```

2. **Use OnPush Change Detection**
   ```typescript
   @Component({
     changeDetection: ChangeDetectionStrategy.OnPush
   })
   ```

3. **Lazy Load Images**
   ```html
   <img loading="lazy" src="..." />
   ```

4. **Use Async Pipe for Subscriptions**
   ```html
   <div>{{ data$ | async }}</div>
   ```

---

**Happy Angular Coding! 🚀**
