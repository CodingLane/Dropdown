import React from 'react';
import * as Dropdown from '../../export';

export const FavoritesDropdown = () => {
    const id = React.useRef('testing-favorites').current;
    const [fields, setFields] = React.useState<Dropdown.DropdownOption[]>([
        {
            label: 'Orange',
            value: 'ORANGE',
            favorite: true,
        },
        {
            label: 'Apple',
            value: 'APPLE',
        },
        {
            label: 'Banana',
            value: 'BANANA',
        },
    ]);
    const [current, setCurrent] = React.useState('ORANGE');

    const handleFavoriteAdd = (option: Dropdown.DropdownOption) => {
        setFields((prev) => {
            const update = prev.find((field) => field.value === option.value);
            if (!update) return prev;
            update.favorite = !update.favorite;
            const updateIndex = prev.findIndex((field) => field.value === option.value);

            prev.splice(updateIndex, 1, update);
            return [...prev];
        });
    };

    return (
        <Dropdown.Dropdown
            id={id}
            fields={fields}
            value={current}
            onChange={setCurrent}
            onFavorizeOption={handleFavoriteAdd}
        />
    );
};
