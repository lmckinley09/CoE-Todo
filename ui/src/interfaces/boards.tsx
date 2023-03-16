export interface IBoard {
	id?: number;
	name: string;
	created: string;
	lastModified: string;
	tickCount?: number;
	taskCount?: number;
	projectCount?: number;
}

export interface IUpdateBoard {
	name: string;
}

export interface IGetBoards {
	owner: IBoard[];
	shared: IBoard[];
}

export interface IBoardItem {
	board: IBoard;
}
