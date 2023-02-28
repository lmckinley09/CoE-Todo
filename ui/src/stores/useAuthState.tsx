import create from 'zustand';

interface AuthState {
	isAuthorized: boolean;
	setIsAuthorized: (authorized: boolean) => void;
}

export const useAuthState = create<AuthState>((set) => ({
	// initial state
	isAuthorized: false,
	// methods for manipulating state
	setIsAuthorized: (authorized: boolean) => {
		set(() => ({
			isAuthorized: authorized,
		}));
	},
}));
