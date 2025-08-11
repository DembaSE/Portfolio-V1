import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import DembaImage from '../Demba.jpg';
import './WelcomeSection.css';

const fullText = `$ Hello World! 🌎 🚀
I'm Demba, a junior software engineer with a passion for elegant design and intelligent systems. Recently graduated with an MSc in Software Engineering from Sweden, I specialize in UI/UX, front-end development, and mobile development. With a strong interest in Artificial Intelligence, Machine Learning, and a focus on design, I love crafting experiences that are both functional and human-centered.

Let’s build something great and beautiful ✨!`;

export default function WelcomeSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  const [typedText, setTypedText] = useState('');
  const [doneTyping, setDoneTyping] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let index = 0;
    const typeInterval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index === fullText.length) {
        clearInterval(typeInterval);
        setDoneTyping(true);
      }
    }, 20);

    return () => clearInterval(typeInterval);
  }, [inView]);

  useEffect(() => {
    if (!doneTyping) return;
    const cursor = document.getElementById('terminal-cursor');
    if (cursor) {
      cursor.style.animation = 'none';
      cursor.style.opacity = '1';
    }
  }, [doneTyping]);

  return (
    <section
      ref={ref}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        color: 'black',
        padding: '2rem',
        width: '90%',
        maxWidth: '1200px',
        margin: '0 auto',
        borderRadius: '40px',
        boxShadow: '0 4px 15px rgba(255, 255, 255, 0.3)',
        boxSizing: 'border-box',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.7)',
        fontFamily: "'Arial', sans-serif",
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px 0',
          width: '100%',
        }}
      >
        <div
          style={{
            width: 'clamp(150px, 20vw, 300px)',
            height: 'clamp(150px, 20vw, 300px)',
            backgroundColor: '#ccc',
            borderRadius: '50%',
            backgroundImage: `url(${DembaImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            marginBottom: '20px',
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          style={{
            width: '100%',
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            lineHeight: '1.6',
          }}
        >
          <div className="terminal-typewriter">
            <span className="terminal-text">{typedText}</span>
            <span className="terminal-cursor" id="terminal-cursor">|</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
