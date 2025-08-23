import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Digite um email válido')
    .required('Email é obrigatório'),
  password: Yup.string()
    .min(3, 'Senha deve ter no mínimo 3 caracteres')
    .required('Senha é obrigatória'),
});