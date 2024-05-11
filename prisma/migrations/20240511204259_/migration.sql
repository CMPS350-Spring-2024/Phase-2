-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL DEFAULT 'customer',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarColor" TEXT NOT NULL,
    "balance" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "shippingAddressId" INTEGER,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Customer_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "ShippingAddress" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ShippingAddress" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "label" TEXT NOT NULL DEFAULT 'Qatar University',
    "street" TEXT NOT NULL DEFAULT 'Street 1234',
    "city" TEXT NOT NULL DEFAULT 'Doha',
    "country" TEXT NOT NULL DEFAULT 'Qatar',
    "url" TEXT NOT NULL DEFAULT 'https://www.google.com/maps/place/Qatar+University/@25.3755282,51.4861504,17z/data=!3m1!4b1!4m6!3m5!1s0x3e45dd1faaf07c23:0x21f2193775153df1!8m2!3d25.3755282!4d51.4887307!16s%2Fm%2F05pdfng?entry=ttu'
);

-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "subtotal" REAL NOT NULL,
    "shippingFee" REAL NOT NULL,
    "total" REAL NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimatedArrival" DATETIME NOT NULL,
    "shippingAddressId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "ShippingAddress" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Product" (
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

-- CreateTable
CREATE TABLE "Series" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "QuantizedIncludedItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "quantity" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    CONSTRAINT "QuantizedIncludedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "IncludedItem" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "IncludedItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Question" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Model" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "positionX" REAL NOT NULL,
    "positionY" REAL NOT NULL,
    "positionZ" REAL NOT NULL,
    "rotationX" REAL NOT NULL,
    "rotationY" REAL NOT NULL,
    "rotationZ" REAL NOT NULL,
    "scale" REAL NOT NULL,
    "cameraX" REAL NOT NULL,
    "cameraY" REAL NOT NULL,
    "cameraZ" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "amount" REAL NOT NULL,
    "dateTime" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_ProductToQuantizedIncludedItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_ProductToQuantizedIncludedItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ProductToQuantizedIncludedItem_B_fkey" FOREIGN KEY ("B") REFERENCES "QuantizedIncludedItem" ("id") ON DELETE CASCADE ON UPDATE CASCADE
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

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_userId_key" ON "Customer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ShippingAddress_label_street_city_country_key" ON "ShippingAddress"("label", "street", "city", "country");

-- CreateIndex
CREATE UNIQUE INDEX "Order_customerId_productId_quantity_dateTime_key" ON "Order"("customerId", "productId", "quantity", "dateTime");

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Series_name_key" ON "Series"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Feature_name_key" ON "Feature"("name");

-- CreateIndex
CREATE UNIQUE INDEX "QuantizedIncludedItem_quantity_itemId_key" ON "QuantizedIncludedItem"("quantity", "itemId");

-- CreateIndex
CREATE UNIQUE INDEX "IncludedItem_name_imageUrl_key" ON "IncludedItem"("name", "imageUrl");

-- CreateIndex
CREATE UNIQUE INDEX "Question_question_answer_key" ON "Question"("question", "answer");

-- CreateIndex
CREATE UNIQUE INDEX "Model_url_key" ON "Model"("url");

-- CreateIndex
CREATE UNIQUE INDEX "Transaction_customerId_key" ON "Transaction"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToQuantizedIncludedItem_AB_unique" ON "_ProductToQuantizedIncludedItem"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToQuantizedIncludedItem_B_index" ON "_ProductToQuantizedIncludedItem"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductToQuestion_AB_unique" ON "_ProductToQuestion"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductToQuestion_B_index" ON "_ProductToQuestion"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_FeatureToProduct_AB_unique" ON "_FeatureToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_FeatureToProduct_B_index" ON "_FeatureToProduct"("B");
