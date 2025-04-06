export function openSMS(phone: string, message: string) {
  const encodedMessage = encodeURIComponent(message);
  const link = `sms:${phone}?body=${encodedMessage}`;
  window.location.href = link;
}
  