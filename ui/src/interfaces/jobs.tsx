import { Dispatch, SetStateAction } from 'react';
export interface IJob {
	id: number;
	board_id: number;
	type_id: number;
	title: string;
	description: string;
	status: string;
	completion_date: string;
	job_type: IJobType;
}

export interface IJobItem {
	openEditModal: (job: IJob) => void;
	job: IJob;
}

export interface IGetJobs {
	data?: Array<IJob>;
}

export interface IJobType {
	id: number;
	type_description: string;
}
