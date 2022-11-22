import { MutableRefObject, useEffect, useRef } from "react";

interface useOutsideClickProps {
  children: JSX.Element;
  isActive: boolean;
  callback: () => void;
}

const OutsideClick = (ref: MutableRefObject<any>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      const className = e.target.parentNode.className;
      const isWidget = className.split(/(\s+)/).includes("widget");
      if (!isWidget && ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);
};

export const UseOutsideClick = (props: useOutsideClickProps) => {
  const wrapperRef = useRef(null);
  OutsideClick(wrapperRef, props.callback);
  if (props.isActive) {
    return <div ref={wrapperRef}>{props.children}</div>;
  }
  return <div>{props.children}</div>;
};
