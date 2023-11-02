const gradientOptions = [
  "from-red-300 via-red-500 to-red-400",
  "from-purple-300 via-purple-500 to-purple-400",
  "from-blue-300 via-blue-500 to-blue-400",
  "from-yellow-300 via-yellow-500 to-yellow-400",
  "from-orange-300 via-orange-500 to-orange-400",
  "from-primary-300 via-primary-500 to-primary-400",
];

export const GradientGen = ({ parentStyle, children }) => {
  const randomIndex = Math.floor(Math.random() * gradientOptions.length);
  return (
    <div className={`${parentStyle} ${gradientOptions[randomIndex]}`}>
      {children}
    </div>
  );
};
