import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class CookieStorageService {
  constructor(private cookieService: CookieService) { }

  /**
   * Verifica se existe a chave informada
   * @param chave Chave a ver verificada
   * @returns boolean: verdadeiro caso exista, falso caso contrário
   */
  verificarChave(chave: string) {
    return this.cookieService.check(chave);
  }

  /**
   * Obter o item de acordo com uma chave
   * @param chave Chave do item
   * @returns string: item referente a chave informada
   */
  get(chave: string) {
    return this.cookieService.get(chave);
  }

  /**
   * Obter todos os Cookies da aplicação
   * @returns Object: Array com todos os Cookies da aplicação
  */
  getAll() {
    return this.cookieService.getAll();
  }

  /**
   * Método para setar um Cookie
   * @param chave Chave do Cookie
   * @param valor Valor a ser gravado
   * @param expira Tempo de expiração do Cookie, ao não informar este parâmetro o Cookie expira ao
   * terminar a sessão do navegador. Este valor pode ser informado como dias ou uma Data fixa
   * @param caminho Caminho do Cookie
   * @param dominio Domínio do Cookie
   * @param seguro Flag que informa se o Cookie é seguro
   */
  set(chave: string, valor: string, expira?: number | Date, caminho?: string, dominio?: string, seguro?: boolean) {
    this.cookieService.set(chave, valor, expira, caminho, dominio, seguro);
  }

  /**
   * Deletar um Cookie
   * @param chave Chage do Cookie
   * @param caminho Caminho do Cookie
   * @param dominio Domínio do Cookie
   */
  deletar(chave: string, caminho?: string, dominio?: string) {
    this.cookieService.delete(chave);
  }

  /**
   * Método para deletar todos os Cookies ou todos de um determinado caminho e/ou domínio
   * @param caminho Caminho do Cookie
   * @param dominio Domínio do Cookie
   */
  deletarTodos(caminho?: string, dominio?: string) {
    this.cookieService.deleteAll();
  }
}
