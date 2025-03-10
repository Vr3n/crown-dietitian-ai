import { Customer } from "~/routes/clients";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

type FormModalProps<T> = {
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

function ModalFormContainer<T>({
  title,
  subtitle,
  FormComponent,
  open = false,
  onOpenChange,
  onSave,
}: FormModalProps<T>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{subtitle}</DialogDescription>
        </DialogHeader>
        <FormComponent onOpenChange={onOpenChange} onSave={onSave} />
      </DialogContent>
    </Dialog>
  );
}

export default ModalFormContainer;
