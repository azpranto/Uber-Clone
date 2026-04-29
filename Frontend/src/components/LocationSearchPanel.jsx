import React from "react";

const LocationSearchPanel = (props) => {

  const locations = [
    {
      name: "San Francisco International Airport",
      address: "SFO, Terminal 1"
    },
    {
      name: "Union Square",
      address: "San Francisco, CA"
    },
    {
      name: "Fisherman's Wharf",
      address: "San Francisco, CA"
    }
  ];

  const clickHandle = (e) => {
    e.stopPropagation(); 
    props.setPanelOpen(false);
    props.setVehiclePanelOpen(true);
  }

  return (
    <div>
      {locations.map((location, index) => (
        <div key={index} onClick={(e) => clickHandle(e)} className="p-4 border rounded-2xl border-t-gray-100 border-white active:border-black active:border">
          <div className="flex items-center gap-4 p-3 border-b border-gray-50">
            <i className="ri-map-pin-2-fill text-gray-600"></i>
            <div>
              <p className="font-medium">{location.name}</p>
              <p className="text-sm text-gray-400">{location.address}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LocationSearchPanel;

