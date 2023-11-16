import * as yup from 'yup';

const RegisterValidationSchema = yup.object({
    Name: yup.string()
              .required('Name is required')
              .matches(/^[a-zA-Z0-9_ ]*$/, 'Name can only contain letters, numbers, underscores, and spaces')
              .min(3, 'Name must be at least 3 characters')
              .max(20, 'Name must be at most 20 characters'),
  
    Email: yup
          .string()
          .required('Email is required')
          .email('Invalid email')
          .test('valid-email', 'Invalid email format', (value) => {
            if (!value) return true; // Allow empty value
            return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value);
          }),
  
    Mobile: yup
          .string()
          .required('Mobile is required')
          .matches(/^(0|91)?[6-9][0-9]{9}$/, 'Invalid mobile number'),
        
        Password: yup
          .string()
          .required('Password is required')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/,
            'Include one uppercase letter, one lowercase letter, one number, one special character, and be at least 5 characters long'
          ),
    
    ConfirmPassword: yup.string()
      .oneOf([yup.ref('Password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });
  
export default RegisterValidationSchema