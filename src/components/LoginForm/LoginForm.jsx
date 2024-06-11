
import { Formik, Form, Field } from "formik";
import { logIn } from "../../redux/auth/operations";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import css from "./LoginForm.module.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { selectError } from "../../redux/auth/selectror";



export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector(selectError);
  const [submittedWithError, setSubmittedWithError] = useState(false);

  // const handleSubmit = async (values, actions) => {
  //   try {
  //     await dispatch(logIn(values));
  //     navigate("/home")
  //   } catch (error) {
  //     console.error("Login failed:", error);
  //   }
  //   actions.resetForm();
  // };

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    navigate("/home");
    actions.resetForm();
  };

  useEffect(() => {
    if (error && submittedWithError) {
      toast.error(`Ops, somthing wrong, Try Again!`);
    }
  }, [error, submittedWithError]);

  const handleFormSubmit = (values, actions) => {
    setSubmittedWithError(true);
    handleSubmit(values, actions);
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
 

  return (
    <div>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={handleFormSubmit}
      >
            <Form className={css.form}>
              <label htmlFor="email"/>
                <Field type="email" name="email" placeholder ="Enter your email" className={css.input}/>
                <label htmlFor="password"/>
                  <div>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={css.input}
                      placeholder="Confirm a password"
                    />
                    <button type="button "className={css.eye} onClick={togglePasswordVisibility}>
                      {/* <svg width="18" height="18" stroke="currentColor">
                        <use
                          href={`${svg}${showPassword ? "#eye-slash-icon" : "#eye-icon"}`}
                        ></use>
                      </svg> */}
                    </button>
                </div>

                <button type="submit" className={css.button}>Log in Now</button>
          </Form>
        </Formik>
    </div>
  );
}
