import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { Helmet } from "react-helmet";
export default function ResetCode() {
  const [error, seterror] = useState(null);
  const [isLoading, setisLoading] = useState(false);
  let navigate = useNavigate();

  async function registerSubmit(values) {
    setisLoading(true);
    let { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .catch((err) => {
        setisLoading(false);
        seterror(err.response.data.message);
      });

    if (data.statusMsg === "success") {
      setisLoading(false);
      navigate("/resetPassword");
    }
  }

  let validationSchema = yup.object({
    resetCode: yup
      .string()
      .matches(/^[0-9]{1,}$/, "Reset Code is invalid")
      .required("Reset Code is required"),
  });

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: registerSubmit,
  });

  return (
    <>
     <Helmet>
        <title>Reset Code</title>
        <meta name="description" content="Reset Code Page" />
      </Helmet>
      <main className="background vh-100 d-flex justify-content-center align-items-center">
        <div className="container  ">
          <div className="row">
            <div className="col-md-6 rounded-3 p-4 blur offset-md-3">
              <h2 className="text-center text-color fw-bold ">
                Enter Reset Code
              </h2>
              <p className="text-color fs-6 text-center">
                We've sent the reset code to your E-mail, please check it and
                enter the code below.
              </p>
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
                  <label className=" text-color" htmlFor="resetCode">
                    Reset Code:
                  </label>
                  <input
                    placeholder="Reset Code"
                    type="tel"
                    className="form-control"
                    id="resetCode"
                    name="resetCode"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.resetCode}
                  />

                  {formik.errors.resetCode && formik.touched.resetCode ? (
                    <div className="alert alert-danger  p-2 mt-2">
                      {formik.errors.resetCode}
                    </div>
                  ) : (
                    false
                  )}
                </div>

                {isLoading ? (
                  <>
                    <button
                      className=" w-100 rounded-3 my-2  a"
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
