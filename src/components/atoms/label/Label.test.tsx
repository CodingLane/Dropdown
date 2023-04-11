import React from 'react';
import * as Environment from '@testing-library/react';

import * as SUT from './index';

describe('Label tests', () => {
    const TEST_ID = 'TESTING_ID';
    const TEST_LABEL = 'TESTING';
    const EXTRA_CLASSNAME = 'TEST_CLASSNAME';

    beforeAll(() => {
        Environment.cleanup();
    });

    test('should have default class name', async () => {
        Environment.render(<SUT.Label data-testid={TEST_ID} label={TEST_LABEL} />);

        const element = await Environment.screen.findByTestId(TEST_ID);

        expect(element).toHaveClass('dropdown-group-label');
    });

    test('should have extra class name', async () => {
        Environment.render(<SUT.Label data-testid={TEST_ID} label={TEST_LABEL} className={EXTRA_CLASSNAME} />);

        const element = await Environment.screen.findByTestId(TEST_ID);

        expect(element).toHaveClass(EXTRA_CLASSNAME);
    });

    test('should have extra class name', async () => {
        Environment.render(<SUT.Label data-testid={TEST_ID} label={TEST_LABEL} className={EXTRA_CLASSNAME} />);

        const element = await Environment.screen.findByTestId(TEST_ID);

        expect(element).toHaveClass(EXTRA_CLASSNAME);
    });

    test('should have text content', async () => {
        Environment.render(<SUT.Label data-testid={TEST_ID} label={TEST_LABEL} />);

        const element = await Environment.screen.findByTestId(TEST_ID);

        expect(element).toHaveTextContent(TEST_LABEL);
    });
});
