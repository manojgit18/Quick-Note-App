import { ZapIcon } from "lucide-react";

const RateLimitedUI = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-orange-50 border border-orange-200 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center p-6">
          <div className="bg-orange-100 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
            <ZapIcon className="size-10 text-orange-500" />
          </div>

          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold text-orange-800 mb-2">
              Rate Limit Reached
            </h3>

            <p className="text-orange-900 mb-1">
              You've made too many requests in a short time.
            </p>

            <p className="text-sm text-orange-900/70">
              Please wait a few seconds and try again.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitedUI;
