import PropTypes from "prop-types";

const CircularProgress = ({ clients, totalClients, isLevelThree }) => {
  const percentage = (clients / totalClients) * 100;
  const radius = 50;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Fonction pour interpoler la couleur du vert au rouge
  const interpolateColor = (percent) => {
    if (isLevelThree && percent === 100) {
      return "green";
    }
    const r = Math.floor((255 * percent) / 100);
    const g = Math.floor((255 * (100 - percent)) / 100);
    return `rgb(${r},${g},0)`;
  };

  const strokeColor = interpolateColor(percentage);

  return (
    <svg height={radius * 2} width={radius * 2} className="circular-progress">
      <circle
        stroke="lightgray"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <text x="50%" y="50%" dy=".3em" textAnchor="middle" fill="black">
        {`${Math.round(percentage)}%`}
      </text>
    </svg>
  );
};

CircularProgress.propTypes = {
  clients: PropTypes.number.isRequired,
  totalClients: PropTypes.number.isRequired,
  isLevelThree: PropTypes.bool.isRequired,
};

export default CircularProgress;
