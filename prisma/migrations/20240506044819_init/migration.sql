/*
  Warnings:

  - Added the required column `updatedAt` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
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
INSERT INTO "new_Product" ("description", "flightTime", "id", "imageUrl", "modelId", "name", "numberOfOngoingOrders", "numberOfReviews", "numberOfSales", "price", "quantity", "rating", "seriesId", "weight") SELECT "description", "flightTime", "id", "imageUrl", "modelId", "name", "numberOfOngoingOrders", "numberOfReviews", "numberOfSales", "price", "quantity", "rating", "seriesId", "weight" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
