import * as yup from 'yup';

const TimeSlotVideoConsult = yup.object({
      Date: yup
          .string()
          .required('Date is required'),
    
      Time: yup
          .array()
          .of(yup.string()) 
          .min(1, 'Select at least one time')
          .required('Time is required'),
          
          
  });
  
export default TimeSlotVideoConsult