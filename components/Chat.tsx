import {
  HiOutlineFaceSmile,
  HiPaperClip,
  HiPaperAirplane,
} from "react-icons/hi2";
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { useSession } from "next-auth/react";
// import data from "@emoji-mart/data";
// import Picker from "@emoji-mart/react";
// import { isScroll } from "@/atoms/scrollAtom";
// import { useRecoilState } from "recoil";

function Chat() {
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const { data: session } = useSession();
  const buttonRef = useRef() as MutableRefObject<HTMLButtonElement>;
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
  //   const Filter = require("bad-words"),
  //     filter = new Filter();

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  return (
    <>
      <div className="scrollbar-hide relative flex h-screen flex-col justify-between overflow-y-auto ">
        <div className="h-full bg-[#0B141A] px-3">
          {/* <div className="">
            <div
              className={`flex w-full space-x-1 py-5 ${
                session?.user.uid === message.id && "justify-end"
              }`}>
              {session?.user.uid !== message.id && (
                <Image
                  src={message.userImg}
                  width={40}
                  height={40}
                  alt=""
                  className="h-10 w-10 rounded-full object-contain"
                />
              )}
              <div
                className={`my-auto flex flex-col ${
                  session?.user.uid === message.id && "items-end"
                }`}>
                <p>@{message.username}</p>
                <p className="w-fit max-w-xs overflow-auto break-words rounded-lg bg-[#005c4b] px-2.5 py-0.5 text-white">
                  {message.text}
                </p>
                <div className="mt-1 flex space-x-2 text-xs">
                  <Moment className="" format="LT">
                    {message.timestamp?.toDate()}
                  </Moment>
                  {session?.user.uid === message?.id && (
                    <HiOutlineTrash
                      className="iconAnimation my-auto h-4 w-4 cursor-pointer text-red-600 hover:bg-red-600 hover:bg-opacity-30"
                      onClick={() => deleteDoc(doc(db, "messages", id))}
                    />
                  )}
                </div>
              </div>
              {session?.user.uid === message.id && (
                <Image
                  src={message.userImg}
                  width={40}
                  height={40}
                  alt=""
                  className="h-10 w-10 rounded-full object-contain"
                />
              )}
            </div>
          </div> */}
        </div>
        <div className="relative bg-[#202C33]">
          <div className="flex h-14 rounded-xl p-2">
            <div className="mx-1 my-auto flex space-x-1 px-0.5 py-0.5">
              <HiOutlineFaceSmile
                onClick={() => {
                  setShowEmoji(!showEmoji);
                  inputRef.current.focus();
                }}
                className="h-10 w-10 cursor-pointer rounded-full p-2 transition-all duration-500 ease-in-out hover:bg-[#8696a0] hover:bg-opacity-30"
              />
              <HiPaperClip className="h-10 w-10 cursor-pointer rounded-full p-2 transition-all duration-500 ease-in-out hover:bg-[#8696a0] hover:bg-opacity-30" />
              {showEmoji && (
                <div className="absolute bottom-[50px]">
                  {/* <Picker
                  data={data}
                  onEmojiSelect={(e: any) => {
                    setInput(input + e.native);
                    inputRef.current.focus();
                  }}
                  theme={"dark"}
                /> */}
                </div>
              )}
            </div>
            <div className="flex w-full space-x-2 rounded-lg bg-[#2a3942]">
              <input
                ref={inputRef}
                disabled={loading ? true : false}
                type="text"
                placeholder="Write a messeage"
                maxLength={250}
                className="w-full rounded-lg bg-[#2a3942] px-2 py-0.5 outline-none"
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />

              <p className="my-auto px-1">{input.length}/250</p>
            </div>
            <button ref={buttonRef}>
              <div className="mx-1 my-auto">
                <HiPaperAirplane className="iconAnimation h-6 w-6" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
