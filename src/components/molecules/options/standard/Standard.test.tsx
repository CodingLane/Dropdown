import React from 'react';
import * as Environment from '@testing-library/react';

import * as SUT from './index';

describe('Standard Groups tests', () => {
    const OPTION_ONE = 'OPTION_ONE';
    const OPTION_TWO = 'OPTION_TWO';
    const OPTION_THREE = 'OPTION_THREE';
    const OPTION_FOUR_VALUE = 'OPTION_FOUR';
    const OPTION_FOUR_LABEL = 'OPTION_FOUR_LABEL';
    const OPTION_TEST_ID = 'OPTION_TESTING';
    const OPTION_FILTER = 'THREE';

    const OPTIONS = [
        { label: OPTION_ONE, value: OPTION_ONE },
        { label: OPTION_TWO, value: OPTION_TWO },
        { label: OPTION_THREE, value: OPTION_THREE },
        { label: OPTION_FOUR_LABEL, value: OPTION_FOUR_VALUE },
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

        expect(elements).toHaveLength(4);
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

    test('should have selected for current (=VALUE) with not matching label value pair', async () => {
        Environment.render(
            <SUT.Standard
                options={OPTIONS}
                onFilteredChange={onFilteredChangeClick}
                onOptionClick={onOptionClickMock}
                data-testid={OPTION_TEST_ID}
                current={OPTION_FOUR_VALUE}
            />,
        );

        const elements = await Environment.screen.findAllByTestId(OPTION_TEST_ID, { exact: false });

        expect(elements[3]).toHaveClass('selected-dropdown');
    });

    test('should not have selected for current (=LABEL) with not matching label value pair', async () => {
        Environment.render(
            <SUT.Standard
                options={OPTIONS}
                onFilteredChange={onFilteredChangeClick}
                onOptionClick={onOptionClickMock}
                data-testid={OPTION_TEST_ID}
                current={OPTION_FOUR_LABEL}
            />,
        );

        const elements = await Environment.screen.findAllByTestId(OPTION_TEST_ID, { exact: false });

        expect(elements[3]).not.toHaveClass('selected-dropdown');
    });
});
