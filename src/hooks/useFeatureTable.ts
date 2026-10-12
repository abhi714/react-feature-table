import { useMemo, useState } from 'react';
import { Column, SortOrder } from '../types';

interface UseFeatureTableProps<T> {
    data: T[];
    columns: Column<T>[];
    sortable?: boolean;
    searchable?: boolean;
    pageSize?: number;
}

export function useFeatureTable<T extends Record<string, any>>({
    data,
    columns,
    sortable = true,
    searchable = true,
    pageSize = 10,
}: UseFeatureTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState<keyof T | string | null>(null);
    const [sortOrder, setSortOrder] = useState<SortOrder>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(pageSize);

    // 1. Filtering
    const filteredData = useMemo(() => {
        if (!searchable || !searchTerm.trim()) return data;

        const query = searchTerm.toLowerCase();
        const searchableColumns = columns.filter((col) => col.searchable !== false);

        return data.filter((row) =>
            searchableColumns.some((col) => {
                const val = row[col.key as string];
                return val !== null && val !== undefined && String(val).toLowerCase().includes(query);
            })
        );
    }, [data, columns, searchTerm, searchable]);

    // 2. Sorting
    const sortedData = useMemo(() => {
        if (!sortable || !sortKey || !sortOrder) return filteredData;

        return [...filteredData].sort((a, b) => {
            const aVal = a[sortKey as string];
            const bVal = b[sortKey as string];

            if (aVal === bVal) return 0;
            if (aVal === null || aVal === undefined) return 1;
            if (bVal === null || bVal === undefined) return -1;

            let comparison = 0;
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                comparison = aVal - bVal;
            } else {
                comparison = String(aVal).localeCompare(String(bVal));
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });
    }, [filteredData, sortKey, sortOrder, sortable]);

    // 3. Pagination
    const totalItems = sortedData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedData.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedData, currentPage, itemsPerPage]);

    const handleSort = (key: keyof T | string) => {
        if (!sortable) return;

        if (sortKey === key) {
            if (sortOrder === 'asc') setSortOrder('desc');
            else if (sortOrder === 'desc') {
                setSortOrder(null);
                setSortKey(null);
            }
        } else {
            setSortKey(key);
            setSortOrder('asc');
        }
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return {
        searchTerm,
        setSearchTerm: (term: string) => {
            setSearchTerm(term);
            setCurrentPage(1);
        },
        sortKey,
        sortOrder,
        handleSort,
        currentPage,
        setCurrentPage: handlePageChange,
        itemsPerPage,
        setItemsPerPage,
        totalPages,
        totalItems,
        paginatedData,
    };
}