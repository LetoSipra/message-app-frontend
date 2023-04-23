import React, { useState } from "react";

function SlideBar() {
  const [slideBarOpen, setSlideBarOpen] = useState<boolean>(false);

  return (
    <>
      <section
        className={`fixed right-0 top-0 z-50 
    flex h-full transform bg-[#141517] shadow-xl transition-all delay-300 duration-500  ease-out 
    ${slideBarOpen ? "w-full" : " w-0"} `}></section>
    </>
  );
}

export default SlideBar;
