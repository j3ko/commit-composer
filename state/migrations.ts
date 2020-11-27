import { produce } from 'immer';
import { MigrationManifest, PersistedState } from 'redux-persist';
import { AppState } from 'state';

export const migrations: MigrationManifest = {
  0: produce((draft: PersistedState & AppState) => {
    return draft.editor.recentGitmojis.forEach((x) => {
      if (x['markdown']) {
        x.shortcode = x['markdown'];
      }
    });
  }),
};
