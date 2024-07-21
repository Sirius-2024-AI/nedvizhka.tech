def get_mail_html(parameters):
    template_file = open("mail_template.html", "r+", encoding='utf-8').read()

    for parameter in parameters:
        template_file = template_file.replace(f"{{parameters.{parameter}}}", str(parameters[parameter]))

    return template_file
