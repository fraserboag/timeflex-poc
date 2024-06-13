import "../styles/Header.scss";
import { ClearSelection, TrashBin, ZoomOut, ZoomIn } from "./Icons";

function Header({
  zoomLevel,
  setZoomLevel,
  selectedSlot,
  setSelectedSlot,
  deleteSlot,
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

  return (
    <header className="header">
      <div className="logo">POC</div>
      {selectedSlot ? (
        <div className="slot-controls">
          <button
            onClick={() => {
              deleteSlot(selectedSlot);
              deselectSlot();
            }}
            className="delete-slot"
          >
            <TrashBin /> Delete
          </button>
          <button onClick={deselectSlot}>
            <ClearSelection /> Clear Selection
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
