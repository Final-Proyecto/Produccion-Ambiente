-- CreateEnum
CREATE TYPE "Rol" AS ENUM ('admin', 'operario');

-- CreateEnum
CREATE TYPE "TipoCorral" AS ENUM ('engorde', 'cria', 'lechero');

-- CreateEnum
CREATE TYPE "Especie" AS ENUM ('bovino', 'ovino', 'porcino');

-- CreateEnum
CREATE TYPE "CategoriaInventario" AS ENUM ('insumos', 'maquinas', 'herramientas');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "rol" "Rol" NOT NULL DEFAULT 'operario',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lote" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "superficie" DOUBLE PRECISION NOT NULL,
    "ubicacion" TEXT NOT NULL,

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
CREATE TABLE "Corral" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "tipo" "TipoCorral" NOT NULL,

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
CREATE TABLE "Inventario" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "categoria" "CategoriaInventario" NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "unidad_medida" TEXT,
    "almacen" TEXT NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Inventario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Animal_identificacion_key" ON "Animal"("identificacion");

-- AddForeignKey
ALTER TABLE "Suelo" ADD CONSTRAINT "Suelo_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnalisisSuelo" ADD CONSTRAINT "AnalisisSuelo_sueloId_fkey" FOREIGN KEY ("sueloId") REFERENCES "Suelo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cultivo" ADD CONSTRAINT "Cultivo_loteId_fkey" FOREIGN KEY ("loteId") REFERENCES "Lote"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animal" ADD CONSTRAINT "Animal_corralId_fkey" FOREIGN KEY ("corralId") REFERENCES "Corral"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
