import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import convertToSlug, { generateRandomString } from "../../lib/utils";
import supabase, { signUp, updateUserDetails } from "../../lib/supabase";
import generateBauPunk from "../../lib/bauPunks";
import { motion } from "framer-motion";

import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";
import PasswordField from "../../components/passwordInput";
import { SUPABASE_STORAGE_AVATARS } from "../../lib/consts";

import { decode } from "base64-arraybuffer";

export default function SignUp({ defaultUsername }) {
    const pageTitle = `Sign up on DeCoFi`;
    const pageDescription = `Create an account on DeCoFi and make supporting you quick and easy!`;

    const router = useRouter();

    const [stepTwo, setStepTwo] = useState(false);

    const [registrationError, setRegistrationError] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState();

    const [username, setUsername] = useState(defaultUsername);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
                    setIsUsernameAvailable(true);
                } else {
                    setIsUsernameAvailable(false);
                }
            }
        }

        if (username !== "" && username !== undefined && username !== null) {
            checkIfUsernameAvailable();
        }
    }, [username]);

    // Every time error message is set, change error
    useEffect(() => {
        if (errorMessage !== null) {
            setRegistrationError(true);
        } else {
            setRegistrationError(false);
        }
    }, [errorMessage]);

    async function handleUpload(e) {
        const avatarFile = e.target.files[0];
        const imageExtention = avatarFile.type.split("/").pop();
        const randomString = generateRandomString();

        const { data, error } = await supabase.storage.from(SUPABASE_STORAGE_AVATARS).upload(`${userID}${randomString}.${imageExtention}`, avatarFile, {
            cacheControl: "3600",
            upsert: true,
        });

        if (data) {
            setImageURL(userID, randomString, avatarFile.type);
        }
        if (error) {
            console.log(error);
        }
    }

    async function checkForInputErrors(e) {
        e.preventDefault();

        if (!isUsernameAvailable) {
            setErrorMessage("Username is not available");
            return;
        } else {
            handleRegistration();
        }
    }

    async function handleRegistration() {
        const res = await signUp(email, password, username, setErrorMessage);

        if (errorMessage === null) {
            setStepTwo(true);
            setUserID(res.user.id);
        }
    }

    async function handleCompleteProfile(e) {
        e.preventDefault();
        await updateUserDetails(userID, description, tezosWalletAddress, twitterAccount, imageURL, setErrorMessage);
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
                            <motion.div key="stepOne" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <h2>Create your account</h2>
                                <p className="sub-heading">And begin receiving donations within 3 minutes!</p>
                                <form onSubmit={checkForInputErrors}>
                                    <div className="input-box">
                                        <input
                                            name="username"
                                            value={username}
                                            placeholder={username === "" ? "Your username*" : username}
                                            onChange={(e) => setUsername(convertToSlug(e.target.value))}
                                            minLength={3}
                                            required
                                        ></input>
                                        {username === "" ? (
                                            <span className="input-tip"> </span>
                                        ) : isUsernameAvailable && username.length >= 3 ? (
                                            <span className="input-tip input-valid">Username is available</span>
                                        ) : isUsernameAvailable && username.length < 3 ? (
                                            <span className="input-tip input-invalid">Minimum 3 characters</span>
                                        ) : (
                                            <span className="input-tip input-invalid">Username is not available</span>
                                        )}
                                    </div>
                                    <div className="input-box">
                                        <input type="email" name="email" value={email} placeholder="Email*" onChange={(e) => setEmail(e.target.value)} minLength={3} required></input>
                                    </div>
                                    <PasswordField value={password} handlePassword={(e) => setPassword(e.target.value)} />
                                    {errorMessage !== null && <p className="input-tip input-invalid">Error: {errorMessage} </p>}
                                    <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Create account" />
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div key="stepTwo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <h2>Complete your account</h2>
                                <p className="sub-heading">Fill in your account details</p>
                                <form onSubmit={handleCompleteProfile}>
                                    <div className="input-box">
                                        <input
                                            name="tezosWalletAddress"
                                            value={tezosWalletAddress}
                                            placeholder="Your Tezos wallet for donations*"
                                            onChange={(e) => setTezosWalletAddress(e.target.value)}
                                            autoComplete="off"
                                            required
                                        ></input>
                                        <span className="input-tip">Not supporting .tez wallets</span>
                                    </div>
                                    <div className="input-box">
                                        <textarea
                                            name="description"
                                            value={description}
                                            placeholder="Your description"
                                            onChange={(e) => setDescription(e.target.value)}
                                            autoComplete="off"
                                        ></textarea>
                                    </div>
                                    <div className="input-box">
                                        <input name="twitterAccount" value={twitterAccount} placeholder="Twitter handle" onChange={(e) => setTwitterAccount(e.target.value)} autoComplete="off"></input>
                                    </div>
                                    <div className="input-box">
                                        <label htmlFor="avatar">Upload a profile picture*</label>
                                        <p></p>
                                        <input type="file" accept="image/png, image/jpeg, image/jpg" name="avatar" onChange={handleUpload} required></input>
                                    </div>
                                    <Button
                                        className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`}
                                        buttonText="Complete registration"
                                    />
                                </form>
                            </motion.div>
                        )}
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
