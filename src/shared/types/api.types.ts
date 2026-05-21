// Format commun renvoyé par le backend Abricot pour toutes les routes.
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message: string;
  success: boolean;
};
