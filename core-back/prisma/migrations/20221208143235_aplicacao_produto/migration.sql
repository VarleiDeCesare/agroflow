-- CreateTable
CREATE TABLE "aplicacao_produtos" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "empreendimento_id" UUID NOT NULL,
    "produto_id" UUID NOT NULL,
    "qnt_produto_por_hec" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "aplicacao_produtos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "aplicacao_produtos" ADD CONSTRAINT "aplicacao_produtos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aplicacao_produtos" ADD CONSTRAINT "aplicacao_produtos_empreendimento_id_fkey" FOREIGN KEY ("empreendimento_id") REFERENCES "empreendimentos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aplicacao_produtos" ADD CONSTRAINT "aplicacao_produtos_produto_id_fkey" FOREIGN KEY ("produto_id") REFERENCES "produtos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
