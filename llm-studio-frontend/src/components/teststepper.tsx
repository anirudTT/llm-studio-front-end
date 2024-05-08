"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Input, Select } from "./ui/input"; // Ensure you have a Select component.
import { Step, Stepper, useStepper } from "./ui/stepper";
import { toast } from "./ui/use-toast";

const steps = [
  { label: "Step 1", description: "Select a Model" },
  { label: "Step 2", description: "Select a Weight" },
  { label: "Step 3", description: "Deploy Configuration" },
];

export default function StepperDemo() {
  return (
    <div className="flex w-full flex-col gap-4">
      <Stepper variant="circle-alt" initialStep={0} steps={steps}>
        {steps.map((stepProps, index) => {
          let StepComponent;
          switch (index) {
            case 0:
              StepComponent = ModelSelectionForm;
              break;
            case 1:
              StepComponent = WeightSelectionForm;
              break;
            case 2:
              StepComponent = DeploymentStep;
              break;
            default:
              StepComponent = null;
          }

          return (
            <Step key={stepProps.label} {...stepProps}>
              <StepComponent />
            </Step>
          );
        })}
        <MyStepperFooter />
      </Stepper>
    </div>
  );
}

const modelSchema = z.object({
  model: z.string().min(1, "Please select a model."),
});

function ModelSelectionForm() {
  const { nextStep } = useStepper();
  const form = useForm({
    resolver: zodResolver(modelSchema),
    defaultValues: { model: "" },
  });

  const onSubmit = (data) => {
    nextStep();
    toast({
      title: "Model selected!",
      description: data.model,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="model"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Model</FormLabel>
              <FormControl>
                <Select {...field}>
                  <option value="">Select a model</option>
                  <option value="Falcon-40B">Falcon-40B</option>
                  <option value="Lama-2-70B">Lama-2-70B</option>
                  <option value="Mixtral-7x8b">Mixtral-7x8b</option>
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

const weightSchema = z.object({
  weight: z.string().min(1, "Please select a weight."),
});

function WeightSelectionForm() {
  const { nextStep } = useStepper();
  const form = useForm({
    resolver: zodResolver(weightSchema),
    defaultValues: { weight: "" },
  });

  const onSubmit = (data) => {
    nextStep();
    toast({
      title: "Weight selected!",
      description: data.weight,
    });
  };

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
                <Select {...field}>
                  <option value="">Select a weight</option>
                  <option value="Default Weights">Default Weights</option>
                  <option value="Custom Weight">Custom Weight</option>
                  <option value="Fine-Tune Weights">Fine-Tune Weights</option>
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

function DeploymentStep() {
  const { resetSteps } = useStepper();
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <Button
        onClick={() => {
          toast({
            title: "Deployment initiated!",
            description: "Your configuration is being deployed.",
          });
          resetSteps();
        }}
      >
        Deploy
      </Button>
    </div>
  );
}

function MyStepperFooter() {
  const { resetSteps } = useStepper();
  return (
    <div className="flex items-center justify-end gap-2">
      <Button onClick={resetSteps}>Reset Stepper</Button>
    </div>
  );
}
