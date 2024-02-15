import React, { useState } from 'react'
import care from './img/customercare.gif'
import facebook from './img/facebook.png'
import linkedin from './img/linkedin.png'
import whatsapp from './img/whatsapp.png'
import instagram from './img/instagram.png'

export default function Contact() {
    document.title = 'Contact'
    
    function onChangehanlderName(event){
        setName(event.target.value)
    }
    function onChangehanlderEmail(event){
        setEmail(event.target.value)
    }
    function onChangehanlderText(event){
        setText(event.target.value)
    }
    
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [text, setText] = useState("")

    const btnSubmit = async(e)=>{
        e.preventDefault();//for method=post
        localStorage.setItem(email,JSON.stringify({Name:name,Text:text}))
        setEmail("")
        setName('')
        setText('')
    }

    return (
        <>
            <div className="aboutContainer">
                <div className="contactHeading df">
                    <p>Contact Us</p>
                </div>
                <div className="contactContent df">
                    <div className="contactC df">
                        <div className="contact df">
                            <div className="form df">
                                <form onSubmit={btnSubmit} method='post'>
                                    <div className="input df">
                                        <label htmlFor="name">Enter name</label>
                                        <input type="text" name="name" id="name" value={name} onChange={onChangehanlderName} placeholder="Enter name" className="cominp" required />
                                    </div>
                                    <div className="input df">
                                        <label htmlFor="email">Enter email</label>
                                        <input type="email" name="email" id="email" value={email} onChange={onChangehanlderEmail} placeholder="Enter email" className="cominp" required />
                                    </div>
                                    <div className="input df">
                                        <label htmlFor="text">Enter your text </label>
                                        <textarea name="text" id="text" value={text} onChange={onChangehanlderText} placeholder="Enter your text" required></textarea>
                                    </div>
                                    <button type="submit" className="btn-sub">Submit</button>
                                </form>
                            </div>
                            <div className="imgBox df">
                                <img src={care} alt="" />
                            </div>
                        </div>
                        <div className="copyright df">
                            <p>COPYRIGHT BY &copy; BRATADIPTA MONDAL</p>
                            <div className="imagesContact df">
                                <img src={facebook} alt="facebook" />
                                <img src={linkedin} alt="linkedin" />
                                <img src={instagram} alt="instagram" />
                                <img src={whatsapp} alt="whatsapp"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
