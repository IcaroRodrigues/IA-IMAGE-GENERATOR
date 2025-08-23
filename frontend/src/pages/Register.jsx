import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import Input from '../components/Input';
import Button from '../components/Button';
import { useRegister } from '../hooks/useRegister';

export const Register = () => {
  const { initialValues, validationSchema, onSubmit } = useRegister();
  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center w-[300px] gap-4 mb-6">
        <Input
          variant="primary"
          placeholder="Digite seu nome"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          iconStart={<i className="las la-user text-xl"></i>}
          error={formik.touched.name && formik.errors.name}
        />
        <Input
          variant="primary"
          placeholder="Digite seu email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          iconStart={<i className="las la-envelope text-xl"></i>}
          error={formik.touched.email && formik.errors.email}
        />
        <Input
          variant="primary"
          placeholder="Digite sua senha"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && formik.errors.password}
          iconStart={<i className="las la-lock text-xl"></i>}
        />
        <Input
          variant="primary"
          placeholder="Confirme sua senha"
          name="confirmPassword"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.confirmPassword && formik.errors.confirmPassword}
          iconStart={<i className="las la-lock text-xl"></i>}
        />

        <Button type="submit" disabled={formik.isSubmitting} className="w-full">
          {formik.isSubmitting ? 'CADASTRANDO...' : 'CADASTRAR'}
        </Button>

        <div className="w-full flex justify-end">
          <Link to="/login" className="text-white">
            Já tem uma conta? Faça login
          </Link>
        </div>
      </form>
    </div>
  );
};