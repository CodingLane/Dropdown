import React from 'react';
import * as Environment from '@testing-library/react';

import * as SUT from './index';
import * as Contracts from '../../../../contracts';

describe('Label tests', () => {
    const GROUP_TEST_ID = 'OPTION_TESTING';
    const GROUP_ONE_NAME = 'GROUP_ONE';
    const GROUP_TWO_NAME = 'GROUP_TWO';
    const OPTION_ONE = 'OPTION_ONE';
    const OPTION_TWO = 'OPTION_TWO';
    const OPTION_THREE = 'OPTION_THREE';
    const OPTION_FILTER = 'THREE';

    const OPTION_GROUP_ONE = [
        { label: OPTION_ONE, value: OPTION_ONE },
        { label: OPTION_TWO, value: OPTION_TWO },
    ];

    const OPTION_GROUP_TWO = [{ label: OPTION_THREE, value: OPTION_THREE }];

    const OPTIONS: Contracts.GroupedDropdownOption[] = [
        {
            group: GROUP_ONE_NAME,
            label: OPTION_ONE,
            value: OPTION_ONE,
        },
        {
            group: GROUP_ONE_NAME,
            label: OPTION_TWO,
            value: OPTION_TWO,
        },
        {
            group: GROUP_TWO_NAME,
            label: OPTION_THREE,
            value: OPTION_THREE,
        },
    ];

    let onOptionClickMock: jest.Mock<any, any>;
    let onFilteredChangeMock: jest.Mock<any, any>;
    beforeAll(() => {
        Environment.cleanup();

        onOptionClickMock = jest.fn();
        onFilteredChangeMock = jest.fn();
    });

    test('should render group with labels', async () => {
        Environment.render(
            <SUT.Grouped
                options={OPTIONS}
                onFilteredChange={onFilteredChangeMock}
                onOptionClick={onOptionClickMock}
                data-testid={GROUP_TEST_ID}
            />,
        );

        const labels = await Environment.screen.findAllByTestId(GROUP_TEST_ID.concat('-group-label'), { exact: false });

        expect(labels).toHaveLength(2);
        expect(labels[0]).toHaveTextContent(GROUP_ONE_NAME);
        expect(labels[1]).toHaveTextContent(GROUP_TWO_NAME);
    });

    test('should have two childs at group one', async () => {
        Environment.render(
            <SUT.Grouped
                options={OPTIONS}
                onFilteredChange={onFilteredChangeMock}
                onOptionClick={onOptionClickMock}
                data-testid={GROUP_TEST_ID}
            />,
        );

        const labels = await Environment.screen.findAllByTestId(GROUP_TEST_ID.concat('-group').concat(GROUP_ONE_NAME), {
            exact: false,
        });

        expect(labels).toHaveLength(1);
        expect(labels[0].children).toHaveLength(3);
        expect(labels[0].children[0]).toHaveTextContent(GROUP_ONE_NAME);

        expect(labels[0].children[1].children[0]).toHaveTextContent(OPTION_ONE);
        expect(labels[0].children[2].children[0]).toHaveTextContent(OPTION_TWO);
    });
});
