import { motion } from 'framer-motion';
import './MyContact.css';
import mailIcon from '../contactMail.png';
import mailIcon2 from '../mail.png';
import githubIcon from '../github.png';

export default function MyContact() {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-modal-contentEX"
    >
      <div className="glass-title-wrapper">
        <h2 className="glass-modal-title">Contact Me</h2>
        <img src={mailIcon} alt="Mail sa Icon" className="glass-title-icon" />
      </div>

      <div className="simple-contact-list">
        <div className="contact-item">
          <img src={mailIcon2} alt="Email" />
          <a href="mailto:kaned308@gmail.com">kaned308@gmail.com</a>
        </div>
        <div className="contact-item">
          <img src={githubIcon} alt="GitHub" />
          <a href="https://github.com/DembaSE" target="_blank" rel="noopener noreferrer">
            github.com/DembaSE
          </a>
        </div>
      </div>
    </motion.div>
  );
}
