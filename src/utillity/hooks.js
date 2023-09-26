import { useState} from "react";

export const useForm = (callback, initialState = {}) => { //สร้างฟังก์ชัน useForm และ Export ออกไป โดยต้องส่ง parameter 2 ตัวเข้ามาทำงานได้แก่ตัวแปร callback และ initialState
    const[values,setValues] = useState(initialState); //สร้าง useState ขึ้นมาโดยมีค่าเริ่มต้นเป็นตัวแปร initialState
    const onChange = (event) =>{ //สร้างฟังก์ชัน onChange รับ parameter เข้ามาทำงาน 1 ตัวได้แก่ event 
        setValues({...values, [event.target.name]:event.target.value}); //เมื่อมีการเรียกใช้ฟังก์ชัน จะทำการอัพเดทค่า state โดยกำหนดค่าใหม่ให้แก่ property ที่มีชื่อเท่ากับ input field เท่ากับค่าที่ป้อน  
        console.log(values); //และทำการ log ค่า values ออกมา
    };

    const onSubmit = (event) => { //สร้างฟังก์ชัน onSubmit รับ parameter เข้ามาทำงาน 1 ตัวได้แก่ event
        event.preventDefault(); //
        callback(); //และใช้งานฟังก์ชัน callback
    }

    return { //return ด้วย {} เป็นการ return ออกไปเป็น object 
        onChange, //ดังนั้นฟังก์ชัน useForm จะทำการ return ค่าออกไปเป็น object ที่เป็น 3 properties
        onSubmit,
        values
    }
}
