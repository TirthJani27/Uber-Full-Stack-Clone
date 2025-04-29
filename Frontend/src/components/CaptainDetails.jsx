import React from "react";

const CaptainDetails = () => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-start gap-3">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fHww"
            alt=""
          />
          <h4 className="text-lg font-medium">Harsh Patel</h4>
        </div>
        <div>
          <div className="text-xl font-semibold ">$295.20</div>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>
      <div className="flex p-3 mt-6 bg-gray-100 rounded-xl justify-center gap-4">
        <div className="text-center">
          <i className="ri-timer-2-line mb-2 font-extralight text-3xl"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600"> Hours Online</p>{" "}
        </div>
        <div className="text-center">
          <i className="ri-speed-up-line mb-2 font-extralight text-3xl"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600"> Hours Online</p>{" "}
        </div>
        <div className="text-center">
          <i className="ri-booklet-line mb-2 font-extralight text-3xl"></i>
          <h5 className="text-lg font-medium">10.2</h5>
          <p className="text-sm text-gray-600"> Hours Online</p>{" "}
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
