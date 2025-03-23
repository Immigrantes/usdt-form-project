document.getElementById('exchangeForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = e.target;
  const name = form.name.value;
  const passport = form.passport.value;
  const email = form.email.value;
  const iban = form.iban.value;
  const amount = form.amount.value;
  const pdfText = `ДОГОВОР\n\nФИО: ${name}\nПаспорт / NIE: ${passport}\nEmail: ${email}\nIBAN: ${iban}\nСумма: ${amount} USDT`;
  const blob = new Blob([pdfText], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  document.getElementById('downloadLink').href = url;

  const waText = encodeURIComponent("Здравствуйте! Я отправил форму и готов продолжить перевод.");
  document.getElementById('whatsappLink').href = `https://wa.me/34653500599?text=${waText}`;
  document.getElementById('result').style.display = 'block';
});