import React, { useState } from 'react';

function BugForm({ onSubmit, initialData = {}, isEditMode = false }) {
    const [bug, setBug] = useState({
        title: initialData.title || '',
        description: initialData.description || '',
        status: initialData.status || 'Open',
        priority: initialData.priority || 'Medium'
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setBug({ ...bug, [e.target.name]: e.target.value });
        // Clear error for the field being typed into
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: '' });
        }
    };

    const validate = () => {
        let formErrors = {};
        if (!bug.title.trim()) {
            formErrors.title = 'Title is required.';
        } else if (bug.title.trim().length < 3) {
            formErrors.title = 'Title must be at least 3 characters.';
        }
        if (!bug.description.trim()) {
            formErrors.description = 'Description is required.';
        }
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Intentional Bug: Forget to call validate() sometimes.
        // if (validate()) {
        //     onSubmit(bug);
        // }

        // Corrected logic for submission:
        if (validate()) {
             // Intentional Bug: Simulate an async error after validation
             // if (bug.title === "Simulate Error") {
             //    throw new Error("Forced client-side error from BugForm");
             // }
            onSubmit(bug);
        } else {
            console.log("Form validation failed", errors);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bug-form">
            <h2>{isEditMode ? 'Edit Bug' : 'Report New Bug'}</h2>
            <div className="form-group">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={bug.title}
                    onChange={handleChange}
                    className={errors.title ? 'input-error' : ''}
                />
                {errors.title && <p className="error-message">{errors.title}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={bug.description}
                    onChange={handleChange}
                    className={errors.description ? 'input-error' : ''}
                ></textarea>
                {errors.description && <p className="error-message">{errors.description}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select id="status" name="status" value={bug.status} onChange={handleChange}>
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <div className="form-group">
                <label htmlFor="priority">Priority:</label>
                <select id="priority" name="priority" value={bug.priority} onChange={handleChange}>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical</option>
                </select>
            </div>
            <button type="submit">{isEditMode ? 'Update Bug' : 'Add Bug'}</button>
        </form>
    );
}

export default BugForm;