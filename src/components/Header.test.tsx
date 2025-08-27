import { render, screen } from '@testing-library/react';
import Header from './Header';


test('renders Header component', () => {
    render(<Header />);
    const titleElement = screen.getByText(/Quiz Application/i);
    expect(titleElement).toBeInTheDocument();
})

