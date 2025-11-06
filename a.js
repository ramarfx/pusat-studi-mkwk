// scripts/hash.js
import bcrypt from 'bcrypt';

const plain = process.argv[2] || 'password123';
const rounds = 10;

(async () => {
  const hash = await bcrypt.hash(plain, rounds);
  console.log(hash);
})();
