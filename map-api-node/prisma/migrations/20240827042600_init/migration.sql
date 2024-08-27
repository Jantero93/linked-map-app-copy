-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "street" VARCHAR(255) NOT NULL,
    "streetNumber" VARCHAR(255) NOT NULL,
    "city" VARCHAR(255) NOT NULL,
    "longitude" DECIMAL(12,9) NOT NULL,
    "latitude" DECIMAL(12,9) NOT NULL,
    "suburb" VARCHAR(255),
    "postalCode" VARCHAR(100),

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
