/*
  Warnings:

  - A unique constraint covering the columns `[label,street,city,country]` on the table `ShippingAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ShippingAddress_label_street_city_country_key" ON "ShippingAddress"("label", "street", "city", "country");
