import fs from 'fs';

import { getDBPath } from './utils/database/index.js';

export class Database {
  async setup() {
    const exists = fs.existsSync(getDBPath());

    if (!exists) {
      fs.writeFileSync(getDBPath(), JSON.stringify([]));
    }
  }
}
