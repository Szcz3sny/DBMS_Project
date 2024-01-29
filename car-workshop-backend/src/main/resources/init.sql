CREATE TABLE IF NOT EXISTS users(
    id serial NOT NULL,
    name character varying(64) NOT NULL,
    surname character varying(64) NOT NULL,
    phone_number character varying(16) NOT NULL,
    login character varying(64) NOT NULL,
    password_hash character varying(255) NOT NULL,
    role character varying(16) NOT NULL,
    CONSTRAINT userss_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS vehicles(
    id serial NOT NULL,
    owner_id integer NOT NULL,
    vin character varying(20) NOT NULL,
    brand character varying(64) NOT NULL,
    license_plate character varying(12) NOT NULL,
    year_of_production integer NOT NULL,
    model character varying(64) NOT NULL,
    CONSTRAINT vehicles_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (owner_id)
        REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS parts(
    id serial NOT NULL,
    vehicle_id integer NOT NULL,
    product_name character varying(64) NOT NULL,
    price numeric NOT NULL,
    image character varying(128),
    CONSTRAINT parts_pkey PRIMARY KEY (id),
    CONSTRAINT vehicle_id FOREIGN KEY (vehicle_id)
        REFERENCES vehicles (id)
);

CREATE TABLE IF NOT EXISTS orders(
    id serial NOT NULL,
    user_id integer NOT NULL,
    part_id integer NOT NULL,
    status character varying(16) NOT NULL,
    CONSTRAINT orders_pkey PRIMARY KEY (id),
    CONSTRAINT part_id FOREIGN KEY (part_id)
        REFERENCES parts (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS repairs
(
    id serial NOT NULL,
    vehicle_id integer NOT NULL,
    description text NOT NULL,
    status character varying(16) NOT NULL,
    price numeric NOT NULL,
    CONSTRAINT repairs_pkey PRIMARY KEY (id),
    CONSTRAINT vehicle_id FOREIGN KEY (vehicle_id)
        REFERENCES vehicles (id)
);

CREATE TABLE IF NOT EXISTS prices(
    id serial NOT NULL,
    name character varying(64) NOT NULL,
    description text NOT NULL,
    price numeric NOT NULL,
    CONSTRAINT prices_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS calendar(
    id serial NOT NULL,
    user_id integer NOT NULL,
    vehicle_id integer NOT NULL,
    datetime timestamp without time zone NOT NULL,
    defect character varying(64) NOT NULL,
    status character varying(16) NOT NULL,
    CONSTRAINT calendar_pkey PRIMARY KEY (id),
    CONSTRAINT user_id FOREIGN KEY (user_id)
        REFERENCES users (id),
    CONSTRAINT vehicle_id FOREIGN KEY (vehicle_id)
        REFERENCES vehicles (id)
);

CREATE TABLE IF NOT EXISTS repair_photos(
    id serial NOT NULL,
    repair_id integer NOT NULL,
    photo_url character varying(128),
    CONSTRAINT repair_photos_pkey PRIMARY KEY (id),
    CONSTRAINT repair_id FOREIGN KEY (repair_id)
        REFERENCES repairs (id)
);


CREATE TABLE IF NOT EXISTS file_storage(
    id serial NOT NULL,
    type character varying(32) NOT NULL,
    data bytea NOT NULL,
    view_token character varying(64) NOT NULL,
    CONSTRAINT photo_storage_pkey PRIMARY KEY (id)
);