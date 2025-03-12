export type FormContainerProps<T> = {
  open: boolean;
  title: string;
  subtitle: string;
  FormComponent: React.ComponentType<{
    onOpenChange: (open: boolean) => void;
    onSave: (payload: T) => void;
  }>;
  onOpenChange: (open: boolean) => void;
  onSave: (payload: T) => void;
};
