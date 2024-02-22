import { useContext } from 'react';
import TokenContext from './TokenContext';

export const useToken = () => {
  return useContext(TokenContext);
};
