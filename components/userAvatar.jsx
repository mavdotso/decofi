import { SUPABASE_IMAGE_URL } from "../lib/consts";

export default function UserAvatar({ className, username, imageURL }) {
    return (
        <>
            <img className={className} src={SUPABASE_IMAGE_URL + imageURL} alt={username + " on DeCoFi"} />
        </>
    );
}
