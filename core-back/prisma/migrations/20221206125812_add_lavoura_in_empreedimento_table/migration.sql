/*
  Warnings:

  - Added the required column `lavoura_id` to the `empreendimentos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "empreendimentos" ADD COLUMN     "lavoura_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "empreendimentos" ADD CONSTRAINT "empreendimentos_lavoura_id_fkey" FOREIGN KEY ("lavoura_id") REFERENCES "lavouras"("id") ON DELETE CASCADE ON UPDATE CASCADE;
