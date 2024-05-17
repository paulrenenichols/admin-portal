-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "userName" VARCHAR(255) NOT NULL,
    "companyName" VARCHAR(255) NOT NULL,
    "phoneNumber" VARCHAR(10) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);
