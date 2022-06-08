import { RootState } from './../../store';

const dashboards = (state: RootState) => state.dashboards.dashboards;

export { default as deshboardsSelectors } from './selectors';

const selectors = { dashboards };

export default selectors;
