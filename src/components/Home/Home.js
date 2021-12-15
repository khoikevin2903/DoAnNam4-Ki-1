import React from 'react';
import fmd from '../../image/fmd.png';
import arrow from '../../image/arrow.svg';
import './Home.scss';
import faceMask from '../../image/face-mask.png';
import video from '../../video/production ID_4206497.mp4';
import { useState } from 'react';
import Khoi from '../../image/Khoi.jpg';
import Loan from '../../image/Loan.png';
import Hieu from '../../image/Hieu.jpg';


function Home(props) {

    const [openForm, setOpenForm] = useState(false);

    return (
        <div className="">
            {
                openForm && <div className="fixed py-6 right-4 z-10 bottom-28 bg-white rounded-xl shadow-xl w3-animate-right">
                    <div className="relative">
                        <div className="flex justify-between items-center pb-3 border-b border-gray-300 px-6">
                            <p className="font-medium text-2xl">Team Member</p>
                            <div className="text-3xl text-gray-300 cursor-pointer" onClick={() => setOpenForm(false)}>
                                <ion-icon name="chevron-down-outline"></ion-icon>
                            </div>
                        </div>

                        <div className="py-6 px-8 pr-10">
                            <div className="flex items-center">
                                <img class="inline-block h-14 w-14 rounded-full ring-2 ring-white mr-3"
                                    src={Hieu} alt="" />
                                <div>
                                    <p className="font-medium">Lê Thị Lưu Hiếu</p>
                                    <p className="text-sm text-gray-400">lethiluuhieu@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-6">
                                <img class="inline-block h-14 w-14 rounded-full ring-2 ring-white mr-3"
                                    src={Khoi} alt="" />
                                <div>
                                    <p className="font-medium">Trần Anh Khôi</p>
                                    <p className="text-sm text-gray-400">khoikevin2903@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex items-center mt-6">
                                <img class="inline-block h-14 w-14 rounded-full ring-2 ring-white mr-3"
                                    src={Loan} alt="" />
                                <div>
                                    <p className="font-medium">Thái Thị Thu Loan</p>
                                    <p className="text-sm text-gray-400">thloanth.dut@gmail.com</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            }
            <div className="fixed bottom-4 right-4 z-10">
                <div className="flex items-center">
                    <div className="" onClick={() => setOpenForm(!openForm)}>
                        <div className="message-container mr-4">
                            <span className="online"></span>
                            <p>Information of our team</p>
                        </div>
                    </div>

                    <div className={`${openForm ? "launcher-container-2" : "launcher-container-1"}`}>

                        {!openForm ?
                            <span onClick={() => setOpenForm(!openForm)}>
                                <img
                                    src={faceMask}
                                    alt=""
                                    className="h-16 w-16 shadow"
                                />
                            </span>

                            : <div class="launcher-stripes" onClick={() => setOpenForm(!openForm)}>
                                <span className="trengo_launcher state--open">
                                    <span className="close-button"></span>
                                </span>
                            </div>}
                    </div>
                </div>
            </div>
            <section className="header-content">
                <div className="header-content__container wrapper">
                    <div className="header-content__inner">
                        <h1 className="header-content__caption">
                            Face Mask Detection
                        </h1>
                        <h2 className="header-content__title">
                            Introduction: Technology to recognize people not wearing masks
                        </h2>
                        <p className="header-content__text">
                            Due to the effect of COVID19 pandemic, wearing a mask in public is significantly important.
                            We provide solutions for malls, supermarkets, theatres,... to recognize whom not wearing masks.
                            We hope that this website can make some changes in our fight against the pandemic
                        </p>
                        <p className="header-content-button header-content-button__blue">
                            <span className="button_text">Try it yourself</span>
                            <div className="text-white flex items-center text-xl">
                                <ion-icon name="arrow-forward-outline"></ion-icon>
                            </div>
                        </p>
                    </div>

                    <div className="header-content__image">
                        <img className="image" src={fmd} loading="lazy" width="100%" height="auto" alt="Sumsub Liveness Solution" />
                    </div>
                </div>
            </section>

            <section className="feature-first-section">
                <div className="container">
                    <div className="row">
                        <div>
                            <h2><ion-icon name="alarm"></ion-icon>
                                4sec</h2>
                            <p>Average recognition time</p>
                        </div>
                        <div>
                            <h2> <ion-icon name="terminal"></ion-icon>
                                5min</h2>
                            <p>To get used to our system</p>
                        </div>
                        <div>
                            <h2><ion-icon name="aperture"></ion-icon>
                                96%
                            </h2>
                            <p>Accuracy rate</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="personalized">
                <div className="container">
                    <div className="row">
                        <div className="box-style">
                            <div className="box-icon-style">
                                <ion-icon name="alarm"></ion-icon>
                            </div>
                            <div className="box-content-style">
                                <h4>Fast, user-friendly system </h4>
                                <p>Just one simple step, everyone can use the product</p>
                            </div>
                        </div>
                        <div className="box-style">
                            <div className="box-icon-style">
                                <ion-icon name="person-circle"></ion-icon>
                            </div>
                            <div className="box-content-style">
                                <h4>Easily expandable system</h4>
                                <p>We can help you to customize for your own enterprise</p>
                            </div>
                        </div>
                        <div className="box-style">
                            <div className="box-icon-style">
                                <ion-icon name="diamond"></ion-icon>
                            </div>
                            <div className="box-content-style">
                                <h4>User authentication system</h4>
                                <p>Help administrators can easily manage and use the application</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="how-it-work">
                <div className="how-it-works__decor">
                    <img src="https://new.sumsub.com/3ad4ae02d4643a1d58b0.svg" alt="" />
                </div>
                <div class="section-title text-center">
                    <h2 className="how-it-works__title how-it-works__title--arrow">How it works</h2>
                    <p>
                        Using FDM for shopping centers is no longer something too complicated.
                        <br />
                        With just one click, you can detect who is not wearing a mask.
                        <br />
                        That's our guarantee!
                    </p>
                </div>
                <div className="video-block">
                    <div className="flex items-center justify-center relative">
                        <img src="https://new.sumsub.com/fd4652c954e7b832acb2.avif" alt="" />
                        <video src={video} autoPlay loop width={500} className="hidden"></video>
                        <video className="how-it-works__video-desk absolute top-14 rounded-md"
                            loop="loop" muted="true" width="500" playsInline="" autoPlay="autoPlay"
                            preload="auto" webkit-playsInline="" src={video}></video>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;