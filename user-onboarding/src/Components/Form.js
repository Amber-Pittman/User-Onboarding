import React from "react";
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";




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


    validationSchema: yup.object().shape({
        name: yup.string()
          .name()
          .required("Your Name is required"),
        email: yup.string()
          .email()
          .required("Email is required"),
        password: yup.string()
          .min(8, "Password must be 8 characters or longer")
          .required("Password is required"),
        terms: yup.boolean()
          .oneOf([true], "Must agree to Terms of Service")
    }),


    handleSubmit(values, { resetForm, setErrors, setSubmitting}) {
        console.log(values)

        if (values.email === "alreadytaken@atb.dev") {
            setErrors({ email: "That email is already taken"});
        } else {
            axios
            .post("https://reqres.in/api/users", values)
            .then(response => {
                console.log(response);
                resetForm();
                setSubmitting(false);
            })
            .catch(err => {
                console.log(err);
                setSubmitting(false);
            });
        }
    }
        
    })(LoginForm);


export default LoginForm;