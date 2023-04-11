import React from 'react';
import * as Contracts from 'contracts';
import * as Atoms from 'components/atoms';

export interface StandardProps<T extends string> {
    id?: string;
    options: Contracts.DropdownOption[];
    top?: number;
    onOptionClick: (option?: string) => void;
    filter?: string | null;
    onFilteredChange: (options: string[]) => void;
    current?: T;
    'data-testid'?: string;
}

export const Standard = React.forwardRef(
    <T extends string>(
        { id, options, top, filter, onOptionClick, onFilteredChange, current, ...props }: StandardProps<T>,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        const filtered = React.useMemo(
            () => options.filter((option) => Contracts.filterOptions(option, filter)),
            [options, filter],
        );

        React.useEffect(() => {
            onFilteredChange(filtered.map((filter) => filter.value));
        }, [filtered]);

        const selected = React.useMemo(
            () => filtered.filter((option) => option.label === current).pop(),
            [options, current],
        );

        return (
            <div className='dropdown-content' ref={ref} style={{ top }}>
                {filtered.map((option, index) => (
                    <Atoms.Option
                        key={option.value}
                        onClick={onOptionClick}
                        id={id?.concat('option').concat(option.value)}
                        option={option}
                        selected={selected}
                        data-testid={`${props['data-testid']}-${index}`}
                    />
                ))}
            </div>
        );
    },
);
