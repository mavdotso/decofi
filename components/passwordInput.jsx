import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { useState } from "react";

import styles from "../styles/passwordInput.module.css";


export default function PasswordField( { password, handlePassword } ) {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className={ `input-box ${styles.input_password}` }>
            <input type={showPassword ? "text" : "password"} name="password" value={ password } placeholder="Password*" onChange={handlePassword} autoComplete="off"></input>
            <span className={`${styles.show_password_icon}`}  onClick={togglePassword}>{ showPassword ? <RxEyeOpen /> : <RxEyeClosed />}</span>
        </div>
    );
}
