import requests

def get_geosuggest_data(query, api_key):
    # URL для запроса к API
    url = "https://suggest-maps.yandex.ru/v1/suggest"

    # Параметры запроса
    params = {
        "apikey": api_key,
        "text": query,
        "print_address": 'True'
    }

    # Выполнение запроса
    response = requests.get(url, params=params)

    # Проверка успешности запроса
    if response.status_code == 200:
        # Возвращаем JSON-ответ в виде словаря
        return response.text
    else:
        # В случае ошибки возвращаем None или сообщение об ошибке
        return {"error": f"Request failed with status code {response.status_code}"}