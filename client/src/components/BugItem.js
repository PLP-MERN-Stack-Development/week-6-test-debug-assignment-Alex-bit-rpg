import React from 'react';
import { Link } from 'react-router-dom';
import './BugItem.css'; // Optional: for basic styling

function BugItem({ bug, onDelete, onEdit }) {
    const getStatusClass = (status) => {
        switch (status) {
            case 'Open': return 'status-open';
            case 'In Progress': return 'status-in-progress';
            case 'Resolved': return 'status-resolved';
            case 'Closed': return 'status-closed';
            default: return '';
        }
    };

    const getPriorityClass = (priority) => {
        switch (priority) {
            case 'Low': return 'priority-low';
            case 'Medium': return 'priority-medium';
            case 'High': return 'priority-high';
            case 'Critical': return 'priority-critical';
            default: return '';
        }
    };

    return (
        <div className="bug-item">
            <Link to={`/bug/${bug._id}`} className="bug-title-link">
                <h3>{bug.title}</h3>
            </Link>
            <p className="bug-description">{bug.description.substring(0, 100)}{bug.description.length > 100 ? '...' : ''}</p>
            <div className="bug-meta">
                <span className={`bug-status ${getStatusClass(bug.status)}`}>Status: {bug.status}</span>
                <span className={`bug-priority ${getPriorityClass(bug.priority)}`}>Priority: {bug.priority}</span>
            </div>
            <div className="bug-actions">
                {/* Intentional Bug: Incorrect prop name to demonstrate console errors */}
                {/* <button onClick={() => onEdit(bug._id)} className="edit-button">Edit</button> */}
                <button onClick={() => onEdit(bug._id)} className="edit-button">Edit</button>
                <button onClick={() => onDelete(bug._id)} className="delete-button">Delete</button>
            </div>
        </div>
    );
}

export default BugItem;