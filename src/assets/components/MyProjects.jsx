import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./MyProjects.css";
import paIcon from "../PA-icon.png";
import neoIcon from "../neo-icon.png";
import glassIcon from "../glass-icon.png";
import DiscoveryIcon from "../Discovery-icon.png";
import projectImg from "../Projects.png";
import glassDescription from "../glassDescription.png";
import discoveryDescription from "../discoveryDescription.png";
import neoDescription from "../neoDescription.png";
import paDescription from "../paDescription.png";

// Card component
const ProjectCard = ({ imageUrl, title, description, imageHeight = "auto", onClick }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="glass-project-card" onClick={onClick}>
      <div className="image-wrapper">
        <img src={imageUrl} alt={title} className="glass-project-image" style={{ height: imageHeight }} />
      </div>
      <h3 className="glass-project-title">{title}</h3>
      <p className="glass-project-description">{description}</p>
    </motion.div>
  );
};

// Animation variants for left/right transitions
const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
};

// Main component
const MyProjects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [direction, setDirection] = useState(1);

  const handleSelect = (project) => {
    setDirection(1);
    setSelectedProject(project);
  };

  const handleBack = () => {
    setDirection(-1);
    setSelectedProject(null);
  };

  const projects = [
    {
      title: "Smart Home Dashboard",
      description: "A web app that lets you control your smart home devices in real time with data visualization.",
      imageUrl: glassIcon,
      imageHeight: "170px",
      technologies: ["JavaScript", "HTML", "CSS", "Figma"],
      customDescription:
        "A modern dashboard interface for managing IoT devices, built with interactive UI components and designed for real-time device control. The project required a physical Raspberry Pi for device communication and connectivity.",
      detailImageUrl: glassDescription,
      exploreUrl: "https://software-engineering-g3.github.io/Web-App/",
    },
    {
      title: "Discovery Cinema",
      description: "A React-based cinema booking app allowing users to browse movies and reserve seats online.",
      imageUrl: DiscoveryIcon,
      imageHeight: "130px",
      technologies: ["React", "MangoDB", "CSS", "Node.js"],
      customDescription:
        "Discovery Cinema is a responsive web app built with React.js that simplifies movie ticket booking for users and cinema management for administrators. Users can easily log in, browse films, and book tickets. Admins can manage movies, users, and schedules through a clean dashboard. Originally connected to a Firebase database (now inactive), the app used JWT authentication and MongoDB for secure data handling. The project focused on responsive design, user experience, and admin functionality.",
      detailImageUrl: discoveryDescription,
      exploreUrl: "https://discovery-cinema.vercel.app/",
    },
    {
      title: "Neo Box Project",
      description: "A design-focused project exploring 3D product packaging and branding presentation.",
      imageUrl: neoIcon,
      imageHeight: "110px",
      technologies: ["HTML", "CSS", "Figma", "Blender"],
      customDescription:
        "This project was created as a hands-on exercise to practice HTML, CSS, 3D design with Blender, and UI layout using Figma. The concept involved rethinking the traditional headphone box by designing a round-shaped packaging to match round headphones, focusing on aesthetics, usability, and efficient space usage.",
      detailImageUrl: neoDescription,
      exploreUrl: "https://neo-box.vercel.app/",
    },
    {
      title: "Parental Alienation Assessment",
      description: "An Android app to assess signs of parental alienation through behavior checklists.",
      imageUrl: paIcon,
      imageHeight: "150px",
      technologies: ["Kotlin", "Firebase", "Android Studio"],
      customDescription:
        "As part of a school project in collaboration with Professor Sverker Sikström, Chair of the Cognitive Division at the Department of Psychology at Lund University, Sweden, this app was developed to support research into parental alienation—a phenomenon in which a child suddenly rejects a previously loved parent without a valid reason, often due to psychological manipulation by the other parent. The app employs an algorithm-based sentiment analysis to evaluate the emotional warmth in how children describe each of their parents. By inputting descriptive words or phrases, the app analyzes the emotional tone to help detect potential signs of alienation.",
      detailImageUrl: paDescription,
      exploreUrl: "https://play.google.com/store/apps/details?id=com.hkr.paassessment",
    },
  ];

 return (
  <motion.div
    initial={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.3 }}
    className="glass-modal-content"
  >
    <div className="glass-title-wrapper">
      <h2 className="glass-modal-title">{selectedProject ? selectedProject.title : "My Projects"}</h2>
      <img
        src={selectedProject ? selectedProject.imageUrl : projectImg}
        alt="icon"
        className="glass-title-icon"
      />
    </div>

    {/* Scrollable content wrapper */}
    <div className="glass-scrollable-container">
      <AnimatePresence mode="wait" custom={direction}>
        {selectedProject ? (
          <motion.div
            key="detail"
            className="glass-project-detail-row"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <div className="glass-detail-image-wrapper">
              <img
                src={selectedProject.detailImageUrl}
                alt={`${selectedProject.title} detail`}
                className="glass-detail-image"
              />
            </div>

            <div className="glass-detail-content">
              <div className="glass-detail-section">
                <h3 className="glass-section-title">Description:</h3>
                <p className="glass-project-description2">{selectedProject.customDescription}</p>
              </div>
              <div className="glass-detail-section">
                <h3 className="glass-section-title">Language and Framework:</h3>
                <div className="glass-tech-tags">
                  {selectedProject.technologies.map((tech, i) => (
                    <span className="glass-tech-pill" key={i}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <button
                className="glass-explore-button"
                onClick={() =>
                  window.open(selectedProject.exploreUrl, "_blank", "noopener,noreferrer")
                }
              >
                Explore Project
              </button>
            </div>

            <button className="glass-return-button" onClick={handleBack}>
              ← All projects
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="grid"
            className="glass-projects-grid"
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                imageUrl={project.imageUrl}
                title={project.title}
                description={project.description}
                imageHeight={project.imageHeight}
                onClick={() => handleSelect(project)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  </motion.div>
);


};

export default MyProjects;
