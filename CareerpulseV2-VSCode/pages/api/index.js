import WaitlistForm from "../components/WaitlistForm";

export default function Home() {
  return (
    <div className="text-center py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
      <h1 className="text-5xl font-extrabold text-rose-400">Elevate Your Career with MyRise</h1>
      <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
        A personalized platform to track your career growth, gain insights, and stand out in your industry.
      </p>
      
      {/* Embed the Waitlist Form Component Here */}
      <WaitlistForm />
    </div>
  );
}
