// Format commun renvoyé par le backend Abricot pour toutes les routes.
// Le type générique T représente le contenu précis de `data`.
export type ApiResponse<T> = {
  data?: T;
  error?: string;
  message: string;
  success: boolean;
};
