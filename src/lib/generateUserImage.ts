import CryptoJS from "crypto-js";

const generateUserImage = (email: string) => {
  const hashedEmail = CryptoJS.SHA256(email).toString(CryptoJS.enc.Hex);
  console.log(hashedEmail);
  const gravatarUrl = `https://www.gravatar.com/avatar/${hashedEmail}`;
  console.log(gravatarUrl);
  return gravatarUrl;
};

export default generateUserImage;
