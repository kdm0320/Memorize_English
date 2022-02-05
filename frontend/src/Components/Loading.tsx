import ReactLoading from "react-loading";
import { Overlay } from "./Others";

export function Loading() {
  return (
    <>
      <Overlay>
        <ReactLoading type="spin" color="black" />
      </Overlay>
    </>
  );
}
