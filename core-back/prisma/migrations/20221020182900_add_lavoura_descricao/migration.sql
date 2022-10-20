/*
  Warnings:

  - You are about to drop the column `nome` on the `lavouras` table. All the data in the column will be lost.
  - Added the required column `titulo` to the `lavouras` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lavouras" DROP COLUMN "nome",
ADD COLUMN     "descricao" TEXT,
ADD COLUMN     "titulo" TEXT NOT NULL;
