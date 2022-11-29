/*
  Warnings:

  - You are about to drop the column `name` on the `culturas` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `produtos` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `tipo_produtos` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `users` table. All the data in the column will be lost.
  - Added the required column `nome` to the `culturas` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `produtos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nome` to the `tipo_produtos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "culturas" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "produtos" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tipo_produtos" DROP COLUMN "name",
ADD COLUMN     "nome" TEXT NOT NULL;

