import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { useGetGameByIdQuery } from "../api/gamesApi";

const deliveryMethods = [
  {
    id: 1,
    title: "Standard",
    turnaround: "4–10 business days",
    price: "$5.00",
  },
  {
    id: 2,
    title: "Express",
    turnaround: "2–5 business days",
    price: "$16.00",
  },
];

const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function CheckoutForm({ gameId }) {
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState(
    deliveryMethods[0]
  );
  const { data: gameData, error: gameError } = useGetGameByIdQuery(gameId);

  if (gameError) {
    return <div>Error: {gameError.message}</div>;
  }

  return (
    <div className="bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>
              {/* Your contact form inputs go here */}
            </div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>
              {/* Your shipping form inputs go here */}
            </div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <RadioGroup
                value={selectedDeliveryMethod}
                onChange={setSelectedDeliveryMethod}
              >
                {/* Your delivery method options go here */}
              </RadioGroup>
            </div>
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>
              {/* Your payment method options go here */}
            </div>
          </div>
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>
            <p>{gameData ? gameData.title : "Loading..."}</p>
            {/* You can display other order summary details here */}
          </div>
        </form>
      </div>
    </div>
  );
}
