export type ButtonProps = {
  children?: React.ReactNode;
  variant?: string; // default, primary, secondary, info, success, warning, danger, dark;
  disabled?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type NoteProps = {
  _id: string;
} & NoteData;

export type NoteList = {
  notes: NoteProps[];
};

export type ModalProps = {
  children?: React.ReactNode;
  transitionIn: boolean;
  timeout?: number;
  classNames?: string;
  onExit: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

export type NoteData = {
  title: string;
  markdown: string;
};

export type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void;
};

export type NoteFormProps = {
  forNewNote: boolean;
} & Partial<NoteData>;

export type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
};
