CREATE TABLE daily_krypto (
    id SERIAL PRIMARY KEY,
    numbers VARCHAR(60) NOT NULL,
    target INT NOT NULL,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    username VARCHAR(25) UNIQUE NOT NULL,
    email VARCHAR(75) NOT NULL,
    hash TEXT NOT NULL,
    "hashedRt" TEXT,
    solve_timer_seconds INT DEFAULT 0
);


CREATE TABLE stats (
    id SERIAL PRIMARY KEY,
    userid INT UNIQUE NOT NULL,
    avg_solve_time INT DEFAULT 0,
    total_solves INT DEFAULT 0,
    total_solves_unique INT DEFAULT 0,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    daily_streak INT DEFAULT 0,
    daily_streak_increment_eligible BOOLEAN DEFAULT TRUE,
    CONSTRAINT fk_stats_users FOREIGN KEY (userid) REFERENCES users (id)
);

CREATE TABLE solutions (
    id SERIAL PRIMARY KEY,
    daily_krypto_id INT,
    solution VARCHAR(60) NOT NULL,
    solution_seconds INT NOT NULL,
    created_at TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "userId" INT NOT NULL,
    solution_formatted VARCHAR(80) NOT NULL,
    CONSTRAINT fk_solutions_users FOREIGN KEY ("userId") REFERENCES users (id),
    CONSTRAINT fk_solutions_daily_krypto FOREIGN KEY (daily_krypto_id) REFERENCES daily_krypto (id)
);

INSERT INTO public.daily_krypto(
	numbers, target)
	VALUES ('3 15 7 24 9', '17');


