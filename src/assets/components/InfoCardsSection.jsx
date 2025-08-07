import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';
import MyProjects from './MyProjects';
import './InfoCardsSection.css';
import projectImg from '../Projects.png';
import experienceImg from '../Experience.png';
import educationImg from '../Education.png';
import contactImg from '../Contact2.png';
import MyEducation from './MyEducation.jsx';
import MyContact from './MyContact.jsx';
import MyExperience from './MyExperience.jsx';


export default function InfoCardsSection() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [modalContent, setModalContent] = useState(null);
  const [modalType, setModalType] = useState(null);

  const closeModal = () => {
    setModalContent(null);
    setModalType(null);
  };

  return (
    <div ref={ref} className="info-cards-container">
      {/* First Row */}
      <div className="row">
        {/* My Projects Card */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.09 }}
          onClick={() => {
            setModalContent(<MyProjects />);
            setModalType("project");
          }}
        >
          <div className="card-text">
            <h2>My Projects</h2>
            <p>Explore some of the projects I've worked on.</p>
          </div>
          <img src={projectImg} alt="Projects Icon" className="card-icon" />
        </motion.div>

        {/* Experience Card */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.09 }}
          onClick={() => {
            setModalContent(<MyExperience />);
            setModalType("experience");
          }}
        >
          <div className="card-text">
            <h2>Experience</h2>
            <p>Learn about my professional experiences in the industry.</p>
          </div>
          <img src={experienceImg} alt="Experience Icon" className="card-icon" />
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="row" style={{ marginTop: '20px' }}>
        {/* Education Card */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.09 }}
          onClick={() => {
            setModalContent(<MyEducation />);
            setModalType("education");
          }}
        >
          <div className="card-text">
            <h2>Education</h2>
            <p>Details about my academic background and learning journey.</p>
          </div>
          <img src={educationImg} alt="Education Icon" className="card-icon" />
        </motion.div>

        {/* Contact Me Card */}
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 1.09 }}
          onClick={() => {
            setModalContent(<MyContact />);
            setModalType("contact");
          }}
        >
          <div className="card-text">
            <h2>Contact Me</h2>
            <p>Get in touch with me for collaborations or inquiries.</p>
          </div>
          <img src={contactImg} alt="Contact Icon" className="card-icon" />
        </motion.div>
      </div>

      {/* Modal Display */}
      <AnimatePresence>
        {modalContent && (
          <>
            <motion.div
              key="overlay"
              className="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={closeModal}
            />
           <motion.div
              key="modal"
              className={
                modalType === "experience" ? "modal modal-experience"
                : modalType === "contact" ? "modal modal-contact"
                : modalType === "education" ? "modal modal-education"
                : modalType === "project" ? "modal modal-project"
                : "modal"
              }
              initial={{ opacity: 0, scale: 0.95, y: -30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              {modalContent}
              <button onClick={closeModal} className="close-button">
                Close
              </button>
            </motion.div>

          </>
        )}
      </AnimatePresence>
    </div>
  );
}
