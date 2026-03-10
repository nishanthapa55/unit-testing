
import request from 'supertest';

const baseUrl = 'http://localhost:5000';

describe('API Integration - Test 1', () => {
  
  it('should return 200 and a valid dog image URL', async () => {
    const response = await request(baseUrl).get('/api/dogs/random');

    expect(response.status).toBe(200); 
    expect(response.body.success).toBe(true); 
    expect(response.body.data).toBeDefined(); 
    expect(response.body.data).toHaveProperty('imageUrl'); 
    expect(typeof response.body.data.imageUrl).toBe('string'); 
  });
it('should return 404 for an invalid route', async () => {
    const response = await request(baseUrl).get('/api/dogs/invalid-path');

    expect(response.status).toBe(404); 
    expect(response.body.error).toBeDefined(); 
  });
});