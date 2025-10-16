/*
  Warnings:

  - You are about to drop the column `fecha_vencimiento` on the `Inventario` table. All the data in the column will be lost.
  - You are about to drop the column `unidad_medida` on the `Inventario` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `AnalisisSuelo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Animal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Corral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Cultivo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Suelo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AnalisisSuelo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Animal" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Corral" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Cultivo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Inventario" DROP COLUMN "fecha_vencimiento",
DROP COLUMN "unidad_medida",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Suelo" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN NOT NULL;
