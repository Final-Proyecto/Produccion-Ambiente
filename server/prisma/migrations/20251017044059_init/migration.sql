-- CreateEnum
CREATE TYPE "TipoCosto" AS ENUM ('Alimento', 'Vacunacion', 'Desparasitacion', 'Veterinario');

-- CreateTable
CREATE TABLE "AnimalCosto" (
    "id" SERIAL NOT NULL,
    "animalId" INTEGER NOT NULL,
    "tipoCosto" "TipoCosto" NOT NULL,
    "cantidadAplicada" DOUBLE PRECISION,
    "costoPorUnidad" DECIMAL(10,2) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AnimalCosto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AnimalCosto" ADD CONSTRAINT "AnimalCosto_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
