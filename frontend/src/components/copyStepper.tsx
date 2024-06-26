"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { useEffect, useState } from "react";
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

const steps = [
  { label: "Step 1", description: "Model Selection" },
  { label: "Step 2", description: "Model Weight Selection" },
  { label: "Step 3", description: "Deploy Model" },  // New step added
];


function CustomWeightsStep() {
  const { nextStep } = useStepper();
  
  function handleCustomWeightConfig() {
    // Configuration logic here
    console.log("Custom weights configured.");
    nextStep();
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div>Configure your custom weights here.</div>
      <Button onClick={handleCustomWeightConfig}>Configure Weights</Button>
      <StepperFormActions />
    </div>
  );
}

export default function StepperDemo() {
  const [dynamicSteps, setDynamicSteps] = useState([
    { label: "Step 1", description: "Model Selection" },
    { label: "Step 2", description: "Model Weight Selection" },
    { label: "Step 3", description: "Deploy Model" },
  ]);

  // Adjust Stepper component to use dynamicSteps
  return (
    <div className="flex flex-col gap-4 w-3/4 mx-auto max-w-7xl px-4 md:px-8 pt-8 py-6">
      <Card className="h-auto py-4 px-6">
        <Stepper variant="circle-alt" initialStep={0} steps={dynamicSteps}>
          {dynamicSteps.map((stepProps, index) => {
            switch (index) {
              case 0:
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <FirstStepForm />
                  </Step>
                );
              case 1:
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <SecondStepForm setDynamicSteps={setDynamicSteps} />
                  </Step>
                );
              case 2:
                // The condition to render CustomWeightsStep dynamically
                if (stepProps.label === "Step 2.5") {
                  return (
                    <Step key={stepProps.label} {...stepProps}>
                      <CustomWeightsStep />
                    </Step>
                  );
                }
                return (
                  <Step key={stepProps.label} {...stepProps}>
                    <DeployModelStep />
                  </Step>
                );
              default:
                return null;
            }
          })}
          <div className="py-6">
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
    toast({
      title: "First step submitted!",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

function SecondStepForm({ setDynamicSteps }) {
  const { nextStep } = useStepper();
  const form = useForm<z.infer<typeof SecondFormSchema>>({
    resolver: zodResolver(SecondFormSchema),
    defaultValues: {
      weight: "",
    },
  });

  useEffect(() => {
    const subscription = form.watch((value, { name, type }) => {
      if (name === 'weight' && value.weight === 'Custom Weight') {
        setDynamicSteps(currentSteps => {
          const newSteps = [...currentSteps];
          if (!newSteps.find(step => step.label === "Step 2.5")) {
            newSteps.splice(2, 0, { label: "Step 2.5", description: "Custom Weight Configuration" });
          }
          return newSteps;
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch, setDynamicSteps]);

  function onSubmit(data: z.infer<typeof SecondFormSchema>) {
    nextStep();
    toast({
      title: "Second step submitted!",
    });
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a weight" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Default Weights">Default Weights</SelectItem>
                  <SelectItem value="Custom Weight">Custom Weight</SelectItem>
                  <SelectItem value="Fine-Tune Weights">Fine-Tune Weights</SelectItem>
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
          {/* Adjust the condition to exclude the finish button on the last interactive step */}
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
    // Add your deployment logic here
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
