import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Helmet } from "react-helmet";
export default function Forgetpassword() {
  
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  async function registerSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values)
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });

    if (data.statusMsg === "success") {
      setisLoading(false);
      navigate("/resetCode");
    }
  }

  let validationSchema = yup.object({
    email: yup.string().email("email is invalid").required("email is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
     <Helmet>
        <title>Forget Password</title>
        <meta name="description" content="Forget Password Page" />
      </Helmet>
      <main className="background vh-100 d-flex justify-content-center align-items-center">
        <div className="container  ">
          <div className="row">
            <div className="col-md-6 rounded-3 p-4 blur offset-md-3">
              <h2 className="text-center text-color">Forget Password</h2>
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
                    null
                  )}
                </div>

                {isLoading ? (
                  <>
                    <button
                      className="w-100 rounded-3 my-2  a"
                      type="button"
                    >
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
                    submit
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

