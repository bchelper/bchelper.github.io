import { useRef, useState } from "react";

function secondsToHHMMSS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(Math.ceil(seconds))}`;
}

function App() {

  const [projectDuration, setProjectDuration] = useState<string>();
  const [ticks, setTicks] = useState<number>();

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const effort = Number(formData.get("effort"));
    const power = Number(formData.get("power"));
    const speed = Number(formData.get("speed"));
    const stamina = Number(formData.get("stamina"));
    let ticks = 0;
    if (power && effort) {
      ticks = effort / power;
      setTicks(ticks);
      setProjectDuration(secondsToHHMMSS(ticks * speed));
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="effort">Effort</label>
          <input name="effort" type="number" onChange={() => formRef.current?.requestSubmit()} />
        </div>
        <div>
          <label htmlFor="power">Power</label>
          <input name="power" type="number" onChange={() => formRef.current?.requestSubmit()} />
        </div>
        <div>
          <label htmlFor="speed">Speed</label>
          <input name="speed" step=".01" type="number" onChange={() => formRef.current?.requestSubmit()} />
        </div>
        <div>
          <label htmlFor="stamina">Stamina</label>
          <input name="stamina" type="number" onChange={() => formRef.current?.requestSubmit()} />
        </div>
        {ticks} -
        {projectDuration}
      </form>
    </>
  );
}

export default App;
