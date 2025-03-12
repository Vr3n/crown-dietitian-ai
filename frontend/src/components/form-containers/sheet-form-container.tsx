import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { FormContainerProps } from "./types";

type FormSheetProps<T> = FormContainerProps<T>;

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
