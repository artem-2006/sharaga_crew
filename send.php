<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получаем данные из формы
    $number = htmlspecialchars(trim($_POST['number']));
    $fio = htmlspecialchars(trim($_POST['fio']));
    $adres = htmlspecialchars(trim($_POST['adres']));
    $com = htmlspecialchars(trim($_POST['com']));

    // Ваш токен и ID чата
    $token = '7870385233:AAHOdLpZGxS50t2iy4u6r1b4H1QfdDelCCs';
    $chat_id = '751372500'; // Замените на ваш chat ID

    // Формируем сообщение
    $message = "
        Новый заказ:
        Номер телефона: $number
        Ф.И.О: $fio
        Адрес доставки: $adres
        Комментарий: $com
    ";

    // URL для отправки сообщения
    $url = "https://api.telegram.org/bot$token/sendMessage";

    // Параметры для запроса
    $data = [
        'chat_id' => $chat_id,
        'text' => $message,
        'parse_mode' => 'HTML'
    ];

    // Инициализация cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Выполнение запроса и получение ответа
    $response = curl_exec($ch);

    // Закрытие cURL сессии
    curl_close($ch);

    // Проверка успешности отправки сообщения
    if ($response) {
        $responseData = json_decode($response, true); // Декодируем JSON-ответ
        if ($responseData['ok']) {
            echo 'Ваш заказ успешно отправлен!';
        } else {
            echo 'Ошибка: ' . $responseData['description']; // Выводим описание ошибки
        }
    } else {
        echo 'Ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.';
    }
} else {
    echo 'Некорректный запрос.';
}
?>