import React from "react";
import { MdCall } from "react-icons/md";
import { BsFillChatDotsFill } from "react-icons/bs";
import { HiChatBubbleBottomCenter } from "react-icons/hi2";

const Contact = () => {
    return (
        <section id="contact-us" className="w-full flex justify-center py-16 px-4">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row justify-between items-center gap-10">
                {/* Left Side */}
                <div className="flex flex-col gap-2 flex-1">
                    <span className="text-orange-500 font-semibold text-lg">Our Contact Us</span>
                    <span className="text-3xl md:text-4xl font-bold text-gray-800">Easy to contact us</span>
                    <span className="text-gray-600">
                        We are always ready to help by providing the best services for you. <br />
                        We believe a good place to live can make your life better.
                    </span>

                    {/* Contact Modes */}
                    <div className="flex flex-col gap-6 mt-8 w-full">
                        {/* First Row */}
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <ContactMode
                                icon={<MdCall size={25} />}
                                title="Call"
                                detail="021 123 145 14"
                                buttonText="Call now"
                            />
                            <ContactMode
                                icon={<BsFillChatDotsFill size={25} />}
                                title="Chat"
                                detail="021 123 145 14"
                                buttonText="Chat now"
                            />
                        </div>

                        {/* Second Row */}
                        <div className="flex flex-col md:flex-row gap-6 w-full">
                            <ContactMode
                                icon={<BsFillChatDotsFill size={25} />}
                                title="Video Call"
                                detail="021 123 145 14"
                                buttonText="Video Call now"
                            />
                            <ContactMode
                                icon={<HiChatBubbleBottomCenter size={25} />}
                                title="Message"
                                detail="021 123 145 14"
                                buttonText="Message now"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Side */}
                {/* Right Side */}
                <div className="flex-1 flex justify-center items-start">
                    <div className="w-100 h-[30rem] overflow-hidden rounded-t-[18rem] border-[6px] border-gray-200 flex justify-center">
                        <img
                            src="./contact.jpg"
                            alt="Contact"
                            className="w-full h-full object-cover "
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

const ContactMode = ({ icon, title, detail, buttonText }) => {
    return (
        <div className="flex flex-col gap-4 p-6 w-full md:w-64 border border-gray-300 rounded-lg hover:scale-105 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center gap-4">
                <div className="flex justify-center items-center p-2 bg-blue-100 rounded-full text-blue-500">
                    {icon}
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-800">{title}</span>
                    <span className="text-sm text-gray-500">{detail}</span>
                </div>
            </div>
            <button className="w-full py-2 rounded-md bg-blue-100 text-blue-600 font-semibold text-sm hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-600 hover:text-white transition-all duration-300">
                {buttonText}
            </button>
        </div>
    );
};

export default Contact;
