document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('bookingForm');

  if (!form) {
    console.error("Booking form not found on this page. Check id='bookingForm'");
    return;
  }

  console.log("Booking form script loaded and attached successfully");

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get values safely (fallback to empty string if missing)
    const name    = document.querySelector('[name="name"]')?.value.trim() || '';
    const phone   = document.querySelector('[name="phone"]')?.value.trim() || '';
    const date    = document.querySelector('[name="date"]')?.value || '';
    const service = document.querySelector('[name="service"]')?.value.trim() || '';
    const notes   = document.querySelector('[name="notes"]')?.value.trim() || '';

    // Basic required field check
    if (!name || !phone) {
      alert('Please fill in your name and phone number.');
      return;
    }

    const beeNumber = '27605449223';

    const messageLines = [
      `New booking request via Bee Nails & Lash Studio`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Preferred Date: ${date || 'Not specified'}`,
      `Service: ${service || 'Not specified'}`,
      `Notes: ${notes || 'None'}`
    ].filter(line => line.trim() !== '');

    const message = messageLines.join('\n');
    const encoded = encodeURIComponent(message);

    const url = `https://api.whatsapp.com/send?phone=${beeNumber}&text=${encoded}`;

    console.log('Sending WhatsApp message:');
    console.log(message);
    console.log('URL:', url);

    // Open WhatsApp in new tab
    window.open(url, '_blank');

    // Success message
    setTimeout(() => {
      alert("Booking request sent! Bee will chat with you on WhatsApp shortly 🐝💙");
    }, 500);

    form.reset();
  });
});
