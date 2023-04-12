import React from 'react';
import * as Contracts from '../../../../contracts';
import { Group } from './group';

const DEFAULT_FAVORITE = 'Favorite';
const DEFAULT_NON_FAVORITE = 'Standard';

const MAX_HEIGHT = 150;

export interface GroupedProps<T extends string> {
    id?: string;
    options: Contracts.GroupedDropdownOption[];
    onOptionClick: (option?: string) => void;
    filter?: string | null;
    onFilteredChange: (options: string[]) => void;
    onFavorize?: (option: Contracts.DropdownOption) => void;
    current?: T;
    favoriteGroupName?: string;
    nonFavoriteGroupName?: string;
    grouping?: boolean;
    favorize?: boolean;
    anchor?: Contracts.Anchor;
    'data-testid'?: string;
}

export const Grouped = React.forwardRef(
    <T extends string>(
        {
            id,
            options,
            onOptionClick,
            onFilteredChange,
            current,
            filter,
            onFavorize,
            favoriteGroupName,
            nonFavoriteGroupName,
            grouping,
            favorize,
            anchor,
            ...props
        }: GroupedProps<T>,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        const favorites = options.filter((opt) => opt.favorite).length;
        const favoritesName = favoriteGroupName ?? DEFAULT_FAVORITE;
        const nonFavoritesName = nonFavoriteGroupName ?? DEFAULT_NON_FAVORITE;
        const top = React.useMemo(() => {
            if (anchor?.direction === 'DOWN') return anchor.at;
        }, [anchor]);

        const bottom = React.useMemo(() => {
            if (anchor?.direction === 'UP') return anchor.at;
        }, [anchor]);

        const grouped = React.useMemo(() => {
            if (favorize && !grouping)
                return Contracts.mapToFavoriteGroup(
                    options,
                    { favorite: favoritesName, nonFavorite: nonFavoritesName },
                    filter,
                );
            if (!favorize) return Contracts.mapToGroups(options, filter);
            return Contracts.mapToGroupsWithFavorites(
                options,
                { favorite: favoritesName, nonFavorite: nonFavoritesName },
                filter,
            );
        }, [options, filter, favorize, favorites]);

        const selected = React.useMemo(
            () =>
                grouped
                    .reduce<Contracts.DropdownOption[]>((prev, curr) => {
                        if (!curr.isParent) return prev.concat(curr.options);
                        return curr.options.reduce<Contracts.DropdownOption[]>((prv, crr) => {
                            if (!crr.isParent) return prv.concat(crr.options);
                            return [];
                        }, []);
                    }, [])
                    .filter((option) => option.value === current)
                    .pop(),
            [options, current],
        );

        React.useEffect(() => {
            onFilteredChange(
                grouped
                    .reduce<Contracts.DropdownOption[]>((prev, curr) => {
                        if (!curr.isParent) return prev.concat(curr.options);
                        return curr.options.reduce<Contracts.DropdownOption[]>((prv, crr) => {
                            if (!crr.isParent) return prv.concat(crr.options);
                            return [];
                        }, []);
                    }, [])
                    .map((fltr) => fltr.value),
            );
        }, [grouped]);

        return (
            <div
                className='dropdown-content dropdown-grouped'
                ref={ref}
                style={{
                    top,
                    bottom,
                    maxHeight: MAX_HEIGHT,
                    marginTop: anchor?.direction === 'UP' ? '0px' : '25px',
                }}
                {...props}
            >
                <Group
                    onOptionClick={onOptionClick}
                    id={id?.concat('option')}
                    selected={selected}
                    favorize={favorize}
                    onFavorize={onFavorize}
                    grouped={grouped}
                    data-testid={props['data-testid']?.concat('-group')}
                />
            </div>
        );
    },
);
