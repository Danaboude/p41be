import bcrypt from 'bcryptjs';
const password = 'ives-abdulkareem';
const hash = bcrypt.hashSync(password, 10);
console.log(hash);
