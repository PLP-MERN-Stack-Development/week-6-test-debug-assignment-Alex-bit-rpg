const isValidBugData = (bug) => {
    if (!bug.title || typeof bug.title !== 'string' || bug.title.trim().length < 3) {
        return { isValid: false, message: 'Title is required and must be at least 3 characters long.' };
    }
    if (!bug.description || typeof bug.description !== 'string' || bug.description.trim().length === 0) {
        return { isValid: false, message: 'Description is required.' };
    }
    const validStatuses = ['Open', 'In Progress', 'Resolved', 'Closed'];
    if (bug.status && !validStatuses.includes(bug.status)) {
        return { isValid: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` };
    }
    const validPriorities = ['Low', 'Medium', 'High', 'Critical'];
    if (bug.priority && !validPriorities.includes(bug.priority)) {
        return { isValid: false, message: `Invalid priority. Must be one of: ${validPriorities.join(', ')}` };
    }
    return { isValid: true, message: 'Bug data is valid.' };
};

module.exports = { isValidBugData };