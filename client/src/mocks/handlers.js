import { http, HttpResponse } from 'msw';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/bugs';

export const handlers = [
  // Mock GET all bugs
  http.get(API_URL, () => {
    return HttpResponse.json([
      { _id: '1', title: 'Test Bug 1', description: 'Desc 1', status: 'Open', priority: 'High', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
      { _id: '2', title: 'Test Bug 2', description: 'Desc 2', status: 'In Progress', priority: 'Medium', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
    ], { status: 200 });
  }),

  // Mock POST create bug
  http.post(API_URL, async ({ request }) => {
    const newBug = await request.json();
    return HttpResponse.json({
      _id: '3', // Mock a new ID
      ...newBug,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }, { status: 201 });
  }),

  // Mock PUT update bug
  http.put(`${API_URL}/:id`, async ({ params, request }) => {
    const { id } = params;
    const updatedData = await request.json();
    if (id === 'non-existent-id') { // Simulate 404 for a specific ID
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json({
      _id: id,
      title: 'Updated Bug',
      description: 'Updated Description',
      status: 'Resolved',
      priority: 'Low',
      ...updatedData, // Merge updated data
      updatedAt: new Date().toISOString()
    }, { status: 200 });
  }),

  // Mock DELETE bug
  http.delete(`${API_URL}/:id`, ({ params }) => {
    const { id } = params;
    if (id === 'non-existent-id') { // Simulate 404 for a specific ID
      return new HttpResponse(null, { status: 404 });
    }
    return new HttpResponse(null, { status: 204 }); // No content for successful delete
  }),

  // Mock GET bug by ID
  http.get(`${API_URL}/:id`, ({ params }) => {
    const { id } = params;
    if (id === '1') {
      return HttpResponse.json({
        _id: '1', title: 'Test Bug 1', description: 'Desc 1', status: 'Open', priority: 'High', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()
      }, { status: 200 });
    } else if (id === 'non-existent-id-details') {
        return new HttpResponse(null, { status: 404, statusText: 'Bug Not Found' });
    }
    return new HttpResponse(null, { status: 404 });
  }),
];