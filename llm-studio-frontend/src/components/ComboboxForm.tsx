import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
});

export function ComboboxForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      model: "",
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
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-md mx-auto space-y-6"
      >
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel className="mb-2">Model</FormLabel>
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
              <FormDescription className="text-sm text-gray-600">
                Choose a model from the list. You can manage your model settings
                in your account.
              </FormDescription>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full mt-4">
          Deploy
        </Button>
      </form>
    </Form>
  );
}
