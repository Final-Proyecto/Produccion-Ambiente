/*
  Warnings:

  - You are about to drop the column `controlPlagas` on the `Cultivo` table. All the data in the column will be lost.
  - You are about to drop the column `fertilizacion` on the `Cultivo` table. All the data in the column will be lost.
  - You are about to drop the `CostoUnitario` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Cultivo" DROP COLUMN "controlPlagas",
DROP COLUMN "fertilizacion";

-- DropTable
DROP TABLE "public"."CostoUnitario";

-- CreateTable
CREATE TABLE "CultivoCosto" (
    "id" SERIAL NOT NULL,
    "cultivoId" INTEGER NOT NULL,
    "tipoCosto" TEXT NOT NULL,
    "cantidadAplicada" DOUBLE PRECISION,
    "costoPorUnidad" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "CultivoCosto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CultivoCosto" ADD CONSTRAINT "CultivoCosto_cultivoId_fkey" FOREIGN KEY ("cultivoId") REFERENCES "Cultivo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
