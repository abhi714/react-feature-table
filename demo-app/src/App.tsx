import { useState, useMemo } from 'react';
import { FeatureTable, useFeatureTable } from 'react-feature-table';
import type { Column } from 'react-feature-table';
import 'react-feature-table/styles.css';
import './App.css';

import usersJson from './data/users.json';
import productsJson from './data/products.json';

import {
  Table as TableIcon,
  Search,
  ArrowUpDown,
  FileJson,
  Sliders,
  CheckCircle2,
  Users,
  Package,
  Layers,
  Copy,
  Check,
  RotateCcw,
  Star,
  ExternalLink,
  Code
} from 'lucide-react';

interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  salary: number;
  rating: number;
  location: string;
  joinDate: string;
  avatar: string;
}

interface ProductRecord {
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: number;
  rating: number;
  status: string;
  supplier: string;
  updatedAt: string;
}

export function App() {
  // Tab state
  const [activeTab, setActiveTab] = useState<'users' | 'products' | 'hook'>('users');

  // Feature Toggle States
  const [sortable, setSortable] = useState(true);
  const [searchable, setSearchable] = useState(true);
  const [paginationEnabled, setPaginationEnabled] = useState(true);
  const [pageSize, setPageSize] = useState(8);
  const [striped, setStriped] = useState(true);
  const [hoverable, setHoverable] = useState(true);
  const [stickyHeader, setStickyHeader] = useState(false);
  const [simulateEmpty, setSimulateEmpty] = useState(false);

  // Row inspection modal state
  const [inspectedRow, setInspectedRow] = useState<any | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Raw datasets from JSON
  const rawUsers: UserRecord[] = usersJson;
  const rawProducts: ProductRecord[] = productsJson;

  const activeUsersData = useMemo(() => (simulateEmpty ? [] : rawUsers), [simulateEmpty, rawUsers]);
  const activeProductsData = useMemo(() => (simulateEmpty ? [] : rawProducts), [simulateEmpty, rawProducts]);

  // Reset toggles to defaults
  const resetToDefaults = () => {
    setSortable(true);
    setSearchable(true);
    setPaginationEnabled(true);
    setPageSize(8);
    setStriped(true);
    setHoverable(true);
    setStickyHeader(false);
    setSimulateEmpty(false);
  };

  // User Columns Configuration
  const userColumns: Column<UserRecord>[] = [
    {
      key: 'name',
      title: 'User / Engineer',
      render: (_val, row) => (
        <div className="user-cell">
          <img src={row.avatar} alt={row.name} className="user-avatar" />
          <div className="user-info">
            <span className="user-name">{row.name}</span>
            <span className="user-email">{row.email}</span>
          </div>
        </div>
      ),
      sortable: true,
      searchable: true,
    },
    {
      key: 'department',
      title: 'Department',
      render: (val) => <span className="role-tag">{val}</span>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'role',
      title: 'Role',
      sortable: true,
      searchable: true,
    },
    {
      key: 'status',
      title: 'Status',
      align: 'center',
      render: (val) => {
        let statusClass = 'status-active';
        if (val === 'On Leave') statusClass = 'status-leave';
        if (val === 'Offline') statusClass = 'status-offline';
        if (val === 'Suspended') statusClass = 'status-suspended';
        return (
          <span className={`status-pill ${statusClass}`}>
            <span className="status-dot" />
            {val}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'rating',
      title: 'Rating',
      align: 'center',
      render: (val) => (
        <div className="rating-badge">
          <Star size={13} fill="#facc15" color="#facc15" />
          <span>{Number(val).toFixed(1)}</span>
        </div>
      ),
      sortable: true,
    },
    {
      key: 'salary',
      title: 'Salary (USD)',
      align: 'right',
      render: (val) => (
        <span className="money-badge">
          ${Number(val).toLocaleString()}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'location',
      title: 'Location',
      sortable: true,
      searchable: true,
    },
    {
      key: 'actions',
      title: 'Actions',
      align: 'center',
      sortable: false,
      searchable: false,
      render: (_val, row) => (
        <button
          className="btn-inspect"
          onClick={(e) => {
            e.stopPropagation();
            setInspectedRow(row);
          }}
        >
          Inspect
        </button>
      ),
    },
  ];

  // Product Columns Configuration
  const productColumns: Column<ProductRecord>[] = [
    {
      key: 'sku',
      title: 'SKU',
      render: (val) => <span className="sku-code">{val}</span>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'name',
      title: 'Product Name',
      render: (val) => <span style={{ fontWeight: 600, color: '#f8fafc' }}>{val}</span>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'category',
      title: 'Category',
      render: (val) => <span className="role-tag">{val}</span>,
      sortable: true,
      searchable: true,
    },
    {
      key: 'stock',
      title: 'Units In Stock',
      align: 'right',
      render: (val) => (
        <span style={{ fontWeight: 600, color: val === 0 ? '#fb7185' : '#e2e8f0' }}>
          {val}
        </span>
      ),
      sortable: true,
    },
    {
      key: 'price',
      title: 'Unit Price',
      align: 'right',
      render: (val) => <span className="money-badge">${Number(val).toFixed(2)}</span>,
      sortable: true,
    },
    {
      key: 'status',
      title: 'Status',
      align: 'center',
      render: (val) => {
        let cls = 'status-active';
        if (val === 'Low Stock') cls = 'status-low';
        if (val === 'Out of Stock') cls = 'status-out';
        return (
          <span className={`status-pill ${cls}`}>
            <span className="status-dot" />
            {val}
          </span>
        );
      },
      sortable: true,
    },
    {
      key: 'supplier',
      title: 'Supplier',
      sortable: true,
      searchable: true,
    },
    {
      key: 'actions',
      title: 'Actions',
      align: 'center',
      sortable: false,
      searchable: false,
      render: (_val, row) => (
        <button
          className="btn-inspect"
          onClick={(e) => {
            e.stopPropagation();
            setInspectedRow(row);
          }}
        >
          Inspect
        </button>
      ),
    },
  ];

  // Hook sandbox instance using exported useFeatureTable hook
  const hookTable = useFeatureTable({
    data: activeUsersData,
    columns: userColumns,
    sortable,
    searchable,
    pageSize,
  });

  const generatedCode = `<FeatureTable<UserRecord>
  data={usersData} // Loaded directly from users.json (${rawUsers.length} records)
  columns={userColumns}
  rowKey="id"
  sortable={${sortable}}
  searchable={${searchable}}
  pagination={${paginationEnabled ? `{ pageSize: ${pageSize}, showTotal: true }` : 'false'}}
  striped={${striped}}
  hoverable={${hoverable}}
  stickyHeader={${stickyHeader}}
  emptyText="No records found in dataset"
  onRowClick={(row) => console.log('Clicked row:', row)}
/>`;

  const copyCodeToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="demo-container">
      {/* Header */}
      <header className="demo-header">
        <div>
          <div className="brand-badge">
            <Layers size={14} />
            <span>NPM Package Playground</span>
          </div>
          <h1 className="hero-title">react-feature-table</h1>
          <p className="hero-desc">
            Testbench for the lightweight, flexible React data table with built-in toggleable sorting, search, and pagination. Powered by local <code>.json</code> datasets.
          </p>
        </div>

        <div className="header-actions">
          <div className="action-pill" style={{ fontFamily: 'var(--font-mono)' }}>
            npm i react-feature-table
          </div>
          <a
            href="https://github.com/abhi714/react-feature-table"
            target="_blank"
            rel="noreferrer"
            className="action-pill accent"
          >
            <span>GitHub Repository</span>
            <ExternalLink size={14} />
          </a>
        </div>
      </header>

      {/* Metric Cards Banner */}
      <section className="stats-grid">
        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60a5fa' }}>
            <FileJson size={22} />
          </div>
          <div>
            <div className="stat-label">Active Dataset</div>
            <div className="stat-value">
              {simulateEmpty ? '0 items' : activeTab === 'users' ? `${rawUsers.length} Users` : `${rawProducts.length} Items`}
            </div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399' }}>
            <ArrowUpDown size={22} />
          </div>
          <div>
            <div className="stat-label">Sorting Feature</div>
            <div className="stat-value">{sortable ? 'Enabled' : 'Disabled'}</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24' }}>
            <Search size={22} />
          </div>
          <div>
            <div className="stat-label">Search Filter</div>
            <div className="stat-value">{searchable ? 'Global' : 'Off'}</div>
          </div>
        </div>

        <div className="glass-panel stat-card">
          <div className="stat-icon" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa' }}>
            <TableIcon size={22} />
          </div>
          <div>
            <div className="stat-label">Pagination</div>
            <div className="stat-value">{paginationEnabled ? `${pageSize} / page` : 'Off'}</div>
          </div>
        </div>
      </section>

      {/* Main Layout */}
      <div className="demo-layout">
        {/* Left Sidebar: Interactive Controls */}
        <aside className="glass-panel control-panel">
          <div className="panel-header">
            <span className="panel-title">
              <Sliders size={18} color="#60a5fa" />
              <span>Feature Toggles</span>
            </span>
            <button className="btn-reset" onClick={resetToDefaults} title="Reset to defaults">
              <RotateCcw size={12} style={{ display: 'inline', marginRight: 4 }} />
              Reset
            </button>
          </div>

          <div className="section-label">Core Capabilities</div>

          <div className="toggle-item">
            <div className="toggle-info">
              <span className="toggle-name">Sorting</span>
              <span className="toggle-desc">Toggle column header click-to-sort</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={sortable} onChange={(e) => setSortable(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-info">
              <span className="toggle-name">Global Search</span>
              <span className="toggle-desc">Show/hide top fuzzy search input</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={searchable} onChange={(e) => setSearchable(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-info">
              <span className="toggle-name">Pagination</span>
              <span className="toggle-desc">Enable bottom page navigation</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={paginationEnabled} onChange={(e) => setPaginationEnabled(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          {paginationEnabled && (
            <div className="control-select-group">
              <label className="control-label">Page Size ({pageSize} items):</label>
              <select
                className="control-select"
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
              >
                <option value={5}>5 items per page</option>
                <option value={8}>8 items per page</option>
                <option value={10}>10 items per page</option>
                <option value={15}>15 items per page</option>
                <option value={25}>25 items per page</option>
              </select>
            </div>
          )}

          <div className="section-label">Styling & Layout</div>

          <div className="toggle-item">
            <div className="toggle-info">
              <span className="toggle-name">Zebra Striping</span>
              <span className="toggle-desc">Alternating row background colors</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={striped} onChange={(e) => setStriped(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-info">
              <span className="toggle-name">Row Hover Effect</span>
              <span className="toggle-desc">Highlight row on mouse hover</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={hoverable} onChange={(e) => setHoverable(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="toggle-item">
            <div className="toggle-info">
              <span className="toggle-name">Sticky Header</span>
              <span className="toggle-desc">Fix header at top during scroll</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={stickyHeader} onChange={(e) => setStickyHeader(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>

          <div className="section-label">Edge Cases</div>

          <div className="toggle-item">
            <div className="toggle-info">
              <span className="toggle-name">Simulate Empty State</span>
              <span className="toggle-desc">Pass empty array [] to test emptyText</span>
            </div>
            <label className="switch">
              <input type="checkbox" checked={simulateEmpty} onChange={(e) => setSimulateEmpty(e.target.checked)} />
              <span className="slider"></span>
            </label>
          </div>
        </aside>

        {/* Right Area: Table Showcase & Sandbox */}
        <main className="showcase-area">
          {/* Tabs bar */}
          <div className="glass-panel tabs-bar">
            <div className="tabs-group">
              <button
                className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
                onClick={() => setActiveTab('users')}
              >
                <Users size={16} />
                <span>Users & Team</span>
                <span className="tab-chip">.json</span>
              </button>

              <button
                className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                onClick={() => setActiveTab('products')}
              >
                <Package size={16} />
                <span>Product Catalog</span>
                <span className="tab-chip">.json</span>
              </button>

              <button
                className={`tab-btn ${activeTab === 'hook' ? 'active' : ''}`}
                onClick={() => setActiveTab('hook')}
              >
                <Code size={16} />
                <span>useFeatureTable Hook Sandbox</span>
              </button>
            </div>

            <div className="dataset-badge">
              <FileJson size={14} />
              <span>
                {activeTab === 'users' ? 'src/data/users.json' : activeTab === 'products' ? 'src/data/products.json' : 'custom hook consumer'}
              </span>
            </div>
          </div>

          {/* Active View */}
          {activeTab === 'users' && (
            <div className="demo-table-wrapper">
              <FeatureTable<UserRecord>
                data={activeUsersData}
                columns={userColumns}
                rowKey="id"
                sortable={sortable}
                searchable={searchable}
                pagination={paginationEnabled ? { pageSize, showTotal: true } : false}
                striped={striped}
                hoverable={hoverable}
                stickyHeader={stickyHeader}
                emptyText="No user records matched your criteria."
                onRowClick={(row) => setInspectedRow(row)}
              />
            </div>
          )}

          {activeTab === 'products' && (
            <div className="demo-table-wrapper">
              <FeatureTable<ProductRecord>
                data={activeProductsData}
                columns={productColumns}
                rowKey="sku"
                sortable={sortable}
                searchable={searchable}
                pagination={paginationEnabled ? { pageSize, showTotal: true } : false}
                striped={striped}
                hoverable={hoverable}
                stickyHeader={stickyHeader}
                emptyText="No product catalog records found."
                onRowClick={(row) => setInspectedRow(row)}
              />
            </div>
          )}

          {activeTab === 'hook' && (
            <div className="glass-panel" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Custom Card Grid powered by `useFeatureTable`</h3>
                  <p style={{ fontSize: '13px', color: '#94a3b8' }}>
                    Testing headless hook logic: filter query, sort, and slice without the default table markup.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Search cards..."
                    value={hookTable.searchTerm}
                    onChange={(e) => hookTable.setSearchTerm(e.target.value)}
                    className="rft-search-input"
                    style={{ background: '#1e293b', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
              </div>

              <div className="hook-grid">
                {hookTable.paginatedData.map((user) => (
                  <div key={user.id} className="hook-card" onClick={() => setInspectedRow(user)} style={{ cursor: 'pointer' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={user.avatar} alt={user.name} className="user-avatar" />
                      <div>
                        <div style={{ fontWeight: 600, color: '#f8fafc' }}>{user.name}</div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>{user.role}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                      <span className="role-tag">{user.department}</span>
                      <span className="money-badge">${user.salary.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                      <div className="rating-badge">
                        <Star size={12} fill="#facc15" color="#facc15" />
                        <span>{user.rating}</span>
                      </div>
                      <span style={{ fontSize: '11px', color: '#64748b' }}>{user.location}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Hook pagination controls */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ fontSize: '13px', color: '#94a3b8' }}>
                  Showing {hookTable.paginatedData.length} of {hookTable.totalItems} cards (Page {hookTable.currentPage} of {hookTable.totalPages})
                </span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="rft-pagination-btn"
                    disabled={hookTable.currentPage <= 1}
                    onClick={() => hookTable.setCurrentPage(hookTable.currentPage - 1)}
                  >
                    Previous
                  </button>
                  <button
                    className="rft-pagination-btn"
                    disabled={hookTable.currentPage >= hookTable.totalPages}
                    onClick={() => hookTable.setCurrentPage(hookTable.currentPage + 1)}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Live Code Preview */}
          <div className="glass-panel code-preview">
            <div className="code-header">
              <span className="code-title">Live Component Integration Preview</span>
              <button className="btn-copy" onClick={copyCodeToClipboard}>
                {copiedCode ? (
                  <>
                    <Check size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={12} style={{ display: 'inline', marginRight: 4 }} />
                    Copy JSX
                  </>
                )}
              </button>
            </div>
            <pre className="json-box" style={{ color: '#a5f3fc' }}>
              {generatedCode}
            </pre>
          </div>
        </main>
      </div>

      {/* Row Inspection Modal (testing onRowClick) */}
      {inspectedRow && (
        <div className="modal-overlay" onClick={() => setInspectedRow(null)}>
          <div className="glass-panel modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title">
                <CheckCircle2 size={20} color="#10b981" />
                <span>Row Inspection (onRowClick Event)</span>
              </div>
              <button className="btn-close" onClick={() => setInspectedRow(null)}>
                &times;
              </button>
            </div>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>
              Full JSON object payload received from the clicked row item:
            </p>
            <pre className="json-box">{JSON.stringify(inspectedRow, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
