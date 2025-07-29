import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BugForm from '../../components/BugForm';

describe('BugForm', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    it('should render all input fields for new bug', () => {
        render(<BugForm onSubmit={mockOnSubmit} />);

        expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/priority/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add bug/i })).toBeInTheDocument();
    });

    it('should display initial data when in edit mode', () => {
        const initialData = {
            title: 'Existing Bug',
            description: 'This is an existing bug.',
            status: 'In Progress',
            priority: 'High'
        };
        render(<BugForm onSubmit={mockOnSubmit} initialData={initialData} isEditMode={true} />);

        expect(screen.getByLabelText(/title/i)).toHaveValue('Existing Bug');
        expect(screen.getByLabelText(/description/i)).toHaveValue('This is an existing bug.');
        expect(screen.getByLabelText(/status/i)).toHaveValue('In Progress');
        expect(screen.getByLabelText(/priority/i)).toHaveValue('High');
        expect(screen.getByRole('button', { name: /update bug/i })).toBeInTheDocument();
    });

    it('should show validation errors when submitting empty form', async () => {
        render(<BugForm onSubmit={mockOnSubmit} />);

        await userEvent.click(screen.getByRole('button', { name: /add bug/i }));

        expect(screen.getByText(/title is required/i)).toBeInTheDocument();
        expect(screen.getByText(/description is required/i)).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should show validation error for title too short', async () => {
        render(<BugForm onSubmit={mockOnSubmit} />);

        await userEvent.type(screen.getByLabelText(/title/i), 'ab');
        await userEvent.click(screen.getByRole('button', { name: /add bug/i }));

        expect(screen.getByText(/title must be at least 3 characters/i)).toBeInTheDocument();
        expect(mockOnSubmit).not.toHaveBeenCalled();
    });

    it('should call onSubmit with correct data when form is valid', async () => {
        render(<BugForm onSubmit={mockOnSubmit} />);

        await userEvent.type(screen.getByLabelText(/title/i), 'New Test Bug');
        await userEvent.type(screen.getByLabelText(/description/i), 'This is a description for the new bug.');
        await userEvent.selectOptions(screen.getByLabelText(/status/i), 'Resolved');
        await userEvent.selectOptions(screen.getByLabelText(/priority/i), 'Critical');

        await userEvent.click(screen.getByRole('button', { name: /add bug/i }));

        await waitFor(() => {
            expect(mockOnSubmit).toHaveBeenCalledTimes(1);
            expect(mockOnSubmit).toHaveBeenCalledWith({
                title: 'New Test Bug',
                description: 'This is a description for the new bug.',
                status: 'Resolved',
                priority: 'Critical'
            });
        });
    });

    it('should clear validation errors when input changes after error', async () => {
        render(<BugForm onSubmit={mockOnSubmit} />);

        await userEvent.click(screen.getByRole('button', { name: /add bug/i }));
        expect(screen.getByText(/title is required/i)).toBeInTheDocument();

        await userEvent.type(screen.getByLabelText(/title/i), 'Valid Title');
        expect(screen.queryByText(/title is required/i)).not.toBeInTheDocument();
    });
});