-- CreateTable
CREATE TABLE "CostoUnitario" (
    "id" SERIAL NOT NULL,
    "cultivoNombre" TEXT NOT NULL,
    "tipoCosto" TEXT NOT NULL,
    "costoPorHectarea" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "CostoUnitario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CostoUnitario_cultivoNombre_tipoCosto_key" ON "CostoUnitario"("cultivoNombre", "tipoCosto");
