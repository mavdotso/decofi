import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";
import convertToSlug from "../../lib/utils";
import supabase, { signUp } from "../../lib/supabase";

import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";
import PasswordField from "../../components/passwordInput";
import { SUPABASE_STORAGE_AVATARS } from "../../lib/consts";

export default function SignUp({ defaultUsername }) {
    const pageTitle = `Sign up on DeCoFi`;
    const pageDescription = `Create an account on DeCoFi and make supporting you quick and easy!`;

    const router = useRouter();

    const [stepTwo, setStepTwo] = useState(false);

    const [username, setUsername] = useState(defaultUsername);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isAvailable, setIsAvailable] = useState();
    const [tezosWalletAddress, setTezosWalletAddress] = useState("");
    const [description, setDescription] = useState("");
    const [twitterAccount, setTwitterAccount] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [userID, setUserID] = useState("");

    useEffect(() => {
        if (username === null || username === undefined || username === "") {
            setUsername("");
            if (router.query.username) {
                const _username = router.query.username;
                setUsername(_username);
            }
        }
    }, []);

    useEffect(() => {
        async function checkIfUsernameAvailable() {
            const { data, err } = await supabase.from("users").select().eq("username", username.toLowerCase());

            if (data) {
                if (data.length === 0) {
                    setIsAvailable(true);
                } else {
                    setIsAvailable(false);
                }
            }
        }

        if (username !== "" && username !== undefined && username !== null) {
            checkIfUsernameAvailable();
        }
    }, [username]);

    function handleUsernameChange(e) {
        setUsername(convertToSlug(e.target.value));
    }

    function handletezosWalletAddressChange(e) {
        setTezosWalletAddress(e.target.value);
    }

    function handleDescription(e) {
        setDescription(e.target.value);
    }

    function handleTwitterAccount(e) {
        setTwitterAccount(e.target.value);
    }

    function handleEmail(e) {
        setEmail(e.target.value);
    }

    function handlePassword(e) {
        setPassword(e.target.value);
    }

    async function handleUpload(e) {
        const avatarFile = e.target.files[0];
        const { data, error } = await supabase.storage.from(SUPABASE_STORAGE_AVATARS).upload(`${res.user.id}${avatarFile.type}`, avatarFile);

        if (data) {
            console.log(data);
            setImageURL(res.user.id, avatarFile.type);
        }
        if (error) {
            console.log(error);
        }
    }

    async function handleRegistration(e) {
        e.preventDefault();
        const res = await signUp(email, password, username);

        if (res.user !== null) {
            setStepTwo(true);
        }
    }

    async function handleCompleteProfile(e) {
        e.preventDefault();

        console.log(tezosWalletAddress, description, twitterAccount, imageURL);
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
                        {!stepTwo ? (
                            <>
                                <h2>Create your account</h2>
                                <p className="sub-heading">And begin receiving donations within 3 minutes!</p>
                                <form onSubmit={handleRegistration}>
                                    <div className="input-box">
                                        <input name="username" value={username} placeholder={username === "" ? "Your username*" : username} onChange={handleUsernameChange} minLength={3}></input>
                                        {username === "" ? (
                                            <span className="input-tip"> </span>
                                        ) : isAvailable && username.length >= 3 ? (
                                            <span className="input-tip input-valid">Username is available</span>
                                        ) : isAvailable && username.length < 3 ? (
                                            <span className="input-tip input-invalid">Minimum 3 characters</span>
                                        ) : (
                                            <span className="input-tip input-invalid">Username is not available</span>
                                        )}
                                    </div>
                                    <div className="input-box">
                                        <input name="email" value={email} placeholder="Email*" onChange={handleEmail}></input>
                                    </div>
                                    <PasswordField value={password} handlePassword={handlePassword} />
                                    <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Next step" />
                                </form>
                            </>
                        ) : (
                            <>
                                <h2>Complete your account</h2>
                                <p className="sub-heading">Fill in your account details</p>
                                <form onSubmit={handleCompleteProfile}>
                                    <div className="input-box">
                                        <input
                                            name="tezosWalletAddress"
                                            value={tezosWalletAddress}
                                            placeholder="Your Tezos wallet for donations*"
                                            onChange={handletezosWalletAddressChange}
                                            autoComplete="off"
                                        ></input>
                                        <span className="input-tip">Not supporting .tez wallets</span>
                                    </div>
                                    <div className="input-box">
                                        <input name="description" value={description} placeholder="Your description" onChange={handleDescription} autoComplete="off"></input>
                                    </div>
                                    <div className="input-box">
                                        <input name="twitterAccount" value={twitterAccount} placeholder="Twitter handle" onChange={handleTwitterAccount} autoComplete="off"></input>
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="avatar">Choose a profile picture:</label>
                                        <p></p>
                                        <input type="file" accept="image/png, image/jpeg, image/jpg" name="avatar" onChange={handleUpload}></input>
                                    </div>
                                    <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Register" />
                                </form>
                            </>
                        )}
                        <p>
                            Already have an account? <Link href={{ pathname: "/sign-in" }}>Sign in here!</Link>
                        </p>
                    </section>
                </div>
            </main>
        </>
    );
}

export async function getStaticProps() {
    return {
        props: { defaultUsername: "" },
    };
}
