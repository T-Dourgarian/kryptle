-- CreateTable
CREATE TABLE "friends" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER,
    "friend_userid" INTEGER,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friends_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "friend_requests" (
    "id" SERIAL NOT NULL,
    "origin_userid" INTEGER,
    "receiver_userid" INTEGER,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "friend_requests_pkey" PRIMARY KEY ("id")
);
