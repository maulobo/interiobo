import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FormContent({ ...props }) {
  const { pending } = useFormStatus();
  const { noToken, tokens } = props;

  return (
    <>
      <div className="flex flex-col gap-4 align-middle justify-center">
        <h2 className="text-black-700 mb-2">Upload a photo of your room:</h2>
        <Input
          placeholder="Image URL (e.g., https://example.com/image.jpg)"
          name="image"
          type="file"
          accept="image/*"
          required
          color="white"
          className="rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:border-sky-500 cursor-pointer"
        />
        <h2 className="text-black-700 mb-2">Describe your prompt</h2>
        <Textarea
          placeholder="Describe the desired decoration (e.g., Add a modern bookshelf, Change the wall color to blue)"
          name="prompt"
          required
          className="rounded-lg border border-gray-300 px-4 py-2 h-24 resize-none focus:outline-none focus:border-sky-500"
        />
        <h2 className="text-black-700 mb-2">Describe your NO prompt</h2>
        <Textarea
          placeholder="Describe the Negative Prompt for example longbody, lowres, bad anatomy, bad hands, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality "
          name="n_prompt"
          className="rounded-lg border border-gray-300 px-4 py-2 h-24 resize-none focus:outline-none focus:border-sky-500"
        />

        <Select name="num_samples" required>
          <SelectTrigger className="rounded-lg border border-gray-300 px-2 py-2 resize-none focus:outline-none focus:border-sky-500">
            <SelectValue placeholder="Select a number of renders" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Renders</SelectLabel>
              <SelectItem value="1">1</SelectItem>
              <SelectItem value="4">4</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <h2 className="text-black-700 mb-2">GO </h2>
        <Button disabled={pending || noToken}>
          {!noToken
            ? pending
              ? "Generating..."
              : "Create Image"
            : "No disponible"}
        </Button>
        {tokens <= 0 ? (
          <p>
            It seems you have run out of tokens. Please contact us to reload
            your account and continue using the service.
          </p>
        ) : (
          <p>
            You have <b>({`${tokens}`}) </b>tokens remaning
          </p>
        )}
      </div>
    </>
  );
}
export default FormContent;
