import "../styles/Header.scss";
import { ClearSelection, TrashBin, ZoomOut, ZoomIn, SplitSlot } from "./Icons";

function Header({
  zoomLevel,
  setZoomLevel,
  selectedSlot,
  setSelectedSlot,
  deleteSlot,
  slots,
  setSlots,
}) {
  const zoomIn = () => {
    let newZoom = zoomLevel + 1;
    if (newZoom > 3) newZoom = 3;
    setZoomLevel(newZoom);
  };

  const zoomOut = () => {
    let newZoom = zoomLevel - 1;
    if (newZoom < 1) newZoom = 1;
    setZoomLevel(newZoom);
  };

  const deselectSlot = () => {
    setSelectedSlot();
  };

  const splitSlot = (selectedSlot) => {
    const activeSlot = slots.find((slot) => slot.id === selectedSlot);
    const halfWidth = Math.floor(activeSlot.numSlots / 2);

    if (halfWidth < 1) return;

    const isOddNumber = halfWidth * 2 !== activeSlot.numSlots;

    const nextSlots = slots.map((slot) => {
      if (slot.id === selectedSlot) {
        slot.numSlots = halfWidth;
      }
      return slot;
    });

    let newSlotId = 1;
    if (slots.length) newSlotId = slots[slots.length - 1].id + 1;

    setSlots([
      ...nextSlots,
      {
        id: newSlotId,
        startInterval: `${parseInt(activeSlot.startInterval) + halfWidth}`,
        numSlots: halfWidth + (isOddNumber ? 1 : 0),
      },
    ]);
  };

  return (
    <header className="header">
      <div className="logo">POC</div>
      {selectedSlot ? (
        <div className="slot-controls">
          <button
            onClick={() => {
              splitSlot(selectedSlot);
            }}
          >
            <SplitSlot /> Split
          </button>
          <button
            onClick={() => {
              deleteSlot(selectedSlot);
              deselectSlot();
            }}
          >
            <TrashBin /> Delete
          </button>
          <button onClick={deselectSlot}>
            <ClearSelection /> Deselect
          </button>
        </div>
      ) : (
        <div className="zoom-controls">
          <button
            onClick={zoomOut}
            className={zoomLevel > 1 ? "enabled" : "disabled"}
          >
            <ZoomOut />
          </button>
          <button
            onClick={zoomIn}
            className={zoomLevel < 3 ? "enabled" : "disabled"}
          >
            <ZoomIn />
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
