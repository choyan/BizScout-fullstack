/*
  Warnings:

  - The `event` column on the `UserActivity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Event" AS ENUM ('SIGNUP', 'SIGNIN', 'PURCHASE');

-- AlterTable
ALTER TABLE "UserActivity" DROP COLUMN "event",
ADD COLUMN     "event" "Event" NOT NULL DEFAULT 'SIGNIN';
