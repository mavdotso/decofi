import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import supabase, { updateUser } from "./lib/supabase";
import convertToSlug from "./lib/utils";

import Button from "./components/Button";
import buttonStyles from "./components/Button.module.css";

export default function EditUser() {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const getUserData = async () => {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            console.log(user.id);
        };
        getUserData();
    }, []);

    const [username, setUsername] = useState("");
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
        await updateUser(email, password, username, tezosWalletAddress, description, twitterAccount, imageURL);

        // navigate(`../${username}`, {replace: true});
    }

    return (
        <>
            <div className="container">
                <section className="centered create-account">
                    <h2>Edit account</h2>
                    <p className="sub-heading"></p>
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
                                <span className="input-tip input-invalid">Username is NOT available</span>
                            )}
                        </div>
                        <div className="input-box">
                            <input name="email" value={email} placeholder="Email" onChange={handleEmail}></input>
                        </div>
                        <div className="input-box">
                            <input name="password" value={password} placeholder="Password" onChange={handlePassword}></input>
                        </div>
                        <div className="input-box">
                            <input name="tezosWalletAddress" value={tezosWalletAddress} placeholder="Your Tezos wallet for donations" onChange={handletezosWalletAddressChange}></input>
                        </div>
                        <div className="input-box">
                            <input name="description" value={description} placeholder="Description" onChange={handleDescription}></input>
                        </div>
                        <div className="input-box">
                            <input name="twitterAccount" value={twitterAccount} placeholder="Twitter handle" onChange={handleTwitterAccount}></input>
                        </div>
                        <div className="input-box">
                            <input type="file" name="file" onChange={handleUpload}></input>
                        </div>

                        <Button className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`} buttonText="Edit" />
                    </form>
                </section>
            </div>
        </>
    );
}
