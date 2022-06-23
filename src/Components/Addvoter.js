import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
const axios = require("axios");

function Addvoter() {
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  let validateVoter = (data) => {
    axios.post("/create-voter", data)
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => {console.log(err.message)
      });
  };

  return (
    <div>
      <div className="voterlogin-container">
        <form className="voterlogin-form" name="addvoter" onSubmit={handleSubmit(validateVoter)}    >
          <div className="row">
            <input className="voterlogin-textField col-lg-10 col-md-8 col-sm-12 " name="id" type="text" id="voter-id" placeholder="Enter voter ID" {...register("voterId", { pattern: /^([A-Z]){3}([0-9]){7}?$/g })} />
            {errors.voterId && (<p className="text-danger text-center"> * voter id not valid</p>)}
            <input className="voterlogin-textField col-lg-10 col-md-8 col-sm-12 " name="pass" type="password" id="voter-password" placeholder="Enter Password" {...register("voterPassword", { min: 6 })} />
            {errors.voterId && ( <p className="text-danger text-center">* Invalid password</p> )}
          </div>
          <input className="voterlogin-submit" type="submit" value={"Add user"} />
        </form>
      </div>
    </div>
  );
}
export default Addvoter;
