
export interface Professor {
  id?: number;
  cpf: string;
  nome: string;
  dataNascimento?: string; // Usar string para facilitar a manipulação de datas no formato ISO (yyyy-mm-dd)
  especialidade?: string;
  status: string; // "Ativo" ou "Inativo"
}