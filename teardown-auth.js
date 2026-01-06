import fs from 'fs';
import path from 'path';

const AUTH_FILE = path.resolve(__dirname, 'auth.json');

export default async () => {
  if (fs.existsSync(AUTH_FILE)) {
    fs.unlinkSync(AUTH_FILE);
    console.log('⏹ auth.json deleted after test run');
  }
};
