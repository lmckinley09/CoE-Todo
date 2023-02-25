export interface IJob {
	id: number;
	board_id: number;
	type_id: number;
	title: string;
	description: string;
	status: string;
	completion_date: string;
}

export interface IJobItem {
	job: IJob;
}
