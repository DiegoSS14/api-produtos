const yup = require('yup');

const productSchema = yup.object({
  title: yup
    .string()
    .required('The field title is required')
    .min(1, 'Title cannot be empty'),
    
  description: yup
    .string() 
    .required('The field description is required')
    .min(1, 'Description cannot be empty'),
    
  price: yup
    .number()
    .required('The field price is required')
    .positive('Price must be a positive number'),
    
  image_url: yup
    .string()
    .required('The field image_url is required')
    .url('Image URL must be a valid URL')
});

module.exports = productSchema;