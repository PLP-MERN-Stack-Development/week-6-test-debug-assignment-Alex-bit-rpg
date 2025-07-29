const request = require('supertest');
const app = require('../../server'); // Import your Express app
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Bug = require('../../models/Bug');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
});

afterEach(async () => {
    await Bug.deleteMany({}); // Clear database after each test
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Bug API Integration Tests', () => {
    let bugId;

    it('POST /api/bugs should create a new bug', async () => {
        const newBug = {
            title: 'Frontend Button Not Working',
            description: 'The submit button on the main form is unresponsive.',
            status: 'Open',
            priority: 'High'
        };

        const res = await request(app)
            .post('/api/bugs')
            .send(newBug);

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('_id');
        expect(res.body.title).toEqual(newBug.title);
        expect(res.body.status).toEqual('Open'); // Verify default if not provided, or provided if set
        bugId = res.body._id; // Store ID for subsequent tests
    });

    it('POST /api/bugs should return 400 for invalid data', async () => {
        const invalidBug = {
            description: 'Missing title',
            status: 'Open'
        };

        const res = await request(app)
            .post('/api/bugs')
            .send(invalidBug);

        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toContain('Title is required');
    });

    it('GET /api/bugs should return all bugs', async () => {
        await Bug.create({ title: 'Bug 1', description: 'Desc 1' });
        await Bug.create({ title: 'Bug 2', description: 'Desc 2' });

        const res = await request(app).get('/api/bugs');

        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toEqual(2);
    });

    it('GET /api/bugs/:id should return a single bug', async () => {
        const bug = await Bug.create({ title: 'Specific Bug', description: 'Details here.' });
        const res = await request(app).get(`/api/bugs/${bug._id}`);

        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual('Specific Bug');
    });

    it('GET /api/bugs/:id should return 404 if bug not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId(); // Generate a valid-looking but non-existent ID
        const res = await request(app).get(`/api/bugs/${nonExistentId}`);
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('Bug not found');
    });

    it('PUT /api/bugs/:id should update a bug', async () => {
        const bug = await Bug.create({ title: 'Old Title', description: 'Old Desc', status: 'Open' });
        const updatedData = { status: 'Resolved', description: 'New Description' };

        const res = await request(app)
            .put(`/api/bugs/${bug._id}`)
            .send(updatedData);

        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('Resolved');
        expect(res.body.description).toEqual('New Description');
    });

    it('PUT /api/bugs/:id should return 404 if bug to update not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const updatedData = { status: 'Resolved' };
        const res = await request(app)
            .put(`/api/bugs/${nonExistentId}`)
            .send(updatedData);
        expect(res.statusCode).toEqual(404);
    });

    it('PUT /api/bugs/:id should return 400 for invalid update data', async () => {
        const bug = await Bug.create({ title: 'Old Title', description: 'Old Desc', status: 'Open' });
        const invalidData = { status: 'Invalid Status' };

        const res = await request(app)
            .put(`/api/bugs/${bug._id}`)
            .send(invalidData);
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toContain('Invalid status.');
    });

    it('DELETE /api/bugs/:id should delete a bug', async () => {
        const bug = await Bug.create({ title: 'To Be Deleted', description: 'Bye bye' });

        const res = await request(app).delete(`/api/bugs/${bug._id}`);
        expect(res.statusCode).toEqual(204);

        const foundBug = await Bug.findById(bug._id);
        expect(foundBug).toBeNull();
    });

    it('DELETE /api/bugs/:id should return 404 if bug to delete not found', async () => {
        const nonExistentId = new mongoose.Types.ObjectId();
        const res = await request(app).delete(`/api/bugs/${nonExistentId}`);
        expect(res.statusCode).toEqual(404);
    });
});