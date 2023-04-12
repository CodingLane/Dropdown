import React from 'react';
import * as Environment from '@testing-library/react';

import * as SUT from './index';
import * as Contracts from '../../../../../contracts';

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

    const GROUP_ONE: Contracts.OptionChildGroup = {
        name: GROUP_ONE_NAME,
        options: OPTION_GROUP_ONE,
        isParent: false,
    };

    const GROUP_TWO: Contracts.OptionChildGroup = {
        name: GROUP_TWO_NAME,
        options: OPTION_GROUP_TWO,
        isParent: false,
    };

    let onOptionClickMock: jest.Mock<any, any>;
    let onFavorizeMock: jest.Mock<any, any>;
    beforeAll(() => {
        Environment.cleanup();

        onOptionClickMock = jest.fn();
        onFavorizeMock = jest.fn();
    });

    test('should render group with labels', async () => {
        Environment.render(
            <SUT.Group
                grouped={[GROUP_ONE, GROUP_TWO]}
                onOptionClick={onOptionClickMock}
                data-testid={GROUP_TEST_ID}
            />,
        );

        const labels = await Environment.screen.findAllByTestId(GROUP_TEST_ID.concat('-label'), { exact: false });

        expect(labels).toHaveLength(2);
        expect(labels[0]).toHaveTextContent(GROUP_ONE_NAME);
        expect(labels[1]).toHaveTextContent(GROUP_TWO_NAME);
    });
});
