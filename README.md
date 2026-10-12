# react-feature-table 🚀

[![npm version](https://img.shields.io/npm/v/react-feature-table.svg)](https://www.npmjs.com/package/react-feature-table)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-%3E%3D17.0.0-61dafb.svg)](https://react.dev/)

A lightweight, flexible, and fully configurable React data table component with toggleable sorting, search, and pagination. Built with TypeScript and zero external runtime dependencies.

---

## ✨ Features

- ⚡ **Lightweight & Fast**: Zero runtime dependencies (only React as peer dependency).
- 🔍 **Instant Search**: Fast, case-insensitive global fuzzy search across any or all columns.
- ⇅ **Multi-Type Sorting**: Sort numbers, strings, and custom values in ascending or descending order.
- 📄 **Smart Pagination**: Customizable page size with total entries calculation and navigation buttons.
- 🎨 **Custom Cell Renderers**: Render custom badges, images, action buttons, or interactive components with ease.
- 🎛️ **Headless Hook (`useFeatureTable`)**: Exported React hook for building custom table layouts or card grids.
- 💅 **Styling Ready**: Includes clean modern styles with optional zebra striping, row hover highlights, and sticky header.
- 🛡️ **Fully Typed**: 100% written in TypeScript with full generics support.

---

## 📦 Installation

```bash
npm install react-feature-table
```

```bash
yarn add react-feature-table
```

```bash
pnpm add react-feature-table
```

---

## 🚀 Quick Start

Import the component and its stylesheet:

```tsx
import React from 'react';
import { FeatureTable, Column } from 'react-feature-table';
import 'react-feature-table/styles.css';

interface User {
  id: number;
  name: string;
  role: string;
  salary: number;
}

const data: User[] = [
  { id: 1, name: 'Sarah Connor', role: 'Lead Architect', salary: 140000 },
  { id: 2, name: 'Alex Vance', role: 'Quantum Physicist', salary: 135000 },
  { id: 3, name: 'David Bowman', role: 'Mission Commander', salary: 125000 },
];

const columns: Column<User>[] = [
  { key: 'name', title: 'Full Name', sortable: true, searchable: true },
  { key: 'role', title: 'Role', sortable: true, searchable: true },
  {
    key: 'salary',
    title: 'Salary',
    sortable: true,
    align: 'right',
    render: (value) => `$${Number(value).toLocaleString()}`,
  },
];

export function App() {
  return (
    <FeatureTable<User>
      data={data}
      columns={columns}
      rowKey="id"
      sortable
      searchable
      pagination={{ pageSize: 5 }}
      striped
      hoverable
      onRowClick={(row) => console.log('Row clicked:', row)}
    />
  );
}
```

---

## 📖 Component API

### `<FeatureTable<T> />` Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `data` | `T[]` | **Required** | The array of data records to display. |
| `columns` | `Column<T>[]` | **Required** | Column definitions. |
| `rowKey` | `keyof T \| ((row: T) => string \| number)` | `undefined` | Unique row identifier (defaults to array index). |
| `sortable` | `boolean` | `true` | Enables or disables header sorting globally. |
| `searchable` | `boolean` | `true` | Enables or disables the search toolbar input. |
| `pagination` | `boolean \| PaginationOptions` | `true` | Enables pagination or passes custom pagination options. |
| `striped` | `boolean` | `true` | Adds alternating zebra background stripes to rows. |
| `hoverable` | `boolean` | `true` | Highlights table rows on hover. |
| `stickyHeader` | `boolean` | `false` | Fixes the table header to the top during vertical scroll. |
| `emptyText` | `string` | `'No data available'` | Custom message displayed when dataset is empty. |
| `className` | `string` | `''` | Custom CSS class name for the outer container. |
| `style` | `React.CSSProperties` | `undefined` | Custom inline styles for the outer container. |
| `onRowClick` | `(row: T, index: number) => void` | `undefined` | Callback fired when a table row is clicked. |

---

### Column Configuration (`Column<T>`)

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `key` | `keyof T \| string` | **Required** | Object key corresponding to the data property. |
| `title` | `string` | **Required** | Header text displayed for the column. |
| `sortable` | `boolean` | `true` | Enable or disable sorting on this specific column. |
| `searchable` | `boolean` | `true` | Include or exclude this column from global search filtering. |
| `render` | `(value: any, row: T, index: number) => ReactNode` | `undefined` | Custom cell renderer function. |
| `width` | `string \| number` | `undefined` | Column width (e.g., `'180px'`, `'20%'`). |
| `align` | `'left' \| 'center' \| 'right'` | `'left'` | Text alignment for header and cells. |
| `sticky` | `'left' \| 'right'` | `undefined` | Make column fixed to the left or right. |

---

### Pagination Options (`PaginationOptions`)

```ts
interface PaginationOptions {
  pageSize?: number;        // Number of items per page (default: 10)
  pageSizeOptions?: number[]; // Available page sizes
  showTotal?: boolean;      // Show "Showing X of Y entries" text (default: true)
}
```

---

## 🪝 Headless Hook: `useFeatureTable`

If you want complete control over your markup or want to render cards instead of an HTML table, use the headless hook:

```tsx
import { useFeatureTable } from 'react-feature-table';

function CustomCardView({ users, columns }) {
  const {
    searchTerm,
    setSearchTerm,
    paginatedData,
    currentPage,
    setCurrentPage,
    totalPages,
    totalItems,
    handleSort,
  } = useFeatureTable({
    data: users,
    columns,
    pageSize: 8,
  });

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />

      <div className="grid">
        {paginatedData.map((user) => (
          <div key={user.id} className="card">
            <h3>{user.name}</h3>
            <p>{user.role}</p>
          </div>
        ))}
      </div>

      <button disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>
      <span>Page {currentPage} of {totalPages}</span>
      <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button>
    </div>
  );
}
```

---

## 💻 Running the Demo App

The repository includes a full interactive demo application testing all features with mock JSON datasets:

```bash
# From repository root
npm run demo
```

Or run directly:

```bash
cd demo-app
npm install
npm run dev
```

Visit `http://localhost:5174` to explore the live playground with feature toggles, modal inspectors, and dataset switchers.

---

## 🛠️ Building & Packaging

```bash
# Build TypeScript and bundle via tsup
npm run build

# Create distribution tarball
npm pack
```

---

## 📄 License

[MIT](LICENSE) © [Abhishek Bhatt](https://github.com/abhi714)