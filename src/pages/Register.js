import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { REGISTER_USER } from "../gql/user.gql";
import { useMutation } from "@apollo/client";
import { Alert } from "@mui/material";

const RegisterSchema = yup.object().shape({
  username: yup.string().required(),
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
      "Password must contain at least 8 characters, one special character, one uppercase letter, and one lowercase letter"
    ),
  confirmPassword: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

function Register(props) {
  let navigate = useNavigate();
  const context = useContext(AuthContext);
  const [graphqlErrors, setGraphqlErrors] = useState();
  // const [data, setData] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(RegisterSchema),
  });
  const onSubmit = (data) => {
    registerUser({ variables: { registerInput: data } })
      .then((response) => {
        alert(JSON.stringify(data));
      })
      .catch((error) => {
        console.error("Error registering user:", error);
      });
  };

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setGraphqlErrors(graphQLErrors);
    },
  });

  //   {
  //   update(proxy, response) {
  //     const newUser = response.data.registerUser;
  //     setData({
  //       username: newUser.username,
  //       email: newUser.email,
  //       password: "",
  //       confirmPassword: "",
  //     });
  //     navigate("/");
  //   },
  // });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        {loading && <p>Loading...</p>}
        <label>Username</label>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              error={!!errors.username}
              helperText={errors.username && errors.username.message}
            />
          )}
        />
        {console.log(errors)}
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>Email</label>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              error={!!errors.email}
              helperText={errors.email && errors.email.message}
            />
          )}
        />
      </div>
      <div>
        <label>Password</label>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              error={!!errors.password}
              helperText={errors.password && errors.password.message}
            />
          )}
        />
      </div>
      <div>
        <label>Confirm Password</label>
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              variant="outlined"
              fullWidth
              error={!!errors.confirmPassword}
              helperText={
                errors.confirmPassword && errors.confirmPassword.message
              }
            />
          )}
        />
      </div>
      {graphqlErrors && (
        <Alert severity="error">
          {graphqlErrors.map((error, index) => (
            <p key={index}>{error.message}</p>
          ))}
        </Alert>
      )}
      <input type="submit" />
    </form>
  );
}

export default Register;
// import { useContext, useState } from "react";
// import { AuthContext } from "../context/authContext";
// import { useForm } from "../utillity/hooks";
// import { useMutation } from "@apollo/react-hooks";
// import { useNavigate } from "react-router-dom";
// import { TextField, Container, Button, Stack, Alert } from "@mui/material";
// import { REGISTER_USER } from "../gql/user.gql";

// function Register(props) {
//   //ประกาศฟังก์ชัน Register รับ props มาใช้งาน
//   const context = useContext(AuthContext);
//   let navigate = useNavigate();
//   const [errors, setErrors] = useState([]);

//   function registerUserCallback() {
//     console.log("Callback hit");
//     registerUser();
//   }

//   const isEmailValid = (email) => {
//     const emailRegex = /^[a-zA-Z0-9._-]+@(hotmail|gmail)\.com$/;
//     return emailRegex.test(email);
//   };

//   const isPasswordComplexValid = (password) => {
//     const uppercaseRegex = /[A-Z]/;
//     const lowercaseRegex = /[a-z]/;
//     const digitRegex = /[0-9]/;
//     const specialCharacterRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

//     const hasUppercase = uppercaseRegex.test(password);
//     const hasLowercase = lowercaseRegex.test(password);
//     const hasDigit = digitRegex.test(password);
//     const hasSpecialCharacter = specialCharacterRegex.test(password);

//     return {
//       hasUppercase,
//       hasLowercase,
//       hasDigit,
//       hasSpecialCharacter,
//     };
//   };

//   const { hasUppercase, hasLowercase, hasDigit, hasSpecialCharacter } =
//     isPasswordComplexValid(password);

//   const isConfirmPasswordValid = (confirmPassword, password) =>
//     confirmPassword === password;

//   const { onChange, onSubmit, values } = useForm(registerUserCallback, {
//     username: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });

//   const [registerUser, { loading }] = useMutation(REGISTER_USER, {
//     update(proxy, response) {
//       console.log(response.data.registerUser);
//       navigate("/");
//     },
//     onError({ graphQLErrors }) {
//       setErrors(graphQLErrors);
//     },
//     variables: { registerInput: values },
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (
//       isEmailValid(values.email) &&
//       hasUppercase &&
//       hasLowercase &&
//       hasDigit &&
//       hasSpecialCharacter &&
//       isConfirmPasswordValid(values.confirmPassword, values.password)
//     ) {
//       onSubmit(e);
//     }
//   };

//   return (
//     <Container spacing={2} maxWidth="sm">
//       <h3>Register</h3>
//       <p>This is the register page, register below to create an account!</p>
//       <form onSubmit={handleSubmit}>
//         <Stack spacing={2} paddingBottom={2}>
//           <TextField label="Username" name="username" onChange={onChange} />
//           <TextField
//             label="Email"
//             name="email"
//             onChange={onChange}
//             error={!isEmailValid(values.email) && values.email !== ""} //กรณีที่จะให้กรอบเป็นสีแดง
//             helperText={
//               //กรณีที่จะให้มีตัวอักษรขึ้นด้านล่าง
//               !isEmailValid(values.email) && values.email !== ""
//                 ? "Plese enter your email address correctly. Email must include domain for example, @hotmail etc."
//                 : ""
//             }
//           />
//           <TextField
//             label="Password"
//             name="password"
//             onChange={onChange}
//             error={
//               !isPasswordComplexValid(values.password) && values.password !== ""
//             }
//             helperText={
//               values.password !== "" &&
//               !isPasswordIncludeUppercase(values.password)
//                 ? "Plese enter your password correctly. Password must include uppercase"
//                 : values.password !== "" &&
//                   !isPasswordIncludeLowercase(values.password)
//                 ? "Plese enter your password correctly. Password must include lowercase letter"
//                 : values.password !== "" &&
//                   !isPasswordIncludeDigit(values.password)
//                 ? "Plese enter your password correctly. Password must include digit"
//                 : values.password !== "" &&
//                   !isPasswordIncludeSpecialCharacter(values.password)
//                 ? "Plese enter your password correctly. Password must include special character"
//                 : ""
//             }
//           />
//           <TextField
//             label="Confirm password"
//             name="confirmPassword"
//             onChange={onChange}
//             error={
//               !isConfirmPasswordValid(
//                 values.confirmPassword,
//                 values.password
//               ) && values.confirmPassword !== ""
//             }
//             helperText={
//               !isConfirmPasswordValid(
//                 values.confirmPassword,
//                 values.password
//               ) && values.confirmPassword !== ""
//                 ? "Password don't match"
//                 : ""
//             }
//           />
//         </Stack>
//         {errors.map(function (error) {
//           return <Alert severity="error">{error.message}</Alert>;
//         })}
//         <Button variant="contained" type="submit">
//           Register
//         </Button>
//       </form>
//     </Container>
//   );
// }

// export default Register;
