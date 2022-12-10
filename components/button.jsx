export default function Button( { className, buttonText, onClick } ) {
    return(
        <button onClick={onClick} className={ className } > { buttonText } </button>
    );
}