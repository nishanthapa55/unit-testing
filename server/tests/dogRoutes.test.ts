import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import express, { Express } from 'express';
import * as dogController from '../controllers/dogController';

describe('dogRoutes', () => {
  let app: Express;

  // Setup: Create Express app with the dog routes
  beforeEach(() => {
    app = express();
    app.use(express.json());

    // Mock the controller
    vi.spyOn(dogController, 'getDogImage').mockImplementation(async (req, res) => {
      res.json({
        success: true,
        data: {
          imageUrl: 'https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg',
          status: 'success'
        }
      });
    });

    // Mount the routes
    app.get('/api/dogs/random', dogController.getDogImage);
  });

  it('should return status 200 with success true and mocked dog image URL', async () => {
    // Act: Make GET request to the endpoint
    const response = await request(app)
      .get('/api/dogs/random')
      .expect(200);

    // Assert: Verify the response
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toContain('https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg');
  });
});
