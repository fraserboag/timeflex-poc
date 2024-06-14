import "../styles/Calendar.scss";
import { DndContext, DragOverlay } from "@dnd-kit/core";
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

const fakeApiResponse = [
  { id: 1, startInterval: "1110", numSlots: 8, label: "Slot 1" },
  { id: 2, startInterval: "1120", numSlots: 8, label: "Slot 2" },
  { id: 3, startInterval: "1410", numSlots: 31, label: "Slot 3" },
];

const intervalsPerDay = 48;

function Calendar() {
  const [slots, setSlots] = useState(fakeApiResponse);
  const [selectedSlot, setSelectedSlot] = useState();
  const [dragging, setDragging] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [resizing, setResizing] = useState();

  const createSlot = (dayNum) => {
    let newSlotId = 1;
    if (slots.length) newSlotId = slots[slots.length - 1].id + 1;
    setSlots([
      ...slots,
      {
        id: newSlotId,
        startInterval: `${dayNum}02`,
        numSlots: 4,
        label: `Slot ${newSlotId}`,
      },
    ]);
    setSelectedSlot(newSlotId);
    document.querySelectorAll(".day-timeline").forEach((el) => {
      el.scrollTop = 0;
    });
  };

  const deleteSlot = (slotId) => {
    const nextSlots = slots.filter((slot) => slot.id !== slotId);
    setSlots(nextSlots);
  };

  const handleDragStart = (e) => {
    if (e.active.id.includes("start")) {
      const slotId = e.active.id.replace("-start", "");
      setResizing({
        id: slotId,
        handle: "start",
        initial: slots.find((slot) => `draggable-${slot.id}` === slotId)
          .startInterval,
        initialSlots: slots.find((slot) => `draggable-${slot.id}` === slotId)
          .numSlots,
      });
    } else if (e.active.id.includes("end")) {
      const slotId = e.active.id.replace("-end", "");
      setResizing({
        id: slotId,
        handle: "end",
        initial: slots.find((slot) => `draggable-${slot.id}` === slotId)
          .startInterval,
        initialSlots: slots.find((slot) => `draggable-${slot.id}` === slotId)
          .numSlots,
      });
    } else {
      setSelectedSlot(parseInt(e.active.id.replace("draggable-", "")));
      setDragging(true);
    }
  };

  const handleDragEnd = (e) => {
    if (e.over) {
      if (e.active.id.includes("start")) {
        // Finished dragging start of a slot - calculate
        const delta = parseInt(resizing.initial) - parseInt(e.over.id);
        const nextSlots = slots.map((slot) => {
          if (resizing.id === `draggable-${slot.id}`) {
            const newValue = slot.numSlots + delta;
            return {
              ...slot,
              startInterval:
                newValue > 0
                  ? e.over.id
                  : (
                      parseInt(slot.startInterval) +
                      slot.numSlots -
                      1
                    ).toString(),
              numSlots: newValue > 0 ? newValue : 1,
            };
          }
          return slot;
        });
        setSlots(nextSlots);
      } else if (e.active.id.includes("end")) {
        // Finished dragging end of a slot - calculate
        const delta =
          parseInt(resizing.initial) +
          parseInt(resizing.initialSlots) -
          parseInt(e.over.id) -
          1;
        const nextSlots = slots.map((slot) => {
          const newValue = slot.numSlots - delta;
          if (resizing.id === `draggable-${slot.id}`) {
            return {
              ...slot,
              numSlots: newValue > 0 ? newValue : 1,
            };
          }
          return slot;
        });
        setSlots(nextSlots);
      } else {
        // Finished moving a slot

        const numCollisions = e.collisions.length;
        const activeSlotLength = slots.find(
          (slot) => `draggable-${slot.id}` === e.active.id
        ).numSlots;

        if (numCollisions <= activeSlotLength) return;

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
    }

    setDragging(false);
    setResizing();
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
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <DragOverlay
          zIndex={999}
          dropAnimation={null}
          className={`drag-preview ${resizing ? "hidden" : ""}`}
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
              resizing={resizing}
            ></Day>
          ))}
        </div>
      </DndContext>
    </>
  );
}

export default Calendar;
