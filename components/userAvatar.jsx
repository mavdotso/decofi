import { SUPABASE_IMAGE_URL } from "../lib/consts";

export default function UserAvatar({ className, username, image }) {
    return (
        <>
            <img className={className} src={SUPABASE_IMAGE_URL + image} alt={username + " on DeCoFi"} />
        </>
    );
}
