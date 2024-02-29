import React from "react";

function Features({ features }) {
  return (
    <section className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold mb-8">Our Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features ? (
          features.map((feature) => (
            <div key={feature.id} className="p-4 bg-white rounded-lg shadow-md">
              <i className="fas fa-check-circle text-green-500 text-2xl mb-2"></i>
              <h3 className="text-lg font-medium">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No features available</p>
        )}
      </div>
    </section>
  );
}

export default Features;
