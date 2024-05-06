/*
  Warnings:

  - You are about to drop the column `productId` on the `Feature` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `IncludedItem` table. All the data in the column will be lost.
  - You are about to drop the column `productId` on the `Question` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "QuantizedIncludedItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "QuantizedIncludedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "IncludedItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "QuantizedIncludedItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductToQuestion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_FeatureToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_FeatureToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Feature" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FeatureToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_Feature" ("id", "imageUrl", "name") SELECT "id", "imageUrl", "name" FROM "Feature";
DROP TABLE "Feature";
ALTER TABLE "new_Feature" RENAME TO "Feature";
CREATE UNIQUE INDEX "Feature_name_imageUrl_key" ON "Feature"("name", "imageUrl");
CREATE TABLE "new_IncludedItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_IncludedItem" ("id", "imageUrl", "name", "quantity") SELECT "id", "imageUrl", "name", "quantity" FROM "IncludedItem";
DROP TABLE "IncludedItem";
ALTER TABLE "new_IncludedItem" RENAME TO "IncludedItem";
CREATE UNIQUE INDEX "IncludedItem_name_imageUrl_key" ON "IncludedItem"("name", "imageUrl");
CREATE TABLE "new_Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL
);
INSERT INTO "new_Question" ("answer", "id", "question") SELECT "answer", "id", "question" FROM "Question";
DROP TABLE "Question";
ALTER TABLE "new_Question" RENAME TO "Question";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToQuestion_AB_unique" ON "_ProductToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToQuestion_B_index" ON "_ProductToQuestion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FeatureToProduct_AB_unique" ON "_FeatureToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_FeatureToProduct_B_index" ON "_FeatureToProduct"("B");
