import { motion } from "framer-motion";
import educationImg from '../Education.png';
import bthLogo from '../bthLogo.png'; // Ideally replace with real BTH logo
import hkrLogo from '../hkrLogo.png'; // Ideally replace with real HKR logo
import ut1Logo from '../ut1Logo.png'; // Ideally replace with real HKR logo
import './MyEducation.css';

export default function MyEducation() {
  const educationItems = [
    {
      title: "Master of Science – Software Engineering",
      location: "Blekinge Institute of Technology, Sweden — 2025",
      icon: <img src={bthLogo} alt="BTH Logo" className="timeline-logo" />,
      description: [
        "Specialized in software architecture and scalable software design systems, Agile methodologies",
        "Thesis on Optimizing Startup Software Product Development through Generative AI.",
    ],
    },
    {
      title: "Bachelor of Science – Computer Science",
      location: "Kristianstad University, Sweden — 2023",
      icon: <img src={hkrLogo} alt="HKR Logo" className="timeline-logo" />,
      description: [
        "Studied software development, data structures, big data, computer security.",
        "Thesis : Distinguishing Human from Softbot on the Internet: A Machine Learning approach to solve CAPTCHA.",
      ],
    },
    {
      title: "DUT Informatique",
      location: "Université Toulouse 1 Capitole, France — 2020",
      icon: <img src={ut1Logo} alt="Toulouse Logo" className="timeline-logo" />,
      description: [
        "Two-year technical degree focusing on practical software development.",
        "Learned C, Java, databases, and system design in a hands-on environment.",
      ],
    },
    {
      title: "Baccalauréat Économique et Sociale (ES) – Section Européenne Anglais, Mention Assez Bien",
      location: "Lycée les 7 Mares, Maurepas, France — 2017",
      icon: <img src={educationImg} alt="Bac Logo" className="timeline-logo" />,
      description: [
        "Graduated with a focus on economics, languages, maths and social sciences.",
      ],
    },
  ];

  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-modal-contentEX"
    >
      <div className="glass-title-wrapper">
        <h2 className="glass-modal-title">My Education</h2>
        <img src={educationImg} alt="Education Icon" className="glass-title-icon" />
      </div>

      <div className="timeline">
        {educationItems.map((item, index) => (
          <motion.div
            className="timeline-item"
            key={index}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {item.icon}
            <div className="timeline-content">
              <h3>{item.title}</h3>
              <p><strong>{item.location}</strong></p>
              <p>
                {item.description.map((line, i) => (
                  <span key={i}>
                    • {line}
                    <br />
                  </span>
                ))}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
