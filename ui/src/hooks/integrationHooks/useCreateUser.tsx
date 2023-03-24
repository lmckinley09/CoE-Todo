import { useMutation } from 'react-query';
import { axiosInstance } from '@integrations/instance';

export interface ICreateUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export const createUser = async (userDetails: ICreateUser) => {
	const response = await axiosInstance.post('/users', userDetails);
	return response;
};

const useCreateUser = () =>
	useMutation((createNewUser: ICreateUser) => createUser(createNewUser));

export default useCreateUser;
