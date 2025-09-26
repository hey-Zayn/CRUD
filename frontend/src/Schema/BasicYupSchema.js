import * as  yup from 'yup';


const BasicYupSchema = yup.object().shape({
    name: yup.string().required("Name is required").min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
    email : yup.string().email("Invalid email format").required("Email is required"),
    age: yup.number().required("Age is required").min(0, "Age must be at least 0").max(120, "Age must be at most 120"),
    password : yup.string().required('password is required').min(8, "password must be at least 8 characters").matches(/[a-z]/, 'password must contain at least one lowercase letter').matches(/[A-Z]/, 'password must contain at least one uppercase letter').matches(/[0-9]/, 'password must contain at least one number').matches(/[@$!%*?&]/, 'password must contain at least one special character'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('confirm password is required')
});

export default BasicYupSchema;