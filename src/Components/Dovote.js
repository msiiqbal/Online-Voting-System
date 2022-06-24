import React,{useState,useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as All from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from 'react-router-dom'
import {useForm} from 'react-hook-form'
import axios from 'axios'
import './Voterlogin.css'

function Dovote(){

    let [candidates,setCandidates]= useState([])

    useEffect(()=>{
        axios.get('/candidates')
        .then((res)=>{
             candidates = res.data.payload;
             setCandidates(res.data.payload);
            } )
            .catch(err=>console.log(err.message))
    },[])



    let navigate = useNavigate()

    let {register,handleSubmit,formState:{errors}} = useForm()
    
    let voteGiven=(data)=>{

        axios.put('/update-candidate/'+data.voted)
        .then((res)=>{

        })
        .catch(err=>console.log(err.message)) 
        
        alert("your voted to " + candidates[data.voted].candidateName)
        navigate('/')
    }
    
    return (
        <div className="dovote-container text-center">
            <form  onSubmit={handleSubmit(voteGiven)}>
                <table className="table w-100  text-center">

                    <thead className="table-responsive-xl">
                        <tr>
                        <td className="">Party-Icon</td>
                        <td>Candidate Name</td>
                        <td className="lastRow">Select Vote</td>
                        </tr>   
                    </thead>
                    <tbody>
                { candidates.length>0 &&
                    candidates.map((obj,ind)=><tr key={ind}>
                    <td className="party-icon"> <FontAwesomeIcon icon={All[obj.partyIcon]} style={{color:obj.color}}/> </td>
                    <td className="cadidate-name align-middle">{obj.candidateName}</td>
                    <td className=" text-center align-middle lastRow" > <input type="radio" value={ind}  {...register("voted")} /></td>
                    </tr>)
                }
                </tbody>
            </table>
            <input className="mt-5" type="submit" />
            </form>
        </div>
    )
}

export default Dovote;
