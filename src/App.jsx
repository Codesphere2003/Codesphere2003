import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)
  const [typedText, setTypedText] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-mode')
  }

  // Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let particles = []
    const particleCount = 80
    const connectionDistance = 150
    let animationId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY
        if (this.x > canvas.width || this.x < 0) this.speedX *= -1
        if (this.y > canvas.height || this.y < 0) this.speedY *= -1
      }

      draw() {
        ctx.fillStyle = 'rgba(74, 124, 255, 0.6)'
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const init = () => {
      particles = []
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle())
      }
    }

    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            ctx.strokeStyle = `rgba(74, 124, 255, ${opacity * 0.3})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(particle => {
        particle.update()
        particle.draw()
      })
      connectParticles()
      animationId = requestAnimationFrame(animate)
    }

    window.addEventListener('resize', resizeCanvas)
    resizeCanvas()
    init()
    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [])

  // Typing Animation
  useEffect(() => {
    const roles = ['Full Stack Developer', 'UI/UX Designer', 'Tech Enthusiast']
    let roleIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeoutId

    const type = () => {
      const currentRole = roles[roleIndex]

      if (isDeleting) {
        setTypedText(currentRole.substring(0, charIndex - 1))
        charIndex--
      } else {
        setTypedText(currentRole.substring(0, charIndex + 1))
        charIndex++
      }

      let typeSpeed = isDeleting ? 50 : 100

      if (!isDeleting && charIndex === currentRole.length) {
        typeSpeed = 2000
        isDeleting = true
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false
        roleIndex = (roleIndex + 1) % roles.length
        typeSpeed = 500
      }

      timeoutId = setTimeout(type, typeSpeed)
    }

    type()

    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} id="particles-canvas"></canvas>

      <nav>
        <div className="logo"><span>&gt;</span> ~/portfolio _</div>
        <ul className="nav-links">
          <li><a href="#" className="active">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div className="theme-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </div>
      </nav>

      <section className="hero">
        <div className="hero-content">
          <p className="greeting">Hello, I am</p>
          <h1 className="name">
            {'Aswin'.split('').map((letter, i) => (
              <span key={`first-${i}`} className="name-letter" style={{ animationDelay: `${i * 0.1}s` }}>{letter}</span>
            ))}
            <span>&nbsp;</span>
            {'Sureshkumar'.split('').map((letter, i) => (
              <span key={`last-${i}`} className="name-letter" style={{ animationDelay: `${(i + 6) * 0.1}s` }}>{letter}</span>
            ))}
          </h1>
          <div className="typing-container">
            I am a <span className="typing-text">{typedText}</span><span className="cursor"></span>
          </div>
          <a href="#contact" className="cta-btn">Contact Me</a>
        </div>
      </section>

      <section className="about" id="about">
        <h2 className="section-title">About <span>Me</span></h2>
        <p className="section-subtitle">A glimpse into who I am and my journey so far.</p>
        
        <div className="about-container">
          <div className="code-window">
            <div className="window-header">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="window-title">bio.tsx</span>
            </div>
            <div className="code-content">
              <div className="code-line"><span className="comment">{'/**'}</span></div>
              <div className="code-line"><span className="comment">{' * About Me'}</span></div>
              <div className="code-line"><span className="comment">{' * --------------------------'}</span></div>
              <div className="code-line"><span className="comment">{' * A web developer who thrives on solving complex problems,'}</span></div>
              <div className="code-line"><span className="comment">{' * building scalable applications, and exploring the'}</span></div>
              <div className="code-line"><span className="comment">{' * intersection of AI/ML with modern web technologies.'}</span></div>
              <div className="code-line"><span className="comment">{' */'}</span></div>
              <div className="code-line">&nbsp;</div>
              <div className="code-line"><span className="keyword">const</span> <span className="variable">developer</span> = <span className="bracket">{'{'}</span></div>
              <div className="code-line">  <span className="property">name</span>: <span className="string">'Aswin Sureshkumar'</span>,</div>
              <div className="code-line">  <span className="property">passion</span>: <span className="string">'Crafting Robust Applications'</span>,</div>
              <div className="code-line">  <span className="property">hobbies</span>: [<span className="string">'Coding'</span>, <span className="string">'Chess'</span>, <span className="string">'Reading'</span>],</div>
              <div className="code-line">  <span className="property">status</span>: <span className="string">'Hustling'</span></div>
              <div className="code-line"><span className="bracket">{'}'}</span></div>
            </div>
          </div>

          <div className="education-section">
            <div className="education-header">
              <span className="edu-tag">&lt;Education &amp; History /&gt;</span>
            </div>
            
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-year">2023-Present</div>
                <div className="timeline-dot green-dot"></div>
                <div className="timeline-content">
                  <span className="score">CGPA: 8.49</span>
                  <h3>B.Tech in Computer Science</h3>
                  <p className="college-name">
                    <img src="/iiitk-logo.png" alt="IIITK" className="college-logo" />
                    Indian Institute of Information Technology, Kottayam
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-year">2020-2021</div>
                <div className="timeline-dot blue-dot"></div>
                <div className="timeline-content">
                  <span className="score">score: 93.4</span>
                  <h3>AISSCE (Grade XII)</h3>
                  <p className="college-name">
                    <img src="/sis-logo.png" alt="SIS" className="college-logo" />
                    Sharjah Indian School, UAE
                  </p>
                </div>
              </div>
              
              <div className="timeline-item">
                <div className="timeline-year">2018-2019</div>
                <div className="timeline-dot blue-dot"></div>
                <div className="timeline-content">
                  <span className="score">score: 89.6</span>
                  <h3>AISSCE (Grade X)</h3>
                  <p className="college-name">
                    <img src="/sis-logo.png" alt="SIS" className="college-logo" />
                    Sharjah Indian School, UAE
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skills" id="skills">
        <h2 className="section-title-alt">Technical <span>Proficiency</span></h2>
        <p className="section-subtitle">The technologies that power my work.</p>

        <div className="skills-window">
          <div className="window-header">
            <div className="window-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="window-title">skills.json</span>
          </div>
          <div className="skills-content">
            <div className="skills-code">
              <div className="code-line"><span className="keyword">const</span> <span className="variable">portfolio</span> = {'{'}</div>
              
              <div className="code-line">  <span className="string">"languages"</span>: [</div>
              <div className="skills-grid">
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" alt="C" />
                  <span>C</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" alt="C++" />
                  <span>C++</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                  <span>Python</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" alt="Java" />
                  <span>Java</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" alt="PHP" />
                  <span>PHP</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                  <span>JavaScript</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML" />
                  <span>HTML</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS" />
                  <span>CSS</span>
                </div>
              </div>
              <div className="code-line">  ],</div>

              <div className="code-line">  <span className="string">"frameworks"</span>: [</div>
              <div className="skills-grid">
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  <span>React</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                  <span>Node.js</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express" />
                  <span>Express</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" />
                  <span>Tailwind</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg" alt="Bootstrap" />
                  <span>Bootstrap</span>
                </div>
              </div>
              <div className="code-line">  ],</div>

              <div className="code-line">  <span className="string">"databases"</span>: [</div>
              <div className="skills-grid">
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" alt="MySQL" />
                  <span>MySQL</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" />
                  <span>Firebase</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  <span>MongoDB</span>
                </div>
              </div>
              <div className="code-line">  ],</div>

              <div className="code-line">  <span className="string">"cloud"</span>: [</div>
              <div className="skills-grid">
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg" alt="Google Cloud" />
                  <span>Google Cloud</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/netlify/netlify-original.svg" alt="Netlify" />
                  <span>Netlify</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.simpleicons.org/render/46E3B7" alt="Render" />
                  <span>Render</span>
                </div>
              </div>
              <div className="code-line">  ],</div>

              <div className="code-line">  <span className="string">"tools"</span>: [</div>
              <div className="skills-grid">
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
                  <span>Git</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/gitlab/gitlab-original.svg" alt="GitLab" />
                  <span>GitLab</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub Desktop" />
                  <span>GitHub Desktop</span>
                </div>
                <div className="skill-item">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg" alt="VS Code" />
                  <span>VS Code</span>
                </div>
                <div className="skill-item">
                  <img src="https://www.sublimetext.com/images/icon.png" alt="Sublime Text" />
                  <span>Sublime</span>
                </div>
              </div>
              <div className="code-line">  ]</div>

              <div className="code-line">{'}'}</div>
            </div>
            <div className="skills-footer">
              <span className="branch">main*</span>
              <span className="file-info">Ln 32, Col 45</span>
              <span className="lang-tag">JavaScript</span>
            </div>
          </div>
        </div>
      </section>

      <section className="achievements" id="achievements">
        <h2 className="section-title">Coding <span>Profiles</span></h2>
        <p className="section-subtitle">Where I sharpen my problem-solving skills.</p>

        <div className="achievements-grid">
          <div className="achievement-card">
            <div className="achievement-icon codeforces-bg">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-code-forces-3521352-2944796.png" alt="Codeforces" />
            </div>
            <div className="achievement-content">
              <h3>Pupil at Codeforces</h3>
              <p className="achievement-detail">Max Rating: <span className="highlight">1274</span></p>
              <a href="https://codeforces.com/profile/Codesphere_2003" target="_blank" rel="noopener noreferrer" className="profile-link">@Codesphere_2003</a>
            </div>
          </div>

          <div className="achievement-card">
            <div className="achievement-icon leetcode-bg">
              <img src="https://cdn.iconscout.com/icon/free/png-256/free-leetcode-3521542-2944960.png" alt="LeetCode" />
            </div>
            <div className="achievement-content">
              <h3>LeetCode</h3>
              <p className="achievement-detail">Problem Solver</p>
              <a href="https://leetcode.com/u/Codesphere_2003/" target="_blank" rel="noopener noreferrer" className="profile-link">@Codesphere_2003</a>
            </div>
          </div>
        </div>
      </section>

      <section className="projects" id="projects">
        <h2 className="section-title">Featured <span>Works</span></h2>
        <p className="section-subtitle">Projects that showcase my skills and passion.</p>

        <div className="projects-grid">
          <div className="project-card">
            <div className="project-image">
              <img src="/employee-tracker.png" alt="Employee Tracking App" className="project-img" />
            </div>
            <div className="project-content">
              <h3>Employee Tracking App</h3>
              <p className="project-description">
                A comprehensive employee tracking application designed for shop owners to monitor their workforce efficiently. Features real-time location tracking using Google Maps API, employee availability status, attendance management, and detailed analytics dashboard.
              </p>
              <div className="project-tech">
                <span className="tech-tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  React
                </span>
                <span className="tech-tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" alt="Google Maps" />
                  Google Maps
                </span>
                <span className="tech-tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" alt="Firebase" />
                  Firebase
                </span>
              </div>
              <div className="project-links">
                <a href="#" className="project-btn">Demo</a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=200&fit=crop" alt="AI Subtitle Generator" className="project-img" />
            </div>
            <div className="project-content">
              <h3>AI Subtitle Generator</h3>
              <p className="project-description">
                An AI-powered multilingual subtitle generation platform designed to make films and cinematic experiences truly global. Creates context-aware, culturally nuanced, emotion-preserving subtitles that adapt seamlessly across 50+ languages.
              </p>
              <div className="project-tech">
                <span className="tech-tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  React
                </span>
                <span className="tech-tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                  Python
                </span>
                <span className="tech-tag">
                  <span className="api-icon">🎙️</span>
                  Assembly AI
                </span>
                <span className="tech-tag">
                  <span className="api-icon">🇮🇳</span>
                  Sarvam AI
                </span>
              </div>
              <div className="project-links">
                <a href="#" className="project-btn">Demo</a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-image">
              <img src="/busbuddy.png" alt="BusBuddy" className="project-img" />
            </div>
            <div className="project-content">
              <h3>BusBuddy</h3>
              <p className="project-description">
                A real-time bus tracking system for college campuses enabling students and staff to track campus buses live. Built with WebSocket for instant updates, featuring route visualization, ETA predictions, and push notifications for bus arrivals.
              </p>
              <div className="project-tech">
                <span className="tech-tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" />
                  Spring Boot
                </span>
                <span className="tech-tag">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/socketio/socketio-original.svg" alt="WebSocket" />
                  WebSocket
                </span>
                <span className="tech-tag">
                  <img src="https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png" alt="Leaflet" />
                  Leaflet
                </span>
              </div>
              <div className="project-links">
                <a href="#" className="project-btn">Demo</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <h2 className="section-title">Initialize <span>Connection</span></h2>

        <div className="contact-container">
          <div className="contact-window">
            <div className="window-header">
              <div className="window-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="window-title">contact.json</span>
            </div>
            <div className="contact-code">
              <div className="code-line"><span className="bracket">{'{'}</span></div>
              <div className="code-line">  <span className="string">"socials"</span>: [</div>
              <div className="social-icons">
                <a href="https://github.com/Codesphere_2003" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
                </a>
                <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" alt="LinkedIn" />
                </a>
              </div>
              <div className="code-line">  ],</div>
              <div className="code-line">  <span className="string">"status"</span>: <span className="string">"Open to connections ... :)"</span>,</div>
              <div className="code-line">  <span className="string">"timezone"</span>: <span className="string">"UTC+5:30"</span></div>
              <div className="code-line"><span className="bracket">{'}'}</span></div>
            </div>
          </div>

          <div className="contact-form">
            <div className="form-group">
              <input type="text" placeholder="Your Name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="your@email.com" className="form-input" />
            </div>
            <div className="form-group">
              <textarea placeholder="Type your message here..." className="form-textarea"></textarea>
            </div>
            <button className="submit-btn">
              sendMessage() →
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
