"use client";
import { createPrediction, getPrediction } from "@/actions";
import { useFormState } from "react-dom";
import { Prediction } from "@/Types";
import FormContent from "@/components/form";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function Create() {
  const { data: session, status } = useSession();
  const [state, formAction] = useFormState(handleSubmit, null);
  const [tokens, setTokens] = useState(0);
  const [noToken, setNoToken] = useState(false);

  useEffect(() => {
    if (tokens === 0) {
      setNoToken(true);
    } else if (tokens >= 1) {
      setNoToken(false);
    }
  }, [tokens]);

  useEffect(() => {
    const enviarAlBack = async () => {
      const res = await axios.post("/api/sendToBack", {
        body: session,
      });
      const data = await res.data;
      const tokens = data.tokens;
      setTokens(tokens);
    };
    enviarAlBack();
  }, [session]);

  async function handleSubmit(_state: Prediction | null, formData: FormData) {
    const restarTokens = await axios.put("/api/sendToBack", {
      body: session,
    });
    const data = await restarTokens.data;
    const tokens = data.tokens;
    setTokens(tokens);

    let prediction = await createPrediction(formData);

    while (["starting", "processing"].includes(prediction.status)) {
      prediction = await getPrediction(prediction.id);

      await sleep(4000);
    }
    return prediction;
  }

  return (
    <div className=" h-screen flex flex-col md:flex-row  ">
      <form
        action={noToken ? "" : formAction}
        className="flex gap-4 rounded-lg shadow-md p-4"
      >
        <FormContent session={session} noToken={noToken} tokens={tokens} />
      </form>

      <section className="m-auto flex gap-2 flex-wrap align-middle justify-center  ">
        {state?.output ? (
          <>
            <img
              alt="Preview1"
              src={state.output[1]}
              className="rounded-lg h-96 shadow-2xl"
            />
            {state.output[2] ? (
              <img
                alt="Preview2"
                src={state.output[2]}
                className="rounded-lg h-96 shadow-2xl"
              />
            ) : null}
            {state.output[3] ? (
              <img
                alt="Preview2"
                src={state.output[3]}
                className="rounded-lg h-96 shadow-2xl"
              />
            ) : null}
            {state.output[4] ? (
              <img
                alt="Preview2"
                src={state.output[4]}
                className="rounded-lg h-96 shadow-2xl"
              />
            ) : null}
          </>
        ) : null}
      </section>
    </div>
  );
}
