import React, { useState, useEffect, useCallback } from 'react';
import BugForm from '../components/BugForm';
import BugList from '../components/BugList';
import EditBugForm from '../components/EditBugForm';
import LoadingSpinner from '../components/LoadingSpinner';
import { getBugs, createBug, deleteBug } from '../api/bugApi';

function HomePage() {
    const [bugs, setBugs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingBugId, setEditingBugId] = useState(null);

    const fetchBugs = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getBugs();
            setBugs(data);
        } catch (err) {
            setError(err.message || 'Failed to fetch bugs.');
            console.error('Error in HomePage fetchBugs:', err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBugs();
    }, [fetchBugs]);

    const handleCreateBug = async (bugData) => {
        try {
            const newBug = await createBug(bugData);
            setBugs((prevBugs) => [...prevBugs, newBug]);
            alert('Bug reported successfully!');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Failed to report bug.');
            console.error('Error creating bug:', err);
        }
    };

    const handleDeleteBug = async (id) => {
        if (window.confirm('Are you sure you want to delete this bug?')) {
            try {
                await deleteBug(id);
                setBugs((prevBugs) => prevBugs.filter((bug) => bug._id !== id));
                alert('Bug deleted successfully!');
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Failed to delete bug.');
                console.error('Error deleting bug:', err);
            }
        }
    };

    const handleEditBug = (id) => {
        setEditingBugId(id);
    };

    const handleUpdateSuccess = (updatedBug) => {
        setBugs((prevBugs) =>
            prevBugs.map((bug) => (bug._id === updatedBug._id ? updatedBug : bug))
        );
        setEditingBugId(null); // Exit edit mode
        alert('Bug updated successfully!');
    };

    const handleCancelEdit = () => {
        setEditingBugId(null);
    };

    return (
        <div className="home-page">
            {error && <div className="error-message">{error}</div>}
            
            {editingBugId ? (
                <EditBugForm
                    bugId={editingBugId}
                    onUpdateSuccess={handleUpdateSuccess}
                    onCancel={handleCancelEdit}
                />
            ) : (
                <BugForm onSubmit={handleCreateBug} />
            )}

            <h2>All Reported Bugs</h2>
            {loading ? <LoadingSpinner /> : (
                <BugList bugs={bugs} onBugDelete={handleDeleteBug} onBugEdit={handleEditBug} />
            )}
        </div>
    );
}

export default HomePage;