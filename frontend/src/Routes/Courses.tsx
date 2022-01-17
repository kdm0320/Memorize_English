import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

function Courses() {
  const [showing, setShowing] = useState(false);
  const toggleShowing = () => setShowing((prev) => !prev);
  return (
    <>
      <div
        style={{
          display: "flex",
          float: "right",
          width: "300px",
          height: "400px",
          backgroundColor: "red",
          borderColor: "black",
          borderWidth: "5px",
        }}
      ></div>
      <motion.div
        onClick={toggleShowing}
        layoutId="ex"
        style={{
          width: "100px",
          height: "100px",
          backgroundColor: "lightBlue",
        }}
      >
        단어주제
      </motion.div>

      <AnimatePresence>
        {showing ? (
          <motion.div
            onClick={toggleShowing}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "0",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              opacity: "1",
            }}
          >
            <motion.div
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "white",
              }}
              layoutId="ex"
            >
              단어 상세내용
              <button>choose</button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Courses;
