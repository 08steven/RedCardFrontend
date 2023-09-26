import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useForm } from "../utillity/hooks";
import { useMutation } from "@apollo/client";
import { TextField, Button, Container, Stack, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { LOGIN_USER } from "../gql/user.gql";

function Login(props) {
  let navigate = useNavigate(); //เป็นการเรียกใช้งานฟังก์ชันจาก react-router-dom เป็นฟังก์ชันสำหรับ redirect ไปยังหน้าที่ต้องการโดยการส่งเข้าไปเป็น parameter ในตัวแปร navigate
  const context = useContext(AuthContext); //เป็นการใช้งานฟังก์ชัน useContext เพื่อเรียกใช้งาน global state ที่เป็น object มี 3 properties ได้แก่ user แล้วฟังก์ชัน login และ logout เก็บลงไปในตัวแปร context
  const [errors, setErrors] = useState([]); //เรียกใช้งานฟังก์ชัน useState กำหนดให้ค่า state เริ่มต้นเป็น array ว่าง

  function loginUserCallback() {
    //ประกาศฟังก์ชันชื่อ loginUserCallback เมื่อมีการเรียกใช้จะทำการเรียกใช้งานฟังก์ชัน loginUser
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    //ใช้งานฟังก์ชัน useForm ส่ง parameter เข้าไปทำงาน 2 ตัวได้แก่ฟังก์ชัน loginUserCallback และ object ที่มี 2 properties
    username: "", //และจะ return ค่ากลับมาเป็น object ที่เป็นฟังก์ชัน onChange กับ onSubmit และตัวแปร value
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      localStorage.setItem("token", userData.token);
      context.login(userData);
      navigate("/"); //เมื่อเข้าสู่ระบบสำเร็จจะให้ redirect ไปที่หน้าหลัก
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values },
  });

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Login</h3>
      <p>This is the login page, login below to create an account!</p>
      <Stack spacing={2} paddingBottom={2}>
        <TextField label="username" name="username" onChange={onChange} />
        <TextField label="Password" name="password" onChange={onChange} />
      </Stack>
      {errors.map(function (error) {
        return <Alert severity="error">{error.message}</Alert>;
      })}
      <Button variant="contained" onClick={onSubmit}>
        {" "}
        {/*เมื่อมีการกดปุ่ม login จะมีการทำ event handling ตรวจจับการกด เมื่อกดจะให้ทำงานฟังก์ชัน onSubmit */}
        Login
      </Button>
    </Container>
  );
}

export default Login;
