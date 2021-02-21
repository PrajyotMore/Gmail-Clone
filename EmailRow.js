import { IconButton } from '@material-ui/core';
import React from 'react';
import './EmailRow.css';
import Checkbox from '@material-ui/core/Checkbox';
import StarBorderOutlinedIcon from '@material-ui/icons/StarBorderOutlined';
import LabelImportantOutlinedIcon from '@material-ui/icons/LabelImportantOutlined';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { selectedMail } from './features/mailSlice';
import { db } from './firebase';


function EmailRow({ id, title, subject, description, time, isRead}){
    const history = useHistory();
    const dispatch = useDispatch();

    const openMail =() => {

        db.collection('emails').doc(id).update({
            isRead: true
        });
        dispatch(
             selectedMail({
                id, 
                title, 
                subject, 
                description, 
                time,
             })
        );

        history.push("/mail");
    };

    return (
        
        <div onClick={openMail} className={`emailRow ${isRead && 'emailRow_notSeen'}`}>
            <div className="emailRow__options">
            <Checkbox/>
            <IconButton>
            <StarBorderOutlinedIcon/>
            </IconButton>
            <IconButton>
            <LabelImportantOutlinedIcon/>
            </IconButton>
            </div>

            <h3 className="emailRow__title">
                {title}
            </h3>

            <div className="emailRow__message">
                <h4>{subject} 
                <span className="emailRow__description">-
                       {description}
                   </span>
                </h4>
                  
                
            </div>
            <p className="emailRow__time">
                {time}
            </p>
        </div>
        
    )
}

export default EmailRow
