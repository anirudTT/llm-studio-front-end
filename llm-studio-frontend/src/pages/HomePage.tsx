import { ComboboxForm } from "../components/ComboboxForm";

const HomePage = () => {
  return (
    <>
      <div className="h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div
          className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white"
          style={{
            maskImage:
              "radial-gradient(ellipse at center, transparent 20%, black 100%)",
          }}
        ></div>
        <div className="flex flex-col h-full">
          <div className="flex flex-grow justify-center items-center w-full px-4 md:px-20 lg:px-40 xl:px-60">
            <ComboboxForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
