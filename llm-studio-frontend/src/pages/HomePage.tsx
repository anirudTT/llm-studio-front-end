import { ComboboxForm } from "../components/ComboboxForm";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-grow justify-center items-center w-full px-4 md:px-20 lg:px-40 xl:px-60">
          <ComboboxForm />
        </div>
      </div>
    </>
  );
};

export default HomePage;
