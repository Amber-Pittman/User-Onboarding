mport React from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";




function LoginForm({ values, errors, touched }) {
    
  
    return (
        <Form>
          <div>
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field
            type="text"
            name="name"
            placeholder="Name" 
            />
          </div>
          <div>
            {touched.email && errors.email && <p>{errors.email}</p>}
            <Field
              type="email"
              name="email"
              placeholder="Email" 
              />
          </div>
          <div>
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field
              type="password"
              name="password" 
              placeholder="Password" 
              />
          </div>
          <label>
            <Field
              type="checkbox"
              name="terms" 
              checked={values.terms}
              />
              Accept Term of Service
          </label>
          <button>Submit!</button>
        </Form>
    );
}


const FormikForm = withFormik({


    mapPropsToValues({ name, email, password, terms }) {
      return {
        name: name || "",
        email: email || "",
        password: password || "",
        terms: terms || false
      };
  
    },


    validationSchema: Yup.object().shape({
        name: Yup.string()
          .name()
          .required("Your Name is required"),
        email: Yup.string()
          .email()
          .required("Email is required"),
        password: Yup.string()
          .min(8, "Password must be 8 characters or longer")
          .required("Password is required"),
        terms: Yup.boolean()
          .oneOf([true], "Must agree to Terms of Service")
    })


    handleSubmit(values) {
        console.log(values)
    }


    )(LoginForm);


export default LoginForm;