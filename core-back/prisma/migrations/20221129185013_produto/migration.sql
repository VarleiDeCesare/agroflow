/*
  Warnings:

  - The primary key for the `lavouras` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `cultura` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipo_produto` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `id` on the `lavouras` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "lavouras" DROP CONSTRAINT "lavouras_user_id_fkey";

-- AlterTable
ALTER TABLE "lavouras" DROP CONSTRAINT "lavouras_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL,
ADD CONSTRAINT "lavouras_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "cultura";

-- DropTable
DROP TABLE "tipo_produto";

-- CreateTable
CREATE TABLE "tipo_produtos" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "culturas" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "culturas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtos" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "unidade_medida" TEXT NOT NULL,
    "tipo_produto_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lavouras" ADD CONSTRAINT "lavouras_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_tipo_produto_id_fkey" FOREIGN KEY ("tipo_produto_id") REFERENCES "tipo_produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
