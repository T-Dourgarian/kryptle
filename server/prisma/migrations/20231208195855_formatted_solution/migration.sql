/*
  Warnings:

  - Added the required column `solution_formatted` to the `solutions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "solutions" ADD COLUMN     "solution_formatted" VARCHAR(80) NOT NULL;
