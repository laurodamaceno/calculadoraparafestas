<?php
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$salgadinho_frito = $_POST['salgadinho-frito'];
$salgadinho_assado = $_POST['salgadinho-frito'];
$brigadeiro = $_POST['brigadeiro'];
$refri = $_POST['refri'];

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require '../PHPMailer/Exception.php';
require '../PHPMailer/PHPMailer.php';
require '../PHPMailer/SMTP.php';

$mail = new PHPMailer(true);

try {
	//Server settings
	//$mail->SMTPDebug = 0;
	$mail->isSMTP();
	$mail->CharSet = 'UTF-8';
	$mail->Host = 'mail.email.com.br';
	$mail->SMTPAuth = true;
	$mail->Username = 'seu@email.com.br';
	$mail->Password = 'suasenha';
	$mail->SMTPSecure = 'ssl';
	$mail->Port = 465;

	//Recipients
	$mail->setFrom('seu@email.com.br', 'Orçamento para festa');
	$mail->addAddress('seu@email.com.br', 'Orçamento para festa');
	//$mail->addReplyTo('seu@email.com.br', 'Orçamento para festa');

	//Content
	$mail->isHTML(true);
	$mail->Subject = 'Orçamento de Festa via site';
	$mail->Body = "<hr size=\"2px\" color=\"#7a201f\"><br>
        <hr size=\"2px\" color=\"#7a201f\">

        <h1>Orçamento de Festa</h1>

        <hr size=\"2px\" color=\"#7a201f\">

        <br>

        <b>Nome: </b>" . $name . "<br>
        <b>E-mail: </b>" . $email . "<br>
        <b>Telefone: </b>" . $phone . "<br>
        <b>Qtde de Salganinhos Fritos: </b>" . $salgadinho_frito . "<br>
        <b>Qtde de Salganinhos Assados: </b>" . $salgadinho_assado . "<br>
        <b>Qtde de Beijinho: </b>" . $beijinho . "<br>
        <b>Qtde de Brigadeiro: </b>" . $brigadeiro . "<br>
        <b>Qtde de Refrigerante: </b>" . $refri . " litros<br>

        <hr size=\"2px\" color=\"#7a201f\">

        Esta mensagem foi enviada por intermédio da página da Calculadora para Festas.<br>

        <hr size=\"2px\" color=\"#7a201f\">";
	$mail->send();

	echo json_encode(true);

} catch (Exception $e) {
	echo json_encode(array(
		'error' => $mail->ErrorInfo,
	));
}

?>