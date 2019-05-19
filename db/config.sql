CREATE TYPE ACTION_TYPE AS ENUM (
  'start',
  'subscribe',
  'unsubscribe',
  'list'
);

CREATE TABLE users (
  "user_id"    SERIAL      NOT NULL,
  "username"    VARCHAR(50) NOT NULL,
  "chat_id"     INTEGER     NOT NULL,
  "last_action" ACTION_TYPE NOT NULL DEFAULT 'start',

  PRIMARY KEY("user_id"),
  UNIQUE("username")
);

CREATE TABLE subscriptions (
  "user_id" INTEGER  NOT NULL REFERENCES "users"("user_id"),
  "address"  CHAR(42) NOT NULL,

  PRIMARY KEY("user_id", "address")
);
