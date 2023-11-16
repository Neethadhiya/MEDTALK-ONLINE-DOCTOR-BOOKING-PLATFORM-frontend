import * as yup from 'yup';

const ResetPasswordValidation = yup.object({
   
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
  
export default ResetPasswordValidation