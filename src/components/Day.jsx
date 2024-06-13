import { useDroppable } from "@dnd-kit/core";
import TimeSlot from "./TimeSlot";
import { useTimelineHeight } from "../hooks/useTimelineHeight";
import { useIsMobile } from "../hooks/useIsMobile";
import { SwipeHint } from "./Icons";

function Day({
  dateNumber,
  dayOfWeek,
  slots,
  createSlot,
  intervalsPerDay,
  zoomLevel,
  setSelectedSlot,
  selectedSlot,
}) {
  return (
    <div className="day">
      <div className="day-label">
        <div className="day-label-number">{dateNumber}</div>
        <div className="day-label-weekday">{dayOfWeek}</div>
        <div className="mobile-hint">
          <SwipeHint />
          <span>Swipe to change day</span>
        </div>
      </div>

      <button className="create-slot" onClick={() => createSlot(dateNumber)}>
        + Add Slot
      </button>

      <div className="day-timeline" data-zoomlevel={zoomLevel}>
        <HoursDisplay zoomLevel={zoomLevel} intervalsPerDay={intervalsPerDay} />
        {[...Array(intervalsPerDay)].map((el, i) => (
          <TimeInterval
            id={`${dateNumber}${i < 10 ? "0" : ""}${i}`}
            key={i}
            setSelectedSlot={setSelectedSlot}
          >
            {slots.map(
              (slot) =>
                slot.startInterval ===
                  `${dateNumber}${i < 10 ? "0" : ""}${i}` && (
                  <TimeSlot
                    key={slot.id}
                    id={slot.id}
                    numSlots={slot.numSlots}
                    label={slot.label}
                    setSelectedSlot={setSelectedSlot}
                    selectedSlot={selectedSlot}
                  />
                )
            )}
          </TimeInterval>
        ))}
      </div>
    </div>
  );
}

function TimeInterval({ id, children }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      style={isOver ? { background: "#f8fafc" } : undefined}
      className="timeinterval"
      id={id}
    >
      {children}
    </div>
  );
}

function HoursDisplay({ zoomLevel, intervalsPerDay }) {
  const timelineHeight = useTimelineHeight(zoomLevel, intervalsPerDay);
  const isMobile = useIsMobile();

  return (
    <div
      className="hours-display"
      style={
        timelineHeight && isMobile ? { height: `${timelineHeight}px` } : {}
      }
    >
      {[...Array(12)].map((el, i) => (
        <div key={i} className="time">
          <span>{i + 7}:00</span>
        </div>
      ))}
    </div>
  );
}

export default Day;
