import { describe, expect, it } from 'vitest';
import Logo from '../../component/logo';
import { render, screen } from '@testing-library/react';
import messages from '../../../messages/en.json';
import { NextIntlClientProvider } from 'next-intl';

describe('group', () => {
  it('should', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Logo href="href" text="text"></Logo>
      </NextIntlClientProvider>
    );
    expect(screen.getByText('text')).toBeInTheDocument();
    expect(screen.getByText('text')).toHaveTextContent('text');
  });
});
