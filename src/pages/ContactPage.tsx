import { FormEvent, useState } from "react";
import { GiTacos } from "react-icons/gi";


export const ContactPage = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [messageError, setMessageError] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        setNameError("");
        setEmailError("");
        setMessageError("");

        let isValid = true;

        if (!name) {
            setNameError("A name is required");
            isValid = false;
        }

        if (!email.includes("@")) {
            setEmailError("An email address is required");
            isValid = false;
        }

        if (!message) {
            setMessageError("A message is required");
            isValid = false;
        }

        if (isValid) {
            alert("Thanks for your message!");
            setName("");
            setEmail("");
            setMessage("");
        }
    };







    return (
        <section className="min-h-screen p-4 flex flex-col items-center bg-purple font-denk-one">
            <h1 className="flex items-center text-yellow font-bold mb-24 mt-6 gap-2 text-5xl">
                <span>Contact us</span>
                <GiTacos className="text-[var(--text-4xl)]" />
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-5xl">
                <form onSubmit={handleSubmit} className=" bg-white p-4 rounded-md shadow-md flex flex-col font-rajdhani">

                    <div className="mb-5">
                        <label htmlFor="name" className="block font-semibold mb-2 text-blue">
                            Name
                        </label>
                        <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-neon-pink
                border-orange"
                            placeholder="Your name" />
                        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="block font-semibold mb-2 text-blue">
                            E-mail
                        </label>
                        <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-neon-pink
                border-orange"
                            placeholder="name@example.com" />
                        {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
                    </div>

                    <div className="mb-5">
                        <label htmlFor="message" className="block font-semibold text-blue mb-2">
                            Message
                        </label>
                        <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)}
                            rows={4}
                            className="border rounded w-full p-3 focus:outline-none focus:ring-2 focus:ring-neon-pink
                border-orange"
                            placeholder="Write your message here..." />
                        {messageError && <p className="text-red-500 text-sm">{messageError}</p>}
                    </div>
                    <button type="submit" className="bg-pink hover:bg-neon-pink transition-all duration-200 text-white py-2 px-6 rounded-md font-semibold">
                        Send
                    </button>
                </form>


                <div className="flex justify-center items-center bg-white rounded-md shadow-md">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6917.442987273785!2d18.065538202726405!3d59.324981821963775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f77e2669ff92b%3A0x2600fef435168b11!2sGamla%20stan%2C%20S%C3%B6dermalm%2C%20Stockholm!5e1!3m2!1sen!2sse!4v1739399348572!5m2!1sen!2sse" className="w-full h-96 border-0 rounded-md" allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>

        </section>
    );
}; 
