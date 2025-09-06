import React, { useRef, useEffect, useState } from "react";


export const SpaceDevadersGame = () => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = 480;
    canvas.height = 320;

    let animationFrameId;
    let player = { x: 200, y: 280, width: 30, height: 30 };
    let keys = {};

    const handleKeyDown = (e) => (keys[e.key] = true);
    const handleKeyUp = (e) => (keys[e.key] = false);

    const update = () => {
      // Movement
      if (keys["ArrowLeft"] && player.x > 0) player.x -= 5;
      if (keys["ArrowRight"] && player.x < canvas.width - player.width) player.x += 5;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      ctx.fillStyle = "limegreen";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      animationFrameId = requestAnimationFrame(update);
    };

    if (isRunning) {
      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);
      update();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isRunning]);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Space Devaders</h2>
      <p>Score: {score}</p>
      {!isRunning && (
        <button onClick={() => setIsRunning(true)}>Start Game</button>
      )}
      <canvas ref={canvasRef} style={{ border: "1px solid white" }} />
    </div>
  );
};
