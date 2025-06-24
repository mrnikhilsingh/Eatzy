const About = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold text-orange-600">About Us</h1>
      <p className="mb-6 max-w-2xl text-center text-lg text-gray-700">
        Welcome to <span className="font-semibold text-orange-600">Eatzy</span>,
        a Swiggy Clone! We are passionate about bringing delicious food from
        your favorite restaurants right to your doorstep. Our mission is to make
        food ordering fast, easy, and enjoyable for everyone.
      </p>
      <div className="mb-8 max-w-2xl text-center text-gray-600">
        <p>
          <strong>Why choose us?</strong>
        </p>
        <ul className="mt-2 list-inside list-disc text-left">
          <li>Wide selection of restaurants and cuisines</li>
          <li>Fast and reliable delivery</li>
          <li>Easy-to-use ordering platform</li>
          <li>Secure payment options</li>
          <li>Friendly customer support</li>
        </ul>
      </div>
      <div className="text-gray-500">
        <p>
          <span className="font-semibold">Contact:</span>{" "}
          support@swiggyclone.com
        </p>
        <p>
          <span className="font-semibold">Location:</span> India
        </p>
      </div>
    </div>
  );
};

export default About;
