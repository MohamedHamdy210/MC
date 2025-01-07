/* eslint-disable react/prop-types */

import {useEffect,useState } from "react";
import { motion } from "framer-motion";
export default function Cover({ handleClick,popular  }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % 7);
    }, 3000);
  }, []);
  const pos = `https://image.tmdb.org/t/p/w1280/${popular[index].backdrop_path}`;
  const styles = {
    backgroundImage: `url(${pos})`,
  };
  return (
    <>
      <div className="cover" style={styles}></div>
      <div className="cards">
        {popular.map((movie, ind) => {
          if (ind > 6) {
            return;
          }
          const poster = `https://image.tmdb.org/t/p/w780/${movie.poster_path}`;
          return (
            <motion.div
              key={movie.id}
              className="card"
              // className={clsx({
              //   card: true,
              //   big: ind === index,
              // })}
              initial={{
                width: "12.2rem",
                height: "200px",
                opacity: 0.8,
                scale: 1,
              }}
              animate={
                ind === index
                  ? { scale: 1.25, opacity: 1, zIndex: 2 }
                  : { opacity: 0.8, scale: 1 }
              }
              transition={{ duration: 0.8 }}
              style={{
                backgroundImage: `url(${poster})`,
              }}
            >
              

              <motion.button
                initial={{ opacity: 0 }}
                animate={ind === index ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.8 }}
                onClick={()=>handleClick(movie)}
              >
                View
              </motion.button>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
// 