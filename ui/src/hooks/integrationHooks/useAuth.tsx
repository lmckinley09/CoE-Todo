import { useMutation } from 'react-query';
import { axiosInstance } from '@integrations/instance';
interface IAuthBody {
	email: string;
	password: string;
}

const fetchAccessTokens = async (userDetails: IAuthBody) => {
	const response = await axiosInstance.post('/authenticate', userDetails);
	return response;
};

const useAuth = () =>
	useMutation((checkUserAuth: IAuthBody) => fetchAccessTokens(checkUserAuth));

export default useAuth;
