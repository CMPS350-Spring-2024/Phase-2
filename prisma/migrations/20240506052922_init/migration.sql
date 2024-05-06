/*
  Warnings:

  - Added the required column `description` to the `Series` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Series` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "description" TEXT NOT NULL
);
INSERT INTO "new_Series" ("id", "name") SELECT "id", "name" FROM "Series";
DROP TABLE "Series";
ALTER TABLE "new_Series" RENAME TO "Series";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
