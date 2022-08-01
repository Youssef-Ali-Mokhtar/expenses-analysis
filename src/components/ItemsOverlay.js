import "./ItemsOverlay.css";
import OverlayContent from "./OverlayContent";
const ItemsOverlay = (props) => {
  const setOverlayOff = () => {
    props.onOverlay(false);
  };
  console.log();
  return (
    <div className="items-overlay" onClick={setOverlayOff}>
      <div className="monthly-items-holder">
        {/* {props.filteredMonths.map((element) => {
          return (
            <h2 key={Math.round(Math.random() * 10000)}>
              {element[props.indices.product]} {element[props.indices.price]}
              {" " + element[props.indices.date].getFullYear()}
            </h2>
          );
        })} */}

        {props.filteredMonths.map((element) => {
          return (
            <OverlayContent
              key={Math.round(Math.random() * 10000)}
              filteredMonths={element}
              indices={props.indices}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ItemsOverlay;
