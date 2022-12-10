import { useState, useEffect } from "react";
import supabase from "../lib/supabase.js";
import { SUPABASE_DB_NAME_DONATIONS } from "../lib/consts";

import ActivityBox from "./activityBox";

import styles from "../styles/activity.module.css";

export default function Activity({ id }) {
    const [donation, setDonation] = useState();

    useEffect(() => {
        const listDonations = async () => {
            const { data, error } = await supabase.from(SUPABASE_DB_NAME_DONATIONS).select().eq("to", id);

            if (error) {
                console.log(error);
            }

            if (data) {
                setDonation(data);
            }
        };
        listDonations();
    }, [id]);

    return (
        <>
            <div className={styles.user_activity}>
                <h3>Latest activity</h3>
                {donation && donation.map((donation) => <ActivityBox key={donation.id} from={donation.from} amount={donation.amount} message={donation.message} />)}
            </div>
        </>
    );
}
