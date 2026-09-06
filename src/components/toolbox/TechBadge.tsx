import React, { useState } from 'react';

export interface TechBadgeProps {
  name: string;
  category: string;
  icon: React.ReactNode;
  accentColor?: string;
}

export function TechBadge({
  name,
  category,
  icon,
  accentColor = '#38bdf8',
}: TechBadgeProps): JSX.Element {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: isHovered ? '#1a1d2e' : '#121420',
        border: `1px solid ${isHovered ? accentColor : '#232738'}`,
        borderRadius: '12px',
        padding: '1.1rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: isHovered
          ? `0 8px 24px -4px rgba(0,0,0,0.5), 0 0 16px -2px ${accentColor}33`
          : '0 4px 12px rgba(0,0,0,0.2)',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Top highlight bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '2px',
          background: isHovered ? accentColor : 'transparent',
          transition: 'background 0.2s ease',
        }}
      />

      {/* Tech Icon Container */}
      <div
        style={{
          width: '42px',
          height: '42px',
          borderRadius: '10px',
          background: '#0a0c14',
          border: `1px solid ${isHovered ? accentColor : '#2a2f44'}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          color: accentColor,
          transition: 'border-color 0.2s ease',
        }}
      >
        {icon}
      </div>

      {/* Tech Info */}
      <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <span
          style={{
            fontSize: '1rem',
            fontWeight: 700,
            color: '#f8fafc',
            letterSpacing: '-0.01em',
            lineHeight: 1.2,
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: '0.8rem',
            color: '#94a3b8',
            marginTop: '2px',
            lineHeight: 1.2,
          }}
        >
          {category}
        </span>
      </div>
    </div>
  );
}
