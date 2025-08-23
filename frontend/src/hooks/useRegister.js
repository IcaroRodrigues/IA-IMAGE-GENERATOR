import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../providers/ToastProvider';
import { signupSchema } from '../validations/signupSchema';
import { initialValues } from '../constants/initialValues';

export const useRegister = () => {
  const navigate = useNavigate();
  const { openToast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/feed');
    }
  }, [navigate]);

  const handleSignupSubmit = async (values, actions) => {
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const result = await response.json();

      if (!response.ok) {
        openToast({
          title: result.error || 'Erro ao criar conta',
          type: 'error',
        });
        if (result.error) {
          actions.setFieldError('email', result.error);
        }
        actions.setSubmitting(false);
        return;
      }

      window.localStorage.setItem('token', result.token);
      openToast({
        title: 'Conta criada com sucesso!',
        type: 'success',
      });
      navigate('/feed');
    } catch (error) {
      console.error(error);
      openToast({
        title: 'Erro ao criar conta',
        type: 'error',
      });
      actions.setFieldError('email', 'Erro ao criar conta');
      actions.setSubmitting(false);
    }
  };

  return {
    initialValues: initialValues.signup,
    validationSchema: signupSchema,
    onSubmit: handleSignupSubmit,
  };
};