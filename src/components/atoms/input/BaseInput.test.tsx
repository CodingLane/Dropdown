import React from 'react';
import * as Environment from '@testing-library/react';
import UserEvent from '@testing-library/user-event';

import * as SUT from './index';

describe('Custom input', () => {
    const TEST_ID = 'TESTING';
    let onBlurMock: jest.Mock<any, any>;
    let onKeyUpMock: jest.Mock<any, any>;

    beforeAll(() => {
        Environment.cleanup();
        onBlurMock = jest.fn();
        onKeyUpMock = jest.fn();
    });

    test('should call on blur on enter press', async () => {
        Environment.render(<SUT.BaseInput data-testid={TEST_ID} onBlur={onBlurMock} />);

        const element = await Environment.screen.findByTestId(TEST_ID);

        await Environment.waitFor(() => UserEvent.click(element));
        await Environment.waitFor(() => Environment.fireEvent.keyUp(element, { key: 'Enter' }));

        expect(onBlurMock).toBeCalledTimes(1);
    });

    test('should not call on blur on other key press', async () => {
        Environment.render(<SUT.BaseInput data-testid={TEST_ID} onBlur={onBlurMock} />);

        const element = await Environment.screen.findByTestId(TEST_ID);

        await Environment.waitFor(() => UserEvent.click(element));
        await Environment.waitFor(() => Environment.fireEvent.keyUp(element, { key: 'Escape' }));

        expect(onBlurMock).toBeCalledTimes(0);
    });

    test('should still call on key up', async () => {
        Environment.render(<SUT.BaseInput data-testid={TEST_ID} onKeyUp={onKeyUpMock} />);

        const element = await Environment.screen.findByTestId(TEST_ID);

        await Environment.waitFor(() => UserEvent.click(element));
        await Environment.waitFor(() => Environment.fireEvent.keyUp(element, { key: 'Enter' }));

        expect(onKeyUpMock).toBeCalledTimes(1);
    });
});
