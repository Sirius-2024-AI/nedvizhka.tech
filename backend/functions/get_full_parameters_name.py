def get_full_parameters_name(parameters):
    match parameters.house_type:
        case 'monolithic':
            parameters.house_type = 'Монолитный'
        case 'monolithic-brick':
            parameters.house_type = 'Монолитно-кирпичный'
        case 'block':
            parameters.house_type = 'Блочный'
        case 'panel':
            parameters.house_type = 'Панельный'
        case 'brick':
            parameters.house_type = 'Кирпичный'
        case 'wood':
            parameters.house_type = 'Деревянный'
        case 'mixed':
            parameters.house_type = 'Смешанный'
        case 'concrete':
            parameters.house_type = 'Железобетонный'
        case 'old-fund':
            parameters.house_type = 'Старый фонд'
        case 'stalinist':
            parameters.house_type = 'Сталинский'

    return parameters