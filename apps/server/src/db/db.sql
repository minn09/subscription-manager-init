create table subscriptions (
    id bigint primary key generated always as identity,
    title text not null,
    category_id bigint not null,
    next_renewal date not null,
    price numeric(10, 2) not null,
    is_renews boolean not null
);

create table categories (
    id bigint primary key generated always as identity,
    name text not null,
    color text not null
);

alter table subscriptions
add constraint fk_category foreign key (category_id) references categories (id);
