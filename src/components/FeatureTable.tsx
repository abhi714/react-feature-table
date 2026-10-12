import React from 'react';
import { FeatureTableProps, PaginationOptions } from '../types';
import { useFeatureTable } from '../hooks/useFeatureTable';
import { TableSearch } from './TableSearch';
import { TablePagination } from './TablePagination';

export function FeatureTable<T extends Record<string, any>>({
    data,
    columns,
    rowKey,
    sortable = true,
    searchable = true,
    pagination = true,
    striped = true,
    hoverable = true,
    stickyHeader = false,
    emptyText = 'No data available',
    className = '',
    style,
    onRowClick,
}: FeatureTableProps<T>) {
    const paginationOpts: PaginationOptions = typeof pagination === 'object' ? pagination : {};
    const isPaginationEnabled = Boolean(pagination);

    const {
        searchTerm,
        setSearchTerm,
        sortKey,
        sortOrder,
        handleSort,
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems,
        paginatedData,
    } = useFeatureTable({
        data,
        columns,
        sortable,
        searchable,
        pageSize: paginationOpts.pageSize || 10,
    });

    const displayData = isPaginationEnabled ? paginatedData : data;

    const getRowKey = (row: T, idx: number): string | number => {
        if (typeof rowKey === 'function') return rowKey(row);
        if (typeof rowKey === 'string' && row[rowKey]) return row[rowKey];
        return idx;
    };

    return (
        <div className={`rft-container ${className}`} style={style}>
            {searchable && (
                <TableSearch
                    value={searchTerm}
                    onChange={setSearchTerm}
                />
            )}

            <div className="rft-table-wrapper">
                <table className={`rft-table ${striped ? 'striped' : ''} ${hoverable ? 'hoverable' : ''}`}>
                    <thead style={stickyHeader ? { position: 'sticky', top: 0, zIndex: 1 } : undefined}>
                        <tr>
                            {columns.map((col) => {
                                const canSort = sortable && col.sortable !== false;
                                const isCurrentSort = sortKey === col.key;
                                return (
                                    <th
                                        key={String(col.key)}
                                        className={`rft-th ${canSort ? 'rft-sortable' : ''}`}
                                        style={{ width: col.width, textAlign: col.align || 'left' }}
                                        onClick={() => canSort && handleSort(col.key)}
                                    >
                                        {col.title}
                                        {canSort && (
                                            <span className="rft-sort-icon">
                                                {isCurrentSort ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : ' ⇅'}
                                            </span>
                                        )}
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {displayData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="rft-empty">
                                    {emptyText}
                                </td>
                            </tr>
                        ) : (
                            displayData.map((row, idx) => (
                                <tr
                                    key={getRowKey(row, idx)}
                                    onClick={() => onRowClick?.(row, idx)}
                                    style={{ cursor: onRowClick ? 'pointer' : 'default' }}
                                >
                                    {columns.map((col) => {
                                        const value = row[col.key as string];
                                        return (
                                            <td
                                                key={String(col.key)}
                                                className="rft-td"
                                                style={{ textAlign: col.align || 'left' }}
                                            >
                                                {col.render ? col.render(value, row, idx) : String(value ?? '')}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isPaginationEnabled && (
                <TablePagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={totalItems}
                    displayCount={displayData.length}
                    showTotal={paginationOpts.showTotal !== false}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
}