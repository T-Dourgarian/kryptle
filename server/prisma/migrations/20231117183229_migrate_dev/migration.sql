-- CreateTable
CREATE TABLE "daily_krypto" (
    "id" SERIAL NOT NULL,
    "numbers" VARCHAR(60) NOT NULL,
    "target" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_krypto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solutions" (
    "id" SERIAL NOT NULL,
    "daily_krypto_id" INTEGER,
    "solution" VARCHAR(60) NOT NULL,
    "solution_seconds" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "solutions_pkey" PRIMARY KEY ("id")
);
