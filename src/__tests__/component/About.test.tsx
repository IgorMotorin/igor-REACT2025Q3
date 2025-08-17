import { render, screen } from '@testing-library/react';
import About from '../../app/[locale]/about/About';
import { describe, it, expect } from 'vitest';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

describe('About Component Tests', () => {
  it('Renders About component', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <About></About>
      </NextIntlClientProvider>
    );

    const error = screen.getByText('About');
    expect(error).toBeDefined();
    expect(error).toHaveTextContent('About');
  });
});
