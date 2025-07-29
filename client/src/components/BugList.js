import React from 'react';
import BugItem from './BugItem';
import './BugList.css'; // Optional: for basic styling

function BugList({ bugs, onBugDelete, onBugEdit }) {
    if (!bugs || bugs.length === 0) {
        return <p className="no-bugs-message">No bugs reported yet. Start by adding one!</p>;
    }

    return (
        <div className="bug-list">
            {bugs.map((bug) => (
                <BugItem
                    key={bug._id}
                    bug={bug}
                    onDelete={onBugDelete}
                    onEdit={onBugEdit}
                />
            ))}
        </div>
    );
}

export default BugList;