/*
  Warnings:

  - You are about to drop the column `daily_streak` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `daily_streak_increment_eligible` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "stats" ADD COLUMN     "daily_streak" INTEGER DEFAULT 0;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "daily_streak",
DROP COLUMN "daily_streak_increment_eligible";
