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
    let bullets = [];

    const handleKeyDown = (e) => {
      keys[e.key] = true;

      if (e.code === "Space") {
        bullets.push({
          x: player.x + player.width / 2 - 2,
          y: player.y,
          width: 4,
          height: 10,
          speed: 7,
        });
      }
    };

    const handleKeyUp = (e) => (keys[e.key] = false);

    const update = () => {
      // Movement
      if (keys["ArrowLeft"] && player.x > 0) player.x -= 5;
      if (keys["ArrowRight"] && player.x < canvas.width - player.width)
        player.x += 5;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw player
      ctx.fillStyle = "limegreen";
      ctx.fillRect(player.x, player.y, player.width, player.height);

      // update & draw bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const bullet = bullets[i];
        bullet.y -= bullet.speed;

        // rimuovere se esce da schermo
        if (bullet.y + bullet.height < 0) {
          bullets.splice(i, 1);
          continue;
        }

        // draw bullets
        ctx.fillStyle = "yellow";
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
      }

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
