import React from 'react';

export interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  link?: string;
  preview: React.ReactNode;
}

export function ProjectCard({
  title,
  description,
  tags,
  link = '#',
  preview,
}: ProjectCardProps): JSX.Element {
  return (
    <div
      style={{
        background: 'rgba(18, 19, 28, 0.75)',
        backdropFilter: 'blur(12px)',
        borderRadius: '16px',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        e.currentTarget.style.boxShadow = '0 16px 36px rgba(0, 0, 0, 0.45)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
        e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
      }}
    >
      <div>
        {/* Preview Frame */}
        <div
          style={{
            width: '100%',
            height: '190px',
            borderRadius: '10px',
            overflow: 'hidden',
            background: '#0a0b10',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            marginBottom: '1.25rem',
            position: 'relative',
          }}
        >
          {preview}
        </div>

        {/* Content */}
        <h3
          style={{
            fontSize: '1.25rem',
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
            marginBottom: '1.25rem',
          }}
        >
          {description}
        </p>
      </div>

      <div>
        {/* Tech Tag Pills */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.4rem',
            marginBottom: '1.25rem',
          }}
        >
          {tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.72rem',
                fontFamily: 'ui-monospace, monospace',
                padding: '3px 8px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.05)',
                color: '#cbd5e1',
                border: '1px solid rgba(255, 255, 255, 0.06)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: '#38bdf8',
              fontSize: '0.85rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'color 0.15s ease',
            }}
          >
            View Project →
          </a>
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#64748b"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </div>
      </div>
    </div>
  );
}
