import Head from "next/head";
import PasswordField from "../../components/passwordInput";
import { useState, useEffect } from "react";
import { setNewPassword } from "../../lib/supabase";
import { useSession } from "@supabase/auth-helpers-react";

import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";

export default function PasswordReset() {
    const pageTitle = `Reset password to DeCoFi`;
    const pageDescription = `Reset your password`;

    const session = useSession();

    const [password, setPassword] = useState("");

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setNewPassword(password)
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
                        <h2>New password</h2>
                        <p className="sub-heading">What would you like your new password to be?</p>
                        <form onSubmit={handleSubmit}>
                            <PasswordField value={password} onChange={handlePassword} />
                            <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Set a new password" />
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}
