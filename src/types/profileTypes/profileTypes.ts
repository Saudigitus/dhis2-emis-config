export interface LabelItem {
  id: string;
  text: string;
  color?: string;
  createdAt: number;
}

export interface StudentProfileFormData {
  studentProgram: string;
  dropoutOption: string;
  enableDeleteOption: 'Yes' | 'No';
  defaultPageSize: string;
  maxLabelsAllowed: number;
  labels: LabelItem[];
}

export type SortMode = 'custom' | 'alphabetical-asc' | 'alphabetical-desc' | 'newest' | 'oldest';

export interface LabelPreset {
  name: string;
  description: string;
  labels: { text: string; color: string }[];
}
