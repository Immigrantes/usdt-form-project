document.getElementById('exchangeForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const form = e.target;
  const name = form.name.value;
  const passport = form.passport.value;
  const email = form.email.value;
  const iban = form.iban.value;
  const amount = form.amount.value;
  const phone = form.phone.value;
  const birthdate = form.birthdate.value;
  const street = form.street.value;
  const city = form.city.value;
  const zip = form.zip.value;
  const province = form.province.value;
  const country = form.country.value;

  emailjs.init('E12iyom7-49KmyGud'); // Public Key
  const serviceID = 'service_2mxuxfg';
  const templateID = 'template_4wt295m';

  const templateParams = {
    name,
    passport,
    email,
    iban,
    amount,
    phone,
    birthdate,
    street,
    city,
    zip,
    province,
    country
  };

  emailjs.send(serviceID, templateID, templateParams)
    .then(() => {
      console.log("Email sent successfully");

      const docContent = `ДОГОВОР\\n\\nФИО: ${name}\\nПаспорт / NIE: ${passport}\\nEmail: ${email}\\nТелефон: ${phone}\\nДата рождения: ${birthdate}\\nIBAN: ${iban}\\nСумма: ${amount} USDT\\nАдрес: ${street}, ${city}, ${zip}, ${province}, ${country}`;
      const blob = new Blob([docContent], {
        type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      });
      const url = URL.createObjectURL(blob);
      document.getElementById('downloadLink').href = url;
      document.getElementById('downloadLink').download = 'contract.docx';

      const waText = encodeURIComponent("Здравствуйте! Я отправил форму и готов продолжить перевод.");
      document.getElementById('whatsappLink').href = `https://wa.me/34653500599?text=${waText}`;
      document.getElementById('result').style.display = 'block';
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      alert("Ошибка отправки формы. Попробуйте ещё раз.");
    });
});
