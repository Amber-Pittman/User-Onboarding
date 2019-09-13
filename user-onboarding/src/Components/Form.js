import React, {useState, useEffect} from "react";
import { withFormik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";




function LoginForm({ values, errors, status, touched }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (status) {
            setData([...data, status])
        }
    }, [status])
  
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
              Accept Terms of Service
          </label>

          <button type="button">Submit!</button>
        </Form>
    );
}


export default withFormik({
    mapPropsToValues(values) {
      return {
        name: values.name || "",
        email: values.email || "",
        password: values.password || "",
        terms: values.terms || false
      };
    },

    validationSchema: yup.object().shape({
        name: yup.string()
          .required("Your Name is required"),
        email: yup.string()
          .required("Email is required"),
        password: yup.string()
          .min(8, "Password must be 8 characters or longer")
          .required("Password is required"),
        terms: yup.boolean()
          .oneOf([true], "Must agree to Terms of Service")
    }),


    handleSubmit(values, { setStatus }) {
        console.log(values)
            axios
            .post("https://reqres.in/api/users", values)
            .then(response => {
                console.log(response);
                setStatus(response.data);
            })
            .catch(err => {
                console.log("Error: ", err);
            });
        }        
    })(LoginForm);