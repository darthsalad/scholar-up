import React, { useState, useEffect } from 'react';
import "./Student.css"
import ReactRoundedImage from "react-rounded-image";
import student from "./student.jpg"
import student2 from "./student2.png"
import { useParams } from 'react-router-dom';
import {auth} from "../../firebase.config"
import { useAuthState } from "react-firebase-hooks/auth"
import { useStyles } from "./Student.styles";
const Student = () => {
    const { classes } = useStyles();
    let {id}= useParams();
    console.log(id);
    const [data , setData]=useState();
    const [user, loading] = useAuthState(auth);
    console.log(user)
    useEffect(()=>{
        /*****
         * 
         * 
        */
    },[])
    return (
        <div className={`${classes.studentContainer} studentContainer py-3`}>
            <div className={`${classes.tag} tag`}>
                <div className='container'>
                    <h4>
                        Student Profile {'>>'}
                    </h4>
                </div>
            </div>
            <div className='container '>
                <div className='row my-4 g-2 gx-3'>
                    <div className='col-12 col-lg-4' >
                        <div className={`${classes.left} left`}>
                            <div className='top'>
                                <ReactRoundedImage
                                    image={student2}
                                    imageWidth="150"
                                    imageHeight="150"
                                    roundedColor="#f0f0f0"
                                />
                            </div>
                            <div className='bottom'>
                                <p className={`${classes.textLeft} name`}>JOHN DOE</p>
                                <p className={`${classes.textLeft} other`}>Gender : Male</p>
                                <p className={`${classes.textLeft} other`}>DOB : 19-04-2002</p>
                                <p className={`${classes.textLeft} other`}>8112233404</p>
                            </div>
                        </div>

                    </div>
                    <div className='col-12 col-lg-8'>
                        <div className={`${classes.left} right py-2`}>
                            <div className='row my-2 px-2'>
                                <div className='col-4 col-md-3 leftt'>
                                  Full Name  
                                </div>
                                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                                  John Doe
                                </div>
                            </div>
                            <hr/>
                            <div className='row mb-2 px-2'>
                                <div className='col-4 col-md-3 leftt'>
                                    College ID
                                </div>
                                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                                    B193004
                                </div>
                            </div>
                            <hr/>
                            <div className='row mb-2 px-2'>
                                <div className='col-4 col-md-3 leftt'>
                                    Email
                                </div>
                                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                                    JohnDoe@gmail.com
                                </div>
                            </div>
                            <hr/>
                            <div className='row mb-2 px-2'>
                                <div className='col-4 col-md-3 leftt'>
                                    College
                                </div>
                                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                                   Internation Institute of Information and technology , Bhubneshwar
                                </div>
                            </div>
                            <hr/>
                            <div className='row mb-2 px-2'>
                                <div className='col-4 col-md-3 leftt'>
                                    Scholarship
                                </div>
                                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                                    Scholarship program for student under minsity of Education and research.
                                </div>
                            </div>
                            <hr/>
                            <div className='row mb-2 px-2'>
                                <div className='col-4 col-md-3 leftt'>
                                    Address
                                </div>
                                <div className={`${classes.rightt} col-8 col-md-9 rightt`}>
                                   House no-455 , Gothapatna , Bhubneshwar , Odisha
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>


    )
}

export default Student