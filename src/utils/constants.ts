import {
  SigninFormInputsTypes,
  SignupFormInputsTypes,
  User,
} from "../interface";

export const INITIAL_USER: User = {
  id: "",
  bio: "",
  email: "",
  imageUrl: "",
  name: "",
  username: "",
};

export const registerAccountInputs: SignupFormInputsTypes[] = [
  {
    type: "text",
    name: "name",
    id: "user-name",
    label: "Name",
  },
  {
    type: "text",
    name: "username",
    id: "username",
    label: "Username",
  },
  {
    type: "email",
    name: "email",
    id: "user-email",
    label: "Email",
  },
  {
    type: "password",
    name: "password",
    id: "user-password",
    label: "Password",
  },
];

export const signinFormInputs: SigninFormInputsTypes[] = [
  {
    type: "email",
    name: "email",
    id: "user-email",
    label: "Email",
  },
  {
    type: "password",
    name: "password",
    id: "user-password",
    label: "Password",
  },
];
