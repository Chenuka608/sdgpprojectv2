import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // For expect(...).toBeInTheDocument()
import Login from './../components/Login';
import { AuthContext } from '../context/AuthContext'; // Mock the context if needed
import { MemoryRouter } from 'react-router-dom'; // Mock the router if needed

// Mock the AuthContext value
const mockAuthContextValue = {
  dispatch: jest.fn()
};

describe('Login Component', () => {
  test('renders login form correctly', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Check if elements are rendered
    expect(screen.getByText('INTERNOVA.')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();
  });

  test('handles user input correctly', () => {
    render(
      <MemoryRouter>
        <AuthContext.Provider value={mockAuthContextValue}>
          <Login />
        </AuthContext.Provider>
      </MemoryRouter>
    );

    // Simulate user input
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

    // Check if input values are updated
    expect(screen.getByLabelText('Email')).toHaveValue('test@example.com');
    expect(screen.getByLabelText('Password')).toHaveValue('password123');
  });

  // Add more test cases as needed, such as testing form submission and API calls
});
