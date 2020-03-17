import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class LocalStorageService {
  storageService: Storage;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (!isPlatformBrowser(this.platformId)) {
      this.storageService = localStorage;
    } else {
      console.warn('Plataforma não suporte localStorage');
    }
  }

  /**
   * Verifica se existe a chave informada
   * @param chave Chave a ver verificada
   * @returns boolean: verdadeiro caso exista, falso caso contrário
   */
  verificarChave(chave: string) {
    if (this.storageService) {
      const result = this.storageService.getItem(chave);
      return result && result !== '';
    }

    return false;
  }

  /**
   * Obter o item de acordo com uma chave
   * @param chave Chave do item
   * @returns string: item referente a chave informada
   */
  get(chave: string) {
    if (this.storageService) {
      return this.storageService.getItem(chave);
    }

    return null;
  }

  /**
   * Método para setar um registro
   * @param chave Chave do registro
   * @param valor Valor a ser gravado
   */
  set(chave: string, valor: string) {
    if (this.storageService) {
      this.storageService.setItem(chave, valor);
    }
  }

  /**
   * Deletar um registro
   * @param chave Chage do registro
   */
  deletar(chave: string) {
    if (this.storageService) {
      this.storageService.removeItem(chave);
    }
  }

  /**
   * Método para deletar todos os registros
   */
  deletarTodos() {
    if (this.storageService) {
      this.storageService.clear();
    }
  }
}
