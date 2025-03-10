import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "./ui/sheet";

type FormSheetProps<T> = {
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

function SheetFormContainer<T>({
  title,
  subtitle,
  FormComponent,
  open = false,
  onOpenChange,
  onSave,
}: FormSheetProps<T>) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{subtitle}</SheetDescription>
        </SheetHeader>
        <FormComponent onOpenChange={onOpenChange} onSave={onSave} />
      </SheetContent>
    </Sheet>
  );
}

export default SheetFormContainer;
