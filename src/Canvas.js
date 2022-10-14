import { Box, Button, Typography } from "@mui/material";
import React, { useRef, useEffect, useState, useContext } from "react";
import { CanvasPropsContext } from "./Context/CanvasPropsContext";

// const originalSrc = "https://avatars.githubusercontent.com/u/105061748?v=4";
const checkerBoard =
  "https://thumbs.dreamstime.com/b/chess-board-background-gray-white-squares-checkered-background-squares-seamless-background-105043219.jpg";

const Canvas = (props) => {
  const canvasRef = useRef(null);
  const [context, setContext] = useState();
  const [targetImage, setTargetImage] = useState();
  const [targetImageView, setTargetImageView] = useState();
  const [file, setFile] = useState();

  const { padding } = useContext(CanvasPropsContext);

  const draw = (ctx) => {
    console.log(">>Canvas rendering started<<");
    // ------------------------------------
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    console.log("padding", padding);

    const targetWidth = targetImage.width + padding?.x * 2;
    const targetHeight = targetImage.height + padding?.y * 2;

    ctx.canvas.width = targetWidth;
    ctx.canvas.height = targetHeight;

    // const scaleValueX =
    //   (window.innerWidth > 600
    //     ? window.innerWidth / 2
    //     : window.innerWidth - 50) / targetWidth;
    // const scaleValueY =
    //   (window.innerWidth > 600
    //     ? window.innerWidth / 2
    //     : window.innerWidth - 50) / targetHeight;

    // ctx.canvas.width = targetWidth * scaleValueX;
    // ctx.canvas.height = targetHeight * scaleValueY;

    // ctx.scale(scaleValueX, scaleValueY);

    if (targetImage) {
      ctx.drawImage(
        targetImage,
        // 0,
        // 0,
        // // image container canvas
        // targetImage.width,
        // targetImage.height,
        // // image x,y
        padding?.x,
        padding?.y,
        targetImage.width,
        targetImage.height
      );
    }

    // ------------------------------------
    console.log(">>Canvas rendering complete<<");
  };

  const onSourceChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.canvas.width = 0;
    context.canvas.height = 0;
    setContext(context);
  }, []);

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setTargetImageView(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  useEffect(() => {
    if (targetImageView) {
      const targetImage = new Image();
      targetImage.src = targetImageView;
      targetImage.crossOrigin = "Anonymous";
      setTargetImage(targetImage);
    }
  }, [targetImageView]);

  return (
    <div
      style={{
        backgroundColor: "lavender",
        padding: "1rem",
      }}
    >
      <div style={{ padding: "2rem 0" }}>
        <p>Source:</p>
        <input type="file" onChange={onSourceChange} />
        {targetImageView && (
          <div>
            <img
              src={targetImageView}
              alt="target-img"
              style={{ height: "150px", objectFit: "contain" }}
            />
          </div>
        )}
      </div>
      <Typography>Preview:</Typography>
      <Box
        width="200px"
        display="flex"
        align-items="center"
        justify-content="center"
      >
        <canvas
          style={{
            padding: 0,
            margin: 0,
            backgroundSize: "10rem",
            backgroundRepeat: "repeat",
            backgroundImage: `url(${checkerBoard})`,
          }}
          ref={canvasRef}
          {...props}
        />
      </Box>

      {context && (
        <Button variant="contained" onClick={() => draw(context)}>
          Get Result
        </Button>
      )}
      {context && (
        <Button
          variant="contained"
          onClick={() => {
            const image = canvasRef.current
              .toDataURL("image/png")
              .replace("image/png", "image/octet-stream");
            window.location.href = image;
          }}
        >
          Download
        </Button>
      )}
    </div>
  );
};

export default Canvas;
