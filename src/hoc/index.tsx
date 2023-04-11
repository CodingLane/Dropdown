import React from 'react';
import * as Icons from 'react-feather';

import './Dropdown.css';
import * as Components from 'components';
import * as Contracts from 'contracts';

interface DropdownProps<T extends string> {
    /**
     * The current id of the dropdown.
     */
    id?: string;
    /**
     * The current chosen value for the dropdown, typeof string.
     * The value is not getting managed inside the component. You have to provide a function to manage the current chosen value.
     * @see onChange
     */
    value?: T;
    /**
     * Set this value to true, if you want to have a dropdown with an input field to search for an specific option.
     * Default is false.
     */
    searchable?: boolean;
    /**
     * Set the classname of the dropdown, if you want to set your custom style.
     */
    className?: string;
    /**
     * Set this value to true, if you want that the options of the dropdown are getting closed as soon as you choose an option.
     */
    closeOnSelect?: boolean;
    /**
     * Set this to a string array of your field values, to have grouped options by favorites.
     * Set it to an empty array, if you want to have the functionality but do not have any favorites at the moment.
     * The favorites are getting managed outside this component. You have to provide a function to manage your favroites.
     * @see onFavorizeOption
     */
    favorites?: string[];
    /**
     * These are the possible options for the dropdown. If you want to have grouped dropdown options, set the type of your fields to GroupedDropdownOptions
     * and set the group tag for all of the fields.
     * @type DropdownOptions[] | GroupedDropdownOptions[]
     */
    fields: Contracts.DropdownOptions[] | Contracts.GroupedDropdownOptions[];
    /**
     * The placeholder for the dropdown. When the placeholder is set and the value is undefined or not assignable to a field, the placeholder is getting showed.
     */
    placeholder?: string;
    /**
     * This is the function to manage the current chosen value for the dropdown.
     * @param field
     * The field the user clicked on.
     * @type {T} - extends string
     * @returns
     */
    onChange: (field: T) => void;
    /**
     * This function is getting called on blur of the options menu.
     */
    onBlur?: () => void;
    /**
     * This function is getting called on focus of the options menu.
     */
    onFocus?: () => void;
    /**
     * The on favorize option is getting called as soon as the favorize icon in the option menu is getting clicked.
     * This dropdown do not manage the favorites on its own. You have to manage the favorites, to see changes in the component.
     */
    onFavorizeOption?: (option: Contracts.DropdownOptions) => void;
    /**
     * For testing purpose.
     */
    'data-testid'?: string;
}

/**
 * @param id
 * The current id of the dropdown.
 * @param value
 * The current chosen value for the dropdown, typeof string.
 * The value is not getting managed inside the component. You have to provide a function to manage the current chosen value.
 * @param searchable
 * Set this value to true, if you want to have a dropdown with an input field to search for a specific option
 * @param className
 * Set the classname of the dropdown, if you want to set your custom style.
 * @param closeOnSelect
 * Set this value to true, if you want that the options of the dropdown are getting closed as soon as you choose an option.
 * @param favorites
 * Set this to a string array of your field values, to have grouped options by favorites.
 * Set it to an empty array, if you want to have the functionality but do not have any favorites at the moment.
 * The favorites are getting managed outside this component. You have to provide a function to manage your favroites.
 * @param fields
 * These are the possible options for the dropdown. If you want to have grouped dropdown options, set the type of your fields to GroupedDropdownOptions
 * and set the group tag for all of the fields.
 * @param placeholder
 * The placeholder for the dropdown. When the placeholder is set and the value is undefined or not assignable to a field, the placeholder is getting showed.
 * @param onChange
 * This is the function to manage the current chosen value for the dropdown.
 * @param onFocus
 * This function is getting called on focus of the options menu.
 * @param onBlur
 * This function is getting called on blur of the options menu.
 * @param onFavorizeOption
 * The on favorize option is getting called as soon as the favorize icon in the option menu is getting clicked.
 * This dropdown do not manage the favorites on its own. You have to manage the favorites, to see changes in the component.
 * @param data-testid
 * For testing purpose.
 * @returns {JSX.Element}
 */
export const Dropdown = <T extends string>({
    id,
    fields,
    value,
    searchable = false,
    className,
    closeOnSelect = false,
    favorites,
    placeholder,
    onChange,
    onBlur,
    onFocus,
    onFavorizeOption,
    ...props
}: DropdownProps<T>) => {
    const dropdown = React.useRef<HTMLDivElement>();
    const setDropdown = (ref: HTMLDivElement) => (dropdown.current = ref);
    const input = React.useRef<HTMLInputElement>();
    const setInput = (ref: HTMLInputElement) => (input.current = ref);
    const menu = React.useRef<HTMLDivElement>();
    const setMenu = (ref: HTMLDivElement) => (menu.current = ref);
    const textContainer = React.useRef<HTMLDivElement>();
    const setTextContainer = (ref: HTMLDivElement) => (textContainer.current = ref);
    const text = React.useRef<HTMLDivElement>();
    const setText = (ref: HTMLDivElement) => (text.current = ref);

    const [currentVisibleOptions, setCurrentVisibleOptions] = React.useState<string[]>([]);
    const grouped = fields.some((field) => (field as Contracts.GroupedDropdownOptions).group !== undefined);

    const [top, setTop] = React.useState<number>();
    const [active, setActive] = React.useState(false);
    const [search, setSearch] = React.useState<string | null>(null);
    const field = React.useMemo(() => fields.find((field) => field.value === value)?.label, [value]);

    const handleOptionClick = (option?: string) => {
        onChange(option as T);
        setSearch(null);
        if (!closeOnSelect) return;
        setActive(false);
    };

    React.useEffect(() => {
        if (active && onFocus) onFocus();
        if (!active && onBlur) onBlur();
    }, [active]);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.currentTarget.value);

    const toggle = () => setActive((prev) => !prev);

    const enterSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
        event.persist();
        if (event.key.toLowerCase() !== 'enter') return;
        if (search === null) return;
        if (currentVisibleOptions.length > 0) onChange(currentVisibleOptions[0] as T);
        setSearch(null);
        toggle();
    };

    React.useEffect(() => {
        if (!input.current) return;

        if (active) input.current.focus();
        else {
            setSearch(null);
            input.current.blur();
        }
    }, [input.current, active]);

    React.useEffect(() => {
        const clickListener = (event: MouseEvent) => {
            if ((dropdown.current as any)?.contains(event.target)) return;
            setActive(false);
        };
        const scrollListener = () => setTop(input.current?.getBoundingClientRect().top);

        document.addEventListener('click', clickListener);
        document.addEventListener('scroll', scrollListener);
        return () => {
            document.removeEventListener('click', clickListener);
            document.removeEventListener('scroll', scrollListener);
        };
    }, []);

    React.useLayoutEffect(() => {
        if (!textContainer.current || !text.current || !input.current) return;
        textContainer.current.style.width = `${text.current.clientWidth + 17.5}px`;
        input.current.style.width = `${text.current.clientWidth - 4.5}px`;
    }, [text.current, textContainer.current, value]);

    return (
        <div className={`dropdown ${active ? 'active' : ''} ${className ?? ''}`} ref={setDropdown} {...props}>
            <div className='customBase dropdown-search'>
                <div
                    className={'dropdown-text'.concat(!searchable ? ' dropdown-readonly' : '')}
                    onClick={toggle}
                    ref={setTextContainer}
                >
                    {!search && (
                        <div className='dropdown-searchtext' ref={setText}>
                            {field ?? placeholder}
                        </div>
                    )}
                    <Components.BaseInput
                        value={search ?? ''}
                        id={id?.concat('input')}
                        onChange={handleSearch}
                        className='dropdown-searchinput'
                        autoComplete='off'
                        autoCapitalize='off'
                        autoCorrect='off'
                        disabled={!searchable}
                        ref={setInput}
                        onKeyUp={enterSearch}
                    />
                </div>
                <Icons.ChevronDown size={16} className='dropdown-searchicon' onClick={toggle} />
            </div>
            {grouped ? (
                <Components.Grouped
                    id={id}
                    onOptionClick={handleOptionClick}
                    onFilteredChange={setCurrentVisibleOptions}
                    options={fields as Contracts.GroupedDropdownOptions[]}
                    current={value}
                    top={top}
                    ref={setMenu}
                    filter={search}
                    onFavorize={onFavorizeOption}
                    favorites={favorites}
                />
            ) : (
                <Components.Standard
                    id={id}
                    onOptionClick={handleOptionClick}
                    options={fields}
                    current={value}
                    filter={search}
                    top={top}
                    ref={setMenu}
                    onFilteredChange={setCurrentVisibleOptions}
                />
            )}
        </div>
    );
};
