/*
  Warnings:

  - Added the required column `fecha_vencimiento` to the `Inventario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Inventario" ADD COLUMN     "fecha_vencimiento" TIMESTAMP(3) NOT NULL;
