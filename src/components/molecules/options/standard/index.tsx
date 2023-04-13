import React from 'react';
import * as Contracts from '../../../../contracts';
import * as Atoms from '../../../atoms';

export interface StandardProps<T extends string> {
    id?: string;
    options: Contracts.DropdownOption[];
    onOptionClick: (option?: string) => void;
    filter?: string | null;
    onFilteredChange: (options: string[]) => void;
    current?: T;
    anchor?: Contracts.Anchor;
    'data-testid'?: string;
}

export const Standard = React.forwardRef(
    <T extends string>(
        { id, options, filter, onOptionClick, onFilteredChange, current, anchor, ...props }: StandardProps<T>,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        const filtered = React.useMemo(
            () => options.filter((option) => Contracts.filterOptions(option, filter)),
            [options, filter],
        );
        const top = React.useMemo(() => {
            if (anchor?.direction === 'DOWN') return anchor.at;
        }, [anchor]);

        const bottom = React.useMemo(() => {
            if (anchor?.direction === 'UP') return anchor.at;
        }, [anchor]);

        React.useEffect(() => {
            onFilteredChange(filtered.map((fltr) => fltr.value));
        }, [filtered]);

        const selected = React.useMemo(
            () => filtered.filter((option) => option.value === current).pop(),
            [options, current],
        );

        return (
            <div className='dropdown-content' ref={ref} style={{ top, bottom, maxHeight: Contracts.MENU_MAX_HEIGHT }}>
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
