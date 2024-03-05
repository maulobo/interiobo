import { Schema, model, models } from "mongoose";

// New schema without fullname and password
const userMinimalSchema = new Schema({
  email: {
    type: String,
    unique: true, // Enforce unique emails
    required: [true, "Email required"],
  },

  name: {
    type: String,
  },
  tokens: {
    type: Number,
  },
});

// Define a new model using the minimal schema
const UserMinimal =
  models.UserMinimal || model("UserMinimal", userMinimalSchema);

export default UserMinimal;
