import React, { useEffect, useState } from 'react';
import BugForm from './BugForm';
import { getBugById, updateBug } from '../api/bugApi';
import LoadingSpinner from './LoadingSpinner';

function EditBugForm({ bugId, onUpdateSuccess, onCancel }) {
    const [bug, setBug] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBug = async () => {
            try {
                const fetchedBug = await getBugById(bugId);
                setBug(fetchedBug);
            } catch (err) {
                setError(err.message || 'Failed to fetch bug for editing.');
            } finally {
                setLoading(false);
            }
        };
        fetchBug();
    }, [bugId]);

    const handleSubmit = async (updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateBug(bugId, updatedData);
            onUpdateSuccess(response);
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to update bug.');
            console.error('Error updating bug:', err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error-message">Error: {error}</div>;
    }

    if (!bug) {
        return <div className="info-message">Bug not found for editing.</div>;
    }

    return (
        <div className="edit-bug-container">
            <BugForm onSubmit={handleSubmit} initialData={bug} isEditMode={true} />
            <button onClick={onCancel} className="cancel-button">Cancel</button>
        </div>
    );
}

export default EditBugForm;