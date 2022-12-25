import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { resetPassword } from "../../lib/supabase";

import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";

export default function PasswordReset() {
    const pageTitle = `Reset password to DeCoFi`;
    const pageDescription = `Reset your password`;

    const [email, setEmail] = useState("");

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await resetPassword(email);
        console.log(res);
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
                        <h2>Reset password</h2>
                        <p className="sub-heading">Input your email address and we will send you a link to reset your password</p>

                        <form onSubmit={handleSubmit}>
                            <div className="input-box">
                                <input name="email" value={email} placeholder="Email*" onChange={handleEmail}></input>
                            </div>
                            <Button
                                className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`}
                                buttonText="Send a password reset link"
                            />
                            <p>
                                <Link href={{ pathname: "/sign-in" }}>Back to login</Link>
                            </p>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}
