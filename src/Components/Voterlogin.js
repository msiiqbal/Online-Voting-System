import './Voterlogin.css'
import React from "react";
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';

function Voterlogin(){
    let {register,handleSubmit,formState:{errors}}=useForm()
    let navigate=useNavigate()
    let  validateVoter =(data)=>{
        axios.post('/voter-login',data)
        .then(res=>{
            if(res.data.message=="login successful"){
                navigate('/vote')
            }
            else{
                alert("invalid credentials")
            }
        })
        .catch(err=>{console.log(err)})
    }

    return(
        <div>
            <h2 className="display-3 text-center"> Login to vote</h2>

        <div className="voterlogin-container">
            <form className='voterlogin-form'  onSubmit={handleSubmit(validateVoter)} >
                <div className='row'>
                <input  className="voterlogin-textField col-lg-10 col-md-8 col-sm-12 "  name="id"  type="text"  id="voter-id"
              placeholder="Enter voter ID" {...register("voterId", { pattern: /^([A-Z]){3}([0-9]){7}?$/g })}/>
            {errors.voterId && (<p className="text-danger text-center"> * voter id not valid</p>)}
            <input  className="voterlogin-textField col-lg-10 col-md-8 col-sm-12 "  name="pass"  type="password"  id="voter-password"  placeholder="Enter Password"  {...register("voterPassword", { min: 6 })}    />
                </div>
                <input className='voterlogin-submit' type="submit" />
            </form>
        </div>
        </div>
    );
}
export default Voterlogin;