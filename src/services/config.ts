import { OpaqueToken } from '@angular/core';
export const Config = new OpaqueToken('conf');

const _conf = {
  apiUrl: 'http://localhost:3001/api/'
};
export const ConfigProvider = { provide: Config, useValue: _conf };
