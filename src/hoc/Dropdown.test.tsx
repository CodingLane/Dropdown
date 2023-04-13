import React from 'react';
import * as Environment from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import * as SUT from './index';

class ResizeObserver {
    observe() {
        // do nothing
    }
    unobserve() {
        // do nothing
    }
    disconnect() {
        // do nothing
    }
}

window.ResizeObserver = ResizeObserver;

describe('Dropdown', () => {
    const TEST_ID = 'TESTING_DROPDOWN';
    const FIELD_ONE = 'ONE';
    const FIELD_TWO = 'TWO';
    const fields = [
        { value: FIELD_ONE, label: FIELD_ONE },
        { value: FIELD_TWO, label: FIELD_TWO },
    ];

    let onChangeMock: jest.Mock<any, any>;
    let onBlurMock: jest.Mock<any, any>;
    let onFocusMock: jest.Mock<any, any>;

    beforeEach(() => {
        Environment.cleanup();
        onBlurMock = jest.fn();
        onChangeMock = jest.fn();
        onFocusMock = jest.fn();
    });

    test('should render', async () => {
        Environment.render(
            <SUT.Dropdown value={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const element = await Environment.screen.findAllByText(FIELD_ONE);
        expect(element.length).toBe(2);
    });

    test('should have closed options on render', async () => {
        Environment.render(
            <SUT.Dropdown
                value={FIELD_ONE}
                fields={fields}
                onChange={onChangeMock}
                onBlur={onBlurMock}
                data-testid={TEST_ID}
            />,
        );

        const closedContent = await Environment.screen.findByTestId(TEST_ID);
        expect(closedContent).not.toHaveClass('active');
    });

    test('should have open options on click on select', async () => {
        Environment.render(
            <SUT.Dropdown value={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const select = await Environment.screen.findAllByText(FIELD_ONE);
        await Environment.waitFor(() => UserEvent.click(select[1]));
        const visible = await Environment.screen.findByText(FIELD_TWO);
        expect(visible).toBeInTheDocument();
    });

    test('should close on option select', async () => {
        Environment.render(
            <SUT.Dropdown value={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const select = await Environment.screen.findAllByText(FIELD_ONE);
        await Environment.waitFor(() => UserEvent.click(select[0]));
        const visible = await Environment.screen.findByText(FIELD_TWO);
        await Environment.waitFor(() => UserEvent.click(visible));
        expect(visible).toBeInTheDocument();
    });

    test('should call onChange', async () => {
        Environment.render(
            <SUT.Dropdown value={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const select = await Environment.screen.findAllByText(FIELD_ONE);
        await Environment.waitFor(() => UserEvent.click(select[0]));
        const visible = await Environment.screen.findByText(FIELD_TWO);
        await Environment.waitFor(() => UserEvent.click(visible));
        expect(onChangeMock).toBeCalledWith(FIELD_TWO);
    });

    test('should call on blur', async () => {
        Environment.render(
            <SUT.Dropdown value={FIELD_ONE} fields={fields} onChange={onChangeMock} onBlur={onBlurMock} />,
        );

        const select = await Environment.screen.findAllByText(FIELD_ONE);
        await Environment.waitFor(() => UserEvent.click(select[0]));
        const visible = await Environment.screen.findByText(FIELD_TWO);
        await Environment.waitFor(() => UserEvent.click(visible));
        await Environment.waitFor(() => UserEvent.tab());
        expect(onBlurMock).toBeCalledTimes(1);
    });

    test('should call on focus', async () => {
        Environment.render(
            <SUT.Dropdown value={FIELD_ONE} fields={fields} onChange={onChangeMock} onFocus={onFocusMock} />,
        );

        const select = await Environment.screen.findAllByText(FIELD_ONE);
        await Environment.waitFor(() => UserEvent.click(select[0]));
        expect(onFocusMock).toBeCalledTimes(1);
    });

    test('should not filter options on searchable false', async () => {
        Environment.render(
            <SUT.Dropdown
                data-testid={TEST_ID}
                value={FIELD_ONE}
                fields={fields}
                onChange={onChangeMock}
                onFocus={onFocusMock}
            />,
        );

        const input = await Environment.screen.findByTestId(TEST_ID.concat('-input'));

        await Environment.waitFor(() => UserEvent.paste(input, 'ONE'));

        const optionTwo = Environment.screen.queryByText(FIELD_TWO);

        expect(optionTwo).toBeInTheDocument();
    });

    test('should filter options on search', async () => {
        Environment.render(
            <SUT.Dropdown
                data-testid={TEST_ID}
                value={FIELD_ONE}
                fields={fields}
                onChange={onChangeMock}
                onFocus={onFocusMock}
                searchable
            />,
        );

        const input = await Environment.screen.findByTestId(TEST_ID.concat('-input'));

        await Environment.waitFor(() => UserEvent.paste(input, 'ONE'));

        const optionTwo = Environment.screen.queryByText(FIELD_TWO);

        expect(optionTwo).not.toBeInTheDocument();
    });
});
