import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  phone: Yup.string()
    .trim()
    .required('فون نمبر درج کریں')
    .matches(/^03[0-9]{9}$/, 'فون نمبر صحیح درج کریں')
});


