import { Dispatch, SetStateAction } from 'react';
import { IJob } from './jobs';

export interface IModal {
	open: boolean;
	handleClose: Dispatch<SetStateAction<boolean>>;
}

export interface IEditModal extends IModal {
	job: IJob;
	setDisplayNotification: Dispatch<SetStateAction<boolean>>;
}
