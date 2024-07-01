/* */

import React, { useState } from "react";

import styled from "styled-components";

import { useLocation } from "react-router-dom";

import { TiTick } from "react-icons/ti";

export default function Stepper() {
  /* */

  const location = useLocation();

  const querySearch = new URLSearchParams(location.search);

  const currentStep = querySearch.get("step");

  const steps = ["Login", "Billing Address", "Summary"];

  const [completed, setCompleted] = useState(false);

  // const [currentStep, setCurrentStep] = useState(1);

  /* */

  return (
    /* */

    <Wrapper>
      {/* */}

      <div className="flex justify-between">
        {/* */}

        {steps?.map((step, index) => (
          /* */

          <div
            key={index}
            className={`step-item ${currentStep === index + 1 && "active"} ${
              (index + 1 < currentStep || completed) && "complete"
            }`}
          >
            <div className="step responsive-step-numbers">
              {index + 1 < currentStep || completed ? (
                <TiTick size={21} />
              ) : (
                index + 1
              )}
            </div>

            <p className="text-gray-600 text-2xl font-sans font-semibold responsive-steps">
              {step}
            </p>
          </div>

          /* */
        ))}

        {/* */}
      </div>

      {/* {!completed && (
        <button
          className="ml-[400px] text-2xl font-sans font-semibold m-4"
          onClick={() => {
            currentStep === steps.length
              ? setCompleted(true)
              : setCurrentStep((previous) => previous + 1);
          }}
        >
          {currentStep === steps.length ? "Finish" : "Next"}
        </button>
      )} */}

      {/* */}
    </Wrapper>

    /* */
  );

  /* */
}

/* **************************************************************************************** */
/* Using media-queries of styled of styled-components we are providing responsiveness for 
   mobile size and storing in a variable Wrapper. This Wrapper will be use to wrap the whole 
   elements we want to return.
*/
/* **************************************************************************************** */

const Wrapper = styled.section`
  /* */

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    /* */

    .responsive-steps {
      font-size: 14px;
      font-weight: bold;
      padding: 3px;
    }

    .responsive-step-numbers {
      z-index: 1;
    }

    /* */
  }

  /* */
`;
