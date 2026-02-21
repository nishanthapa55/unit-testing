import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRandomDogImage } from '../services/dogService';

describe('dogService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  it('should return dog image data when API call is successful', async () => {
    // Arrange: Mock the fetch response
    const mockData = {
      message: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockData
    } as Response);

    // Act: Call the service function
    const result = await getRandomDogImage();

    // Assert: Verify the results
    expect(result.imageUrl).toBe(mockData.message);
    expect(result.status).toBe('success');
    expect(global.fetch).toHaveBeenCalledOnce();
  });

  it('should throw error when API returns not ok status', async () => {
    // Arrange: Mock the fetch response with error status
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    } as Response);

    // Act & Assert: Verify that the function throws an error with a specific message
    await expect(getRandomDogImage()).rejects.toThrow(
      'Failed to fetch dog image: Dog API returned status 500'
    );
    expect(global.fetch).toHaveBeenCalledOnce();
  });
});
