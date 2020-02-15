<?php

    /* 
        Список адресов
    */
    $recipients = array(
        "gmaxlev@gmail.com",
    );


    if (!isset($_POST['form'])) exit;

    $text_message ='';

    
    if ($_POST['form']=='price'
        && isset($_POST['name'])
        && isset($_POST['phone'])
    ) {
        
  
        $form_name = htmlspecialchars(trim($_POST['name']));
        $form_phone = htmlspecialchars(trim($_POST['phone']));

        $text_message = "

            Новая заявка на сайте. <br>
            Форма: 'Узнать стоимость' <br><br>

            Имя: ".$form_name ." <br>
            Номер телефона: ".$form_phone." <br>
            
        ";

    }

    if ($_POST['form']=='question'
        && isset($_POST['name'])
        && isset($_POST['phone'])
        && isset($_POST['message'])
    ) {
        
  
        $form_name = htmlspecialchars(trim($_POST['name']));
        $form_phone = htmlspecialchars(trim($_POST['phone']));
        $form_message = htmlspecialchars(trim($_POST['message']));

        $text_message = "

            Новая заявка на сайте.<br>
            Форма: 'Задать вопрос'<br><br>

            Имя: ".$form_name ." <br>
            Номер телефона: ".$form_phone." <br>
            Комментарий: ".$form_message." <br>
        ";

    }


    $mail['charset'] = "utf-8";
    $mail['to'] = implode(',', $recipients);
    $mail['subject'] = 'Новое сообщение на сайте';
    $mail['massage'] = $text_message;
    
    $mail['header'] = "MIME-Version: 1.0\n"
    ."X-Priority: 3\n"
    ."X-Mailer: Mailer\n"
    ."Content-Transfer-Encoding: 8bit\n"
    ."Content-Type: text/html; charset=" . $mail['charset'] . "\n";
    
    mail ($mail['to'], $mail['subject'], $mail['massage'], $mail['header']);


?>