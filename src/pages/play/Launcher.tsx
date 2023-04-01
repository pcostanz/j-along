import React, { useState } from "react";
// @ts-ignore no types :(
import SignatureCanvas from "react-signature-canvas";
import Game from "./Game";

const Launcher: React.FC<{}> = () => {
  const [gameDate, setGameDate] = useState("");

  return (
    <Game />
    // <div>
    //   DRAW YOUR NAME
    //   <div style={{ border: "4px solid white" }}>
    //     <SignatureCanvas
    //       penColor="white"
    //       canvasProps={{
    //         width: window.innerWidth - 10,
    //         height: 200,
    //         className: "sigCanvas",
    //       }}
    //     />
    //   </div>
    // </div>
  );
};

export default Launcher;

{
  /* <div onClick={() => setGameDate("today")}>Launcher</div> */
}
