import * as React from 'react';
import {describe, expect, it} from 'vitest';
import {render, screen} from '@testing-library/react';
import TypingIndicator from "../components/body/panel/TypingIndicator";

describe('TypingIndicator', () => {

    it('renders nothing when no users are typing', () => {

        render(<TypingIndicator/>);

        expect(screen.queryByText(/is typing/)).toBeNull();
    });
});