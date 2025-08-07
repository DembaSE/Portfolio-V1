import { motion } from "framer-motion";
import experienceImg from '../Experience.png';
import outpost24Img from '../Outpost24.png';
import soolizyImg from '../soolizy.png';
import paIcon from "../PA-icon.png";
import './MyExperience.css'


export default function MyExperience() {
  const timelineItems = [
    {
      title: "Software Developer Intern at Outpost24",
      location: "Karlskrona, Sweden — 2024",
      icon: <img src={outpost24Img} alt="Outpost24 Logo" className="timeline-logo" />,
      link: "https://www.outpost24.com/",
      description: [
        "Assisted with vulnerability scanning tools",
        "Collaborated in Agile teams with security engineers",
        "Implemented UI features in JavaScript",
        "Implemented bulk editing features",
        "Contributed to unit testing"
      ],
    },
    {
      title: "Full Stack Developer Intern at Soolizi (Startup)",
      location: "Olemps Aveyron, France — 2020",
      icon: <img src={soolizyImg} alt="Soolizy Logo" className="timeline-logo" />,
      link: "https://souvenirs.soolizi.fr/", 
      description: [
        "Built Web App for an early-stage social media platform",
        "Designed backend with Node.js and MongoDB",
        "Implemented UI components with Vue.js",
      ],
    },
    {
      title: "Parental Alienation Assessment",
      location: "Kristianstad, Sweden — 2022",
      icon: <img src={paIcon} alt="Alienation App Logo" className="timeline-logo" />,
      link: "https://play.google.com/store/apps/details?id=com.hkr.paassessment", 
      description: [
        "Collaborated with Prof. Sverker Sikström (Cognitive Psychology)",
        "Built an app to identify parental alienation using AI analysis",
        "Implemented sentiment analysis to evaluate emotional tone",
        "Users input child-parent descriptors; warmth is scored",
        "Delivered Android application with Firebase database",
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
        <h2 className="glass-modal-title">My Software Experiences</h2>
        <img src={experienceImg} alt="icon" className="glass-title-icon" />
      </div>

      {/* Timeline Section */}
      <div className="timeline">
        {timelineItems.map((item, index) => (
          <motion.div
            className="timeline-item"
            key={index}
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {item.icon}
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="timeline-link-wrapper"
            >
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
            </a>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
