-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'PAID', 'CANCELLED', 'FAILED');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "orderNumber" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "customerEmail" TEXT NOT NULL,
    "customerPhone" TEXT NOT NULL,
    "programSlug" TEXT NOT NULL,
    "programName" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'TRY',
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "paymentReference" TEXT,
    "assessmentToken" TEXT,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClientAssessment" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "heightCm" INTEGER NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "targetWeightKg" DOUBLE PRECISION,
    "goal" TEXT NOT NULL,
    "trainingLevel" TEXT NOT NULL,
    "weeklyTrainingDays" INTEGER NOT NULL,
    "trainingLocation" TEXT NOT NULL,
    "dailyActivityLevel" TEXT NOT NULL,
    "dietaryPreferences" TEXT,
    "injuriesOrConditions" TEXT,
    "medications" TEXT,
    "additionalNotes" TEXT,
    "healthConsent" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientAssessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentReference_key" ON "Order"("paymentReference");

-- CreateIndex
CREATE UNIQUE INDEX "Order_assessmentToken_key" ON "Order"("assessmentToken");

-- CreateIndex
CREATE UNIQUE INDEX "ClientAssessment_orderId_key" ON "ClientAssessment"("orderId");

-- AddForeignKey
ALTER TABLE "ClientAssessment" ADD CONSTRAINT "ClientAssessment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;
