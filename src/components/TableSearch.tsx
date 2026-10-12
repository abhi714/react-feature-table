import React from 'react';

export interface TableSearchProps {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
}

export function TableSearch({
    value,
    onChange,
    placeholder = 'Search...',
    className = '',
}: TableSearchProps) {
    return (
        <div className={`rft-toolbar ${className}`}>
            <input
                type="text"
                className="rft-search-input"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}
