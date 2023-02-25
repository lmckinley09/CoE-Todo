export interface IBoard {
	id: number;
	name: string;
	created: string;
	last_modified: string;
}

export interface IBoardItem {
	board: IBoard;
}
