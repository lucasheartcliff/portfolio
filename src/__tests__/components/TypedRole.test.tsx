import { render, screen } from '@testing-library/react';
import React from 'react';

import TypedRole from '@/components/TypedRole';

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe('TypedRole', () => {
  it('should render the first role', () => {
    render(<TypedRole />);
    expect(screen.getByText('Senior Software Engineer')).toBeInTheDocument();
  });
});
