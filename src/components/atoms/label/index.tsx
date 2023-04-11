import React from 'react';

export interface LabelProps {
    label: string;
    className?: string;
    'data-testid'?: string;
}

export const Label = ({ label, className, ...props }: LabelProps) => (
    <div className={`dropdown-group-label ${className ?? ''}`} {...props}>
        {label}
    </div>
);
