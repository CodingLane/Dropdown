import React from 'react';
import * as Atoms from 'components/atoms';
import * as Contracts from 'contracts';

export interface GroupProps {
    id?: string;
    grouped: Contracts.OptionGroup[];
    onOptionClick: (option: string) => void;
    selected?: Contracts.DropdownOption;
    favorize?: boolean;
    onFavorize?: (option: Contracts.DropdownOption) => void;
    'data-testid'?: string;
}

export const Group = ({ id, grouped, selected, favorize, onOptionClick, onFavorize, ...props }: GroupProps) => {
    return (
        <>
            {grouped.map((group, index) => (
                <div key={group.name.concat(`-${index}`)} className='dropdown-grouping'>
                    {!group.isParent ? (
                        <>
                            <Atoms.Label
                                label={group.name}
                                data-testid={props['data-testid']?.concat('-label').concat(group.name)}
                            />
                            {group.options.map((option) => (
                                <Atoms.Option
                                    key={option.value}
                                    className='group-option'
                                    onClick={onOptionClick}
                                    id={id?.concat('option').concat(option.value)}
                                    selected={selected}
                                    option={option}
                                    favorites={favorize}
                                    isFavorite={option.favorite}
                                    onFavorize={onFavorize}
                                    data-testid={props['data-testid']?.concat('-group-option').concat(option.value)}
                                />
                            ))}
                        </>
                    ) : (
                        <Group
                            grouped={group.options}
                            onOptionClick={onOptionClick}
                            onFavorize={onFavorize}
                            id={id?.concat('option'.concat(group.name))}
                            favorize={favorize}
                            selected={selected}
                            key={group.name}
                            data-testid={props['data-testid']?.concat(group.name)}
                        />
                    )}
                </div>
            ))}
        </>
    );
};
