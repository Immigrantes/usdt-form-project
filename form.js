
document.getElementById('exchangeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const passport = form.passport.value;
  const email = form.email.value;
  const iban = form.iban.value;
  const amount = form.amount.value;
  const phone = form.phone.value;
  const street = form.street.value;
  const city = form.city.value;
  const zip = form.zip.value;
  const province = form.province.value;
  const country = form.country.value;

  emailjs.init('E12iyom7-49KmyGud'); // User ID / Public Key
  const serviceID = 'service_2mxuxfg';
  const templateID = 'template_4wt295m';

  const templateParams = {
    name,
    passport,
    email,
    iban,
    amount,
    phone,
    street,
    city,
    zip,
    province,
    country
  };

  emailjs.send(serviceID, templateID, templateParams)
    .then(() => {
      console.log("Email sent successfully");

      const pdfText = `ДОГОВОР\n\nФИО: ${name}\nПаспорт / NIE: ${passport}\nEmail: ${email}\nТелефон: ${phone}\nIBAN: ${iban}\nСумма: ${amount} USDT\nАдрес: ${street}, ${city}, ${zip}, ${province}, ${country}`;
      const blob = new Blob([pdfText], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      document.getElementById('downloadLink').href = url;

      const waText = encodeURIComponent("Здравствуйте! Я отправил форму и готов продолжить перевод.");
      document.getElementById('whatsappLink').href = `https://wa.me/34653500599?text=${waText}`;
      document.getElementById('result').style.display = 'block';
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Ошибка отправки формы. Попробуйте ещё раз.");
    });
});
