import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import * as yup from "yup";
import Helmet from "react-helmet";
export default function Login() {
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  async function registerSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signin", values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });

    if (data.message === "success") {
      setisLoading(false);
      navigate("/");
    }
  }

  let validationSchema = yup.object({
    email: yup.string().email("email is invalid").required("email is required"),
    password: yup
      .string()
      .matches(/^[\w\.-]{6,}$/gm, "password is invalid")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Login</title>
        <meta name="description" content="Login Page" />
      </Helmet>
      <main className="background vh-100 d-flex justify-content-center align-items-center">
        <div className="container  ">
          <div className="row">
            <div className="col-md-6 rounded-3 p-4 blur offset-md-3">
              <h2 className="text-center text-color">Login Form</h2>
              {error !== null ? (
                <div className="d-flex text-center justify-content-center align-items-center">
                  {" "}
                  <div className="alert-danger w-75 alert ">{error}</div>
                </div>
              ) : (
                " "
              )}
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label className=" text-color" htmlFor="email">
                    Email:
                  </label>
                  <input
                    placeholder="example@email.com"
                    type="email"
                    className="  form-control"
                    id="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />

                  {formik.errors.email && formik.touched.email ? (
                    <div className="alert alert-danger  p-2 mt-2">
                      {formik.errors.email}
                    </div>
                  ) : (
                    false
                  )}
                </div>
                <div className="form-group">
                  <label className="text-color" htmlFor="password">
                    Password:
                  </label>
                  <input
                    placeholder="password"
                    type="password"
                    className=" form-control"
                    id="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />

                  {formik.errors.password && formik.touched.password ? (
                    <div className="alert alert-danger  p-2 mt-2">
                      {formik.errors.password}
                    </div>
                  ) : (
                    false
                  )}
                </div>
                <div className=" d-flex justify-content-between align-items-center">
                  <label className="  text-color" for="remember">
                    <input
                      className="mx-2"
                      type="checkbox"
                      id="remember"
                      name="remember"
                    />
                    Remember Me
                  </label>
                  <Link
                    className="hover my-2 text-color"
                    to={"/forgetpassword"}
                  >
                    Forget Password
                  </Link>
                </div>

                {isLoading ? (
                  <>
                    <button className="w-100 rounded-3 my-2  a" type="button">
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <i className=" fas fa-spinner fa-spin"></i>
                    </button>
                  </>
                ) : (
                  <button
                    className=" w-100 rounded-3 my-2  a"
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                  >
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Login
                  </button>
                )}
                <div className="d-flex justify-content-center align-items-center">
                  <h4 className="h6 text-white">Don't have an account?</h4>
                  <Link className="text-color hover mx-2 mb-2" to={"/"}>
                    Sign up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
