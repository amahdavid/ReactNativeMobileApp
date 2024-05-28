export function generateRandomString(length: number): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function generateRandomEmail(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const domainCharacters = "abcdefghijklmnopqrstuvwxyz0123456789-";
  const domainTlds = ["com", "net", "org", "io"];
  const localPartLength = 6 + Math.floor(Math.random() * 10); // Generate a local part with length between 6 and 15 characters
  const domainLength = 3 + Math.floor(Math.random() * 7); // Generate a domain with length between 3 and 9 characters
  let localPart = "";
  let domain = "";

  // Generate local part
  for (let i = 0; i < localPartLength; i++) {
    localPart += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }

  // Generate domain
  for (let i = 0; i < domainLength; i++) {
    domain += domainCharacters.charAt(
      Math.floor(Math.random() * domainCharacters.length)
    );
  }

  // Choose a random TLD from the list
  const tld = domainTlds[Math.floor(Math.random() * domainTlds.length)];

  return `${localPart}@${domain}.${tld}`;
}

export function generateRandomPassword(): string {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const passwordLength = 8 + Math.floor(Math.random() * 10); // Generate a password with length between 8 and 17 characters
  let password = "";

  // Ensure password contains at least one letter and one digit
  let hasLetter = false;
  let hasDigit = false;

  while (password.length < passwordLength) {
    const randomChar = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    if (!hasLetter && /[a-zA-Z]/.test(randomChar)) {
      password += randomChar;
      hasLetter = true;
    } else if (!hasDigit && /\d/.test(randomChar)) {
      password += randomChar;
      hasDigit = true;
    } else if (hasLetter && hasDigit) {
      password += randomChar;
    }
  }

  return password;
}
