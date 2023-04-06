import * as yup from 'yup';

export const validationSchema = yup.object({
	title: yup.string().required('Title is required'),
	description: yup.string().max(2000, '2000 Max Character Length'),
	typeId: yup.string().required('Job Type required'),
	completionDate: yup.date().required('Date required'),
});
