import { call } from './misc';

export const getData = () =>  {
    return call('/docs', 'GET');
}