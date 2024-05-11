-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'customer',
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "avatarColor" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "shippingAddressId" INTEGER,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShippingAddress" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL DEFAULT 'Qatar University',
    "street" TEXT NOT NULL DEFAULT 'Street 1234',
    "city" TEXT NOT NULL DEFAULT 'Doha',
    "country" TEXT NOT NULL DEFAULT 'Qatar',
    "url" TEXT NOT NULL DEFAULT 'https://www.google.com/maps/place/Qatar+University/@25.3755282,51.4861504,17z/data=!3m1!4b1!4m6!3m5!1s0x3e45dd1faaf07c23:0x21f2193775153df1!8m2!3d25.3755282!4d51.4887307!16s%2Fm%2F05pdfng?entry=ttu',

    CONSTRAINT "ShippingAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "subtotal" DOUBLE PRECISION NOT NULL,
    "shippingFee" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estimatedArrival" TIMESTAMP(3) NOT NULL,
    "shippingAddressId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "quantity" INTEGER NOT NULL,
    "weight" DOUBLE PRECISION NOT NULL,
    "flightTime" DOUBLE PRECISION NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL,
    "numberOfReviews" INTEGER NOT NULL,
    "numberOfSales" INTEGER NOT NULL,
    "numberOfOngoingOrders" INTEGER NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "seriesId" INTEGER NOT NULL,
    "modelId" INTEGER NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Series" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Series_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuantizedIncludedItem" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,

    CONSTRAINT "QuantizedIncludedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IncludedItem" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "IncludedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Question" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Model" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "positionX" DOUBLE PRECISION NOT NULL,
    "positionY" DOUBLE PRECISION NOT NULL,
    "positionZ" DOUBLE PRECISION NOT NULL,
    "rotationX" DOUBLE PRECISION NOT NULL,
    "rotationY" DOUBLE PRECISION NOT NULL,
    "rotationZ" DOUBLE PRECISION NOT NULL,
    "scale" DOUBLE PRECISION NOT NULL,
    "cameraX" DOUBLE PRECISION NOT NULL,
    "cameraY" DOUBLE PRECISION NOT NULL,
    "cameraZ" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "dateTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductToQuantizedIncludedItem" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductToQuestion" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_FeatureToProduct" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
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

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "ShippingAddress"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer" ADD CONSTRAINT "Customer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_shippingAddressId_fkey" FOREIGN KEY ("shippingAddressId") REFERENCES "ShippingAddress"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "Series"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuantizedIncludedItem" ADD CONSTRAINT "QuantizedIncludedItem_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "IncludedItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToQuantizedIncludedItem" ADD CONSTRAINT "_ProductToQuantizedIncludedItem_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToQuantizedIncludedItem" ADD CONSTRAINT "_ProductToQuantizedIncludedItem_B_fkey" FOREIGN KEY ("B") REFERENCES "QuantizedIncludedItem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToQuestion" ADD CONSTRAINT "_ProductToQuestion_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductToQuestion" ADD CONSTRAINT "_ProductToQuestion_B_fkey" FOREIGN KEY ("B") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeatureToProduct" ADD CONSTRAINT "_FeatureToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Feature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FeatureToProduct" ADD CONSTRAINT "_FeatureToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;
