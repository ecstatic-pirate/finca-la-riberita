export default function Packages() {
  const packages = [
    {
      name: 'Intimate',
      price: '$5,000',
      guests: 'Up to 50 guests',
      features: [
        'Garden ceremony location',
        'Reception in the Conservatory',
        '4-hour venue rental',
        'Basic floral arrangements',
        'Complimentary bridal suite',
        'Event coordinator'
      ]
    },
    {
      name: 'Classic',
      price: '$10,000',
      guests: 'Up to 150 guests',
      features: [
        'Choice of ceremony location',
        'Grand Ballroom reception',
        '8-hour venue rental',
        'Premium floral arrangements',
        'Complimentary bridal suite',
        'Dedicated event team',
        'Dance floor & lighting',
        'Valet parking'
      ],
      popular: true
    },
    {
      name: 'Luxury',
      price: '$20,000',
      guests: 'Up to 300 guests',
      features: [
        'Exclusive venue access',
        'Multiple event spaces',
        'Full weekend rental',
        'Custom floral design',
        'Luxury bridal suite',
        'Full event planning team',
        'Premium catering options',
        'Live music coordination',
        'Fireworks display',
        'Guest accommodation discounts'
      ]
    }
  ];

  return (
    <section id="packages" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif text-gray-900 mb-4">Wedding Packages</h2>
          <p className="text-lg text-gray-600">
            Choose the perfect package for your special day
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`rounded-lg shadow-lg overflow-hidden ${
                pkg.popular ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              {pkg.popular && (
                <div className="bg-primary-500 text-white text-center py-2 text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <div className="bg-white p-8">
                <h3 className="text-2xl font-serif text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-4xl font-bold text-primary-600 mb-2">{pkg.price}</p>
                <p className="text-gray-600 mb-6">{pkg.guests}</p>
                
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block text-center py-3 px-6 rounded-md transition-colors ${
                    pkg.popular
                      ? 'bg-primary-500 text-white hover:bg-primary-600'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  }`}
                >
                  Choose Package
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            All packages can be customized to meet your specific needs.{' '}
            <a href="#contact" className="text-primary-600 hover:text-primary-700">
              Contact us
            </a>{' '}
            for more information.
          </p>
        </div>
      </div>
    </section>
  );
}