/*
  Warnings:

  - Added the required column `userId` to the `solutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "solutions" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "daily_streak" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "solve_timer_seconds" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "solutions" ADD CONSTRAINT "solutions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
