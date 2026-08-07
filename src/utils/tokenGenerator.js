import { getEnquiries } from './storage';

export const generateToken = () => {
  const all = getEnquiries();
  const count = all.length + 1;
  const padded = String(count).padStart(4, '0');
  return {
    id: `TKN-${padded}`,
    tokenNumber: count,
  };
};
