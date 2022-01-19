import { useState } from "react";

export function CnNoti() {
  const [onNoti, setOnNoti] = useState(false);
  const toggleNoti = () => setOnNoti((prev) => !prev);
  return toggleNoti();
}
