import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signIn } from "../../lib/supabase";

import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";
import PasswordField from "../../components/passwordInput";

export default function SignIn() {
    const pageTitle = `Sign in to DeCoFi`;
    const pageDescription = `Sign in to DeCoFi and make supporting you quick and easy!`;

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
        console.log(res);
        if (res.session === null) {
            setLoginError(true);
        } else {
            router.push({ pathname: "/account" });
        }
    }

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <meta charSet="UTF-8" />
                <meta name="description" content={pageDescription} key="desc" />
                <meta name="og:title" content={pageTitle} />
                <meta name="og:description" content={pageDescription} />
            </Head>
            <main>
                <div className="container">
                    <section className="centered create-account">
                        <h2>Sign In</h2>
                        <p className="sub-heading"></p>

                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <input name="email" value={email} placeholder="Email*" onChange={handleEmail}></input>
                            </div>
                            <PasswordField value={ password } handlePassword={ handlePassword } />
                            <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Sign in" />
                            {loginError ? <p className="input-tip input-invalid">Login error! Please, try again.<br />Forgot your password? <Link href={{ pathname: "/account/forgot-password" }}>Reset it here</Link></p> : ""}
                            <p>
                                <span>
                                    Don't have a creator account? <Link href={{ pathname: "/sign-up", query: { username: "" } }} as="/sign-up"> Create it here! </Link>
                                </span>
                                <br />
                            </p>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}
