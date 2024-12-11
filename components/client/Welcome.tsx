const Welcome = ({user}:{user:User}) => {
  const time = new Date().getHours();

  let greeting;
  if (time < 12) {
    greeting = "Good morning";
  } else if (time < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  greeting += ". Let's make today productive!";

  return (
    <div className="bg-white shadow-md rounded-xl p-6 border border-gray-100">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
        Welcome back, <span className="text-emerald-500">{user?.name}</span>
      </h1>
      <p className="text-xl font-medium tracking-wide bg-gradient-to-r from-blue-500 via-teal-400 to-gray-300 bg-clip-text text-transparent">
        {greeting}
      </p>
    </div>
  );
};

export default Welcome;
