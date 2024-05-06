import { ComboboxForm } from "../components/ComboboxForm";

const HomePage = () => {
  return (
    <div>
      <div className="flex flex-col h-screen">
        <div className="flex flex-grow justify-center items-center">
          <ComboboxForm />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
