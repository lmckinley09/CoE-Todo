export interface IJob {
	id: number;
	boardId: number;
	typeId: number;
	title: string;
	description: string;
	status: string;
	completionDate: string;
	created?: string;
	lastModified?: string;
	jobType: IJobType;
}
export interface IJobType {
	id: number;
	description: string;
}

export interface IUpdateJob {
	title: string;
	description: string;
	completionDate: string;
	status: string;
	typeId: number;
}

export interface IJobItem {
	openEditModal: (job: IJob) => void;
	job: IJob;
}

export interface IGetJobs {
	data?: Array<IJob>;
}
