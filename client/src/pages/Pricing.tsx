import React from "react";
import { appPlans } from "../assets/assets";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios";

interface Plan {
  id: string;
  name: string;
  price: string;
  credits: number;
  description: string;
  features: string[];
  popular?: boolean;
}

const Pricing = () => {
  const { data: session } = authClient.useSession();
  const [plans] = React.useState<Plan[]>(appPlans);

  const handlePurchase = async (planId: string) => {
    try {
      if (!session?.user) return toast.message("Please login to continue");
      const { data } = await api.post("/api/user/purchase-credits", { planId });
      window.location.href = data.payment_link;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full max-w-5xl mx-auto z-20 max-md:px-4 min-h-[80vh]">
        <div className="flex justify-center mt-10">
          <span className="px-4 py-1 rounded-full text-xs font-semibold tracking-wider text-white bg-gradient-to-r from-indigo-500 to-purple-600 shadow-md">
            PRICING
          </span>
        </div>

        <div className="text-center mt-6">
          <h2 className="text-gray-100 text-3xl font-medium">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto mt-2">
            Start for free, then scale effortlessly as you grow. Choose the plan
            that fits your content creation journey.
          </p>
        </div>

        <div className="pt-14 py-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className={`
                  relative p-6 mx-auto w-full max-w-sm rounded-lg text-white shadow-lg transition-all duration-300
                  ${
                    plan.popular
                      ? "bg-indigo-950/40 ring-2 ring-indigo-500 scale-[1.03]"
                      : "bg-black/20 ring ring-indigo-950 hover:ring-indigo-500"
                  }
                `}
              >
                {plan.popular && (
                  <span
                    className="
                      absolute -top-3 left-1/2 -translate-x-1/2
                      rounded-full px-3 py-1 text-xs font-semibold text-white
                      bg-gradient-to-r from-indigo-500 to-purple-600
                      shadow-md
                    "
                  >
                    Most Popular
                  </span>
                )}

                <h3 className="text-xl font-bold">{plan.name}</h3>

                <div className="my-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-300">
                    {" "}
                    / {plan.credits} credits
                  </span>
                </div>

                <p className="text-gray-300 mb-6">{plan.description}</p>

                <ul className="space-y-1.5 mb-6 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-indigo-300 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan.id)}
                  className={`
                    w-full py-2 px-4 text-sm rounded-md transition-all active:scale-95
                    ${
                      plan.popular
                        ? "bg-indigo-600 hover:bg-indigo-700"
                        : "bg-indigo-500 hover:bg-indigo-600"
                    }
                  `}
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto text-center text-sm max-w-md mt-10 text-white/60 font-light">
          Each <span className="text-white">project creation or revision</span>{" "}
          consumes <span className="text-white">5 credits</span>. You can
          purchase additional credits anytime as your needs grow.
        </div>
      </div>
    </>
  );
};

export default Pricing;
