/*
  Warnings:

  - You are about to drop the column `productId` on the `QuantizedIncludedItem` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ProductToQuantizedIncludedItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToQuantizedIncludedItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToQuantizedIncludedItem_B_fkey" FOREIGN KEY ("B") REFERENCES "QuantizedIncludedItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_QuantizedIncludedItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    CONSTRAINT "QuantizedIncludedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "IncludedItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_QuantizedIncludedItem" ("id", "itemId", "quantity") SELECT "id", "itemId", "quantity" FROM "QuantizedIncludedItem";
DROP TABLE "QuantizedIncludedItem";
ALTER TABLE "new_QuantizedIncludedItem" RENAME TO "QuantizedIncludedItem";
CREATE UNIQUE INDEX "QuantizedIncludedItem_quantity_itemId_key" ON "QuantizedIncludedItem"("quantity", "itemId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToQuantizedIncludedItem_AB_unique" ON "_ProductToQuantizedIncludedItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToQuantizedIncludedItem_B_index" ON "_ProductToQuantizedIncludedItem"("B");
