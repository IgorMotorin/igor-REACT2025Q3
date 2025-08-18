import { render, screen } from '@testing-library/react';
import Page from '../../app/[locale]/page';
import { describe, expect, it } from 'vitest';
import messages from '../../../messages/en.json';
import { NextIntlClientProvider } from 'next-intl';

describe('Loading Component Tests', () => {
  it('Renders Home component', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Page></Page>
      </NextIntlClientProvider>
    );

    const home = screen.getByText('🧠 Technical requirements');
    expect(home).toBeInTheDocument();
    expect(home).toHaveTextContent('🧠 Technical requirements');
  });
  it('Renders Home component', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Page></Page>
      </NextIntlClientProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });
});
