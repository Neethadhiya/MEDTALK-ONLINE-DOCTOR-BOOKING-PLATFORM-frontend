import * as yup from "yup";

const PrescriptionValidation = yup.object({
  Medicines: yup.array()
    .of(yup.string()) // Validate each item in the array as a string
    .min(1, "At least one medicine is required") // Ensure there is at least one medicine
    .required("Medicines is required"),
  Instructions: yup.string().required("Instructions is required"),
  Comments: yup.string().required("Comments is required"),
});

export default PrescriptionValidation;
