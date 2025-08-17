import Router from 'express';
import bcrypt from 'bcrypt';

const router = Router();

async function hashPassword(password: string): Promise<string> {
  const hash = await bcrypt.hash(password.toString(), 10);
  return hash;
}

router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    const passwordHashed = await hashPassword(password);

    res.json({ email, password: passwordHashed });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
