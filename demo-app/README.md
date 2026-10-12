# react-feature-table Demo Application

Interactive testbed and playground application for testing and previewing `react-feature-table`.

## Features Tested
- **JSON Dataset Loading**: Real-time rendering of [`src/data/users.json`](./src/data/users.json) and [`src/data/products.json`](./src/data/products.json).
- **Sorting**: Multi-column sorting (string, numeric, currency, ratings).
- **Search**: Fuzzy global search filter across columns.
- **Pagination**: Toggleable pagination with customizable page sizes (5, 8, 10, 15, 25).
- **Custom Renderers**: User avatars, status pills, rating stars, formatted currencies, and action triggers.
- **Interactive Inspection**: `onRowClick` handler displaying full JSON payload in an inspection modal.
- **Hook Sandbox**: Headless testing of `useFeatureTable` with a custom card grid.
- **Empty State**: Toggle simulation for empty datasets (`emptyText`).

## Running the Demo

From the repository root:
```bash
npm run demo
```

Or directly from `demo-app`:
```bash
cd demo-app
npm install
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.
