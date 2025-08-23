import request from 'supertest';
import express from 'express';
import { login } from '../../controllers/authController';

// Mock do UserRepository
jest.mock('../../repositories/UserRepository', () => {
  return {
    UserRepository: jest.fn().mockImplementation(() => {
      return {
        findByEmail: jest.fn().mockImplementation((email: string) => {
          const usuarios: Record<string, any> = {
            'usuario@existe.com': {
              id: '1',
              email: 'usuario@existe.com',
              password: '$2b$10$YourHashedPasswordHere',
              name: 'Usuario Teste',
            },
          };

          return Promise.resolve(usuarios[email] || null);
        }),
      };
    }),
  };
});

jest.mock('bcrypt', () => ({
  compare: jest.fn().mockImplementation((password, hash) => {
    return Promise.resolve(password === 'senha123');
  }),
}));

jest.mock('../../middleware/auth', () => ({
  generateToken: jest.fn().mockReturnValue('token-fake-123'),
}));

describe('Teste de login', () => {
  let app: express.Application;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.post('/login', login);
  });

  it('Deve falhar caso o email não exista.', async () => {
    const response = await request(app).post('/login').send({
      email: 'emailerrado@naoexiste.com',
      password: 'qualquersenha',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email emailerrado@naoexiste.com not registered');
  });

  it('Deve logar com sucesso caso tudo esteja correto.', async () => {
    const response = await request(app).post('/login').send({
      email: 'usuario@existe.com',
      password: 'senha123',
    });

    expect(response.status).toBe(200);
    expect(response.body.email).toBe('usuario@existe.com');
    expect(response.body.token).toBe('token-fake-123');
  });

  it('Deve falhar caso senha seja errada.', async () => {
    const response = await request(app).post('/login').send({
      email: 'usuario@existe.com',
      password: 'senhaerrada',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email or password invalid!');
  });

  it('Deve falhar caso não seja informado email.', async () => {
    const response = await request(app).post('/login').send({
      password: 'senha123',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Both email and password are required!');
  });

  it('Deve falhar caso a senha não seja enviado', async () => {
    const response = await request(app).post('/login').send({
      email: 'usuario@existe.com',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Both email and password are required!');
  });
});
