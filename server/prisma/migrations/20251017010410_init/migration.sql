/*
  Warnings:

  - Added the required column `empresaId` to the `Corral` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `Inventario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `empresaId` to the `Lote` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Corral" ADD COLUMN     "empresaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Inventario" ADD COLUMN     "empresaId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Lote" ADD COLUMN     "empresaId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corral" ADD CONSTRAINT "Corral_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
