import { Dispatch, SetStateAction } from 'react';

export interface IModal {
	open: boolean;
	handleClose: Dispatch<SetStateAction<boolean>>;
}
