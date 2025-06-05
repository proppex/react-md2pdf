import React from 'react';
import { View } from '@react-pdf/renderer';
import { Markdown } from '../index';

describe('Markdown component', () => {
  test('wraps converted markdown in a View', () => {
    const element = Markdown({ md: 'Hello' });
    expect(React.isValidElement(element)).toBe(true);
    expect(element.type).toBe(View);
  });
});
