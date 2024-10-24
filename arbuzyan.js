document.getElementById('orderForm').addEventListener('submit', function(event) {
    event.preventDefault(); // предотвращаем стандартное поведение формы

    const formData = new FormData(this);
    const number = formData.get('number');
    const fio = formData.get('fio');
    const adres = formData.get('adres');
    const com = formData.get('com');

    const message = `Новый заказ:\nКонтактный номер: ${number}\nФ.И.О: ${fio}\nАдрес доставки: ${adres}\nКомментарий: ${com}`;

    const token = '7870385233:AAHOdLpZGxS50t2iy4u6r1b4H1QfdDelCCs'; // Замените на ваш токен
    const chat_id = '751372500с'; // Замените на ваш ID чата

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: chat_id,
            text: message,
            parse_mode: 'HTML' // Опционально, если хотите использовать HTML-разметку
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Заказ успешно отправлен!');
            this.reset(); // сбрасываем форму
        } else {
            alert('Произошла ошибка при отправке заказа.');
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке заказа.');
    });
});