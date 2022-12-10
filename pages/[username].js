import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Activity from "./components/Activity";
import DonateBox from "./components/DonateBox";
import supabase from "./lib/supabase.js";
import UserAvatar from "./components/UserAvatar";
import { SUPABASE_DB_NAME_USERS } from "./lib/consts";

export default function User() {
    const params = useParams();
    const navigate = useNavigate();

    const [username, setUsername] = useState();
    const [userID, setUserID] = useState();
    const [description, setDescription] = useState();
    const [tezosWalletAddress, setTezosWalletAddress] = useState();
    const [image, setImage] = useState("");

    useEffect(() => {
        const findUser = async () => {
            const { data, error } = await supabase.from(SUPABASE_DB_NAME_USERS).select().eq("username", params.username).single();

            if (error) {
                navigate("../", { replace: true });
            }

            if (data) {
                setUsername(data.username);
                setUserID(data.id);
                setDescription(data.description);
                setTezosWalletAddress(data.tezos_wallet);
                setImage(data.image);
            }
        };
        findUser();
    }, [params, navigate]);

    return (
        <>
            <div className="full-width">
                <section className="container flow user-info">
                    <div className="user-picture-holder">
                        <UserAvatar className="user-picture" username={username} image={`${username}-${image}`} />
                    </div>

                    <div className="user-description">
                        <h1>{username}</h1>
                        <p>{description}</p>
                    </div>
                </section>
            </div>

            <section className="container even-columns">
                <Activity id={userID} />
                <DonateBox username={username} id={userID} tezosWalletAddress={tezosWalletAddress} image={`${username}-${image}`} />
            </section>
        </>
    );
}
