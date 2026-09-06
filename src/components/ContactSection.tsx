import { useState } from 'react';

export function ContactSection(): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="contact"
      style={{
        width: '100%',
        minHeight: 'auto',
        background: '#0a0a0f',
        color: '#fff',
        padding: 'clamp(2rem, 4vw, 3rem) 0 0',
        boxSizing: 'border-box',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Section Header */}
      <div
        style={{
          width: '100%',
          maxWidth: '1440px',
          margin: '0 auto',
          padding: '0 clamp(1rem, 5vw, 8rem) clamp(1.5rem, 3vw, 2.5rem)',
          boxSizing: 'border-box',
        }}
      >
        <img
          src="/assets/site/section-five/section-five-title.svg"
          alt="05. GET IN TOUCH - Have an idea, a project, or just want to say hi? I'd love to hear from you."
          style={{
            width: 'clamp(240px, 75vw, 560px)',
            height: 'auto',
            display: 'block',
          }}
        />
      </div>

      {/* Main Edge-to-Edge Desk Scene Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          margin: 0,
          padding: 0,
        }}
      >
        {/* Full-width edge-to-edge Desk Illustration */}
        <img
          src="/assets/site/section-five/section-five-desk.png"
          alt="Desk setup with retro CRT monitor, cat, coffee mug, and plant"
          style={{
            width: '100%',
            height: 'auto',
            display: 'block',
          }}
        />

        {/* URLs positioned next to Email, LinkedIn, GitHub in the CRT screen */}
        <div
          style={{
            position: 'absolute',
            top: '58.5%',
            left: '23.8%',
            width: '22%',
            height: '15.5%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
            fontSize: 'clamp(6px, 1.15vw, 16px)',
            lineHeight: 1.2,
            color: '#4ade80',
            pointerEvents: 'auto',
          }}
        >
          <a
            href="mailto:hello@akshat.dev"
            style={{
              color: '#4ade80',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}
          >
            hello@akshat.dev
          </a>

          <a
            href="https://linkedin.com/in/akshat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#4ade80',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}
          >
            linkedin.com/in/akshat
          </a>

          <a
            href="https://github.com/akshat"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#4ade80',
              textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s',
            }}
          >
            github.com/akshat
          </a>
        </div>

        {/* Upper Right Floating CTA */}
        <div
          style={{
            position: 'absolute',
            top: '12%',
            right: 'clamp(4%, 7vw, 8%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(0.5rem, 1.5vw, 1.25rem)',
            zIndex: 10,
          }}
        >
          {/* Dashed Left Border Info Text */}
          <div
            style={{
              borderLeft: '1.5px dashed rgba(148, 163, 184, 0.5)',
              paddingLeft: 'clamp(0.5rem, 1.2vw, 1.25rem)',
              color: '#cbd5e1',
              fontSize: 'clamp(0.75rem, 1.2vw, 1.25rem)',
              lineHeight: 1.35,
              fontWeight: 500,
            }}
          >
            Available for
            <br />
            freelance, collabs
            <br />
            and full-time opportunities.
          </div>

          {/* Glowing CTA Button with Pointing Hand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(4px, 1vw, 10px)' }}>
            {/* Pointing Hand Icon */}
            <svg
              width="clamp(22px, 3.5vw, 36px)"
              height="clamp(16px, 2.5vw, 26px)"
              viewBox="0 0 32 24"
              fill="none"
              style={{
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.6))',
                flexShrink: 0,
              }}
            >
              <path
                d="M2 9C2 7.89 2.89 7 4 7H9V3C9 1.89 9.89 1 11 1C12.11 1 13 1.89 13 3V12H16C17.11 12 18 12.89 18 14C18 15.11 17.11 16 16 16H11L7.5 19.5C6.7 20.3 5.3 20.3 4.5 19.5L2 17V9Z"
                fill="#fed7aa"
                stroke="#7c2d12"
                strokeWidth="1.5"
              />
              <rect x="0.5" y="6.5" width="4.5" height="11" rx="1.5" fill="#f8fafc" stroke="#334155" strokeWidth="1" />
            </svg>

            {/* Glowing Button */}
            <a
              href="mailto:hello@akshat.dev"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                background: isHovered
                  ? 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)'
                  : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#052013',
                padding: 'clamp(6px, 1.1vw, 14px) clamp(12px, 2vw, 32px)',
                borderRadius: '8px',
                fontWeight: 800,
                fontSize: 'clamp(0.78rem, 1.2vw, 1.18rem)',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: isHovered
                  ? '0 0 30px rgba(34, 197, 94, 0.8), 0 0 6px #86efac, inset 0 1px 0 rgba(255,255,255,0.4)'
                  : '0 0 20px rgba(34, 197, 94, 0.5), 0 0 3px #86efac, inset 0 1px 0 rgba(255,255,255,0.3)',
                border: '2px solid #86efac',
                letterSpacing: '-0.01em',
                cursor: 'pointer',
                transform: isHovered ? 'scale(1.03)' : 'scale(1)',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease, background 0.15s ease',
                whiteSpace: 'nowrap',
              }}
            >
              <span>Send a Message</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
