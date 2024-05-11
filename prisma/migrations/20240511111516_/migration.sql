/*
  Warnings:

  - A unique constraint covering the columns `[customerId,productId,quantity,dateTime]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Order_productId_key";

-- DropIndex
DROP INDEX "Order_customerId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Order_customerId_productId_quantity_dateTime_key" ON "Order"("customerId", "productId", "quantity", "dateTime");
