import * as yup from 'yup';


const userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email format").required("Email is required"),
    phone: yup.string().required("Phone is required"),
    image: yup.mixed().notRequired()
});


export default userSchema;