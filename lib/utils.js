export default function convertToSlug(text) {
    return text.replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

export function addressSlice(address) {
    return `${address.slice(0, 6)}...${address.slice(-3)}`;
}

export function convertMutez(amount) {
    return amount * 1000000;
}