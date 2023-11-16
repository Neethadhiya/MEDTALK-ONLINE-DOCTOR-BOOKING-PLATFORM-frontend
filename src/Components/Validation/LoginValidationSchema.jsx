import * as yup from 'yup';

const LoginValidationSchema = yup.object({
  
    Email: yup
          .string()
          .required('Email is required')
          .email('Invalid email')
          .test('valid-email', 'Invalid email format', (value) => {
            if (!value) return true; // Allow empty value
            return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
          }),
  
        Password: yup
          .string()
          .required('Password is required'),
          
  });
  
export default LoginValidationSchema