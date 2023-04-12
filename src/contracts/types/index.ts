export interface DropdownOption {
    value: string;
    label: string;
    favorite?: boolean;
}

export interface GroupedDropdownOption extends DropdownOption {
    group: string;
}

export type FilterCallback = (field: { value: string; label: string; group: string }) => boolean;

interface BaseOptionGroup {
    name: string;
}

export interface OptionChildGroup extends BaseOptionGroup {
    options: DropdownOption[];
    isParent: false;
}

export interface OptionParentGroup extends BaseOptionGroup {
    options: OptionGroup[];
    isParent: true;
}

export type OptionGroup = OptionChildGroup | OptionParentGroup;

export interface FavoriteLabels {
    favorite?: string;
    nonFavorite?: string;
}

export interface DropdownStyleSheet {
    backgroundColor?: string;
    color?: string;
    fontSize?: string;
    fontFamily?: string;
}

export interface Anchor {
    at: number;
    direction: 'UP' | 'DOWN';
}
