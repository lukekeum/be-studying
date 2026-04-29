import path from 'path';

export function getDBPath() {
  return path.join(process.cwd(), 'data', 'data.json');
}
