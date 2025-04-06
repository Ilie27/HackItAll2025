function openSMS(phone, message) {
    const encodedMessage = encodeURIComponent(message);
    const link = `sms:${phone}?body=${encodedMessage}`;
    window.location.href = link;
  }
  