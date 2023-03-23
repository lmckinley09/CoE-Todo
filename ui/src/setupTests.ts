/* eslint-disable no-console */
// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { QueryCache, setLogger } from 'react-query';
import { beforeAll, afterAll, afterEach } from '@jest/globals';
import Server from './test-utils/sever';
// https://react-query.tanstack.com/guides/testing
setLogger({
	log: console.log,
	warn: console.warn,
	// ✅ no more errors on the console
	error: () => 'ERROR',
});

const queryCache = new QueryCache();
// Establish API mocking before all tests.
beforeAll(() => Server.listen());

/*
Reset any request handlers that we may add during the tests,
so they don't affect other tests. Also reset the react query cache */
afterEach(() => {
	Server.resetHandlers();
	queryCache.clear();
});

// Clean up after the tests are finished.
afterAll(() => {
	queryCache.clear();
	Server.close();
});
