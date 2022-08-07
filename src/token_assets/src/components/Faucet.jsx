import React, { useState } from "react";
import {token,canisterId,createActor} from "../../../declarations/token"
import { AuthClient } from "@dfinity/auth-client";

function Faucet() {

  const [isDisabled,setDisable] = useState(false);
  const[buttomText,setText] = useState("Gimme gimme");

  async function handleClick(event) {
    setDisable(true)

    const authClient = await AuthClient.create();
  const identity = await authClient.getIdentity();

  const authenticatedCanister = createActor(canisterId,{
    agentOptions : {
      identity, 
    },
  });

    const result = await authenticatedCanister.payOut();
    setText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          🚰
        </span>
        Faucet
      </h2>
      <label>Get your free tokens here! Claim 10,000 TERA tokens to your account.</label>
      <p className="trade-buttons">
        <button 
        id="btn-payout" 
        onClick={handleClick}
        disabled={isDisabled}
        >
          {buttomText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
