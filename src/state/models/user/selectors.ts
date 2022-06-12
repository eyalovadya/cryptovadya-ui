import { RootState } from './../../store';

const user = (state: RootState) => state.user.user;

const getUserLoadingState = (state: RootState) => state.loading.effects.user.getMe;
const loginLoadingState = (state: RootState) => state.loading.effects.user.login;
const registerLoadingState = (state: RootState) => state.loading.effects.user.register;

const isLoggedIn = (state: RootState) => !!state.user.user;

export { default as userSelectors } from './selectors';

const selectors = { user, getUserLoadingState, isLoggedIn, loginLoadingState, registerLoadingState };

export default selectors;
