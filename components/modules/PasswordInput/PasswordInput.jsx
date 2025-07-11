import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function PasswordInput({ register, inputRef, error }) {
  const [show, setShow] = useState(false);
  const handleToggleVisibility = () => {
    const el = inputRef.current;
    if (!el) return;

    const position = el.selectionStart || 0;

    setShow((prev) => !prev);

    setTimeout(() => {
      el.focus();
      el.setSelectionRange(position, position);
    }, 0);
  };
  return (
    <>
      <div className="relative" dir="ltr">
        <Input
          className={"!font-roboto-regular"}
          id="password"
          {...register("password")}
          ref={(e) => {
            register("password").ref(e);
            inputRef.current = e;
          }}
          type={show ? "text" : "password"}
          placeholder="password "
        />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleToggleVisibility}
          className="text-muted-foreground absolute top-1/2 right-2 -translate-y-1/2 hover:bg-transparent"
        >
          {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>
      {error && <p className="mr-1 text-xs text-red-500">{error.message}</p>}
    </>
  );
}
