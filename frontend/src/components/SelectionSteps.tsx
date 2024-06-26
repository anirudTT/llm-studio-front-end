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
  addFineTuneStep: () => void;
  removeDynamicSteps: () => void;
}

export default function StepperDemo() {
  const [steps, setSteps] = useState([
    { label: "Step 1", description: "Model Selection" },
    { label: "Step 2", description: "Model Weight Selection" },
    { label: "Step 3", description: "Deploy Model" },
  ]);

  const addCustomStep = () => {
    setSteps((prevSteps) => {
      const customStepIndex =
        prevSteps.findIndex((step) => step.label === "Step 2") + 1;
      const customStep = {
        label: "Custom Step",
        description: "Upload Custom Weights",
      };
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

  const removeDynamicSteps = () => {
    setSteps((prevSteps) =>
      prevSteps.filter(
        (step) =>
          step.label !== "Custom Step" && step.label !== "Fine-Tune Step"
      )
    );
  };

  return (
    <div className="flex flex-col gap-8 w-3/4 mx-auto max-w-7xl px-4 md:px-8 pt-10 py-6">
      <Card className="h-auto py-8 px-16 ">
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
                      removeDynamicSteps={removeDynamicSteps}
                    />
                  </Step>
                );
              case "Custom Step":
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <div className="flex flex-col items-center w-full justify-center ">
                      <UploadDialog />
                      <StepperFormActions
                        removeDynamicSteps={removeDynamicSteps}
                      />
                    </div>
                  </Step>
                );
              case "Fine-Tune Step":
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <div className="flex flex-col items-center w-full justify-center p-10">
                      <Button
                        onClick={() =>
                          console.log("Link to Fine Tuner activated")
                        }
                      >
                        Link to Fine Tuner
                      </Button>
                    </div>
                    <StepperFormActions
                      removeDynamicSteps={removeDynamicSteps}
                    />
                  </Step>
                );
              case "Step 3":
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <DeployModelStep removeDynamicSteps={removeDynamicSteps} />
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
            <FormItem className="w-full mb-4 p-8">
              <FormLabel className="text-lg font-semibold text-gray-800 dark:text-white ">
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
        <StepperFormActions removeDynamicSteps={() => {}} />
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
  removeDynamicSteps,
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
    if (data.weight === "Default Weights") {
      removeDynamicSteps();
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
            <FormItem className="w-full mb-4 p-8">
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
                  if (value === "Default Weights") {
                    removeDynamicSteps();
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
        <StepperFormActions removeDynamicSteps={removeDynamicSteps} />
      </form>
    </Form>
  );
}

function StepperFormActions({
  removeDynamicSteps,
}: {
  removeDynamicSteps: () => void;
}) {
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

  const customPrevStep = () => {
    const currentStepLabel = steps[activeStep]?.label;
    if (
      currentStepLabel === "Custom Step" ||
      currentStepLabel === "Fine-Tune Step"
    ) {
      removeDynamicSteps();
    }
    prevStep();
  };

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
            onClick={customPrevStep}
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

function DeployModelStep({
  removeDynamicSteps,
}: {
  removeDynamicSteps: () => void;
}) {
  const { nextStep, resetSteps } = useStepper();

  function handleDeploy() {
    console.log("Model deployment started.");
    toast({
      title: "Deployment initiated!",
    });
    nextStep();
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center p-10">
        <Button onClick={handleDeploy}>Deploy Model</Button>
      </div>
      <StepperFormActions removeDynamicSteps={removeDynamicSteps} />
    </>
  );
}

function MyStepperFooter() {
  const { activeStep, resetSteps, steps } = useStepper();

  if (activeStep !== steps.length) {
    return null;
  }

  return (
    <div className="flex items-center justify-end gap-4 p-2">
      <Button onClick={resetSteps}>Reset and Begin Again</Button>
      <Button>Last Button</Button>
    </div>
  );
}
