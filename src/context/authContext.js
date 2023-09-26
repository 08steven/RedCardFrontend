import jwtDecode from "jwt-decode";
import React, { createContext, useReducer } from "react";

const initialState = {
  user: null,
};

if (localStorage.getItem("token")) {
  //ถ้ามี token
  const decodedToken = jwtDecode(localStorage.getItem("token")); //แปลง Token ในรูปแบบของ JWT เป็น JSON Object

  if (decodedToken.exp * 1000 < Date.now()) {
    //exp ใน JSON Object เก็บอายุของ Token ในหน่วยวินาที (Timestamp) นำมาเปรียบเทียบกับเวลาในปัจจุบัน (Timestamp) แต่ใน Jvs หน่วยเป็นมิลลิวินาที
    localStorage.removeItem("token"); //ซึ่งถ้าน้อยกว่าแสดงว่าหมดอายุ ให้ remove Token ออกจาก localstorage ในเครื่อง (ต้อง Login ใหม่)
    console.log(decodedToken);
  } else {
    initialState.user = decodedToken; //หากมากกว่าหรือเท่ากับ Token ยังไม่หมดอายุ ค่าที่แปลงเป็น JSON Object จะถูกนำไปเก็บในตัวแปร initialState.user (หมายความว่าตอนนี้ภายใน user จะเป็น object อีกชั้น ซึ่งประกอบไปด้วย header, payload, signature)
    console.log(decodedToken);
  }
}
const AuthContext = createContext({
  //สร้าง Context ไว้สำหรับใช้งานใน component อื่น ๆ เก็บไว้ในตัวแปร AuthContext เป็น Object ที่มี 3 properties
  user: null,
  login: (userData) => {},
  logout: () => {},
});

function authReducer(state, action) {
  //สร้าง reducer สำหรับจัดการ state รับ argument 2 ตัว ได้แก่ state และ action
  switch (
    action.type //เช็คตัวแปร action.type
  ) {
    case "LOGIN": //หากเป็นสติง "LOGIN"
      return {
        //ให้ return state
        ...state, //โดยเก็บค่า action.payload ลงไปใน user (state เป็น object ใช้ space operator parameter ภายใน)
        user: action.payload,
      };
    case "LOGOUT": //หากเป็นสติง "LOGIN"
      return {
        //ให้ return state
        ...state, //โดยเก็บค่า null ลงไปใน user (state เป็น object ใช้ space operator parameter ภายใน)
        user: null,
      };
    default: //หากเป็น
      return state;
  }
}

function AuthProvider(props) {
  //สร้างฟังก์ชัน AuthProvider สำหรับ...
  const [state, dispatch] = useReducer(authReducer, initialState); //ใช้งานฟังก์ชัน useReducer โดยกำหนดให้ state เริ่มต้นคือ initialState และมีฟังก์ชัน reducer เป็น authReducer
  const login = (userData) => {
    //สร้างฟังก์ชัน login ใช้สำหรับเก็บค่า token ไว้บนเว็บและเก็บค่า user ใหม่ลงไปใน state โดยต้องรับ argument userData เข้ามาใช้งาน
    localStorage.setItem("token", userData.token); //จะทำการเก็บ userData.token เอาไว้บนเว็บโดยใช้ชื่อว่า token
    dispatch({
      //ฟังก์ชัน dispatch มีหน้าที่ส่ง action เข้าไปใน reducer (ในที่นี้คือ authReducer) ซึ่งเป็น object
      type: "LOGIN",
      payload: userData,
    }); //ดังนั้นเมื่อมีการ login เข้ามา (เรียกใช้งานฟังก์ชัน login) ระบบจะส่ง userData เข้ามาและเก็บ token ไว้บนเว็บและข้อมูล user ใน state จะเก็บค่า userData เข้าไป
  };
  function logout() {
    //สร้างฟังก์ชัน logout ใช้สำหรับลบค่า token ออกจากเว็บ
    localStorage.removeItem("token"); //จะทำการค่าตัวแปรชื่อ token ออกจากเว็บ
    dispatch({ type: "LOGOUT" }); //ฟังก์ชัน dispatch มีหน้าที่ส่ง action เข้าไปใน reducer (ในที่นี้คือ authReducer) ซึ่งเป็น object
  } //ดังนั้นเมื่อมีการ logout ออก (เรียกใช้งานฟังก์ชัน logout) ระบบจะลบ token ออกและข้อมูล user ใน state จะเก็บค่า Null เข้าไป
  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
