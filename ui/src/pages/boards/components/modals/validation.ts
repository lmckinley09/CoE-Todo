import * as yup from 'yup';

export const validationSchema = yup.object({
	name: yup.string().min(3).required('Name is required'),
	email: yup.string().email(),
});
