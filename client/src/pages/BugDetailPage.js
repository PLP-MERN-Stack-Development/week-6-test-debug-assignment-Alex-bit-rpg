import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBugById, deleteBug, updateBug } from '../api/bugApi';
import LoadingSpinner from '../components/LoadingSpinner';
import BugForm from '../components/BugForm'; // Reuse BugForm for editing
import './BugDetailsPage.css';

function BugDetailsPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [bug, setBug] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchBug = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getBugById(id);
                setBug(data);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to fetch bug details.');
            } finally {
                setLoading(false);
            }
        };
        fetchBug();
    }, [id]);

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this bug?')) {
            try {
                await deleteBug(id);
                alert('Bug deleted successfully!');
                navigate('/'); // Navigate back to home page after deletion
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to delete bug.');
            }
        }
    };

    const handleUpdate = async (updatedData) => {
        setLoading(true);
        setError(null);
        try {
            const response = await updateBug(id, updatedData);
            setBug(response); // Update the local state with the new bug data
            setIsEditing(false); // Exit editing mode
            alert('Bug updated successfully!');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to update bug.');
            console.error('Error updating bug from details page:', err);
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
        return <div className="info-message">Bug not found.</div>;
    }

    return (
        <div className="bug-details-page">
            {!isEditing ? (
                <div className="bug-details-card">
                    <h2>Bug Details: {bug.title}</h2>
                    <p><strong>Description:</strong> {bug.description}</p>
                    <p><strong>Status:</strong> <span className={`status-${bug.status.toLowerCase().replace(/\s/g, '-')}`}>{bug.status}</span></p>
                    <p><strong>Priority:</strong> <span className={`priority-${bug.priority.toLowerCase()}`}>{bug.priority}</span></p>
                    <p><strong>Created At:</strong> {new Date(bug.createdAt).toLocaleString()}</p>
                    <p><strong>Last Updated:</strong> {new Date(bug.updatedAt).toLocaleString()}</p>
                    <div className="details-actions">
                        <button onClick={() => setIsEditing(true)} className="edit-button">Edit Bug</button>
                        <button onClick={handleDelete} className="delete-button">Delete Bug</button>
                        <button onClick={() => navigate('/')} className="back-button">Back to List</button>
                    </div>
                </div>
            ) : (
                <div className="bug-edit-section">
                    <BugForm
                        onSubmit={handleUpdate}
                        initialData={bug}
                        isEditMode={true}
                    />
                    <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel Edit</button>
                </div>
            )}
        </div>
    );
}

export default BugDetailsPage;