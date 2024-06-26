import { useDraggable } from "@dnd-kit/core";
import { useIsMobile } from "../hooks/useIsMobile.js";
import { ResizeHandle } from "./Icons.jsx";
import "../styles/TimeSlot.scss";

function TimeSlot({ id, numSlots, setSelectedSlot, selectedSlot }) {
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
          ? { height: `calc(${100 * numSlots}% + ${numSlots}px + 1px)` }
          : { width: `calc(${100 * numSlots}% + ${numSlots}px + 1px)` }
      }
      onClick={() => setSelectedSlot(id)}
    >
      <ResizeStart slotId={id} />
      <ResizeEnd slotId={id} />
    </div>
  );
}

export function ResizeStart({ slotId }) {
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

export function ResizeEnd({ slotId }) {
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
