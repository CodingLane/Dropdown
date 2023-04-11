import React from 'react';
import * as Contracts from 'contracts';
import { Group } from './group';

const DEFAULT_FAVORITE = 'Favorite';
const DEFAULT_NON_FAVORITE = 'Standard';

export interface GroupedProps<T extends string> {
    id?: string;
    options: Contracts.GroupedDropdownOption[];
    top?: number;
    onOptionClick: (option?: string) => void;
    filter?: string | null;
    onFilteredChange: (options: string[]) => void;
    onFavorize?: (option: Contracts.DropdownOption) => void;
    current?: T;
    favoriteGroupName?: string;
    nonFavoriteGroupName?: string;
    grouping?: boolean;
    favorize?: boolean;
}

export const Grouped = React.forwardRef(
    <T extends string>(
        {
            id,
            options,
            top,
            onOptionClick,
            onFilteredChange,
            current,
            filter,
            onFavorize,
            favoriteGroupName,
            nonFavoriteGroupName,
            grouping,
            favorize,
        }: GroupedProps<T>,
        ref: React.ForwardedRef<HTMLDivElement>,
    ) => {
        const favorites = options.filter((opt) => opt.favorite).length;
        const favoritesName = favoriteGroupName ?? DEFAULT_FAVORITE;
        const nonFavoritesName = nonFavoriteGroupName ?? DEFAULT_NON_FAVORITE;

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
                    .map((filter) => filter.value),
            );
        }, [grouped]);

        return (
            <div className='dropdown-content dropdown-grouped' ref={ref} style={{ top }}>
                <Group
                    onOptionClick={onOptionClick}
                    id={id?.concat('option')}
                    selected={selected}
                    favorize={favorize}
                    onFavorize={onFavorize}
                    grouped={grouped}
                />
            </div>
        );
    },
);
