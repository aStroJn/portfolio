import React, { useState } from 'react';

export interface ExperimentCardProps {
  title: string;
  description: string;
  tag: string;
  preview: React.ReactNode;
  link?: string;
}

export function ExperimentCard({
  title,
  description,
  tag,
  preview,
  link = '#',
}: ExperimentCardProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: '#111422',
        border: `1px solid ${isHovered ? '#6366f1' : '#232738'}`,
        borderRadius: '16px',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 16px 36px -8px rgba(0, 0, 0, 0.6), 0 0 20px -2px rgba(99, 102, 241, 0.25)'
          : '0 4px 16px rgba(0, 0, 0, 0.3)',
      }}
    >
      {/* Preview Container */}
      <div
        style={{
          width: '100%',
          height: '180px',
          background: '#090b12',
          position: 'relative',
          overflow: 'hidden',
          borderBottom: '1px solid #1f2335',
        }}
      >
        {preview}

        {/* Tag on top-left of preview */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'rgba(15, 23, 42, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '20px',
            padding: '3px 10px',
            fontSize: '0.75rem',
            fontWeight: 600,
            color: '#a5b4fc',
            backdropFilter: 'blur(4px)',
            zIndex: 10,
          }}
        >
          {tag}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: '1.25rem 1.5rem 1.5rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          <h3
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              color: '#f8fafc',
              marginBottom: '0.5rem',
              letterSpacing: '-0.01em',
            }}
          >
            {title}
          </h3>
          <p
            style={{
              fontSize: '0.88rem',
              color: '#94a3b8',
              lineHeight: 1.5,
              margin: '0 0 1.25rem',
            }}
          >
            {description}
          </p>
        </div>

        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            color: isHovered ? '#818cf8' : '#64748b',
            fontSize: '0.88rem',
            fontWeight: 600,
            textDecoration: 'none',
            transition: 'color 0.2s ease',
          }}
        >
          Try experiment
          <span style={{ transform: isHovered ? 'translateX(3px)' : 'none', transition: 'transform 0.2s ease' }}>
            →
          </span>
        </a>
      </div>
    </div>
  );
}
