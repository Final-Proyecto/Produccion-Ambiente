/*
  Warnings:

  - Added the required column `almacen` to the `Inventario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventario" ADD COLUMN     "almacen" TEXT NOT NULL,
ADD COLUMN     "unidad_medida" TEXT;
