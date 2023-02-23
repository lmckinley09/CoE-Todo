import axios from 'axios';
import { useMutation } from 'react-query';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3001',
});
interface IAuthBody {
	email: string;
	password: string;
}

export const fetchAccessTokens = async (userDetails: any) => {
	const response = await axiosInstance.post('/authenticate', userDetails);
	return response;
};

const useAuth = () =>
	useMutation((checkUserAuth: IAuthBody) => fetchAccessTokens(checkUserAuth));

export default useAuth;
