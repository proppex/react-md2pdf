import React from 'react';
import { View, Image, Text } from '@react-pdf/renderer';
// Import Markdown component from compiled dist to avoid ESM issues
import { Markdown } from '../index';

describe('markdownToReactPDF', () => {
  test('converts heading and paragraph', () => {
    const md = '# Title\n\nSome text';
    const element = Markdown({ md });
    expect(React.isValidElement(element)).toBe(true);
  });

  test('renders images', () => {
    const md = '![](http://example.com/test.png)';
    const element = Markdown({ md });
    expect(React.isValidElement(element)).toBe(true);
  });
});
