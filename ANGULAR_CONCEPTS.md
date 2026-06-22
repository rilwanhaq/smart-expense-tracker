# Smart Expense Tracker - Angular 20 Concepts & Learning Guide

## 📋 Table of Contents
1. [Folder Structure](#folder-structure)
2. [Angular Concepts Explained](#angular-concepts-explained)
3. [Component Communication](#component-communication)
4. [File Descriptions](#file-descriptions)

---

## 📁 Folder Structure

```
smart-expense-tracker/
│
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/
│   │   │   │   ├── header.ts         (Header Component - TypeScript)
│   │   │   │   ├── header.html       (Header Template)
│   │   │   │   └── header.scss       (Header Styles)
│   │   │   ├── sidebar/
│   │   │   │   ├── sidebar.ts        (Sidebar Component - TypeScript)
│   │   │   │   ├── sidebar.html      (Sidebar Template)
│   │   │   │   └── sidebar.scss      (Sidebar Styles)
│   │   │   ├── card/
│   │   │   │   ├── card.ts           (Card Component - TypeScript)
│   │   │   │   ├── card.html         (Card Template)
│   │   │   │   └── card.scss         (Card Styles)
│   │   │   └── dashboard/
│   │   │       ├── dashboard.ts      (Dashboard Component - TypeScript)
│   │   │       ├── dashboard.html    (Dashboard Template)
│   │   │       └── dashboard.scss    (Dashboard Styles)
│   │   │
│   │   ├── services/
│   │   │   └── expense.ts            (ExpenseService - Business Logic)
│   │   │
│   │   ├── models/
│   │   │   └── expense.ts            (Expense Interface - Data Model)
│   │   │
│   │   ├── app.ts                    (Root Component)
│   │   ├── app.html                  (Root Template)
│   │   └── app.scss                  (Root Styles)
│   │
│   ├── styles.scss                   (Global Styles)
│   └── main.ts                       (Application Entry Point)
│
├── angular.json                      (Angular Configuration)
├── package.json                      (Dependencies & Scripts)
└── README.md                         (Project Documentation)
```

---

## 📚 Angular Concepts Explained

### 1. **INTERPOLATION {{ }}**

**What it is:** Displays component property values in the template.

**Syntax:**
```html
<h1>{{ propertyName }}</h1>
```

**Example from Header Component:**
```html
<h1 class="app-title">{{ appTitle }}</h1>  <!-- Displays: Smart Expense Tracker -->
<span class="user-name">Welcome, {{ userName }}</span>  <!-- Displays: Welcome, Rilwan Haq -->
```

**Component TypeScript:**
```typescript
appTitle: string = 'Smart Expense Tracker';
userName: string = 'Rilwan Haq';
```

**Key Points:**
- One-way binding: Component → Template
- Updates automatically when property changes
- Can include expressions: `{{ amount * 2 }}`
- Can use pipes: `{{ currentDate | date }}`

---

### 2. **PROPERTY BINDING [property]**

**What it is:** Binds component properties to DOM element properties.

**Syntax:**
```html
<element [property]="componentProperty"></element>
```

**Example from Dashboard Component:**
```html
<app-card
  [title]="card.title"          <!-- Binds title input -->
  [amount]="card.amount"        <!-- Binds amount input -->
  [color]="card.color"          <!-- Binds color input -->
></app-card>
```

**Component TypeScript:**
```typescript
cardData = [
  { title: 'Income', amount: 50000, color: 'green' }
];
```

**Key Points:**
- One-way binding: Component → DOM
- Binds to DOM properties (not HTML attributes)
- Used to pass data to child components via @Input()
- Updates when component property changes

**ngClass - Conditional Property Binding:**
```html
<!-- Adds 'active' class when condition is true -->
<div [ngClass]="'card-' + color"></div>

<!-- Multiple classes with object -->
<div [ngClass]="{ 'active': isActive, 'disabled': isDisabled }"></div>
```

---

### 3. **EVENT BINDING (event)**

**What it is:** Listens to DOM events and calls component methods.

**Syntax:**
```html
<element (event)="methodName()"></element>
```

**Example from Sidebar Component:**
```html
<button 
  class="menu-item"
  (click)="onMenuClick(item)"  <!-- Listens to click event -->
>
  {{ item.name }}
</button>
```

**Component TypeScript:**
```typescript
onMenuClick(menuItem: any): void {
  console.log(`Menu item clicked: ${menuItem.name}`);
}
```

**Example from Dashboard Component:**
```html
<input
  (input)="onSearchChange()"  <!-- Listens to input event -->
/>
<app-card
  (cardClicked)="onCardClick($event)"  <!-- Listens to custom event -->
></app-card>
```

**Key Points:**
- One-way binding: Template → Component
- `$event` contains event data
- Common events: click, input, change, submit, keyup, mouseover
- Prevents default behavior with `$event.preventDefault()`

---

### 4. **TWO-WAY BINDING [(ngModel)]**

**What it is:** Synchronizes data between component and template (both directions).

**Syntax:**
```html
<input [(ngModel)]="propertyName" />
```

**How it works:**
- Updates component when user types in input
- Updates input when component changes property
- Equivalent to: `[ngModel]="property" (ngModelChange)="property = $event"`

**Example from Dashboard Component:**
```html
<input
  type="text"
  placeholder="Search transactions..."
  [(ngModel)]="searchText"      <!-- Two-way binding -->
  (input)="onSearchChange()"    <!-- Also listen to input -->
/>
```

**Component TypeScript:**
```typescript
searchText: string = '';

onSearchChange(): void {
  console.log(`Searching for: ${this.searchText}`);  // searchText is updated!
}
```

**Key Points:**
- Requires FormsModule in imports
- Component property is automatically updated
- Template input is automatically updated
- Combines property binding and event binding

---

### 5. **@Input() - Receiving Data from Parent**

**What it is:** Decorator that allows parent component to pass data to child component.

**Syntax:**
```typescript
@Input() propertyName: Type = defaultValue;
```

**Example from Card Component:**
```typescript
@Input() title: string = 'Card Title';
@Input() amount: number = 0;
@Input() color: string = 'blue';
```

**Usage in Parent (Dashboard Component):**
```html
<app-card
  [title]="card.title"      <!-- Property binding to @Input -->
  [amount]="card.amount"
  [color]="card.color"
></app-card>
```

**Key Points:**
- Child component receives data from parent
- Must use property binding `[property]="value"` in parent
- Child component is read-only (cannot modify parent's data)
- Used for parent → child communication

---

### 6. **@Output() & EventEmitter - Sending Events to Parent**

**What it is:** Decorator for emitting events from child to parent component.

**Syntax:**
```typescript
@Output() eventName = new EventEmitter<DataType>();

method(): void {
  this.eventName.emit(data);
}
```

**Example from Card Component:**
```typescript
@Output() cardClicked = new EventEmitter<string>();

onCardClick(): void {
  this.cardClicked.emit(this.title);  // Emits the card title
}
```

**Usage in Parent (Dashboard Component):**
```html
<app-card
  (cardClicked)="onCardClick($event)"  <!-- Event binding to @Output -->
></app-card>
```

**Component TypeScript:**
```typescript
onCardClick(cardTitle: string): void {
  this.selectedCard = cardTitle;
  console.log(`Selected Card: ${cardTitle}`);
}
```

**Key Points:**
- Child component sends events to parent
- Parent listens with `(eventName)="method($event)"`
- `$event` contains the emitted data
- Used for child → parent communication

---

### 7. **ngOnInit() - Component Lifecycle Hook**

**What it is:** Lifecycle hook that runs once when component initializes.

**Syntax:**
```typescript
export class MyComponent implements OnInit {
  ngOnInit(): void {
    // Code runs here once after component is created
  }
}
```

**Example from Dashboard Component:**
```typescript
export class Dashboard implements OnInit {
  ngOnInit(): void {
    console.log('Dashboard loaded');
    
    // Load data from service
    this.transactions = this.expenseService.getTransactions();
    this.filteredTransactions = this.transactions;
  }
}
```

**Other Lifecycle Hooks:**
- `ngOnChanges()` - Runs when @Input properties change
- `ngOnInit()` - Runs once after component initializes
- `ngDoCheck()` - Runs on every change detection cycle
- `ngAfterViewInit()` - Runs after view is fully initialized
- `ngOnDestroy()` - Runs when component is destroyed

**Key Points:**
- Perfect for initial data loading
- Called after constructor
- Component is not rendered yet
- Use for subscriptions, service calls
- Must implement OnInit interface

---

### 8. **Structural Directives**

#### **8a. *ngFor - Loop through arrays**

**Syntax:**
```html
<element *ngFor="let item of array; let i = index">
  {{ item }}
</element>
```

**Example from Dashboard Component:**
```html
<app-card
  *ngFor="let card of cardData"   <!-- Loops through cardData -->
  [title]="card.title"
  [amount]="card.amount"
  [color]="card.color"
></app-card>
```

**Available variables:**
- `$index` - Current loop index
- `$first` - True if first iteration
- `$last` - True if last iteration
- `$even` - True if even index
- `$odd` - True if odd index

**Example with index:**
```html
<div *ngFor="let transaction of transactions; let i = index">
  {{ i + 1 }}. {{ transaction.title }}
</div>
```

**Key Points:**
- Repeats template for each item in array
- `trackBy` for performance optimization
- Local variable available in template
- Removes elements when array shrinks

#### **8b. *ngIf - Conditional rendering**

**Syntax:**
```html
<element *ngIf="condition">Content</element>
```

**Example from Dashboard Component:**
```html
<!-- Show when no transactions -->
<div *ngIf="filteredTransactions.length === 0">
  No transactions found
</div>

<!-- Show when transactions exist -->
<div *ngIf="filteredTransactions.length > 0">
  <div *ngFor="let transaction of filteredTransactions">
    {{ transaction.title }}
  </div>
</div>
```

**With else block:**
```html
<div *ngIf="isLoggedIn; else notLoggedIn">
  Welcome!
</div>

<ng-template #notLoggedIn>
  Please log in
</ng-template>
```

**Key Points:**
- Adds/removes element from DOM (not just hidden)
- `else` block for alternative content
- Better performance for hidden content than `display:none`

#### **8c. [ngClass] - Conditional class binding**

**Syntax:**
```html
<element [ngClass]="'class-name'"></element>
<element [ngClass]="{ 'class1': condition1, 'class2': condition2 }"></element>
```

**Example from Dashboard Component:**
```html
<div 
  [ngClass]="isHighExpense(transaction.amount) ? 'high-expense' : 'normal-expense'"
>
  {{ transaction.amount | currency }}
</div>
```

**Example from Sidebar Component:**
```html
<button
  [class.active]="activeMenuId === item.id"  <!-- Single class binding -->
>
  {{ item.name }}
</button>
```

**Key Points:**
- Applies classes conditionally
- Object syntax for multiple classes
- String syntax for single class
- Updates dynamically

---

### 9. **Pipes - Data Formatting**

**Syntax:**
```html
{{ value | pipeName }}
{{ value | pipeName:parameter }}
```

#### **9a. Date Pipe**

**Syntax:**
```html
{{ date | date:'format' }}
```

**Examples from Header Component:**
```html
<!-- fullDate format -->
{{ currentDate | date:'fullDate' }}   <!-- Sunday, June 22, 2026 -->

<!-- short format -->
{{ currentDate | date:'short' }}      <!-- 6/22/26, 9:16 AM -->

<!-- medium format -->
{{ currentDate | date:'medium' }}     <!-- Jun 22, 2026, 9:16:08 AM -->

<!-- shortDate format -->
{{ currentDate | date:'shortDate' }}  <!-- 6/22/26 -->
```

**Common Formats:**
- `'short'` - Date and time short format
- `'medium'` - Date and time medium format
- `'long'` - Date and time long format
- `'fullDate'` - Full date name
- `'shortDate'` - Short date format
- `'HH:mm:ss'` - Custom format

#### **9b. Currency Pipe**

**Syntax:**
```html
{{ amount | currency:'CurrencyCode':'Symbol' }}
```

**Examples from Dashboard Component:**
```html
<!-- Indian Rupee -->
{{ transaction.amount | currency:'INR':'₹':'1.0-0' }}   <!-- ₹5,500 -->

<!-- US Dollar -->
{{ amount | currency:'USD':'$':'1.0-0' }}               <!-- $5,500 -->

<!-- Euro -->
{{ amount | currency:'EUR':'€':'1.0-0' }}               <!-- €5,500 -->

<!-- Show with decimals -->
{{ amount | currency:'INR':'₹':'1.2-2' }}               <!-- ₹5,500.00 -->
```

**Parameters Explained:**
- 1st: Currency code (INR, USD, EUR, GBP, etc.)
- 2nd: Symbol to display (₹, $, €, £, etc.)
- 3rd: Number format (minDigits.minDecimals-maxDecimals)

#### **9c. Number Pipe**

**Syntax:**
```html
{{ amount | number:'1.0-0' }}
```

**Examples:**
```html
{{ 12345.67 | number:'1.0-0' }}        <!-- 12,346 -->
{{ 12345.67 | number:'1.2-2' }}        <!-- 12,345.67 -->
{{ 0.234 | number:'0.0-2' }}           <!-- 0.23 -->
```

**Key Points:**
- Pipes format data for display
- Don't modify the actual data
- Can chain multiple pipes: `{{ date | date:'short' | uppercase }}`
- Create custom pipes for special formatting

---

### 10. **Standalone Components**

**What it is:** Components that manage their own dependencies (no NgModule needed).

**Syntax:**
```typescript
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],  // Import dependencies
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  // Component code
}
```

**Benefits:**
- Simpler code structure
- No NgModule boilerplate
- Tree-shakable (unused code is removed)
- Easier to test
- Modern Angular approach

**Key Points:**
- `standalone: true` enables standalone mode
- `imports` array contains all needed modules
- Used in Angular 14+ (standard in Angular 20)
- Can import other components, directives, pipes

---

## 🔄 Component Communication Flow

### Hierarchy:
```
App Component (Root)
├── Header Component
├── Sidebar Component
└── Dashboard Component
    ├── Card Component (used 3 times for Income, Expenses, Savings)
    └── Uses ExpenseService
```

### Data Flow:

1. **Parent → Child (@Input)**
   ```
   Dashboard → Card: [title], [amount], [color]
   ```

2. **Child → Parent (@Output)**
   ```
   Card → Dashboard: (cardClicked)="event"
   ```

3. **Component → Service → Component**
   ```
   Dashboard → (injects) ExpenseService
   Service → (returns) transactions
   Dashboard → displays transactions
   ```

4. **User Interaction:**
   ```
   User clicks menu → (click)="onMenuClick()"
   Sidebar component handles → logs to console
   ```

---

## 📄 File Descriptions

### **1. header.ts & header.html & header.scss**
- **Purpose:** Displays app branding and user information
- **Concepts:** Interpolation, Date pipe, Property binding
- **Outputs:** Logo, title, username, current date

### **2. sidebar.ts & sidebar.html & sidebar.scss**
- **Purpose:** Navigation menu for app
- **Concepts:** *ngFor, Event binding, Conditional styling
- **Outputs:** Menu items with active state

### **3. card.ts & card.html & card.scss**
- **Purpose:** Reusable card component for displaying expense data
- **Concepts:** @Input, @Output, EventEmitter
- **Outputs:** Card with title, amount, color

### **4. dashboard.ts & dashboard.html & dashboard.scss**
- **Purpose:** Main content area with summary and transactions
- **Concepts:** All of the above + pipes, ngOnInit, service injection
- **Outputs:** Cards grid, search box, transactions table

### **5. expense.ts (Service)**
- **Purpose:** Provides business logic for expenses
- **Concepts:** Dependency injection, Data management
- **Provides:** getTransactions(), addTransaction(), deleteTransaction()

### **6. expense.ts (Model/Interface)**
- **Purpose:** Defines expense data structure
- **Concepts:** TypeScript interfaces
- **Exports:** Expense interface with id, title, amount, category, date

### **7. app.ts & app.html & app.scss**
- **Purpose:** Root component combining all sub-components
- **Concepts:** Component composition, Layout structure
- **Outputs:** Full application layout

### **8. styles.scss (Global Styles)**
- **Purpose:** Global CSS variables, resets, utilities
- **Concepts:** CSS custom properties, responsive design
- **Provides:** Color palette, spacing, shadows, animations

---

## 🎨 CSS Concepts Demonstrated

### **1. Flexbox Layout**
```css
.container {
  display: flex;
  justify-content: space-between;   /* Distribute items */
  align-items: center;              /* Vertical alignment */
  gap: 1rem;                        /* Space between items */
}
```

### **2. CSS Grid**
```css
.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}
```

### **3. Border Radius (Rounded Corners)**
```css
.card {
  border-radius: 12px;              /* Rounded corners */
}
```

### **4. Box Shadow (Depth)**
```css
.card {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
```

### **5. Hover Effects**
```css
.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}
```

### **6. Transitions (Smooth Animations)**
```css
.card {
  transition: all 0.3s ease;        /* Smooth property changes */
}
```

### **7. Responsive Design**
```css
.cards-grid {
  grid-template-columns: repeat(3, 1fr);
}

@media (max-width: 768px) {
  .cards-grid {
    grid-template-columns: 1fr;     /* Stack vertically on mobile */
  }
}
```

---

## 🚀 Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## ✅ Checklist - Concepts Used

- [x] Interpolation {{ }}
- [x] Property Binding [property]
- [x] Event Binding (event)
- [x] Two-way Binding [(ngModel)]
- [x] @Input() decorator
- [x] @Output() with EventEmitter
- [x] ngOnInit lifecycle hook
- [x] *ngFor structural directive
- [x] *ngIf structural directive
- [x] [ngClass] conditional styling
- [x] Date pipe | date
- [x] Currency pipe | currency
- [x] Number pipe | number
- [x] Standalone components
- [x] Service dependency injection
- [x] Flexbox layout
- [x] CSS Grid layout
- [x] Border radius
- [x] Box shadow
- [x] Hover effects
- [x] Transition effects
- [x] Responsive design

---

## 🎓 Learning Outcomes

After completing this project, you should understand:

1. How Angular components communicate with @Input and @Output
2. How to use pipes to format data in templates
3. How to structure standalone components
4. How to implement proper CSS layouts with Flexbox and Grid
5. How to create responsive, modern UIs
6. How to inject and use services for business logic
7. How to handle events and user interactions
8. How to use lifecycle hooks for initialization
9. How to bind data in multiple directions
10. How to create professional-looking dashboards

---

**Created with ❤️ using Angular 20**
