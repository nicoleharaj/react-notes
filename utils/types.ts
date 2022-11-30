export type ButtonProps = {
  children?: React.ReactNode;
  variant?: string; // [outline-] default, primary, secondary, info, success, warning, danger, dark;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type BadgeProps = {
  badgeKey?: string;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export type NoteProps = {
  _id: string;
} & NoteData;

export type NoteList = {
  notes: NoteProps[];
};

export type TagProps = {
  _id: string;
  label: string;
};

export type NoteData = {
  title: string;
  markdown: string;
  tags: TagProps[];
};

export type NoteFormProps = {
  forNewNote: boolean;
} & Partial<NoteData>;

export type ModalProps = {
  children?: React.ReactNode;
  transitionIn: boolean;
  timeout?: number;
  classNames?: string;
  onExit: () => void;
} & React.HTMLAttributes<HTMLDivElement>;
