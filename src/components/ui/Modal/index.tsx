import { useEffect, useRef } from "react";

const Modal = ({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: any;
}) => {
  const ref: any = useRef();

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed top-0 w-full h-full z-[1000] bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
      <div className="p-5 bg-white w-1/2 max-h-[80vh]" ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
