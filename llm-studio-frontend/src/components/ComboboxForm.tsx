import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Rocket } from "lucide-react";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { toast } from "./ui/use-toast";

const FormSchema = z.object({
  model: z.string().nonempty("Please select a model."),
  weight: z.string().nonempty("Please select a weight."),
});

export function ComboboxForm() {
  const [isClickedButton, setIsClickedButton] = useState(false);
  const [isClicked, setIsClicked] = useState(false); // Ensuring consistent naming convention
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      model: "",
      weight: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Submitted", data);
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    setIsClicked(!isClicked); // Toggle the icon's rotation and scale
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col items-center p-4 rounded-2xl bg-secondary border-b-4 transition-colors duration-300 dark:border-gray-700"
        style={{ minWidth: "350px" }}
      >
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem className="w-full mb-4">
              <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white">
                Model
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Falcon-40B">Falcon-40B</SelectItem>
                  <SelectItem value="Lama-2-70B">Lama-2-70B</SelectItem>
                  <SelectItem value="Mixtral-7x8b">Mixtral-7x8b</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem className="w-full mb-4">
              <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white">
                Weight
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a weight" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Default Weights">
                    Default Weights
                  </SelectItem>
                  <SelectItem value="Custom Weight">Custom Weight</SelectItem>
                  <SelectItem value="Fine-Tune Weights">
                    Fine-Tune Weights
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 dark:text-red-300" />
            </FormItem>
          )}
        />
        <Button
          className="w-[150px] !bg-[#786BB0] hover:!bg-[#66548C] hover:shadow-lg hover:-translate-y-1 !text-white font-bold py-2 px-4 rounded self-center transition duration-300 ease-in-out"
          type="submit"
          onClick={() => setIsClickedButton(true)}
          onAnimationEnd={() => setIsClickedButton(false)}
        >
          Run Job
          <Rocket
            className={`ml-2 transition-transform duration-300 ${
              isClickedButton ? "text-green-500 scale-110" : "text-white"
            }`}
          />
        </Button>
      </form>
    </Form>
  );
}
