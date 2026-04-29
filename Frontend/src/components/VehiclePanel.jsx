import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { HiCurrencyBangladeshi } from "react-icons/hi";

const VehiclePanel = ({ vehiclePanelRef, setVehiclePanelOpen, setConfirmedVehicleOpen, setChosenVehicle }) => {

  useGSAP(() => {
    Observer.create({
      target: vehiclePanelRef.current, // The draggable area
        type: "wheel,touch,pointer",  // Listen for mouse wheel, touch, or pointer
        onDown: () => {
          gsap.to(vehiclePanelRef.current, {
            translateY: "100%",
            duration: 0.5,
            ease: "power2.in"
          });
          setVehiclePanelOpen(false);
        },
        tolerance: 50, // Minimum movement before triggering
        preventDefault: true
    })
  })

  return (
    <div
      ref={vehiclePanelRef}
      className="fixed bottom-0 z-20 bg-white rounded-t-3xl p-5 pb-10 pt-10 shadow-lg w-full gap-4 flex flex-col items-center justify-end translate-y-full"
    >
      <div className="bg-gray-300 w-1/4 h-1 rounded-full mb-5"></div>
      <div onClick={() => {setConfirmedVehicleOpen(true); setChosenVehicle("Car");}} className="flex w-full items-center justify-between gap-2 border border-white active:border-black active:border rounded-xl p-3 ">
        <img
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8zMDUxZTYwMi0xMGJiLTRlNjUtYjEyMi1lMzk0ZDgwYTljNDcucG5n"
          alt="Uber-Car"
          className="w-24"
        />

        <div className="w-1/2">
          <h4 className="text-2xl font-semibold inline-flex items-center gap-2">
            UberGo{" "}
            <span className="text-gray-500 text-sm">
              <i className="ri-user-fill"></i>4
            </span>
          </h4>
          <h5 className="text-gray-900 text-md">2 mins away</h5>
          <p className="text-gray-500 text-sm">Affordable, comfortable ride</p>
        </div>

        <div className="flex items-center gap-2">
          <HiCurrencyBangladeshi className="text-2xl" />
          <h4 className="text-2xl font-semibold"> 120</h4>
        </div>
      </div>

      <div onClick={() => {setConfirmedVehicleOpen(true); setChosenVehicle("Moto");}} className="flex w-full items-center justify-between gap-2 rounded-xl p-3 border border-white active:border-black active:border">
        <img
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=368/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
          alt="Moto"
          className="w-24"
        />

        <div className="w-1/2">
          <h4 className="text-2xl font-semibold inline-flex items-center gap-2">
            Moto{" "}
            <span className="text-gray-500 text-sm">
              <i className="ri-user-fill"></i>1
            </span>
          </h4>
          <h5 className="text-gray-900 text-md">9 mins away</h5>
          <p className="text-gray-500 text-sm">Affordable, quick rides</p>
        </div>

        <div className="flex items-center gap-2">
          <HiCurrencyBangladeshi className="text-2xl" />
          <h4 className="text-2xl font-semibold"> 50</h4>
        </div>
      </div>

      <div onClick={() => {setConfirmedVehicleOpen(true); setChosenVehicle("CNG");}} className="flex w-full items-center justify-between gap-2 rounded-xl p-3 border border-white active:border-black active:border">
        <img
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt="CNG"
          className="w-24"
        />

        <div className="w-1/2">
          <h4 className="text-2xl font-semibold inline-flex items-center gap-2">
            CNG{" "}
            <span className="text-gray-500 text-sm">
              <i className="ri-user-fill"></i>2
            </span>
          </h4>
          <h5 className="text-gray-900 text-md">5 mins away</h5>
          <p className="text-gray-500 text-sm">Very affordable, quick rides</p>
        </div>

        <div className="flex items-center gap-2">
          <HiCurrencyBangladeshi className="text-2xl" />
          <h4 className="text-2xl font-semibold"> 80</h4>
        </div>
      </div>
    </div>
  );
};

export default VehiclePanel;
