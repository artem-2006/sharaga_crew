document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const phoneNumber = document.getElementById('recipient-name').value;
    const fullName = document.getElementById('recipient-fio').value;
    const address = document.getElementById('recipient-adres').value;
    const comment = document.getElementById('message-text').value;

    const message = `Новый заказ:\nКонтактный номер: ${phoneNumber}\nФ.И.О: ${fullName}\nАдрес: ${address}\nКомментарий: ${comment}`;

    sendMessageToTelegram(message);
});

function sendMessageToTelegram(text) {
    const token = '7870385233:AAHOdLpZGxS50t2iy4u6r1b4H1QfdDelCCs'; // Замените на ваш токен бота
    const chatId = '1063569134'; // Замените на ваш ID чата
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const payload = {
        chat_id: chatId,
        text: text
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            console.log('Сообщение отправлено успешно!');

            // Показать модальное окно об успешном заказе
            var successModal = new bootstrap.Modal(document.getElementById('successModal'));
            successModal.show();

            // Закрыть модальное окно заказа
            var modal = bootstrap.Modal.getInstance(document.getElementById('exampleModal'));
            modal.hide();

            // Очистить форму после отправки
            document.getElementById('orderForm').reset();
        } else {
            console.error('Ошибка при отправке сообщения:', data.description);
        }
    })
    .catch(error => console.error('Ошибка:', error));
}
