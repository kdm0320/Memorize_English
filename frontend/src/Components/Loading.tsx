import { Overlay } from "../theme";
import ReactLoading from "react-loading";

export function Loading() {
  return (
    <>
      <Overlay>
        <ReactLoading type="spin" color="black" />
      </Overlay>
    </>
  );
}
