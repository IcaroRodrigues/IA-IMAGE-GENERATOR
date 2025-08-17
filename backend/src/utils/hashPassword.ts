import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password.toString(), 10);
  return hash;
}
