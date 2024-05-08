import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Step, Stepper, useStepper } from "./ui/stepper";
import { toast } from "./ui/use-toast";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Select } from "./ui/select";
import { Input } from "./ui/input";

const steps = [
  { label: "Model Selection", description: "Choose your model" },
  { label: "Weight Selection", description: "Specify the weights" },
];

export default function StepperDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          if (index === 0) {
            return (
              <Step key={stepProps.label} {...stepProps}>
                <ModelSelectionForm />
              </Step>
            );
          }
          return (
            <Step key={stepProps.label} {...stepProps}>
              <WeightSelectionForm />
            </Step>
          );
        })}
        <StepperFormActions />
      </Stepper>
    </div>
  );
}

const ModelFormSchema = z.object({
  modelType: z.string().min(1, {
    message: "Please select a model type.",
  }),
});

function ModelSelectionForm() {
  const { nextStep } = useStepper();
  const form = useForm({
    resolver: zodResolver(ModelFormSchema),
    defaultValues: {
      modelType: "",
    },
  });

  function onSubmit(data) {
    nextStep();
    toast({ title: "Model selected!" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="modelType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model Type</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="">Select a model</option>
                  <option value="Model1">Model 1</option>
                  <option value="Model2">Model 2</option>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

const WeightFormSchema = z.object({
  weight: z.string().min(1, {
    message: "Please enter a weight.",
  }),
});

function WeightSelectionForm() {
  const { nextStep } = useStepper();
  const form = useForm({
    resolver: zodResolver(WeightFormSchema),
    defaultValues: {
      weight: "",
    },
  });

  function onSubmit(data) {
    nextStep();
    toast({ title: "Weight specified!" });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                Enter the weight (in lbs or kg).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

function StepperFormActions() {
  const { prevStep, resetSteps, isLastStep } = useStepper();

  return (
    <div className="flex justify-end gap-2">
      <Button onClick={prevStep} variant="secondary">
        Previous
      </Button>
      <Button>{isLastStep ? "Finish" : "Next"}</Button>
    </div>
  );
}
