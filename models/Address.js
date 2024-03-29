// // Import Mongoose
// import mongoose from 'mongoose';

// // Define a Mongoose schema for the addresses
// const addressSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   address: {
//     type: String,
//     required: true
//   }
// });

// // Create a Mongoose model using the defined schema
// const Address = mongoose.models?.Address || mongoose.model('Address', addressSchema);

// // Export the Address model
// export default Address;


import mongoose from 'mongoose';

// Define a Mongoose schema for the addresses
const addressSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  }
});

// Create a Mongoose model using the defined schema
const Address = mongoose.models?.Address || mongoose.model('Address', addressSchema);

// Export the Address model
export default Address;
