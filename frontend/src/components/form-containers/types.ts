export type FormContainerProps<T> = {
  open: boolean;
  title: string;
  subtitle: string;
  FormComponent: React.ComponentType<{
    onOpenChange: (open: boolean) => void;
    onSave: (payload: T) => void;
    defaultValues?: T;
  }>;
  defaultValues?: T;
  onOpenChange: (open: boolean) => void;
  onSave: (payload: T) => void;
};
