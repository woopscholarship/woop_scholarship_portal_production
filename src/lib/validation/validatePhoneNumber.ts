export default function validatePhoneNumber(phoneNumber: string) {
  const regex = /^\+63[0-9]{10}$/;
  return regex.test(phoneNumber);
}