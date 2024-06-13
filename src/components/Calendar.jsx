import "../styles/Calendar.scss";
import {
  DndContext,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  DragOverlay,
} from "@dnd-kit/core";
import { useState } from "react";
import Day from "./Day";
import Header from "./Header";

const days = [
  { num: 10, label: "Monday" },
  { num: 11, label: "Tuesday" },
  { num: 12, label: "Wednesday" },
  { num: 13, label: "Thursday" },
  { num: 14, label: "Friday" },
  { num: 15, label: "Saturday" },
  { num: 16, label: "Sunday" },
];

const intervalsPerDay = 48;

function Calendar() {
  const [slots, setSlots] = useState([
    { id: 1, startInterval: "102", numSlots: 8, label: "Slot 1" },
    { id: 2, startInterval: "1011", numSlots: 8, label: "Slot 2" },
    { id: 3, startInterval: "1410", numSlots: 31, label: "Slot 3" },
  ]);
  const [selectedSlot, setSelectedSlot] = useState();

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { delay: 100 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100 } })
  );

  const [dragging, setDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const createSlot = (dayNum) => {
    let newSlotId = 1;
    if (slots.length) newSlotId = slots[slots.length - 1].id + 1;
    setSlots([
      ...slots,
      {
        id: newSlotId,
        startInterval: `${dayNum}2`,
        numSlots: 4,
        label: `Slot ${newSlotId}`,
      },
    ]);
  };

  const deleteSlot = (slotId) => {
    const nextSlots = slots.filter((slot) => slot.id !== slotId);
    setSlots(nextSlots);
  };

  const handleDragStart = (e) => {
    setDragging(true);
  };

  const handleDragEnd = (e) => {
    if (e.over) {
      const nextSlots = slots.map((slot) => {
        if (e.active.id === `draggable-${slot.id}`) {
          return {
            ...slot,
            startInterval: e.over.id,
          };
        }
        return slot;
      });
      setSlots(nextSlots);
    }
    setDragging(false);
  };

  return (
    <>
      <Header
        zoomLevel={zoomLevel}
        setZoomLevel={setZoomLevel}
        selectedSlot={selectedSlot}
        setSelectedSlot={setSelectedSlot}
        deleteSlot={deleteSlot}
      />
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <DragOverlay
          zIndex={999}
          dropAnimation={null}
          className="drag-preview"
        />
        <div className={`calendar ${dragging ? "dragging" : ""}`}>
          {days.map((day, i) => (
            <Day
              key={i}
              dateNumber={day.num}
              dayOfWeek={day.label}
              slots={slots}
              createSlot={createSlot}
              intervalsPerDay={intervalsPerDay}
              zoomLevel={zoomLevel}
              setSelectedSlot={setSelectedSlot}
              selectedSlot={selectedSlot}
            ></Day>
          ))}
        </div>
      </DndContext>
    </>
  );
}

export default Calendar;
