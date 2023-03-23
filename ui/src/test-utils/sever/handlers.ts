import { rest } from 'msw';
import { IBoard } from '@interfaces/boards';
import { IJob } from '@interfaces/jobs';

const baseUrl = 'http://localhost:3001';

const boardsData: IBoard[] = [
	{
		id: 1,
		name: "Lorna's Board",
		created: '2023-02-07T15:58:11.689Z',
		lastModified: '2023-03-10T12:41:14.930Z',
	},
	{
		id: 2,
		name: 'Party Board',
		created: '2023-02-07T15:58:11.689Z',
		lastModified: '2023-03-10T12:41:14.930Z',
	},
];

const jobsData: IJob[] = [
	{
		id: 1,
		boardId: 1,
		typeId: 1,
		title: 'test',
		description: '<p>test</p>',
		status: 'Not Started',
		completionDate: '2023-02-27T00:00:00.000Z',
		lastModified: '2023-03-02T10:53:23.663Z',
		created: '2023-02-27T18:33:18.476Z',
		jobType: { id: 1, description: 'tick' },
	},
	{
		id: 2,
		boardId: 1,
		typeId: 2,
		title: 'test2',
		description: '<p>test2</p>',
		status: 'Done',
		completionDate: '2023-02-27T00:00:00.000Z',
		lastModified: '2023-03-02T10:53:23.663Z',
		created: '2023-02-27T18:33:18.476Z',
		jobType: { id: 2, description: 'task' },
	},
];

export const handlers = [
	rest.get(baseUrl + '/api/authenticate/refresh', (req, res, ctx) =>
		res(
			ctx.status(200),
			ctx.json({
				accessToken: 'new-access-token',
				refreshToken: 'new-refresh-token',
			})
		)
	),

	rest.post(baseUrl + '/api/authenticate', async (req, res, ctx) => {
		const requestData = await req.json();
		if (
			requestData.email === 'test.email@mail.com' &&
			requestData.password === 'password1!'
		) {
			return res(ctx.status(200));
		} else {
			return res(ctx.status(500));
		}
	}),

	rest.get(baseUrl + '/api/boards', (req, res, ctx) => {
		return res(ctx.json(boardsData));
	}),
	rest.get(baseUrl + '/api/jobs', (req, res, ctx) => {
		return res(ctx.json(boardsData));
	}),
	rest.post(baseUrl + '/api/boards', (req, res, ctx) => {
		return res(ctx.json(boardsData));
	}),
	rest.post(baseUrl + '/api/jobs', (req, res, ctx) => {
		return res(ctx.json(boardsData));
	}),
	rest.put(baseUrl + '/api/boards', (req, res, ctx) => {
		return res(ctx.json(boardsData));
	}),
	rest.put(baseUrl + '/api/jobs', (req, res, ctx) => {
		return res(ctx.json(boardsData));
	}),
	rest.delete(baseUrl + '/api/boards', (req, res, ctx) => {
		return res(ctx.status(200));
	}),
	rest.delete(baseUrl + '/api/jobs', (req, res, ctx) => {
		return res(ctx.status(200));
	}),
];

export { rest };
