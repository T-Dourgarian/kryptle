-- CreateTable
CREATE TABLE "stats" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "avg_solve_time" INTEGER DEFAULT 0,
    "total_solves" INTEGER DEFAULT 0,
    "total_solves_unique" INTEGER DEFAULT 0,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "stats_userid_key" ON "stats"("userid");

-- AddForeignKey
ALTER TABLE "stats" ADD CONSTRAINT "stats_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
