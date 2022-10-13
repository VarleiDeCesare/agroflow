export default interface IHashProvider {
  /**
   * Gera um hash aleatório sempre de forma diferente, ou seja, a mesma mensagem gera hash diferente.
   *
   * @param {payload} payload Mensagem a ser hasheada.
   * @param {salt} payload (Opcional)
   * @return {string} Hash
   */
  generateHash(payload: string, salt?: number | string): Promise<string>;

  /**
   * Compara o payload com um hash e retorna se são compatíveis
   *
   * @param {payload} payload Mensagem a ser comparada.
   * @param {hashed} hashed hash a ser comparada.
   * @return {boolean} Boolean
   */
  compare(payload: string, hashed: string): Promise<boolean>;
}
