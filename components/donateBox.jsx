import { useState, useContext } from "react";

import checkIfActiveAccount, { sendDonation, connectWallet, WalletContext } from "../lib/wallet";
import { submitDonation } from "../lib/supabase";

import styles from "../styles/donateBox.module.css";

import Button from "./button";
import buttonStyles from "../styles/button.module.css";

import UserAvatar from "./userAvatar";

export default function DonateBox({ username, id, tezosWalletAddress, image }) {
    const wallet = useContext(WalletContext);

    const [amount, setAmount] = useState(0);
    const [message, setMessage] = useState("");
    const [radioValue, setRadioValue] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [isInvalid, setInvalid] = useState(false);

    let [from, setFrom] = useState("");

    function calculateAmount(e) {
        setAmount(e.target.value);
        setInputValue(e.target.value);
        setRadioValue("");
        setInvalid(false);
    }

    async function handleChangeFrom(e) {
        setFrom(e.target.value);
    }

    function handleChangeMessage(e) {
        setMessage(e.target.value);
    }

    async function processDonation(e) {
        e.preventDefault();

        if (amount === 0) {
            setInvalid(true);
        } else {
            let connectedAccount = await checkIfActiveAccount(wallet);

            if (!connectedAccount) {
                connectedAccount = await connectWallet(wallet);
            }

            if (from === "") {
                from = connectedAccount;
            }
            const transactionHash = await sendDonation(wallet, tezosWalletAddress, amount);
            await submitDonation(from, id, amount, message, transactionHash);
        }
    }

    return (
        <div className={styles.donation_box}>
            <span className={styles.donation_box_header}>
                <UserAvatar className={styles.donation_box_image} username={username} image={image} />
                <h4>
                    Buy <span className={styles.donation_box_name}>{username}</span> a coffee
                </h4>
            </span>

            <form className={styles.donate_form} onSubmit={processDonation}>
                <div className={styles.donation_box_choose_donation}>
                    <span className={styles.donation_coffee_emoji}> ☕️ </span>
                    <span> x </span>

                    <span className={styles.donation_holder}>
                        <input
                            onClick={calculateAmount}
                            onChange={(e) => {
                                setRadioValue("3");
                                setInputValue("");
                            }}
                            name="donation-size"
                            className={styles.donation_radio}
                            id="donation-3"
                            type="radio"
                            checked={radioValue === "3"}
                            value="3"
                        ></input>
                        <label htmlFor="donation-3">3</label>
                    </span>
                    <span className={styles.donation_holder}>
                        <input
                            onClick={calculateAmount}
                            onChange={(e) => {
                                setRadioValue("5");
                                setInputValue("");
                            }}
                            name="donation-size"
                            className={styles.donation_radio}
                            id="donation-5"
                            type="radio"
                            checked={radioValue === "5"}
                            value="5"
                        ></input>
                        <label htmlFor="donation-5">5</label>
                    </span>
                    <span className={styles.donation_holder}>
                        <input
                            onClick={calculateAmount}
                            onChange={(e) => {
                                setRadioValue("10");
                                setInputValue("");
                            }}
                            name="donation-size"
                            className={styles.donation_radio}
                            id="donation-10"
                            type="radio"
                            checked={radioValue === "10"}
                            value="10"
                        ></input>
                        <label htmlFor="donation-10">10</label>
                    </span>

                    <span className={styles.donation_holder}>
                        <input onChange={calculateAmount} name="donation-size-custom" className={styles.donation_radio} id="donation-custom" type="number" placeholder="25" value={inputValue}></input>
                    </span>
                </div>
                <div className={styles.donation_box_message}>
                    <input className={styles.donation_field} type="text" id="from" name="from" onChange={handleChangeFrom} placeholder="From (optional)" value={from} />
                    <textarea
                        className={styles.donation_field}
                        type="textarea"
                        id="message"
                        name="message"
                        value={message}
                        onChange={handleChangeMessage}
                        rows="4"
                        placeholder="Your message (optional)"
                    ></textarea>
                    {isInvalid && <p className={styles.input_invalid}> Choose the donation amount </p>}
                    <Button
                        className={`${buttonStyles.button} ${buttonStyles.button_primary} ${buttonStyles.button_dark} ${buttonStyles.button_large}`}
                        buttonText={amount > 0 ? "Buy a coffee! ꜩ " + amount : "Buy a coffee!"}
                    />
                </div>
            </form>
        </div>
    );
}
