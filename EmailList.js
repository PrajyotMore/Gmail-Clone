import React, { useEffect } from 'react';
import { Checkbox, IconButton } from '@material-ui/core';
import './EmailList.css';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import RedoIcon from '@material-ui/icons/Redo';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardHideIcon from '@material-ui/icons/KeyboardHide';
import SettingsIcon from '@material-ui/icons/Settings';
import InboxIcon from '@material-ui/icons/Inbox';
import Section from './Section';
import PeopleIcon from '@material-ui/icons/People';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import EmailRow from './EmailRow';
import { useState } from 'react';
import { db } from './firebase';


export default function EmailList() {

    const [emails, setEmails] = useState([]);     // useing emails, setEmails as state

    useEffect(() => {                /*useEffect is a hook it says that run that piece of code ones when emaillist component loads*/

                                     /*whenever there is updation or deletion or insertion operation happen onSnapshot will be fired off in database and will take snapshot once its fired off it will then setEmails and map those doc and will return an object that will be id, and data*/

        db.collection("emails")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => 
        setEmails(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        )
        );
    }, []);
    
    return (
        <div className="emailList">
            <div className="emailList__settings">
                <div className="emailList__settingsLeft">
                    <Checkbox/>
                    <IconButton>
                        <ArrowDropDownIcon />
                    </IconButton>
                    <IconButton>
                        <RedoIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                </div>
                <div className="emailList__settingsRight">
                    <IconButton>
                        <ChevronLeftIcon/>
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon/>
                    </IconButton>
                    <IconButton>
                    <KeyboardHideIcon/>
                    </IconButton>
                    <IconButton>
                    <SettingsIcon/>
                    </IconButton>
                </div>
            </div>
            <div className="emailList__sections">
                <Section Icon={InboxIcon} title="Primary" color="red" selected />
                <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
                <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
            </div>

            <div className="emailList__list">
                {emails.map(({id, data: { to, subject, message, timestamp, isRead
                }}) => (
                    <EmailRow 
                        id={id}
                        key={id}
                        title={to}
                        subject={subject}
                        description={message}
                        time={new Date(timestamp?.seconds * 1000).toUTCString()}
                        isRead ={isRead}
                    />
                ))}
                <EmailRow 
                title = "Twitch"
                subject = "Hey Gmail Clone!!!!!!!!!!!!!"
                description = "Testing clones "
                time = "11pm"
                />
                 <EmailRow 
                title = "Facebook"
                subject = "Hey facebook Clone!!!!!!!!!!!!!"
                description = " FacebookTesting clones "
                time = "12pm"
                />
               

            </div>


            
        </div>
    )
}
