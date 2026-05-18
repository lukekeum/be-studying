import fs from 'fs';

import { getDBPath } from './utils/database';

export class Database {
  setup() {
    const exists = fs.existsSync(getDBPath());

    if (!exists) {
      fs.writeFileSync(getDBPath(), JSON.stringify([]));
    }
  }
}
