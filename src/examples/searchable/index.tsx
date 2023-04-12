import React from 'react';
import * as Dropdown from '../../export';

export const SearchableDropdown = () => {
    const id = React.useRef('testing-searchable').current;
    const [fields] = React.useState<Dropdown.DropdownOption[]>([
        {
            label: 'Orange',
            value: 'ORANGE',
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

    return <Dropdown.Dropdown id={id} fields={fields} value={current} onChange={setCurrent} searchable />;
};
