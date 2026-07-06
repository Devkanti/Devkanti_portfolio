'use client';

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence
} from 'motion/react';
import React, { Children, cloneElement, useEffect, useMemo, useRef, useState } from 'react';
import './Dock.css';

export type DockItemData = {
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  active?: boolean;
};

export type DockProps = {
  items: DockItemData[];
  className?: string;
  distance?: number;
  panelHeight?: number;
  baseItemSize?: number;
  dockHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  direction?: 'horizontal' | 'vertical';
};

type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  mouseTrack: MotionValue<number>;
  spring: SpringOptions;
  distance: number;
  baseItemSize: number;
  magnification: number;
  label?: React.ReactNode;
  active?: boolean;
  direction: 'horizontal' | 'vertical';
};

function DockItem({
  children,
  className = '',
  onClick,
  mouseTrack,
  spring,
  distance,
  magnification,
  baseItemSize,
  label,
  active,
  direction
}: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseTrack, val => {
    const rect = ref.current?.getBoundingClientRect() ?? {
      x: 0,
      y: 0,
      width: baseItemSize,
      height: baseItemSize
    };
    if (direction === 'horizontal') {
      return val - rect.x - baseItemSize / 2;
    } else {
      return val - rect.y - baseItemSize / 2;
    }
  });

  const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize]);
  const size = useSpring(targetSize, spring);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{
        width: size,
        height: size
      }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      onFocus={() => isHovered.set(1)}
      onBlur={() => isHovered.set(0)}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      className={`dock-item-container cursor-target ${active ? 'active' : ''} ${className}`}
      tabIndex={0}
      role="button"
      aria-haspopup="true"
      aria-label={typeof label === 'string' ? label : undefined}
    >
      {Children.map(children, child =>
        React.isValidElement(child)
          ? cloneElement(child as React.ReactElement<{ isHovered?: MotionValue<number>; direction?: string }>, { isHovered, direction })
          : child
      )}
    </motion.div>
  );
}

type DockLabelProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
  direction?: 'horizontal' | 'vertical';
};

function DockLabel({ children, className = '', isHovered, direction = 'horizontal' }: DockLabelProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!isHovered) return;
    const unsubscribe = isHovered.on('change', latest => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  const initial = direction === 'horizontal' ? { opacity: 0, y: 0, x: '-50%' } : { opacity: 0, x: -10, y: '-50%' };
  const animate = direction === 'horizontal' ? { opacity: 1, y: -10, x: '-50%' } : { opacity: 1, x: 0, y: '-50%' };
  const exit = initial;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={initial}
          animate={animate}
          exit={exit}
          transition={{ duration: 0.2 }}
          className={`dock-label-container ${direction} ${className}`}
          role="tooltip"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

type DockIconProps = {
  className?: string;
  children: React.ReactNode;
  isHovered?: MotionValue<number>;
};

function DockIcon({ children, className = '' }: DockIconProps) {
  return <div className={`dock-icon-container ${className}`}>{children}</div>;
}

export default function Dock({
  items,
  className = '',
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = 70,
  distance = 200,
  panelHeight = 64,
  dockHeight = 256,
  baseItemSize = 50,
  direction = 'horizontal'
}: DockProps) {
  const mouseTrack = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);

  const maxHeight = useMemo(() => Math.max(dockHeight, magnification + magnification / 2 + 4), [magnification]);
  const sizeRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const sizeAttr = useSpring(sizeRow, spring);

  return (
    <motion.div 
      onMouseMove={(e) => {
        isHovered.set(1);
        mouseTrack.set(direction === 'horizontal' ? e.clientX : e.clientY);
      }}
      onMouseLeave={() => {
        isHovered.set(0);
        mouseTrack.set(Infinity);
      }}
      style={{ 
        width: direction === 'vertical' ? sizeAttr : undefined, 
        height: direction === 'horizontal' ? sizeAttr : undefined, 
        scrollbarWidth: 'none',
        alignItems: direction === 'horizontal' ? 'flex-end' : 'center',
        justifyContent: direction === 'vertical' ? 'flex-start' : 'center'
      }} 
      className="dock-wrapper"
    >
      <motion.div
        className={`dock-panel ${direction} ${className}`}
        style={{ 
          height: direction === 'horizontal' ? panelHeight : undefined,
          width: direction === 'vertical' ? panelHeight : undefined 
        }}
        role="toolbar"
        aria-label="Application dock"
      >
        {items.map((item, index) => (
          <DockItem
            key={index}
            onClick={item.onClick}
            className={item.className}
            mouseTrack={mouseTrack}
            spring={spring}
            distance={distance}
            magnification={magnification}
            baseItemSize={baseItemSize}
            label={item.label}
            active={item.active}
            direction={direction}
          >
            <DockIcon>{item.icon}</DockIcon>
            <DockLabel>{item.label}</DockLabel>
          </DockItem>
        ))}
      </motion.div>
    </motion.div>
  );
}
