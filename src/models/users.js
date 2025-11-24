import mongoose from "mongoose"

const userSchema = mongoose.Schema({
  userName: String,
  email: String,
  password: String
});

const User = mongoose.model('users', userSchema);

export default User;


// import City from "..."

// export City;
// export citySchema;
// import { City, citySchema } from "..."

// import City, {, citySchema } from "..."