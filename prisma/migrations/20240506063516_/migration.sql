/*
  Warnings:

  - You are about to drop the column `quantity` on the `IncludedItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IncludedItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);
INSERT INTO "new_IncludedItem" ("id", "imageUrl", "name") SELECT "id", "imageUrl", "name" FROM "IncludedItem";
DROP TABLE "IncludedItem";
ALTER TABLE "new_IncludedItem" RENAME TO "IncludedItem";
CREATE UNIQUE INDEX "IncludedItem_name_imageUrl_key" ON "IncludedItem"("name", "imageUrl");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
