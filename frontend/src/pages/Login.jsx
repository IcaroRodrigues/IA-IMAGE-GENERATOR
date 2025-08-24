import { Link } from 'react-router-dom';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import { Input } from '../components/Input';
import Button from '../components/Button';
import { useLogin } from '../hooks/useLogin';

export const Login = () => {
  const { initialValues, validationSchema, onSubmit } = useLogin();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center w-full h-full"
    >
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-[300px] items-center gap-4 mb-6"
      >
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

        <Button className="w-full" type="submit" disabled={formik.isSubmitting}>
          ENTRAR
        </Button>

        <div className="w-full flex justify-end">
          <Link to="/cadastro" className="text-white">
            Cadastre-se
          </Link>
        </div>
      </motion.form>
    </motion.div>
  );
};
