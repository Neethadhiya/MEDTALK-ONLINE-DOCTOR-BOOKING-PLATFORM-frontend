import * as yup from "yup";

const DoctorProfileValidation = yup.object({
  Qualification: yup.string().required("Qualification is required"),

  Experience: yup
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

  Specialization: yup.string().required("Specialization is required"),

  Gender: yup
    .string()
    .required("Gender is required")
    .oneOf(["Female", "Male", "Other"], "Invalid gender selection"),

  Location: yup.string().required("Location is required"),

  City: yup.string().required("City is required"),

  OnlineFees: yup
    .number()
    .integer("Online Fees must be an integer")
    .required("Online Fees is required"),

    ProfileImage: yup
    .mixed()
    .test("required", "Profile image is required", function (value) {
      if (!value) {
        return false;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/avif"];
      if (!allowedTypes.includes(value.type)) {
        return false;
      }
      const maxSize = 2 * 1024 * 1024;
      if (value.size > maxSize) {
        return false;
      }

      return true;
    }),
  
  Documents: yup
    .array()
    .max(5, "You can upload up to 5 documents.")
    .test("required", "Certificate is required", (value) => {
      return Array.isArray(value) && value.length > 0;
    })
    .test("fileType", "Invalid file type or size", (value) => {
      if (!value || !Array.isArray(value)) {
        return true;
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/avif"];
      const maxSize = 2 * 1024 * 1024;

      for (const file of value) {
        if (!file) {
          continue;
        }
        if (!allowedTypes.includes(file.type) || file.size > maxSize) {
          return false;
        }
      }

      return true;
    }),
});

export default DoctorProfileValidation;
