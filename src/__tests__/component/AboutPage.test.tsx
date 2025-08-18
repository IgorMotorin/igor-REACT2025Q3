import { render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Page from '../../app/[locale]/about/page';
import { NextIntlClientProvider } from 'next-intl';
import messages from '../../../messages/en.json';

describe('About Component Tests', () => {
  it('Renders Error component', async () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Page></Page>
      </NextIntlClientProvider>
    );

    await waitFor(() => expect(screen.getByText('About')).toBeDefined());
    await waitFor(() =>
      expect(screen.getByText('About')).toHaveTextContent('About')
    );
  });
});
