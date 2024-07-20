create table public.business_api_keys
(
    id                         integer generated always as identity,
    api_key                    varchar(32)             not null,
    expiry_date                timestamp,
    organization               varchar(255),
    organization_contact_mail  varchar(255),
    organization_contact_phone varchar(16),
    registration_date          timestamp default now() not null
);

alter table public.business_api_keys
    owner to postgres;

alter table public.business_api_keys
    add constraint business_api_keys_pk
        primary key (id);

alter table public.business_api_keys
    add constraint business_api_keys_unique
        unique (api_key);

create table public.logs_business_valuation
(
    id                 integer generated always as identity,
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

alter table public.logs_business_valuation
    owner to postgres;

alter table public.logs_business_valuation
    add constraint logs_business_valuation_pk
        primary key (id);

create table public.logs_individual_valuation
(
    id                 integer generated always as identity,
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

alter table public.logs_individual_valuation
    owner to postgres;

alter table public.logs_individual_valuation
    add constraint logs_individual_valuation_pk
        primary key (id);

create table public.no_metro
(
    address      varchar(255)     not null,
    price        integer          not null,
    floor        smallint         not null,
    total_floors smallint         not null,
    rooms        varchar(255)     not null,
    area         double precision not null,
    city         varchar(255)     not null,
    home_type    varchar(255)     not null,
    remont       varchar(255)     not null,
    balcon       smallint         not null,
    url          varchar(255)     not null,
    view_window  varchar(255)     not null,
    description  text             not null,
    build_year   smallint         not null
);

alter table public.no_metro
    owner to postgres;

alter table public.no_metro
    add constraint no_metro_pk
        primary key (url);

create table public.test
(
    address      varchar(255)     not null,
    price        integer          not null,
    floor        smallint         not null,
    total_floors smallint         not null,
    rooms        varchar(255)     not null,
    area         double precision not null,
    city         varchar(255)     not null,
    home_type    varchar(255)     not null,
    remont       varchar(255)     not null,
    balcon       smallint         not null,
    url          varchar(255)     not null,
    view_window  varchar(255)     not null,
    description  text             not null,
    build_year   smallint         not null
);

alter table public.test
    owner to postgres;

alter table public.test
    add constraint test_pk
        primary key (url);

create table public.with_metro
(
    address      varchar(255)     not null,
    price        integer          not null,
    floor        smallint         not null,
    total_floors smallint         not null,
    rooms        varchar(255)     not null,
    area         double precision not null,
    city         varchar(255)     not null,
    home_type    varchar(255)     not null,
    remont       varchar(255)     not null,
    balcon       smallint         not null,
    url          varchar(255)     not null,
    view_window  varchar(255)     not null,
    description  text             not null,
    build_year   smallint         not null
);

alter table public.with_metro
    owner to postgres;

alter table public.with_metro
    add constraint with_metro_pk
        primary key (url);

