-- CreateTable
CREATE TABLE "empreendimentos" (
    "id" UUID NOT NULL,
    "nome_complementar" TEXT,
    "safra_temporada" TEXT NOT NULL,
    "cultura_id" UUID NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "empreendimentos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "empreendimentos" ADD CONSTRAINT "empreendimentos_cultura_id_fkey" FOREIGN KEY ("cultura_id") REFERENCES "culturas"("id") ON DELETE CASCADE ON UPDATE CASCADE;
