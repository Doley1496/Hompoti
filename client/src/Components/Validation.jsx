/* */

/* */

import * as Yup from "yup";

export const ValidationSchema = Yup.object({
  /* */

  firstName: Yup.string()
    .min(2)
    .max(25)
    .required("Please enter your first name"),

  lastName: Yup.string().min(2).max(25).required("Please enter your last name"),

  email: Yup.string()

    .email("Invalid email format")
    .required("Please enter your email"),

  password: Yup.string()

    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .min(8, "Password must be atleast 8 characters")

    .required("Please enter your password"),

  terms: Yup.string().required("Please accept the terms and conditions"),

  // phoneNumber: Yup.string()
  //   .matches(/^\d{10}$/, "Phone number must be 10 digits")
  //   .required("Please enter your phone number"),

  // address: Yup.string().required("Please enter your address"),

  // gender: Yup.string().required("Please enter your gender"),

  //   confirmPassword: Yup.string()
  //     .oneOf([Yup.ref("password")], "Password must match")
  //     .required("Confirm password is required"),

  /* */
});
