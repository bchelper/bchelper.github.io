import { useRef, useState } from "react";

const staminaDrainByTier = [
  0.75, 0.89, 1.03, 1.16, 1.28, 1.41, 1.52, 1.64, 1.75, 1.86,
];

function secondsToHHMMSS(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");

  return `${pad(hours)}:${pad(minutes)}:${pad(Math.ceil(seconds))}`;
}

function App() {
  const [projectDuration, setProjectDuration] = useState<string>();
  const [regenDuration, setRegenDuration] = useState<string>();
  const [totalDuration, setTotalDuration] = useState<string>();
  const [totalExp, setTotalExp] = useState<number>();
  const [ticks, setTicks] = useState<number>();
  const [refills, setRefills] = useState<number>();
  const [formValues, setFormValues] = useState({
    staminaDrain: staminaDrainByTier[0],
  });

  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const effort = Number(formData.get("effort"));
    const power = Number(formData.get("power"));
    const speed = Number(formData.get("speed"));
    const stamina = Number(formData.get("stamina"));
    const staminaRegen = Number(formData.get("staminaRegen"));
    const staminaDrain = Number(formData.get("staminaDrain"));
    const expPerTick = Number(formData.get("expPerTick"));

    let ticks = 0;
    let refills = 0;
    if (power && effort) {
      ticks = effort / power;

      if (expPerTick) {
        setTotalExp(ticks * expPerTick);
      }

      refills = Math.ceil((ticks * staminaDrain) / stamina) - 1;
      setTicks(Math.ceil(ticks));
      setRefills(refills);
      const regenPerRefillSeconds = stamina / staminaRegen;
      const projectSeconds = ticks * speed;
      setRegenDuration(secondsToHHMMSS(regenPerRefillSeconds));
      setProjectDuration(secondsToHHMMSS(projectSeconds));
      console.log(regenPerRefillSeconds, refills, projectSeconds);
      setTotalDuration(
        secondsToHHMMSS(regenPerRefillSeconds * refills + projectSeconds)
      );
    }
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tier">Tier: </label>
          <input
            min={1}
            max={10}
            defaultValue={1}
            name="tier"
            type="number"
            onChange={(e) => {
              const tier = Number(e.target.value) - 1;
              setFormValues({
                ...formValues,
                staminaDrain: staminaDrainByTier[tier],
              });
              formRef.current?.requestSubmit();
            }}
          />
        </div>
        <div>
          <label htmlFor="effort">Effort: </label>
          <input
            name="effort"
            type="number"
            onChange={() => formRef.current?.requestSubmit()}
          />
        </div>
        <div>
          <label htmlFor="power">Power: </label>
          <input
            name="power"
            step=".01"
            type="number"
            onChange={() => formRef.current?.requestSubmit()}
          />
        </div>
        <div>
          <label htmlFor="speed">Speed: </label>
          <input
            name="speed"
            step=".01"
            type="number"
            onChange={() => formRef.current?.requestSubmit()}
          />
        </div>
        <div>
          <label htmlFor="stamina">Stamina: </label>
          <input
            name="stamina"
            type="number"
            onChange={() => formRef.current?.requestSubmit()}
          />
        </div>
        <div>
          <label htmlFor="staminaDrain">Stamina drain / tick: </label>
          <input
            name="staminaDrain"
            step=".01"
            type="number"
            value={formValues.staminaDrain}
            onChange={(e) => {
              setFormValues({
                ...formValues,
                staminaDrain: Number(e.target.value),
              });
              formRef.current?.requestSubmit();
            }}
          />
        </div>
        <div>
          <label htmlFor="staminaRegen">Stamina regen / sec: </label>
          <input
            name="staminaRegen"
            step=".01"
            type="number"
            onChange={() => formRef.current?.requestSubmit()}
          />
        </div>
        <div>
          <label htmlFor="expPerTick">Exp / tick: </label>
          <input
            name="expPerTick"
            type="number"
            onChange={() => formRef.current?.requestSubmit()}
          />
        </div>
        <div>Ticks: {ticks}</div>
        <div>Refills needed: {refills}</div>
        <div>Regen duration per refill: {regenDuration}</div>
        <div>Project duration: {projectDuration}</div>
        <div>Total duration: {totalDuration}</div>
        <div>Total exp: {totalExp}</div>
      </form>
    </>
  );
}

export default App;
