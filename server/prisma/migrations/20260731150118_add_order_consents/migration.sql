/*
  Warnings:

  - Added the required column `privacyNoticeAcceptedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `termsAcceptedAt` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "privacyNoticeAcceptedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "termsAcceptedAt" TIMESTAMP(3) NOT NULL;
