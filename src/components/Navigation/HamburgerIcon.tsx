const HamburgerIcon = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {
  return (
    <div
      onClick={() => setOpen(!open)}
      className="my-2 flex h-[24px] w-6 cursor-pointer flex-col gap-[5px]"
    >
      <div
        aria-hidden
        className={`h-[3px] w-full rounded-full bg-black/75 transition-all duration-500 ${open && "translate-y-2 -rotate-45"}`}
      ></div>
      <div
        aria-hidden
        className={`h-[3px] w-full rounded-full bg-black/75 transition-all duration-500 ${open && "opacity-0"}`}
      ></div>
      <div
        aria-hidden
        className={`h-[3px] w-full rounded-full bg-black/75 transition-all duration-500 ${open && "-translate-y-2 rotate-45"}`}
      ></div>
    </div>
  );
};

export default HamburgerIcon;
