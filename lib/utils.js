export default function convertToSlug(text) {
    return text.replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

export function addressSlice(address) {
    return `${address.slice(0, 6)}...${address.slice(-3)}`;
}

export function convertMutez(amount) {
    return amount * 1000000;
}

export function generateRandomString() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 4; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  