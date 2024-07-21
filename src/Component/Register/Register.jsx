import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Helmet } from "react-helmet";

export default function Register() {
  let phoneRegExp = /^(\+2){0,1}(01)[0125][0-9]{8}$/gm;
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  async function registerSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/signup", values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });

    if (data.message === "success") {
      setisLoading(false);
      navigate("/login");
    }
  }

  let validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "username minlength is 3")
      .max(10, "username maxlength is 15")
      .required("username is required"),
    email: yup.string().email("email is invalid").required("email is required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "phone is valied")
      .required("phone is required"),
    password: yup
      .string()
      .matches(/^[\w\.-]{6,}$/gm, "password is invalid")
      .required("password is required"),
    rePassword: yup
      .string()
      .oneOf([yup.ref("password")], "rePassword is invalid")
      .required("rePassword is required"),
  });

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <main className=" vh-100 d-flex justify-content-center align-items-center">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="Register Page" />
      </Helmet>
      <div className="container ">
        <div className="row">
          <div className="col-md-6 blur rounded-3 p-4 offset-md-3">
            <h2 className="text-center text-color">Registration Form</h2>
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
                <label className=" text-color " htmlFor="name">
                  Name:
                </label>
                <input
                  placeholder="username"
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                />
                {formik.errors.name && formik.touched.name ? (
                  <div className="alert alert-danger  p-2 mt-2">
                    {formik.errors.name}
                  </div>
                ) : (
                  false
                )}
              </div>
              <div className="form-group">
                <label className=" text-color" htmlFor="email">
                  Email:
                </label>
                <input
                  placeholder="example@email.com"
                  type="email"
                  className="form-control"
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
                <label className="text-color" htmlFor="phone">
                  Phone:
                </label>
                <input
                  placeholder="XXX-XXX-XXXX"
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <div className="alert alert-danger  p-2 mt-2">
                    {formik.errors.phone}
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
                  className="form-control"
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
              <div className="form-group">
                <label className="text-color" htmlFor="rePassword">
                  RePassword:
                </label>
                <input
                  placeholder="repassword"
                  type="password"
                  className="form-control"
                  id="rePassword"
                  name="rePassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.rePassword}
                />
                {formik.errors.email && formik.touched.rePassword ? (
                  <div className="alert alert-danger  p-2 mt-2">
                    {formik.errors.email}
                  </div>
                ) : (
                  false
                )}
              </div>
              {isLoading ? (
                <>
                  <button className="w-100 rounded-3 my-2  a" type="button">
                    <i className=" fas fa-spinner fa-spin"></i>
                  </button>
                </>
              ) : (
                <button
                  className=" a w-100 rounded-3 my-2 "
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  Register
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
