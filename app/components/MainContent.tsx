"use client";

import { useState, useEffect, useRef } from "react";
import { IoIosArrowUp } from "react-icons/io";
import {
  FaInstagram,
  FaMusic,
  FaVolumeMute,
  FaRegCalendarAlt,
} from "react-icons/fa";
import Link from "next/link";
import { useInView } from "react-intersection-observer";
import CountdownTimer from "./Countdown";
import Form from "./Form";
import WishesList from "./WishesList";
import { config } from "@/lib/config";

type WeddingScreenProps = {
  name?: string;
};

const FrameBox = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`relative px-6 py-8 bg-[#3B2A1F]/25 backdrop-blur-md backdrop-saturate-150 shadow-[0_8px_32px_rgba(0,0,0,0.25)] rounded-2xl ${className}`}
  >
    
    {children}
  </div>
);

const WeddingScreen = ({ name }: WeddingScreenProps) => {
  const [fadeClass, setFadeClass] = useState("opacity-0");
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Untuk fade-in pertama kali
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeClass("opacity-100");
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
    if (!isOpen && audioRef.current) {
      // Play music when "Open" is clicked
      (audioRef.current as HTMLAudioElement).play();
      setIsPlaying(true);
    }
  };

  // --- Premium feature: background music control -------------------------
  const toggleMusic = () => {
    if (!audioRef.current) return;
    const audio = audioRef.current as HTMLAudioElement;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play();
      setIsPlaying(true);
    }
  };

  // --- Premium feature: add to calendar -----------------------------------
  const getGoogleCalendarLink = () => {
    const start = new Date(config.eventDate);
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000);
    const fmt = (d: Date) => d.toISOString().replace(/[-:]|\.\d{3}/g, "");
    const text = encodeURIComponent(`The Wedding of ${config.coupleNames}`);
    const details = encodeURIComponent(config.thankyouDetail || "");
    const location = encodeURIComponent(
      config.weddingReception?.place || config.holyMatrimony?.place || ""
    );
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${fmt(
      start
    )}/${fmt(end)}&details=${details}&location=${location}`;
  };


  const { ref: mainRef, inView: isMainInView } = useInView({
    threshold: 0.5,
  });

  const { ref: main2Ref, inView: isMain2InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide1Ref, inView: isSlide1InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide2Ref, inView: isSlide2InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide3Ref, inView: isSlide3InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide5Ref, inView: isSlide5InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide6Ref, inView: isSlide6InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide7Ref, inView: isSlide7InView } = useInView({
    threshold: 0.5,
  });

  const { ref: slide8Ref, inView: isSlide8InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide9Ref, inView: isSlide9InView } = useInView({
    threshold: 0.5,
  });
  const { ref: slide10Ref, inView: isSlide10InView } = useInView({
    threshold: 0.5,
  });
  const { ref: endRef, inView: isEndInView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const video = document.querySelector("iframe");
    if (video) {
      if (isSlide8InView) {
        video.src += "&autoplay=1"; // Mulai video
      } else {
        video.src = video.src.replace("&autoplay=1", ""); // Hentikan video
      }
    }
  }, [isSlide8InView]);

  return (
    <div
      className={`h-screen w-screen flex flex-col md:flex-row ${fadeClass} transition-opacity duration-1000`}
    >
      {/* Gambar sisi kiri Wide Untuk Komputer */}
      <div
        className="md:flex justify-center hidden items-end pb-12 w-2/3 h-1/2 md:h-full"
        style={{
          backgroundImage: `url(/foto_1_samping.jpg)`, //refer to base 1st photo
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className={`bottom-10 left-20 font-ovo text-lg text-white tracking-[5px] uppercase`}
        >
          {config.coupleNames}
        </div>
      </div>

      {/* Konten teks sisi kanan bisa scroll untuk pc */}
      <div className=" md:w-1/3 h-full overflow-y-scroll snap-y snap-mandatory scroll-smooth relative">
        {/* Floating controls, visible once the invitation is open */}
        {isOpen && (
          <div className="fixed z-50 top-4 right-4 flex gap-x-2">
            <button
              onClick={toggleMusic}
              aria-label={isPlaying ? "Pause music" : "Play music"}
              className="h-9 w-9 flex items-center justify-center rounded-full border border-white/60 bg-black/30 text-white backdrop-blur-sm hover:bg-black/50 transition"
            >
              {isPlaying ? <FaMusic size={13} /> : <FaVolumeMute size={13} />}
            </button>
            
          </div>
        )}

        <div
          id="backgroundWedding"
          className="snap-start w-full h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-[#2A1B10] via-[#1C120A] to-[#0F0904]"
        >
          {/* Ambient candlelight glow, replaces the photo */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-[420px] w-[420px] rounded-full bg-[#C8A165]/10 blur-[100px]" />
          </div>

          {/* Subtle texture so the panel isn't a flat fill */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "radial-gradient(#E4C68E 1px, transparent 1px)",
              backgroundSize: "18px 18px",
            }}
          />

     

          {/* Hairline frame around the whole panel */}
          <div className="pointer-events-none absolute inset-4 border border-[#C8A165]/20" />

          <div className="text-center p-5 flex flex-col h-full justify-between py-20 relative z-10">
            <FrameBox className="gap-y-3 md:gap-y-4 flex flex-col">
              <h5
                className={`text-sm font-legan text-white uppercase tracking-wide fadeMain2 ${isMain2InView ? "active" : ""
                  } `}
                ref={main2Ref}
              >
                The Homecoming Of
              </h5>
              <span className="mx-auto h-px w-10 bg-[#C8A165]" />
              <h1
                className={`text-2xl md:text-3xl font-ovo t text-white uppercase fadeMain ${isMainInView ? "active" : ""
                  } `}
                ref={mainRef}
              >
                {config.coupleNames}
              </h1>
              <span className="mx-auto h-px w-10 bg-[#C8A165]" />
              <h5
                className={`text-sm  font-legan text-white uppercase tracking-wide  fadeMain2 ${isMain2InView ? "active" : ""
                  } `}
                ref={main2Ref}
              >
                {new Date(config.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h5>
            </FrameBox>
            <div>
              <p className="mt-5 text-lg uppercase font-xs tracking-widest text-white">
                {name ? `Dear ${name},` : "Welcome"}
              </p>
              {!isOpen ? (
                <button
                  className="animate-bounce mt-5 px-6 py-2 uppercase text-xs tracking-widest border border-[#C8A165] text-[#E4C68E] hover:text-[#0F0904] hover:bg-[#C8A165] rounded-full bg-transparent transition"
                  onClick={handleOpen}
                >
                  Open Invitation
                </button>
              ) : (
                <IoIosArrowUp
                  stroke="4"
                  className="mx-auto mt-20 animate-upDown text-[#E4C68E]"
                />
              )}
            </div>
          </div>
        </div>
        {isOpen && (
          <>
            {/* Slide 1 */}
            <div
              className={`text-white h-screen flex items-end pb-16 p-5 px-12 snap-start`}
              style={{
                backgroundImage: `url(/slide_1.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <FrameBox
                className={`mt-40 ${isSlide1InView ? "active" : ""} fadeInMove`}
              >
                <div ref={slide1Ref}>
                  {/* <h1 className="text-xl md:text-2xl font-ovo tracking-wide text-white uppercase">
                    {"Heading"}
                  </h1> */}
                  <p className="text-l mt-3 font-legan">
                    {config.bibleVerseContent}
                  </p>
                  {/* <p className="text-5xl mt-3 font-wonder">
                    {config.coupleNames}
                  </p> */}
                </div>
              </FrameBox>
            </div>
            {/* Slide 2 */}
            
            {/* Slide 3 */}
            {/* <div
              className="snap-start  text-white h-screen flex items-end pb-16 px-12 "
              style={{
                backgroundImage: `url(/slide_3.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <FrameBox
                className={`fadeInMove ${isSlide3InView ? "active" : ""}  `}
              >
                <div ref={slide3Ref}>
                  <p className="font-legan text-sm my-2">The Bride</p>
                  <h1 className="text-xl md:text-3xl text-white  font-ovo">
                    {config.bride}
                  </h1>
                  <h3 className="font-thesignature text-2xl">
                    About {config.brideNickName},
                  </h3>
                  <p className="text-sm mt-5 font-legan text-[#CCCCCC]">
                    {config.brideBio}
                  </p>
                  <Link
                    href={`https://www.instagram.com/${config.brideInstagram}`}
                    target="_blank"
                    className="cursor-pointer hover:bg-black text-sm rounded-full flex items-center gap-x-2 text-center font-legan mt-5 bg-[#4E4E4E] w-fit px-4 py-2 text-[#CCCCCC]"
                  >
                    <FaInstagram /> {config.brideInstagram}
                  </Link>
                </div>
              </FrameBox>
            </div> */}
            {/* Slide 4 */}
            {/* <div
              className="snap-start  text-white h-screen pt-8 flex px-12 "
              style={{
                backgroundImage: `url(/slide_4.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <FrameBox>
                <h1
                  ref={slide4Ref}
                  className={`text-xl md:text-5xl  text-white font-ovo fadeInMove ${isSlide4InView ? " active" : ""
                    }`}
                >
                  A journey in love
                </h1>
                <h3
                  ref={slide4Ref}
                  className={`uppercase font-legan text-xl mt-5 mb-2 fadeInMoveSlow ${isSlide4InView ? " active" : ""
                    }`}
                >
                  {config.timeline_1}
                </h3>
                <p
                  ref={slide4Ref}
                  className={`text-xs font-legan text-white fadeInLeftSlow ${isSlide4InView ? "active" : ""
                    }`}
                >
                  {config.timeline_1_content}
                </p>
                <h3
                  ref={slide4Ref}
                  className={`uppercase font-legan text-xl mt-5 mb-2 fadeInMoveSlow ${isSlide4InView ? " active" : ""
                    }`}
                >
                  {config.timeline_2}
                </h3>
                <p
                  ref={slide4Ref}
                  className={`text-xs font-legan text-white fadeInLeftSlow ${isSlide4InView ? " active" : ""
                    }`}
                >
                  {config.timeline_2_content}
                </p>
                <h3
                  ref={slide4Ref}
                  className={`uppercase font-legan text-xl mt-5 mb-2 fadeInMoveSlow ${isSlide4InView ? " active" : ""
                    }`}
                >
                  {config.timeline_3}
                </h3>
                <p
                  ref={slide4Ref}
                  className={`text-xs font-legan text-white fadeInLeftSlow ${isSlide4InView ? " active" : ""
                    }`}
                >
                  {config.timeline_3_content}
                </p>
                <div
                  ref={slide4Ref}
                  className={`relative flex items-center mt-5 fadeInLeft ${isSlide4InView ? " active" : ""
                    }`}
                >
                  <hr className="w-[120px] mx-2 border-t border-gray-300" />
                  <span className="px-2 font-thesignature text-3xl">
                    {config.coupleNames}
                  </span>
                </div>
              </FrameBox>
            </div> */}
            {/* Slide 5 */}
            <div
              className="snap-start  text-white h-screen flex flex-col items-center px-12 "
              style={{
                backgroundImage: `url(/slide_5.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <FrameBox
                className={` ${isSlide5InView ? "active" : ""
                  }  fadeInMove flex items-center flex-col mt-32 `}
              >
                <div ref={slide5Ref} className="flex flex-col items-center">
                  <h3 className="uppercase font-legan text-xs tracking-wide mt-5 mb-2">
                    save our date
                  </h3>
                  <h1 className="text-2xl w-[200px] text-center text-white  font-ovo uppercase">
                    {new Date(config.eventDate).toLocaleDateString("en-US", {
                      weekday: "long",
                    })}{" "}
                    <br />{" "}
                    {new Date(config.eventDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </h1>

                  {/* Premium feature: one-tap add to calendar */}
                  <Link
                    href={getGoogleCalendarLink()}
                    target="_blank"
                    className="cursor-pointer hover:text-white/20 text-xs rounded-full flex items-center gap-x-2 text-center font-legan mt-4 border border-white/60 w-fit px-4 py-2 text-white"
                  >
                    <FaRegCalendarAlt /> Add to Calendar
                  </Link>

                  {config.holyMatrimony.enabled && (
                    <div className="mt-5 mx-auto flex flex-col items-center">
                      <h3 className="uppercase font-ovo text-sm text-center mt-5 mb-2">
                        Holy Matrimony <br /> {config.holyMatrimony.time}
                      </h3>
                      <p className="text-sm text-center  font-legan text-white">
                        {config.holyMatrimony.place} <br />{" "}
                        {config.holyMatrimony.place_details}
                      </p>
                      <Link
                        href={config.holyMatrimony.googleMapsLink}
                        target="_blank"
                        className="cursor-pointer hover:text-white/20 text-sm rounded-full flex items-center gap-x-2 text-center font-legan mt-5 bg-[#808080] w-fit px-4 py-2 text-white"
                      >
                        Google Maps
                      </Link>
                    </div>
                  )}

                  {config.weddingReception.enabled && (
                    <div className="mt-5 mx-auto flex  flex-col items-center">
                      <h3 className="uppercase font-ovo text-sm text-center mt-5 mb-2">
                        Homecoming Reception <br /> {config.weddingReception.time}
                      </h3>
                      <p className="text-sm text-center  font-legan text-white">
                        {config.weddingReception.place} <br />{" "}
                        {config.weddingReception.place_details}
                      </p>
                      <Link
                        href={config.weddingReception.googleMapsLink}
                        target="_blank"
                        className="cursor-pointer hover:text-white/20 text-sm rounded-full flex items-center gap-x-2 text-center font-legan mt-5 bg-[#808080] w-fit px-4 py-2 text-white"
                      >
                        Google Maps
                      </Link>
                       {false && config.weddingReception.mapEmbedLink && (
                        <div className="mt-4 w-full max-w-sm overflow-hidden rounded-md border border-[#C8A165]/40">
                          <iframe
                            src={config.weddingReception.mapEmbedLink}
                            width="100%"
                            height="220"
                            style={{ border: 0, filter: "sepia(30%) saturate(120%)" }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </FrameBox>
            </div>
            {/* Slide 6 */}
            <div
              className="snap-start  text-white h-screen flex flex-col items-center justify-end pb-16 px-12 "
              style={{
                backgroundImage: `url(/slide_6.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <FrameBox
                className={` ${isSlide6InView ? "active" : ""
                  }  fadeInMove flex items-center flex-col`}
              >
                <div ref={slide6Ref} className="flex flex-col items-center">
                  <h1 className="text-2xl text-center text-white  font-ovo">
                    ALMOST TIME FOR OUR CELEBRATION
                  </h1>
                  {/* Countdown Timer */}
                  <CountdownTimer />
                </div>
              </FrameBox>
            </div>

            <div
              className="snap-start  text-white h-screen flex flex-col items-center justify-end pb-16 px-12 "
              style={{
                backgroundImage: `url(/slide_6.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <FrameBox
                className={` ${isSlide7InView ? "active" : ""
                  }  fadeInMove flex items-center flex-col`}
              >
                <div ref={slide7Ref} className="flex flex-col items-center">
                  <h1 className="text-xl text-white font-ovo text-center uppercase">
                    RSVP AND WISHES
                  </h1>
                  <p className="text-sm font-legan text-white/80 text-center">
                    {config.rsvp.detail}
                  </p>
                </div>
              </FrameBox>
            </div>

            {/* SLIDE 8 */}
            {config.prewedding.enabled && (
              <div
                className="snap-start text-white h-screen flex flex-col justify-center pt-16 pb-16 px-8 "
                style={{
                  backgroundImage: `url(/slide_8.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  ref={slide8Ref}
                  className={`${isSlide8InView ? "active" : ""} fadeInMove `}
                >
                  <h1 className="text-3xl text-white  font-ovo text-center uppercase">
                    Unveiling Our Prewedding Story
                  </h1>
                  <div
                    className="mt-10 mx-auto w-full max-w-2xl relative"
                    style={{ paddingBottom: "56.25%", height: 0 }}
                  >
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${config.prewedding.link}?autoplay=1&mute=1&loop=1`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="-mt-12 w-72 transform skew-x-6 drop-shadow">
                    <p className="text-3xl font-thesignature text-white/80 ">
                      {config.prewedding.detail}
                    </p>
                  </div>
                </div>
              </div>
            )}



            {/* SLIDE 9 */}
            {config.rsvp.enabled && (
              <div
                className="snap-start text-white h-screen flex flex-col justify-center pt-16 pb-16 px-8"
                style={{
                  backgroundImage: `url(/slide_9.jpg)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div
                  ref={slide9Ref}
                  className={`${isSlide9InView ? "active" : ""} fadeInMove`}
                >
                  {/* <h1 className="text-xl text-white font-ovo text-center uppercase">
                    RSVP AND WISHES
                  </h1>
                  <p className="text-sm font-legan text-white/80 text-center">
                    {config.rsvp.detail}
                  </p> */}

                  <Form />
                </div>
              </div>
            )}

            {/* SLIDE 10 */}
            <div
              className="snap-start text-white h-screen flex flex-col justify-center pt-16 pb-16 px-8"
              style={{
                backgroundImage: `url(/slide_9.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div
                ref={slide10Ref}
                className={`${isSlide10InView ? "active" : ""} fadeInMove`}
              >
                <h1 className="text-3xl text-white font-ovo text-center uppercase">
                  Wishes
                </h1>
                <WishesList />
              </div>
            </div>

            {/* SLIDE AKHIR */}
            <div
              className="snap-start text-white h-screen flex flex-col justify-end pt-16 pb-16 px-12 "
              style={{
                backgroundImage: `url(/slide_7.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <FrameBox className={` ${isEndInView ? "active" : ""} fadeInMove `}>
                <div ref={endRef}>
                  <h1 className="text-3xl text-white  font-ovo text-center uppercase">
                    {config.thankyou}
                  </h1>

                  <div className="mt-5 mx-auto flex flex-col ">
                    <p className="text-sm font-legan text-white text-center">
                      {config.thankyouDetail}
                    </p>
                    <p className="text-sm rounded-full text-center font-ovo mt-5 px-6 py-2 text-white uppercase">
                      {config.coupleNames}
                    </p>
                  </div>

                  
                </div>
              </FrameBox>

              <footer className="flex flex-col items-center mt-8">
                <p className="text-[0.5rem] uppercase text-center">
                  Created By Peter Shaan
                </p>
                <p className="text-xs">© All rights reserved by petershaan</p>
              </footer>
            </div>
          </>
        )}
      </div>
      {/* Audio Element */}
      <audio ref={audioRef} src="/music/wedding_song.mp3" preload="auto" />
    </div>
  );
};

export default WeddingScreen;
