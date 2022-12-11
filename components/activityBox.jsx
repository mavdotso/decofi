import { addressSlice } from "../lib/utils";
import styles from "../styles/activityBox.module.css";

export default function ActivityBox({ from, amount, message }) {
    return (
        <>
            <div className={styles.activity_donation}>
                <p>
                    ☕️ <span className={styles.activity_donation_from}>{from.length > 8 ? addressSlice(from) : from}</span> bought <span className={styles.activity_donation_amount}>{amount}</span>
                    {amount > 1 ? " coffees " : " coffee "}
                    {message !== "" ? ( <span>and said{" "}<span className={styles.activity_donation_message}>{message}</span></span> ) : ( " " )}
                </p>
            </div>
        </>
    );
}
