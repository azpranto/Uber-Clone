import React, { useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "gsap/all";
import 'remixicon/fonts/remixicon.css';
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedVehicle from "../components/ConfirmedVehicle";
import WaitForRider from "../components/WaitForRider";
import LookingForDriver from "../components/LookingForDriver";

// Register the plugin
gsap.registerPlugin(Observer);

const MainPage = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [confirmedVehicleOpen, setConfirmedVehicleOpen] = useState(false);
  const [chosenVehicle, setChosenVehicle] = useState(null);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const containerRef = useRef(null); // Ref for the draggable area
  const vehiclePanelRef = useRef(null);
  const confirmedVehicleRef = useRef(null);
  const lookingForDriverRef = useRef(null);

  // Handle the height animations
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        padding: 24,
        duration: 0.5,
        ease: "power2.out"
      });
      gsap.to(panelCloseRef.current, { opacity: 1 });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        padding: 0,
        duration: 0.5,
        ease: "power2.in"
      });
      gsap.to(panelCloseRef.current, { opacity: 0 });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        translateY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        translateY: "100%",
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [vehiclePanelOpen]);
  
  useGSAP(() => {
    if (confirmedVehicleOpen) {
      gsap.to(confirmedVehicleRef.current, {
        translateY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(confirmedVehicleRef.current, {
        translateY: "100%",
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [confirmedVehicleOpen]);

  useGSAP(() => {
    if (rideConfirmed) {
      gsap.to(lookingForDriverRef.current, {
        translateY: 0,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(lookingForDriverRef.current, {
        translateY: "100%",
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [rideConfirmed]);

  // Handle the Drag Down Gesture
  useGSAP(() => {
    if (panelOpen) {
      Observer.create({
        target: containerRef.current, // The draggable area
        type: "wheel,touch,pointer",  // Listen for mouse wheel, touch, or pointer
        onDown: () => {
          setPanelOpen(false); // Close when dragging/swiping DOWN
        },
        tolerance: 50, // Minimum movement before triggering
        preventDefault: true,
      });
    }
  }, [panelOpen]);

  return (
    <div className="h-screen w-screen overflow-hidden relative bg-gray-200">
      {/* Background Map Placeholder */}
      <div className="h-full w-full bg-blue-100 flex items-center justify-center">
        <p className="text-gray-500">Map View</p>
      </div>

      {/* Control Panel Container (The Parent) */}
      <div 
        
        className="flex flex-col justify-end absolute bottom-0 w-full h-screen pointer-events-none"
      >
        
        {/* Form Section */}
        <div ref={containerRef} className="h-[30%] p-5 bg-white relative z-20 pointer-events-auto rounded-t-3xl shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
          {/* Drag Handle UI */}
          <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
          
          <h5 
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute top-8 right-6 text-2xl opacity-0 cursor-pointer"
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>

          <h4 className="text-2xl font-semibold">Find a ride</h4>
          
          <form className="relative flex flex-col gap-4 mt-5">
            <input
              onClick={() => setPanelOpen(true)}
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="bg-[#eee] px-12 py-3 rounded-lg w-full outline-none"
              type="text"
              placeholder="Add a pick-up location"
            />
            <input
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="bg-[#eee] px-12 py-3 rounded-lg w-full outline-none"
              type="text"
              placeholder="Enter your destination"
            />
          </form>
        </div>

        {/* Suggestion Panel */}
        <div ref={panelRef} className="bg-white h-0 z-10 pointer-events-auto overflow-hidden">
             <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanelOpen={setVehiclePanelOpen} />
        </div>
      </div>

      <VehiclePanel vehiclePanelRef={vehiclePanelRef} setVehiclePanelOpen={setVehiclePanelOpen} setConfirmedVehicleOpen={setConfirmedVehicleOpen} setChosenVehicle={setChosenVehicle} />

      <ConfirmedVehicle confirmedVehicleRef={confirmedVehicleRef} setConfirmedVehicleOpen={setConfirmedVehicleOpen} chosenVehicle={chosenVehicle} setRideConfirmed={setRideConfirmed} />
      
      <LookingForDriver lookingForDriverRef={lookingForDriverRef} chosenVehicle={chosenVehicle} />

      <WaitForRider />
    </div>
  );
};

export default MainPage;