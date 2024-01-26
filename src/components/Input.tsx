import { forwardRef, useImperativeHandle, useRef } from "react";

interface IInput {
  label: string;
  textarea?: boolean;
}

const Input: React.FC<IInput> = forwardRef(
  ({ label, textarea, ...props }, ref) => {
    const classes =
      "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
    const reference = useRef();
    useImperativeHandle(ref, () => {
      return {
        value() {
          return reference.current.value;
        },
      };
    });

    return (
      <div>
        <p className="flex flex-col gap-1 my-4">
          <label className="text-sm font-bold uppercase text-stone-500">
            {label}
          </label>
          {textarea ? (
            <textarea className={classes} {...props} ref={reference} />
          ) : (
            <input className={classes} ref={reference} {...props} />
          )}
        </p>
      </div>
    );
  }
);
export default Input;
