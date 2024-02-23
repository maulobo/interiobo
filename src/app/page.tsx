"use client";
import { createPrediction, getPrediction } from "@/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFormState, useFormStatus } from "react-dom";
import { Prediction } from "@/Types";
import { Skeleton } from "@/components/ui/skeleton";
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function FormContent() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? <Skeleton className="h-[480px] w-[512px]" /> : null}
      <Input
        defaultValue="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png"
        placeholder="https://replicate.delivery/pbxt/IJZOELWrncBcjdE1s5Ko8ou35ZOxjNxDqMf0BhoRUAtv76u4/room.png "
        name="image"
        type="file"
      />
      <Textarea placeholder="An industrial bedroom" name="prompt" />

      <Button disabled={pending}>
        {pending ? "Banca un toque..." : "Crear"}
      </Button>
    </>
  );
}

export default function Home() {
  const [state, formAction] = useFormState(handleSubmit, null);

  async function handleSubmit(_state: Prediction | null, formData: FormData) {
    let prediction = await createPrediction(formData);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await getPrediction(prediction.id);

      await sleep(4000);
    }
    return prediction;
  }

  return (
    <>
      <section className="m-auto grid gap-4 max-w-[512px]">
        {state?.output ? (
          <img alt="previsualizacion" src={state.output[1]} />
        ) : (
          ""
        )}
        <form action={formAction} className=" grid gap-4">
          <FormContent />
        </form>
      </section>{" "}
    </>
  );
}
