import { PiSpinner } from "react-icons/pi";
export default function Loading() {
  return (
    <div className="flex justify-center my-12">
      <PiSpinner className="animate-spin text-2xl" />
    </div>
  );
}
