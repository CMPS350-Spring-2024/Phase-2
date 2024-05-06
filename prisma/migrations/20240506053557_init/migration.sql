/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Model` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Model_url_key" ON "Model"("url");
