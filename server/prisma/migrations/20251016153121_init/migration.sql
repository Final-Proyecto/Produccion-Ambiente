-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('admin', 'operario');

-- CreateEnum
CREATE TYPE "TipoCorral" AS ENUM ('engorde', 'cria', 'lechero');

-- CreateEnum
CREATE TYPE "Especie" AS ENUM ('bovino', 'ovino', 'porcino');

-- CreateEnum
CREATE TYPE "CategoriaInventario" AS ENUM ('insumos', 'maquinas', 'herramientas');

-- CreateEnum
CREATE TYPE "TipoSensor" AS ENUM ('HUMEDAD_SUELO', 'TEMPERATURA', 'LLUVIA', 'MOVIMIENTO');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'operario',
    "empresaId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Empresa" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Empresa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lote" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "superficie" DOUBLE PRECISION NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Lote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Suelo" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "textura" TEXT,
    "ph" DOUBLE PRECISION,
    "materiaOrganica" DOUBLE PRECISION,
    "nitrogeno" DOUBLE PRECISION,
    "fosforo" DOUBLE PRECISION,
    "potasio" DOUBLE PRECISION,
    "loteId" INTEGER NOT NULL,

    CONSTRAINT "Suelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnalisisSuelo" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "laboratorio" TEXT,
    "observaciones" TEXT,
    "sueloId" INTEGER NOT NULL,

    CONSTRAINT "AnalisisSuelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cultivo" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "variedad" TEXT,
    "fechaSiembra" TIMESTAMP(3) NOT NULL,
    "fechaCosecha" TIMESTAMP(3),
    "superficie" DOUBLE PRECISION NOT NULL,
    "rendimiento" DOUBLE PRECISION,
    "fertilizacion" TEXT,
    "controlPlagas" TEXT,
    "loteId" INTEGER NOT NULL,

    CONSTRAINT "Cultivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clima" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "temperatura" DOUBLE PRECISION NOT NULL,
    "humedad" DOUBLE PRECISION NOT NULL,
    "precipitacion" DOUBLE PRECISION NOT NULL,
    "viento" DOUBLE PRECISION,
    "loteId" INTEGER NOT NULL,

    CONSTRAINT "Clima_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Corral" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "tipo" "TipoCorral" NOT NULL,
    "empresaId" INTEGER NOT NULL,

    CONSTRAINT "Corral_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Animal" (
    "id" SERIAL NOT NULL,
    "identificacion" TEXT NOT NULL,
    "especie" "Especie" NOT NULL,
    "raza" TEXT,
    "edad" INTEGER,
    "peso" DOUBLE PRECISION,
    "corralId" INTEGER NOT NULL,

    CONSTRAINT "Animal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ControlSanitario" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,
    "descripcion" TEXT,
    "veterinario" TEXT,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "ControlSanitario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alimentacion" (
    "id" SERIAL NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tipo" TEXT NOT NULL,
    "cantidadKg" DOUBLE PRECISION NOT NULL,
    "animalId" INTEGER NOT NULL,

    CONSTRAINT "Alimentacion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" "CategoriaInventario" NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "unidad" TEXT NOT NULL,
    "empresaId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_identificacion_key" ON "Animal"("identificacion");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Lote" ADD CONSTRAINT "Lote_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Suelo" ADD CONSTRAINT "Suelo_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalisisSuelo" ADD CONSTRAINT "AnalisisSuelo_sueloId_fkey" FOREIGN KEY ("sueloId") REFERENCES "Suelo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cultivo" ADD CONSTRAINT "Cultivo_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Clima" ADD CONSTRAINT "Clima_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Corral" ADD CONSTRAINT "Corral_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_corralId_fkey" FOREIGN KEY ("corralId") REFERENCES "Corral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ControlSanitario" ADD CONSTRAINT "ControlSanitario_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alimentacion" ADD CONSTRAINT "Alimentacion_animalId_fkey" FOREIGN KEY ("animalId") REFERENCES "Animal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inventario" ADD CONSTRAINT "Inventario_empresaId_fkey" FOREIGN KEY ("empresaId") REFERENCES "Empresa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
