import { ReactNode } from 'react';

export type SortOrder = 'asc' | 'desc' | null;

export interface Column<T> {
    key: keyof T | string;
    title: string;
    sortable?: boolean;
    searchable?: boolean;
    render?: (value: any, row: T, index: number) => ReactNode;
    width?: string | number;
    align?: 'left' | 'center' | 'right';
    sticky?: 'left' | 'right';
}

export interface PaginationOptions {
    pageSize?: number;
    pageSizeOptions?: number[];
    showTotal?: boolean;
}

export interface FeatureTableProps<T> {
    data: T[];
    columns: Column<T>[];
    rowKey?: keyof T | ((row: T) => string | number);

    // Feature Toggles
    sortable?: boolean;
    searchable?: boolean;
    pagination?: boolean | PaginationOptions;

    // Presentation Props
    bordered?: boolean;
    striped?: boolean;
    hoverable?: boolean;
    stickyHeader?: boolean;
    emptyText?: string;
    className?: string;
    style?: React.CSSProperties;

    // Event handlers
    onRowClick?: (row: T, index: number) => void;
}