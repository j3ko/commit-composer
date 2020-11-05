import * as config from 'components/config/state/config.epic';
import * as editor from 'components/editor/state/editor.epic';
import { combineEpics } from 'redux-observable';

const epics = [...Object.values(editor), ...Object.values(config)];
const rootEpic = combineEpics(...epics);
export default rootEpic;
