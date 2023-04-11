import React from 'react';
import * as Environment from '@testing-library/react';

import * as SUT from './index';

describe('Label tests', () => {
    const OPTION_MOCK = 'Option';
    const OPTION_TEST_ID = 'Option_Testing';
    const OPTION_LABEL_MOCK = 'Option Label';

    let onClickMock: jest.Mock<any, any>;
    let onFavorizeMock: jest.Mock<any, any>;
    beforeAll(() => {
        Environment.cleanup();

        onClickMock = jest.fn();
        onFavorizeMock = jest.fn();
    });

    test('should render without favorites icon', async () => {
        Environment.render(
            <SUT.Option
                option={{ label: OPTION_MOCK, value: OPTION_MOCK }}
                data-testid={OPTION_TEST_ID}
                onClick={onClickMock}
            />,
        );

        const element = await Environment.screen.findByTestId(OPTION_TEST_ID);

        expect(element).toBeInTheDocument();
    });

    test('should render with favorites icon', async () => {
        Environment.render(
            <SUT.Option
                option={{ label: OPTION_MOCK, value: OPTION_MOCK }}
                data-testid={OPTION_TEST_ID}
                onClick={onClickMock}
                favorites
            />,
        );

        const element = await Environment.screen.findAllByTestId(OPTION_TEST_ID);

        expect(element.length).toBe(2);
    });

    test('should call on Favorize click and not on click', async () => {
        Environment.render(
            <SUT.Option
                option={{ label: OPTION_MOCK, value: OPTION_MOCK }}
                data-testid={OPTION_TEST_ID}
                onClick={onClickMock}
                favorites
                onFavorize={onFavorizeMock}
            />,
        );

        const element = await Environment.screen.findAllByTestId(OPTION_TEST_ID);

        await Environment.waitFor(() => Environment.fireEvent.click(element[0]));

        expect(onFavorizeMock).toBeCalledTimes(1);
        expect(onClickMock).toBeCalledTimes(0);
    });

    test('should call on click', async () => {
        Environment.render(
            <SUT.Option
                option={{ label: OPTION_MOCK, value: OPTION_MOCK }}
                data-testid={OPTION_TEST_ID}
                onClick={onClickMock}
            />,
        );

        const element = await Environment.screen.findByTestId(OPTION_TEST_ID);

        await Environment.waitFor(() => Environment.fireEvent.click(element));

        expect(onFavorizeMock).toBeCalledTimes(0);
        expect(onClickMock).toBeCalledTimes(1);
    });

    test('should have textcontent', async () => {
        Environment.render(
            <SUT.Option
                option={{ label: OPTION_MOCK, value: OPTION_MOCK }}
                data-testid={OPTION_TEST_ID}
                onClick={onClickMock}
            />,
        );

        const element = await Environment.screen.findByTestId(OPTION_TEST_ID);

        expect(element).toHaveTextContent(OPTION_MOCK);
    });

    test('should have textcontent with label', async () => {
        Environment.render(
            <SUT.Option
                option={{ label: OPTION_LABEL_MOCK, value: OPTION_MOCK }}
                data-testid={OPTION_TEST_ID}
                onClick={onClickMock}
            />,
        );

        const element = await Environment.screen.findByTestId(OPTION_TEST_ID);

        expect(element).toHaveTextContent(OPTION_LABEL_MOCK);
    });

    test('should call on change with value', async () => {
        Environment.render(
            <SUT.Option
                option={{ label: OPTION_LABEL_MOCK, value: OPTION_MOCK }}
                data-testid={OPTION_TEST_ID}
                onClick={onClickMock}
            />,
        );

        const element = await Environment.screen.findByTestId(OPTION_TEST_ID);

        await Environment.waitFor(() => Environment.fireEvent.click(element));

        expect(onClickMock).toBeCalledWith(OPTION_MOCK);
    });
});
