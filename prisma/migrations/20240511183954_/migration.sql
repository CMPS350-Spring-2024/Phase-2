/*
  Warnings:

  - You are about to drop the column `customerId` on the `ShippingAddress` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ShippingAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL DEFAULT 'Qatar University',
    "street" TEXT NOT NULL DEFAULT 'Street 1234',
    "city" TEXT NOT NULL DEFAULT 'Doha',
    "country" TEXT NOT NULL DEFAULT 'Qatar',
    "url" TEXT NOT NULL DEFAULT 'https://www.google.com/maps/place/Qatar+University/@25.3755282,51.4861504,17z/data=!3m1!4b1!4m6!3m5!1s0x3e45dd1faaf07c23:0x21f2193775153df1!8m2!3d25.3755282!4d51.4887307!16s%2Fm%2F05pdfng?entry=ttu'
);
INSERT INTO "new_ShippingAddress" ("city", "country", "id", "label", "street", "url") SELECT "city", "country", "id", "label", "street", "url" FROM "ShippingAddress";
DROP TABLE "ShippingAddress";
ALTER TABLE "new_ShippingAddress" RENAME TO "ShippingAddress";
CREATE UNIQUE INDEX "ShippingAddress_label_street_city_country_key" ON "ShippingAddress"("label", "street", "city", "country");
CREATE TABLE "new_Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shippingAddressId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Customer_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "ShippingAddress" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Customer" ("id", "userId") SELECT "id", "userId" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
