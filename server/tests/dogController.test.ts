import { describe, it, expect, vi } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';
import { Request, Response } from 'express';

describe('dogController', () => {
  it('should return success true with mocked dog data when service call succeeds', async () => {
    // Arrange: Mock the service response
    const mockDogData = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };

    vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue(mockDogData);

    // Create mock request and response objects
    const mockRequest = {} as Request;
    const mockResponse = {
      json: vi.fn().mockReturnThis()
    } as unknown as Response;

    // Act: Call the controller function
    await getDogImage(mockRequest, mockResponse);

    // Assert: Verify the response
    expect(mockResponse.json).toHaveBeenCalledWith({
      success: true,
      data: mockDogData
    });
    expect(mockResponse.json).toHaveBeenCalledOnce();
  });
});
