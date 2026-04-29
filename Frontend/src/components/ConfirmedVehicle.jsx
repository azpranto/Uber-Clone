import React from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/all";

const ConfirmedVehicle = ({ confirmedVehicleRef, setConfirmedVehicleOpen, chosenVehicle, setRideConfirmed }) => {

  const vehicleImages = {
    Moto: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n",
    CNG: "https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png",
    Car: "https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n"
  };
  
  useGSAP(() => {
    Observer.create({
      target: confirmedVehicleRef.current,
      type: "wheel,touch,pointer",
      onDown: () => {
        gsap.to(confirmedVehicleRef.current, {
          y: "100%",
          duration: 0.5,
          ease: "power2.in"
        })
        setConfirmedVehicleOpen(false);
      },
      tolerance: 50,
      preventDefault: true
    })
  })
  return (
    <div
      ref={confirmedVehicleRef}
      className="fixed bottom-0 z-20 bg-white rounded-t-3xl pb-10 pt-10 shadow-lg w-full gap-4 flex flex-col items-center justify-end translate-y-full"
    >
      <div className="bg-gray-300 w-1/4 h-1 rounded-full mb-5"></div>
      <div className="flex flex-col items-center gap-2 w-full">
        <h3 className="text-3xl font-semibold mb-8">Confirm your ride</h3>
        <img src={vehicleImages[chosenVehicle]} alt={chosenVehicle} className="w-24 z-10" />
        <div className="relative flex gap-2 w-full items-center justify-center mb-20">
          <div className="absolute z-5 -top-18 w-40 h-15 bg-blue-100 rounded-full"></div>
          <div className="absolute z-4 -top-18 w-55 h-20 bg-blue-50 rounded-full"></div>
        </div>
        
        <div className="flex items-center gap-2 w-full h-fit pt-1 border-t-2 border-gray-200">
          <i className="ri-map-pin-2-fill text-2xl w-[13%] p-2 text-center ml-2"></i>
          <div className="flex flex-col w-[87%] h-full p-3 pl-0">
            <h4 className="text-xl font-semibold">Current Location</h4>
            <p className="text-sm text-gray-500">Pickup Location</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full h-fit">
          <i className="ri-square-fill text-2xl w-[13%] p-2 text-center ml-2"></i>
          <div className="flex flex-col w-[87%] h-full p-3 pl-0  border-t-2 border-gray-200">
            <h4 className="text-xl font-semibold">Confirmed Location</h4>
            <p className="text-sm text-gray-500">Destination</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full h-fit">
          <i className="ri-bank-card-fill text-2xl w-[13%] p-2 text-center ml-2"></i>
          <div className="flex flex-col w-[87%] h-full p-3 pl-0  border-t-2 border-gray-200">
            <h4 className="text-xl font-semibold">Net Amount</h4>
            <p className="text-sm text-gray-500">Payment Method</p>
          </div>
        </div>

        <button onClick={() => { setRideConfirmed(true); setConfirmedVehicleOpen(false); }} className="bg-black text-white px-6 py-3 m-4 mt-8 w-1/2 rounded-3xl font-semibold text-lg">Confirm Ride</button>
      </div>
    </div>
  );
};

export default ConfirmedVehicle;
