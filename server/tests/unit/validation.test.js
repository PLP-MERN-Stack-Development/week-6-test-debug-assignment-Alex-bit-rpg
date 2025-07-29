const { isValidBugData } = require('../../utils/validation');

describe('isValidBugData', () => {
    it('should return true for valid bug data', () => {
        const bug = { title: 'Test Bug', description: 'This is a test bug.', status: 'Open', priority: 'Medium' };
        const result = isValidBugData(bug);
        expect(result.isValid).toBe(true);
        expect(result.message).toBe('Bug data is valid.');
    });

    it('should return false if title is missing', () => {
        const bug = { description: 'This is a test bug.', status: 'Open', priority: 'Medium' };
        const result = isValidBugData(bug);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Title is required');
    });

    it('should return false if title is too short', () => {
        const bug = { title: 'ab', description: 'This is a test bug.', status: 'Open', priority: 'Medium' };
        const result = isValidBugData(bug);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Title must be at least 3 characters long');
    });

    it('should return false if description is missing', () => {
        const bug = { title: 'Test Bug', status: 'Open', priority: 'Medium' };
        const result = isValidBugData(bug);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Description is required.');
    });

    it('should return false for invalid status', () => {
        const bug = { title: 'Test Bug', description: 'Description', status: 'InvalidStatus' };
        const result = isValidBugData(bug);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Invalid status.');
    });

    it('should return false for invalid priority', () => {
        const bug = { title: 'Test Bug', description: 'Description', priority: 'CrazyHigh' };
        const result = isValidBugData(bug);
        expect(result.isValid).toBe(false);
        expect(result.message).toContain('Invalid priority.');
    });

    it('should return true if status and priority are omitted (defaults)', () => {
        const bug = { title: 'New Bug', description: 'No status or priority given.' };
        const result = isValidBugData(bug);
        expect(result.isValid).toBe(true);
    });
});