import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.utils import formataddr

def send_html_email(smtp_server, smtp_port, smtp_username, smtp_password, from_address, to_address, subject, html_content):
    # Создаем объект MIMEMultipart для создания письма с HTML
    msg = MIMEMultipart('alternative')
    msg['Subject'] = subject
    msg['From'] = formataddr(('Недвижка.tech – оценим стоимость вашей недвижимости', from_address))
    msg['To'] = to_address

    # Добавляем HTML-часть к сообщению
    part = MIMEText(html_content, 'html')
    msg.attach(part)

    # Подключаемся к SMTP-серверу и отправляем письмо
    try:
        with smtplib.SMTP_SSL(smtp_server, smtp_port) as server:
            server.login(smtp_username, smtp_password)
            server.sendmail(from_address, to_address, msg.as_string())
        print('Email sent successfully')
    except Exception as e:
        print(f'Failed to send email: {e}')

def business_request_route(parameters, config=None, db=None, db_metadata=None, db_conn=None, request=None):
    if parameters.marketing:
        parameters.marketing = 'Да'
    else:
        parameters.marketing = 'Нет'

    mail_contents = """
    <h1>Недвижка.тех – заявка на подключение к API для B2B-клиентов</h1>
    <h2>Информация о клиенте:</h2>
    <ul>
        <li>Название организации: {organization}</li>
        <li>Сайт организации: <a href="{organization_url}">{organization_url}</a></li>
        <li>Имя заявителя: {name}</li>
        <li>Электронная почта: {email}</li>
        <li>Контактный телефон: {phone_number}</li>
        <li>Согласен ли на получение рекламных рассылок: {marketing}</li>
    </ul>
    <br>
    <p><i>Проверьте информацию о клиенте, свяжитесь с ним для подтверждения заявки и выдачи API-ключа.</i></p>
    """.format(
        organization=parameters.organization,
        organization_url=parameters.organization_url,
        name=parameters.name,
        email=parameters.email,
        phone_number=parameters.phone_number,
        marketing=parameters.marketing
    )

    # Отправка электронного письма о заявке
    send_html_email(config['smtp']['host'],
                    config['smtp']['port'],
                    config['smtp']['auth']['user'],
                    config['smtp']['auth']['password'],
                    config['smtp']['auth']['user'],
                    'info@nedvizhka.tech',
                    f"Заявка на подключение к Business API: {parameters.organization}",
                    mail_contents)

    return {
        'status_code': 200,
        'message': 'Request sent successfully'
    }