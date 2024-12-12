import React from "react";
import ReactDOM from "react-dom";
import { useFormik, withFormik } from "formik";
import * as Yup from "yup";
import "./styles.css";

const SettingsProfileDialog = (props) => {
  const { handleSubmit, getFieldProps, errors, touched } = props;
  const { onSubmit } = props;
  const submitIntercept = () => {
    console.log("Submitting");
    // handleSubmit();
  };
  return (
    <ResponsiveDialogAnalogue onSubmit={handleSubmit}>
      <form>
        <label htmlFor="firstName">Last Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          {...getFieldProps("firstName")}
        />

        {touched.firstName && errors.firstName ? (
          <div>{errors.firstName}</div>
        ) : null}

        <label htmlFor="lastName">First Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          {...getFieldProps("lastName")}
        />
        {touched.lastName && errors.lastName ? (
          <div>{errors.lastName}</div>
        ) : null}

        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          {...getFieldProps("email")}
        />
        {touched.email && errors.email ? <div>{errors.email}</div> : null}
      </form>
    </ResponsiveDialogAnalogue>
  );
};

const ResponsiveDialogAnalogue = (props) => {
  const submit = async () => {
    console.log("Submit button clicked");
    await props.onSubmit();
    console.log("Done submitting");
  };

  return (
    <>
      {props.children}
      <button onClick={submit} type="submit">
        Submit
      </button>
    </>
  );
};
//Testing for boot.dev - another commit after installing app
const SettingsProfileDialogFormik = withFormik({
  initialValues: {
    firstName: "harold",
    lastName: "hernandez",
    email: "harold@mail.com",
  },
  validationSchema: Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Required email"),
  }),
  handleSubmit: (values, formikBag) => {
    alert(JSON.stringify(values, null, 2));
  },
})(SettingsProfileDialog);

function App() {
  return <SettingsProfileDialogFormik />;
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
