<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;


require 'phpMailer/Exception.php';
require 'phpMailer/PHPMailer.php';
require 'phpMailer/SMTP.php';


$mail = new PHPMailer(true);
if (isset($_POST["mortgage"])) {
    $mortgage = $_POST["mortgage"];
}
if (isset($_POST["name"])) {
    $name = $_POST["name"];
}
if (isset($_POST["phone"])) {
    $phone = $_POST["phone"];
}
if (isset($_POST["systemInput"])) {
    $systemInput = $_POST["systemInput"];
}

try {
    //Server settings
    $mail->SMTPDebug = SMTP::DEBUG_SERVER;
    $mail->CharSet = "utf-8";
    $mail->isSMTP();
    $mail->Host       = 'smtp.mail.ru';                     //Set the SMTP server to send through
    $mail->SMTPAuth   = true;
    $mail->Username   = 'igor.3445@mail.ru';                     //SMTP username
    $mail->Password   = 'UV1i5uD1BfNruRZxDSps';                               //SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port       = 465;

    //Recipients
    $mail->setFrom('igor.3445@mail.ru', 'Mailer');
    $mail->addAddress('igor.3445@mail.ru');     //Add a recipient

    //Content
    $mail->isHTML(true);
    $mail->Subject = "Заголовок";
    $mail->Body = "Вид ипотеки: <b> $mortgage </b> <br>  Имя: <b> $name </b> <br> Номер телефона: <b> $phone </b> <br> Системный инпут $systemInput ";

    $mail->send();
    echo 'Message has been sent';
} catch (Exception $e) {
    echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
?>
