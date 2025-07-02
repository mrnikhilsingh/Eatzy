const Contact = () => {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-gray-50 px-4 py-12">
      <h1 className="mb-4 text-4xl font-bold text-orange-600">Contact Us</h1>
      <p className="mb-6 max-w-xl text-center text-lg text-gray-700">
        Have questions, feedback, or need help? Fill out the form below or reach
        out to us directly.
      </p>
      <form
        netlify
        name="Eatzy-Contact-Form"
        method="POST"
        className="w-full max-w-md space-y-4 rounded-lg bg-white p-6 shadow-md"
      >
        <div>
          <label className="mb-1 block font-semibold text-gray-700">Name</label>
          <input
            name="name"
            type="text"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            placeholder="Your name"
            required
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            placeholder="you@example.com"
            required
          />
        </div>
        <div>
          <label className="mb-1 block font-semibold text-gray-700">
            Message
          </label>
          <textarea
            name="message"
            className="w-full rounded border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-orange-400 focus:outline-none"
            rows={4}
            placeholder="Your message"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full rounded bg-orange-600 py-2 font-bold text-white transition hover:bg-orange-700"
        >
          Send Message
        </button>
      </form>
      <div className="mt-8 text-center text-gray-500">
        <p>
          <span className="font-semibold">Email:</span> contact@example.com
        </p>
        <p>
          <span className="font-semibold">Phone:</span> (123) 456-7890
        </p>
      </div>
    </div>
  );
};

export default Contact;
