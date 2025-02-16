
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
}