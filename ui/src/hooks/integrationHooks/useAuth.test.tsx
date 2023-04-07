import { renderHook, act } from '@testing-library/react-hooks';
import useAuth, { fetchAccessTokens } from './useAuth';
import { QueryClient, QueryClientProvider } from 'react-query';
import { waitFor } from '@testing-library/react';

jest.mock('../../integrations/instance', () => ({
	axiosInstance: {
		post: jest.fn(),
	},
}));

const mockAxiosInstance = require('../../integrations/instance').axiosInstance;

describe('useAuth', () => {
	afterEach(() => {
		jest.resetAllMocks();
	});

	it('should call fetchAccessTokens and return data when useAuth is called', async () => {
		const userDetails = { email: 'email@email.com', password: 'password' };
		const mockResponse = { data: { accessToken: '12345' } };
		mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);
		const queryClient = new QueryClient();
		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useAuth(), {
			wrapper,
		});
		act(() => result.current.mutate(userDetails));

		await waitFor(() => {
			expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
			expect(mockAxiosInstance.post).toHaveBeenCalledWith(
				'/authenticate',
				userDetails
			);
			expect(result.current.isSuccess).toBe(true);
		});
	});

	it('should handle error when fetchAccessTokens fails', async () => {
		const userDetails = { email: 'test@example.com', password: 'password' };
		const mockError = { message: 'Invalid credentials' };
		mockAxiosInstance.post.mockRejectedValueOnce(mockError);
		const queryClient = new QueryClient();

		const wrapper = ({ children }: { children: any }) => (
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		);

		const { result } = renderHook(() => useAuth(), {
			wrapper,
		});
		act(() => result.current.mutate(userDetails));

		await waitFor(() => {
			expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
			expect(mockAxiosInstance.post).toHaveBeenCalledWith(
				'/authenticate',
				userDetails
			);
			expect(result.current.isError).toBe(true);
			expect(result.current.error).toEqual(mockError);
		});
	});
});

describe('fetchAccessTokens', () => {
	it('should call axiosInstance.post with userDetails and return data', async () => {
		const userDetails = { email: 'email@email.com', password: 'password' };
		const mockResponse = { data: { accessToken: '12345' } };
		mockAxiosInstance.post.mockResolvedValueOnce(mockResponse);

		const response = await fetchAccessTokens(userDetails);

		await waitFor(() => {
			expect(mockAxiosInstance.post).toHaveBeenCalledTimes(1);
			expect(mockAxiosInstance.post).toHaveBeenCalledWith(
				'/authenticate',
				userDetails
			);
			expect(response).toEqual(mockResponse);
		});
	});
});
