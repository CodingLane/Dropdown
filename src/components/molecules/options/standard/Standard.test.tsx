import React from 'react';
import * as Environment from '@testing-library/react';

import * as SUT from './index';

describe('Standard Groups tests', () => {
    const OPTION_ONE = 'OPTION_ONE';
    const OPTION_TWO = 'OPTION_TWO';
    const OPTION_THREE = 'OPTION_THREE';
    const OPTION_TEST_ID = 'OPTION_TESTING';
    const OPTION_FILTER = 'THREE';

    const OPTIONS = [
        { label: OPTION_ONE, value: OPTION_ONE },
        { label: OPTION_TWO, value: OPTION_TWO },
        { label: OPTION_THREE, value: OPTION_THREE },
    ];

    let onOptionClickMock: jest.Mock<any, any>;
    let onFilteredChangeClick: jest.Mock<any, any>;
    beforeAll(() => {
        Environment.cleanup();

        onOptionClickMock = jest.fn();
        onFilteredChangeClick = jest.fn();
    });

    test('should show all options', async () => {
        Environment.render(
            <SUT.Standard
                options={OPTIONS}
                onFilteredChange={onFilteredChangeClick}
                onOptionClick={onOptionClickMock}
                data-testid={OPTION_TEST_ID}
            />,
        );

        const elements = await Environment.screen.findAllByTestId(OPTION_TEST_ID, { exact: false });

        expect(elements).toHaveLength(3);
    });

    test('should call on option click', async () => {
        Environment.render(
            <SUT.Standard
                options={OPTIONS}
                onFilteredChange={onFilteredChangeClick}
                onOptionClick={onOptionClickMock}
                data-testid={OPTION_TEST_ID}
            />,
        );

        const elements = await Environment.screen.findAllByTestId(OPTION_TEST_ID, { exact: false });

        await Environment.waitFor(() => Environment.fireEvent.click(elements[0]));

        expect(onOptionClickMock).toBeCalledWith(OPTION_ONE);
    });

    test('should call on filtered change', async () => {
        Environment.render(
            <SUT.Standard
                options={OPTIONS}
                onFilteredChange={onFilteredChangeClick}
                onOptionClick={onOptionClickMock}
                data-testid={OPTION_TEST_ID}
                filter={OPTION_FILTER}
            />,
        );

        expect(onFilteredChangeClick).toBeCalledTimes(1);
    });

    test('should only show filtered options', async () => {
        Environment.render(
            <SUT.Standard
                options={OPTIONS}
                onFilteredChange={onFilteredChangeClick}
                onOptionClick={onOptionClickMock}
                data-testid={OPTION_TEST_ID}
                filter={OPTION_FILTER}
            />,
        );

        const elements = await Environment.screen.findAllByTestId(OPTION_TEST_ID, { exact: false });

        expect(elements).toHaveLength(1);
    });

    test('should have selected for current', async () => {
        Environment.render(
            <SUT.Standard
                options={OPTIONS}
                onFilteredChange={onFilteredChangeClick}
                onOptionClick={onOptionClickMock}
                data-testid={OPTION_TEST_ID}
                current={OPTION_ONE}
            />,
        );

        const elements = await Environment.screen.findAllByTestId(OPTION_TEST_ID, { exact: false });

        expect(elements[0]).toHaveClass('selected-dropdown');
    });
});
