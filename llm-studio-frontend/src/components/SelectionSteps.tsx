"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Card } from "./ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Step, Stepper, useStepper } from "./ui/stepper";
import { toast } from "./ui/use-toast";
import { useState } from "react";
import UploadDialog from "./UploadDialog";
interface SecondStepFormProps {
  addCustomStep: () => void;
  addFineTuneStep: () => void; // Add this line
}

export default function StepperDemo() {
  const [steps, setSteps] = useState([
    { label: "Step 1", description: "Model Selection" },
    { label: "Step 2", description: "Model Weight Selection" },
    { label: "Step 3", description: "Deploy Model" },
  ]);

  // Function to add a custom step dynamically at the correct position
  const addCustomStep = () => {
    setSteps((prevSteps) => {
      // Use a functional update to ensure you're working with the most recent state
      const customStepIndex =
        prevSteps.findIndex((step) => step.label === "Step 2") + 1;
      const customStep = {
        label: "Custom Step",
        description: "Upload Custom Weights",
      };

      // Check if the "Custom Step" already exists to avoid duplicates
      if (!prevSteps.some((step) => step.label === "Custom Step")) {
        return [
          ...prevSteps.slice(0, customStepIndex),
          customStep,
          ...prevSteps.slice(customStepIndex),
        ];
      }
      return prevSteps;
    });
  };

  const addFineTuneStep = () => {
    setSteps((prevSteps) => {
      // Use a functional update for state
      const fineTuneStepIndex = prevSteps.findIndex(
        (step) => step.label === "Step 3"
      );
      const fineTuneStep = {
        label: "Fine-Tune Step",
        description: "Link to Fine Tuner",
      };
      if (!prevSteps.some((step) => step.label === "Fine-Tune Step")) {
        return [
          ...prevSteps.slice(0, fineTuneStepIndex),
          fineTuneStep,
          ...prevSteps.slice(fineTuneStepIndex),
        ];
      }
      return prevSteps;
    });
  };

  return (
    <div className="flex flex-col gap-8 w-3/4 mx-auto max-w-7xl px-4 md:px-8 pt-10 py-6">
      <Card className="h-auto py-8 px-10 ">
        <Stepper variant="circle-alt" initialStep={0} steps={steps}>
          {steps.map((stepProps) => {
            switch (stepProps.label) {
              case "Step 1":
                return (
                  <Step key={stepProps.label} {...stepProps} className="mb-8">
                    <FirstStepForm />
                  </Step>
                );
              case "Step 2":
                return (
                  <Step key={stepProps.label} {...stepProps} className="mb-8">
                    <SecondStepForm
                      addCustomStep={addCustomStep}
                      addFineTuneStep={addFineTuneStep}
                    />
                  </Step>
                );
              case "Custom Step":
                return (
                  <Step key={stepProps.label} {...stepProps} className="mb-8">
                    <div className="flex flex-col items-center w-full justify-center ">
                      <UploadDialog />
                      <StepperFormActions />
                    </div>
                  </Step>
                );
              case "Fine-Tune Step":
                return (
                  <Step key={stepProps.label} {...stepProps} className="mb-8">
                    <div className="flex flex-col items-center w-full justify-center">
                      <Button
                        onClick={() =>
                          console.log("Link to Fine Tuner activated")
                        }
                      >
                        Link to Fine Tuner
                      </Button>
                      <StepperFormActions />
                    </div>
                  </Step>
                );
              case "Step 3":
                return (
                  <Step key={stepProps.label} {...stepProps} className="mb-8">
                    <DeployModelStep />
                  </Step>
                );
              default:
                return null;
            }
          })}
          <div className="py-12">
            <MyStepperFooter />
          </div>
        </Stepper>
      </Card>
    </div>
  );
}

//TODO: refactor to include these are its own components
const FirstFormSchema = z.object({
  model: z.string().nonempty("Please select a model."),
});

function FirstStepForm() {
  const { nextStep } = useStepper();

  const form = useForm<z.infer<typeof FirstFormSchema>>({
    resolver: zodResolver(FirstFormSchema),
    defaultValues: {
      model: "",
    },
  });

  function onSubmit(data: z.infer<typeof FirstFormSchema>) {
    nextStep();
    console.log("First step submitted!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
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
              <FormMessage className="text-red-500 dark:text-red-300" />
            </FormItem>
          )}
        />
        <StepperFormActions />
      </form>
    </Form>
  );
}

const SecondFormSchema = z.object({
  weight: z.string().nonempty("Please select a weight."),
});

function SecondStepForm({
  addCustomStep,
  addFineTuneStep,
}: SecondStepFormProps) {
  const { nextStep } = useStepper();
  const form = useForm<z.infer<typeof SecondFormSchema>>({
    resolver: zodResolver(SecondFormSchema),
    defaultValues: {
      weight: "",
    },
  });

  function onSubmit(data: z.infer<typeof SecondFormSchema>) {
    if (data.weight === "Custom Weight") {
      addCustomStep();
    }
    if (data.weight === "Fine-Tune Weights") {
      addFineTuneStep();
    }
    nextStep();
    console.log("Second step submitted!");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem className="w-full mb-4">
              <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white">
                Weight
              </FormLabel>
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  if (value === "Custom Weight") {
                    addCustomStep();
                  }
                  if (value === "Fine-Tune Weights") {
                    addFineTuneStep();
                  }
                }}
                defaultValue={field.value}
              >
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
        <StepperFormActions />
      </form>
    </Form>
  );
}

function StepperFormActions() {
  const {
    prevStep,
    nextStep,
    resetSteps,
    isDisabledStep,
    hasCompletedAllSteps,
    isLastStep,
    isOptionalStep,
    activeStep,
    steps,
  } = useStepper();

  return (
    <div className="w-full flex justify-end gap-2">
      {hasCompletedAllSteps ? (
        <Button size="sm" onClick={resetSteps}>
          Reset
        </Button>
      ) : (
        <>
          <Button
            disabled={isDisabledStep || activeStep === 0}
            onClick={prevStep}
            size="sm"
            variant="secondary"
          >
            Prev
          </Button>
          {activeStep < steps.length - 1 && (
            <Button size="sm" onClick={nextStep}>
              {isOptionalStep ? "Skip" : "Next"}
            </Button>
          )}
        </>
      )}
    </div>
  );
}

function DeployModelStep() {
  const { nextStep, resetSteps } = useStepper();

  function handleDeploy() {
    console.log("Model deployment started.");
    toast({
      title: "Deployment initiated!",
    });
    nextStep();
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Button onClick={handleDeploy}>Deploy Model</Button>
      <StepperFormActions />
    </div>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-4">
      <Button onClick={resetSteps}>Reset and Begin Again</Button>
      <Button>Click me</Button>
    </div>
  );
}
