import { useDraggable } from "@dnd-kit/core";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { ResizeHandle } from "./Icons.jsx";
import "../styles/TimeSlot.scss";

function TimeSlot({ id, numSlots, label, setSelectedSlot, selectedSlot }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-${id}`,
  });

  const isMobile = useIsMobile();

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`timeslot ${selectedSlot === id ? "selected" : ""}`}
      id={`draggable-${id}`}
      style={
        isMobile
          ? { height: `calc(${100 * numSlots}% + ${numSlots}px)` }
          : { width: `calc(${100 * numSlots}% + ${numSlots}px)` }
      }
      onClick={() => setSelectedSlot(id)}
    >
      <span className="timeslot-label">{label}</span>
      <ResizeStart slotId={id} />
      <ResizeEnd slotId={id} />
    </div>
  );
}

function ResizeStart({ slotId }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-${slotId}-start`,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="resize-handle start"
    >
      <ResizeHandle />
    </span>
  );
}

function ResizeEnd({ slotId }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-${slotId}-end`,
  });

  return (
    <span
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="resize-handle end"
    >
      <ResizeHandle />
    </span>
  );
}

export default TimeSlot;
