"use client";

import { useState, useEffect, useRef } from "react";
import Hexagon, { ColorVariant } from "./Hexagon";
import MemoryModal from "./MemoryModal";
import VowsModal from "./VowsModal";
import VideoModal from "./VideoModal";
import { HexContent } from "../data/memories";

interface HexGridProps {
  hexagons: HexContent[];
}

function getColumns(width: number): number {
  // if (width < 768) return 4;
  return 6;
}

function getInitialColumns(): number {
  if (typeof window === "undefined") return 6;
  return getColumns(window.innerWidth);
}

// Get responsive spacing values based on column count
// rowOffset = half hexagon width for proper honeycomb alignment
function getSpacing(cols: number): { rowOffset: number; rowMargin: number; hexMargin: number } {
  if (cols === 4) {
    // Mobile: 96px hex (w-24) for 1.75x size
    return { rowOffset: 48, rowMargin: -20, hexMargin: -4 };
  }
  return { rowOffset: 40, rowMargin: -20, hexMargin: -2 };
}

type ModalState =
  | { type: "memory"; title: string; description: string; emoji: string }
  | { type: "vows"; title: string; content: string; emoji: string }
  | { type: "video"; videoId: string; title: string; emoji: string }
  | { type: "milestone"; date: string; label: string; emoji: string }
  | { type: "note"; message: string; emoji: string }
  | null;

export default function HexGrid({ hexagons }: HexGridProps) {
  const [revealedHexes, setRevealedHexes] = useState<Set<number>>(new Set());
  const [modalState, setModalState] = useState<ModalState>(null);
  const [cols, setCols] = useState(getInitialColumns);

  // Drag-to-pan state
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, scrollX: 0, scrollY: 0 });
  const [hasDragged, setHasDragged] = useState(false);

  useEffect(() => {
    const updateCols = () => {
      setCols(getColumns(window.innerWidth));
    };

    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  // Drag-to-pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setHasDragged(false);
    setDragStart({
      x: e.clientX,
      y: e.clientY,
      scrollX: containerRef.current?.scrollLeft || 0,
      scrollY: containerRef.current?.scrollTop || 0,
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    // If moved more than 5px, consider it a drag (not a click)
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      setHasDragged(true);
    }

    containerRef.current.scrollLeft = dragStart.scrollX - dx;
    containerRef.current.scrollTop = dragStart.scrollY - dy;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setHasDragged(false);
    setDragStart({
      x: touch.clientX,
      y: touch.clientY,
      scrollX: containerRef.current?.scrollLeft || 0,
      scrollY: containerRef.current?.scrollTop || 0,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const touch = e.touches[0];
    const dx = touch.clientX - dragStart.x;
    const dy = touch.clientY - dragStart.y;

    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      setHasDragged(true);
    }

    containerRef.current.scrollLeft = dragStart.scrollX - dx;
    containerRef.current.scrollTop = dragStart.scrollY - dy;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleHexClick = (index: number) => {
    // Don't trigger click if user was dragging
    if (hasDragged) return;
    const content = hexagons[index];

    // Mark as revealed
    setRevealedHexes((prev) => new Set([...prev, index]));

    // Open appropriate modal based on content type
    switch (content.type) {
      case "memory":
        setModalState({
          type: "memory",
          title: content.title,
          description: content.description,
          emoji: content.emoji,
        });
        break;
      case "vows":
        setModalState({
          type: "vows",
          title: content.title,
          content: content.content,
          emoji: content.emoji,
        });
        break;
      case "video":
        setModalState({
          type: "video",
          videoId: content.videoId,
          title: content.title,
          emoji: content.emoji,
        });
        break;
      case "milestone":
        setModalState({
          type: "milestone",
          date: content.date,
          label: content.label,
          emoji: content.emoji,
        });
        break;
      case "note":
        setModalState({
          type: "note",
          message: content.message,
          emoji: content.emoji,
        });
        break;
    }
  };

  const colorVariants: ColorVariant[] = ["purple", "emerald", "red", "darkPurple", "darkEmerald"];

  const getColorVariant = (index: number): ColorVariant => {
    return colorVariants[index % colorVariants.length];
  };

  // Create rows for honeycomb layout
  const rows: HexContent[][] = [];
  for (let i = 0; i < hexagons.length; i += cols) {
    rows.push(hexagons.slice(i, i + cols));
  }

  const spacing = getSpacing(cols);

  const closeModal = () => setModalState(null);

  const renderModal = () => {
    if (!modalState) return null;

    switch (modalState.type) {
      case "memory":
        return (
          <MemoryModal
            title={modalState.title}
            description={modalState.description}
            emoji={modalState.emoji}
            onClose={closeModal}
          />
        );
      case "vows":
        return (
          <VowsModal
            title={modalState.title}
            content={modalState.content}
            emoji={modalState.emoji}
            onClose={closeModal}
          />
        );
      case "video":
        return (
          <VideoModal
            videoId={modalState.videoId}
            title={modalState.title}
            emoji={modalState.emoji}
            onClose={closeModal}
          />
        );
      case "milestone":
        return (
          <MemoryModal
            title={modalState.label}
            description={modalState.date}
            emoji={modalState.emoji}
            onClose={closeModal}
          />
        );
      case "note":
        return (
          <MemoryModal
            title="Love Note"
            description={modalState.message}
            emoji={modalState.emoji}
            onClose={closeModal}
          />
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col animate-fade-in px-2 pb-8 overflow-auto select-none ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      data-testid="hex-grid"
      role="grid"
      aria-label="Memory quilt"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Scroll hint for mobile */}
      <div className="md:hidden text-center text-zinc-500 text-sm mb-4 animate-bounce">
        Drag to explore
      </div>

      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="flex"
          style={{
            marginTop: rowIndex === 0 ? 0 : spacing.rowMargin,
            marginLeft: rowIndex % 2 === 1 ? spacing.rowOffset : 0,
          }}
          role="row"
        >
          {row.map((content, colIndex) => {
            const globalIndex = rowIndex * cols + colIndex;
            return (
              <div
                key={globalIndex}
                style={{
                  animationDelay: `${globalIndex * 50}ms`,
                  marginLeft: colIndex === 0 ? 0 : spacing.hexMargin,
                }}
                className="animate-scale-in"
              >
                <Hexagon
                  content={content}
                  isRevealed={revealedHexes.has(globalIndex)}
                  colorVariant={getColorVariant(globalIndex)}
                  onClick={() => handleHexClick(globalIndex)}
                  index={globalIndex}
                />
              </div>
            );
          })}
        </div>
      ))}

      {/* Modals */}
      {renderModal()}
    </div>
  );
}
