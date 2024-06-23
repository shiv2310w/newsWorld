import React, { useRef, useState } from 'react'
import care from './img/customercare.gif'
import facebook from './img/facebook.png'
import linkedin from './img/linkedin.png'
import whatsapp from './img/whatsapp.png'
import instagram from './img/instagram.png'
import emailjs from '@emailjs/browser'

export default function Contact() {
    document.title = 'Contact'

    const form = useRef()
    const [user, setUser] = useState({ userName: "", userEmail: "" })
    const onChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    const sendEmail = (e) => {
        e.preventDefault();
        document.getElementById("btn-sub").innerText = "waiting..."
        document.getElementById("btn-sub").disabled = true
        emailjs.sendForm("service_sbuml2r", "template_kuhsa8s", form.current, "zlMgfRrKWZfPdVHv8").then((result) => {
            console.log("Message sent!")
            document.getElementById("btn-sub").innerText = "Submit"
            document.getElementById("btn-sub").disabled = false
            setUser({ userName: "", userEmail: "" })
            document.getElementById("text").value = ""
        }, (error) => {
            console.log(error.text);
            console.log("Error sending message, try again!")
        })
    }

    const checkCdn = () => {
        if (String(user.userName).match(/[^a-z]/gi) !== null) {
            setUser({ userName: String(user.userName).slice(0, user.userName.length - 1) });
        }
    }


    return (
        <>
            <div className="container">
                <div className="contactHeading df">
                    <p>Contact Us</p>
                </div>
                <div className="contactContent df">
                    <div className="contactC df">
                        <div className="contact df">
                            <div className="form df">
                                <form ref={form} onSubmit={sendEmail}>
                                    <div className="input df">
                                        <label htmlFor="name">Enter name</label>
                                        <input type="text" onKeyUp={checkCdn} name="userName" id="name" value={user.userName} onChange={onChange} placeholder="Enter name" className="cominp" required />
                                    </div>
                                    <div className="input df">
                                        <label htmlFor="email">Enter email</label>
                                        <input type="email" name="userEmail" id="email" value={user.userEmail} onChange={onChange} placeholder="Enter email" className="cominp" required />
                                    </div>
                                    <div className="input df">
                                        <label htmlFor="text">Enter your text </label>
                                        <textarea name="message" id="text" placeholder="Enter your text" required></textarea>
                                    </div>
                                    <button type="submit" className="btn-sub" id='btn-sub'>Submit</button>
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
                                <img src={whatsapp} alt="whatsapp" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
