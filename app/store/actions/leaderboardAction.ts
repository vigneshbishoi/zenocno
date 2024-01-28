import actionTypes from './types';

export function getLeaderboardList(type: string, payload: any) {
  return {
    type,
    payload,
  };
};