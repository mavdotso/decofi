import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import convertToSlug from "../../lib/utils";
import supabase, { signUp } from "../../lib/supabase";

import Button from "../../components/button";
import buttonStyles from "../../styles/button.module.css";
import PasswordField from "../../components/passwordInput";

export default function SignUp() {
    const router = useRouter();
    // const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    const [username, setUsername] = useState(router.query.username);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [isAvailable, setIsAvailable] = useState();
    const [tezosWalletAddress, setTezosWalletAddress] = useState("");
    const [description, setDescription] = useState("");
    const [twitterAccount, setTwitterAccount] = useState("");
    const [imageURL, setImageURL] = useState("");

    useEffect(() => {
        async function checkIfUsernameAvailable() {
            const { data, err } = await supabase.from("users").select().eq("username", username.toLowerCase());

            if (data) {
                console.log(data.length === 0);
                if (data.length === 0) {
                    setIsAvailable(true);
                } else {
                    setIsAvailable(false);
                }
            }

            if (err) {
                setIsAvailable(true);
            }
        }

        if (username !== "") {
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
        setImageURL(avatarFile.name);

        const { data, error } = await supabase.storage.from("avatars").upload(`${username}-${avatarFile.name}`, avatarFile);

        if (data) {
            console.log(data);
        }
        if (error) {
            console.log(error);
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        await signUp(email, password, username, tezosWalletAddress, description, twitterAccount, imageURL);

        // navigate(`../${username}`, {replace: true});
    }

    return (
        <main>
            <div className="container">
                <section className="centered create-account">
                    <h2>Create your account</h2>
                    <p className="sub-heading">And begin receiving donations within 3 minutes!</p>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box">
                            <input name="username" value={username} placeholder={username === "" ? "Your username" : username} onChange={handleUsernameChange} minLength={3}></input>

                            {isAvailable && username.length >= 3 ? (
                                <span className="input-tip input-valid">Username is available</span>
                            ) : username.length < 3 ? (
                                <span className="input-tip input-invalid">Minimum 3 characters</span>
                            ) : username === "" ? (
                                ""
                            ) : (
                                <span className="input-tip input-invalid">Username is not available</span>
                            )}
                        </div>
                        <div className="input-box">
                            <input name="email" value={email} placeholder="Email*" onChange={handleEmail}></input>
                        </div>
                        <PasswordField value={password} onChange={handlePassword} />
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
                            <input type="file" name="avatar" onChange={handleUpload}></input>
                        </div>
                        <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Register" />
                    </form>
                </section>
            </div>
        </main>
    );
}
