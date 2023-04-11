import React from 'react';
import * as Dropdown from '../../export';

const FIELDS: Dropdown.DropdownOption[] = [
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
];

export const BasicDropdown = () => {
    const id = React.useRef('testing').current;
    const [current, setCurrent] = React.useState('ORANGE');

    return <Dropdown.Dropdown id={id} fields={FIELDS} value={current} onChange={setCurrent} />;
};

export const BasicWithoutPlaceholderDropdown = () => {
    const id = React.useRef('testing').current;
    const [current, setCurrent] = React.useState('');

    return <Dropdown.Dropdown id={id} fields={FIELDS} value={current} onChange={setCurrent} />;
};

export const BasicWithPlaceholderDropdown = () => {
    const id = React.useRef('testing').current;
    const [current, setCurrent] = React.useState('');

    return <Dropdown.Dropdown id={id} fields={FIELDS} value={current} onChange={setCurrent} placeholder='Choose...' />;
};
