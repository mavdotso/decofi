import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "../../lib/supabase";

import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";

export default function SignIn() {

    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(false);

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await signIn(email, password);

        if(res.session === null) {
            setLoginError(true);
        } else {
            router.push({ pathname: "/account" } );
        }
    }

    return (
        <>
            <div className="container">
                <section className="centered create-account">
                    <h2>Sign In</h2>
                    <p className="sub-heading"></p>

                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input name="email" value={email} placeholder="Email" onChange={handleEmail}></input>
                        </div>
                        <div className="input-box">
                            <input name="password" value={password} placeholder="Password" onChange={handlePassword}></input>
                        </div>
                            { loginError ? <span className="input-tip input-invalid">Login error! Please, try again.</span> : ''}
                            <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Sign in" />
                        <p>
                            Don't have a creator account?{" "}
                            <Link href={ {pathname: '/sign-up', query: { username: '' }} } as="/sign-up">
                                Create it here!
                            </Link>
                        </p>
                    </form>
                </section>
            </div>
        </>
    );
}