function secondsToHHMMSS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, '0');

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function App() {



  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const effort = Number(formData.get("effort"));
    const power = Number(formData.get("power"));
    const speed = Number(formData.get("speed"));

    console.log(effort, power, speed);
    if (power && effort) {
      console.log((effort / power) * speed);
      console.log(secondsToHHMMSS((effort / power) * speed))
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="effort">Effort</label>
          <input name="effort" type="number" />
        </div>
        <div>
          <label htmlFor="power">Power</label>
          <input name="power" type="number" />
        </div>
        <div>
          <label htmlFor="speed">Speed</label>
          <input name="speed" step=".01" type="number" />
        </div>
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default App;
