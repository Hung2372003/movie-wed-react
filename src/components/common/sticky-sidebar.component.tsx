import React, { useEffect, useRef, useState } from "react";

interface StickySidebarProps {
  children: React.ReactNode;
}

const StickySidebar: React.FC<StickySidebarProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement | null>(null);
  const [sidebarTop, setSidebarTop] = useState(0);
  const [stickyHeight, setStickyHeight] = useState(0);

  useEffect(() => {
    if (!ref.current) return;

    // lấy main-content
    mainRef.current = document.querySelector(".main-content");
    if (!mainRef.current) return;

    // init thông số
    setStickyHeight(ref.current.offsetHeight);
    setSidebarTop(ref.current.offsetTop);

    const handleScroll = () => {
      if (!ref.current || !mainRef.current) return;

      const scrollTop = window.scrollY;
      const sidebarEl = ref.current;
      const mainEl = mainRef.current;

      if (scrollTop > sidebarTop) {
        // sidebar dính xuống
        const newTop = scrollTop - sidebarTop - 160;
        // sidebarEl.style.position = "relative";
        sidebarEl.style.top = `${newTop}px`;

        // kiểm tra nếu chạm đáy
        const sidebarBottom = sidebarEl.offsetTop + stickyHeight + 20;
        const stickyStop = mainEl.offsetTop + mainEl.offsetHeight;

        if (sidebarBottom > stickyStop) {
          const stopPosition = mainEl.offsetHeight - stickyHeight + 77;
          sidebarEl.style.top = `${stopPosition}px`;
        }
      } else {
        // reset
        // sidebarEl.style.position = "relative";
        sidebarEl.style.top = "0px";
      }
    };

    const handleResize = () => {
      if (ref.current) {
        setStickyHeight(ref.current.offsetHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [sidebarTop, stickyHeight]);

  return (
    <div ref={ref} className="sticky-sb">
      {children}
    </div>
  );
};

export default StickySidebar;
