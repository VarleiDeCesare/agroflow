-- AlterTable
ALTER TABLE "culturas" ADD COLUMN     "file_id" UUID;

-- AlterTable
ALTER TABLE "lavouras" ADD COLUMN     "file_id" UUID;

-- AlterTable
ALTER TABLE "produtos" ADD COLUMN     "file_id" UUID;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "file_id" UUID;

-- CreateTable
CREATE TABLE "files" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "originalname" TEXT,
    "mimetype" TEXT,
    "size" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "files_name_key" ON "files"("name");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lavouras" ADD CONSTRAINT "lavouras_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "culturas" ADD CONSTRAINT "culturas_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtos" ADD CONSTRAINT "produtos_file_id_fkey" FOREIGN KEY ("file_id") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;
