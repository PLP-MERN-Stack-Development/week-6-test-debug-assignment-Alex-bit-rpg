const asyncHandler = require('../middleware/asyncHandler');
const Bug = require('../models/Bug');
const { isValidBugData } = require('../utils/validation');

// @desc    Get all bugs
// @route   GET /api/bugs
// @access  Public
const getBugs = asyncHandler(async (req, res) => {
    const bugs = await Bug.find({});
    res.status(200).json(bugs);
});

// @desc    Get single bug
// @route   GET /api/bugs/:id
// @access  Public
const getBugById = asyncHandler(async (req, res) => {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
        res.status(404);
        throw new Error('Bug not found');
    }

    res.status(200).json(bug);
});

// @desc    Create new bug
// @route   POST /api/bugs
// @access  Public
const createBug = asyncHandler(async (req, res) => {
    const { isValid, message } = isValidBugData(req.body);

    if (!isValid) {
        res.status(400); // Bad Request
        throw new Error(message);
    }

    const bug = new Bug({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status || 'Open',
        priority: req.body.priority || 'Medium'
    });

    const createdBug = await bug.save();
    res.status(201).json(createdBug);
});

// @desc    Update bug
// @route   PUT /api/bugs/:id
// @access  Public
const updateBug = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority } = req.body;

    const { isValid, message } = isValidBugData(req.body);
    if (!isValid) {
        res.status(400); // Bad Request
        throw new Error(message);
    }

    const bug = await Bug.findById(id);

    if (!bug) {
        res.status(404);
        throw new Error('Bug not found');
    }

    bug.title = title || bug.title;
    bug.description = description || bug.description;
    bug.status = status || bug.status;
    bug.priority = priority || bug.priority;
    bug.updatedAt = Date.now(); // Manually update updatedAt if not using Mongoose options

    const updatedBug = await bug.save();
    res.status(200).json(updatedBug);
});

// @desc    Delete bug
// @route   DELETE /api/bugs/:id
// @access  Public
const deleteBug = asyncHandler(async (req, res) => {
    const bug = await Bug.findById(req.params.id);

    if (!bug) {
        res.status(404);
        throw new Error('Bug not found');
    }

    await Bug.deleteOne({ _id: req.params.id }); // Use deleteOne with query
    res.status(204).json({ message: 'Bug removed' }); // 204 No Content for successful deletion
});

module.exports = {
    getBugs,
    getBugById,
    createBug,
    updateBug,
    deleteBug
};