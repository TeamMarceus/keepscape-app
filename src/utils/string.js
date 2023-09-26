// Checks if an email address is valid
export const isValidEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

// Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character
export const isValidPassword = (password) => {
  const re =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};

// Checks if a phone number is valid
export const isValidPhoneNumber = (phoneNumber) => {
  const re = /^\d+$/;
  return re.test(phoneNumber);
};

// Gets the username from an email address (everything before the @)
export const getEmailUserName = (email) => {
  const parts = email.split('@');
  return parts[0];
};

export const formatDate = (inputDate) => {
  const options = { year: 'numeric', month: 'long', day: '2-digit' };
  const date = new Date(inputDate);
  return date.toLocaleDateString(undefined, options);
}
