create table business_api_keys
(
    id                         integer generated always as identity
        constraint business_api_keys_pk
            primary key,
    api_key                    varchar(32)             not null
        constraint business_api_keys_unique
            unique,
    expiry_date                timestamp,
    organization               varchar(255),
    organization_contact_mail  varchar(255),
    organization_contact_phone varchar(16),
    registration_date          timestamp default now() not null
);

create table logs_business_valuation
(
    id                 integer generated always as identity
        constraint logs_business_valuation_pk
            primary key,
    api_key            varchar(32)      not null,
    address            varchar(255)     not null,
    area               real             not null,
    count_rooms        smallint         not null,
    floor              smallint         not null,
    floor_count        smallint         not null,
    construction_year  smallint         not null,
    house_type         varchar(255)     not null,
    balcony            smallint         not null,
    repair_type        varchar(255)     not null,
    valuation          bigint,
    user_ip            varchar(16),
    datetime           timestamp default now(),
    metro_name         varchar(255),
    metro_dist_km      double precision,
    distance_to_center double precision not null,
    kitchen_area       double precision not null
);


create table logs_individual_valuation
(
    id                 integer generated always as identity
        constraint logs_individual_valuation_pk
            primary key,
    first_name         varchar(255)            not null,
    last_name          varchar(255)            not null,
    user_email         varchar(255)            not null,
    user_phone         varchar(255)            not null,
    user_ip            varchar(255),
    datetime           timestamp default now() not null,
    valuation          bigint,
    address            varchar(255)            not null,
    area               real                    not null,
    count_rooms        smallint                not null,
    floor              smallint                not null,
    floor_count        smallint                not null,
    construction_year  smallint                not null,
    house_type         varchar(255)            not null,
    balcony            varchar(255),
    repair_type        varchar(255)            not null,
    metro_name         varchar(255),
    metro_dist_km      double precision,
    distance_to_center double precision        not null,
    kitchen_area       double precision        not null
);

