import * as yup from "yup";

const DoctorProfileEditValidation = yup.object({
  qualification: yup.string().required("Qualification is required"),

  experience: yup
    .number()
    .required("Experience is required")
    .positive("Experience cannot be zero or negative number")
    .integer("Experience must be an integer")
    .test(
      "minimum-experience",
      "You need at least 3 years of experience to register",
      (value) => {
        return value >= 3;
      }
    ),

    specialization: yup.string().required("Specialization is required"),


  online_fees: yup
    .number()
    .integer("Online Fees must be an integer")
    .required("Online Fees is required"),

    chat_fees: yup
    .number()
    .integer("Chat Fees must be an integer")
    .required("Chat Fees is required"),

});

export default DoctorProfileEditValidation;
