/*
  Warnings:

  - You are about to drop the column `empresaId` on the `Corral` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `Inventario` table. All the data in the column will be lost.
  - You are about to drop the column `unidad` on the `Inventario` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `Lote` table. All the data in the column will be lost.
  - You are about to drop the column `empresaId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Alimentacion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Clima` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ControlSanitario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Empresa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Alimentacion" DROP CONSTRAINT "Alimentacion_animalId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Clima" DROP CONSTRAINT "Clima_loteId_fkey";

-- DropForeignKey
ALTER TABLE "public"."ControlSanitario" DROP CONSTRAINT "ControlSanitario_animalId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Corral" DROP CONSTRAINT "Corral_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Inventario" DROP CONSTRAINT "Inventario_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Lote" DROP CONSTRAINT "Lote_empresaId_fkey";

-- DropForeignKey
ALTER TABLE "public"."User" DROP CONSTRAINT "User_empresaId_fkey";

-- AlterTable
ALTER TABLE "Corral" DROP COLUMN "empresaId";

-- AlterTable
ALTER TABLE "Inventario" DROP COLUMN "empresaId",
DROP COLUMN "unidad";

-- AlterTable
ALTER TABLE "Lote" DROP COLUMN "empresaId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "empresaId";

-- DropTable
DROP TABLE "public"."Alimentacion";

-- DropTable
DROP TABLE "public"."Clima";

-- DropTable
DROP TABLE "public"."ControlSanitario";

-- DropTable
DROP TABLE "public"."Empresa";

-- DropEnum
DROP TYPE "public"."TipoSensor";
