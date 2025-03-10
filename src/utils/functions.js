
export const daysLeftToExpire =(openingDate = "", openTill=0) => {
  const openDate = new Date(openingDate);
  const expirationDate = new Date(openDate);
  expirationDate.setDate(expirationDate.getDate() + openTill); // Add openTill days

  const currentDate = new Date();

  // Calculate the difference in milliseconds
  const difference = expirationDate.getTime() - currentDate.getTime();

  // Convert milliseconds to days
  const daysLeft = Math.ceil(difference / (1000 * 60 * 60 * 24));

  return daysLeft >= 0 ? daysLeft : 0; // Ensure it doesn't return negative values
};


export const generateRefrence = () =>
{
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const prefix = "bundlet-";
  const timestamp = Date.now().toString(36); // Convert timestamp to base36
  let randomPart = "";
  
  const array = new Uint8Array(6); // Shorter random part since we have timestamp
  window.crypto.getRandomValues(array);
  
  for (let i = 0; i < 6; i++) {
    randomPart += chars[array[i] % chars.length];
  }

  return `${prefix}${timestamp}-${randomPart}`;
}