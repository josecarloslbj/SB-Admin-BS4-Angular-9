import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  ACCESS_DENIED_ROUTE_CONFIG = 'ACCESS_DENIED_ROUTE';
  ACTUAL_PROJECT_REFERENCE_CONFIG = 'ACTUAL_PROJECT_REFERENCE';
  AUTH_PREFIX_CONFIG = 'AUTH_PREFIX';
  BASE_API_URL_CONFIG = 'BASE_API_URL';
  CAN_ACCESS_FEATURE_URL_CONFIG = 'CAN_ACCESS_FEATURE_URL';
  CAN_ACCESS_SYSTEM_URL_CONFIG = 'CAN_ACCESS_SYSTEM_URL';
  LOGIN_ROUTE_CONFIG = 'LOGIN_ROUTE';
  LOGIN_GUARDIAN = 'LOGIN_GUARDIAN';
  LOGIN_URL_CONFIG = 'LOGIN_URL';
  LOGIN_URL_GRD_CONFIG = 'LOGIN_URL_GRD';
  LOGIN_ANON_URL_CONFIG = 'LOGIN_ANON_ROUTE';
  MAINTENANCE_ROUTE_CONFIG = 'MAINTENANCE_ROUTE';
  FEATURES_URL_CONFIG = 'FEATURES_URL';
  PROJECTS_URL_CONFIG = 'PROJECT_URL';
  ROLES_URL_CONFIG = 'ROLES_URL';
  ROOT_ROUTE_CONFIG = 'ROOT_ROUTE';
  SYSTEM_STATUS_URL_CONFIG = 'SYSTEM_STATUS_URL';
  SYSTEM_PERFIL = 'SYSTEM_PERFIL';
  SAVE_PERFIL = 'SAVE_PERFIL';
  GET_PERFIL = 'GET_PERFIL';
  LOAD_PERFIL_BY_SYSTEM = 'LOAD_PERFIL_BY_SYSTEM';
  MIN_NUMBER_CHAR_AUTOCOMPLETE = 'MIN_NUMBER_CHAR_AUTOCOMPLETE';
  configs: Object = {};

  constructor() {
  }

  /**
   * Verifica a existencia de uma configuração de acordo com a chave escolhida
   * @param chave chave da configuração
   * @returns boolean indicando se existe a configuração
   */
  existeConfiguracao(chave: string): boolean {
    return this.configs.hasOwnProperty(chave);
  }

  /**
   * Obtem uma configuração de acordo com a chave informada
   * @param chave chave da configuração
   * @returns string com o valor da configuração
   */
  obterConfiguracao(chave: string): string {

    debugger;
    return 'TESTE';
    // if (this.existeConfiguracao(chave)) {
    //   return this.configs[chave];
    // } else {
    //   throw new Error(`Configuração não encontrada: ${chave}`);
    // }
  }

  /**
   * Insere ou altera um valor para uma configuração de acordo com a chave
   * @param chave chave a ser gravada ou alterada
   * @param valor valor a ser inserido na chave selecionada
   */
  gravarConfiguracao(chave: string, valor: string): void {
    this.configs[chave] = valor;
  }
}
