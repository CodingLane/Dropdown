import React from 'react';
import * as Dropdown from '../../export';

export const GroupedWithoutFavoritesDropdown = () => {
    const id = React.useRef('testing').current;
    const [fields] = React.useState<Dropdown.GroupedDropdownOption[]>([
        {
            label: 'Orange',
            value: 'ORANGE',
            group: 'One',
        },
        {
            label: 'Apple',
            value: 'APPLE',
            group: 'One',
        },
        {
            label: 'Banana',
            value: 'BANANA',
            group: 'Two',
        },
    ]);
    const [current, setCurrent] = React.useState('ORANGE');

    return <Dropdown.Dropdown id={id} fields={fields} value={current} onChange={setCurrent} />;
};

export const GroupedWithFavoritesDropdown = () => {
    const id = React.useRef('testing').current;
    const [fields, setFields] = React.useState<Dropdown.GroupedDropdownOption[]>([
        {
            label: 'Orange',
            value: 'ORANGE',
            group: 'One',
            favorite: true,
        },
        {
            label: 'Apple',
            value: 'APPLE',
            group: 'One',
        },
        {
            label: 'Banana',
            value: 'BANANA',
            group: 'Two',
        },
    ]);
    const [current, setCurrent] = React.useState('ORANGE');

    const handleFavoriteAdd = (option: Dropdown.DropdownOption) => {
        setFields((prev) => {
            let update = prev.find((field) => field.value === option.value);
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
