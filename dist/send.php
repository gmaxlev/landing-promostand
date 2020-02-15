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

            Новая заявка на сайте.\n
            Форма: 'Узнать стоимость'\n\n

            Имя: ".$form_name ." <br>\n
            Номер телефона: ".$form_phone." <br>\n
            
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

            Новая заявка на сайте.\n
            Форма: 'Задать вопрос'\n\n

            Имя: ".$form_name ." <br>\n
            Номер телефона: ".$form_phone." <br>\n
            Комментарий: ".$form_message." <br>\n
        ";

    }

    $subject = "Новая заявка на сайте!";
    $header = "Content-type: text/html\r\n";

    $email_to = implode(',', $recipients);

    $retval = mail ($recipients,$subject,$text_message,$header);


?>