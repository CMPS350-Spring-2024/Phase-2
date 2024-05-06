/*
  Warnings:

  - You are about to drop the column `model` on the `Series` table. All the data in the column will be lost.
  - Added the required column `modelName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "weight" REAL NOT NULL,
    "flightTime" REAL NOT NULL,
    "rating" REAL NOT NULL,
    "numberOfReviews" INTEGER NOT NULL,
    "numberOfSales" INTEGER NOT NULL,
    "numberOfOngoingOrders" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,
    CONSTRAINT "Product_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("createdAt", "description", "flightTime", "id", "imageUrl", "modelId", "name", "numberOfOngoingOrders", "numberOfReviews", "numberOfSales", "price", "quantity", "rating", "seriesId", "updatedAt", "weight") SELECT "createdAt", "description", "flightTime", "id", "imageUrl", "modelId", "name", "numberOfOngoingOrders", "numberOfReviews", "numberOfSales", "price", "quantity", "rating", "seriesId", "updatedAt", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Series" ("description", "id", "name") SELECT "description", "id", "name" FROM "Series";
DROP TABLE "Series";
ALTER TABLE "new_Series" RENAME TO "Series";
CREATE UNIQUE INDEX "Series_name_key" ON "Series"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
