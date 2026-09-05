/* =========================================================
   ABISHA & ROHIT — WEDDING WEBSITE
   COMPLETE SCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       WEDDING COUNTDOWN
    ===================================================== */

    const weddingDate =
        new Date("2026-10-05T09:30:00+05:30").getTime();

    const pad = (number) =>
        String(Math.max(0, number)).padStart(2, "0");


    function updateCountdown() {

        const distance =
            weddingDate - Date.now();

        const safeDistance =
            Math.max(0, distance);

        const days =
            Math.floor(safeDistance / 86400000);

        const hours =
            Math.floor(
                (safeDistance % 86400000) / 3600000
            );

        const minutes =
            Math.floor(
                (safeDistance % 3600000) / 60000
            );

        const seconds =
            Math.floor(
                (safeDistance % 60000) / 1000
            );


        const daysElement =
            document.getElementById("days");

        const hoursElement =
            document.getElementById("hours");

        const minutesElement =
            document.getElementById("minutes");

        const secondsElement =
            document.getElementById("seconds");


        if (daysElement) {
            daysElement.textContent = pad(days);
        }

        if (hoursElement) {
            hoursElement.textContent = pad(hours);
        }

        if (minutesElement) {
            minutesElement.textContent = pad(minutes);
        }

        if (secondsElement) {
            secondsElement.textContent = pad(seconds);
        }

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);



    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const navToggle =
        document.querySelector(".nav-toggle");

    const nav =
        document.querySelector(".nav");


    if (navToggle && nav) {

        navToggle.addEventListener("click", () => {

            const isOpen =
                nav.classList.toggle("open");

            navToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        const navLinksInside =
            nav.querySelectorAll("a");


        navLinksInside.forEach((link) => {

            link.addEventListener("click", () => {

                nav.classList.remove("open");

                navToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

    }



    /* =====================================================
       INVITATION MODAL
    ===================================================== */

    const modal =
        document.querySelector(".invitation-modal");

    const openInvitation =
        document.querySelector(".open-invitation");

    const closeModal =
        document.querySelector(".modal-close");

    const closeCard =
        document.querySelector(".invite-close");

    const backdrop =
        document.querySelector(".modal-backdrop");


    function showInvitation() {

        if (!modal) return;

        modal.classList.add("open");

        modal.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.style.overflow = "hidden";

    }


    function hideInvitation() {

        if (!modal) return;

        modal.classList.remove("open");

        modal.setAttribute(
            "aria-hidden",
            "true"
        );

        /*
         * Don't unlock scrolling if
         * the opening video is still active.
         */

        const introScreen =
            document.getElementById("introScreen");

        if (
            !introScreen ||
            introScreen.classList.contains("is-finished")
        ) {
            document.body.style.overflow = "";
        }

    }


    if (openInvitation) {

        openInvitation.addEventListener(
            "click",
            showInvitation
        );

    }


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            hideInvitation
        );

    }


    if (closeCard) {

        closeCard.addEventListener(
            "click",
            hideInvitation
        );

    }


    if (backdrop) {

        backdrop.addEventListener(
            "click",
            hideInvitation
        );

    }


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {

                hideInvitation();

            }

        }
    );



    /* =====================================================
       BACKGROUND MUSIC
    ===================================================== */

    const music =
        document.getElementById("weddingMusic");

    const musicButton =
        document.getElementById("musicButton");


    /*
     * Support BOTH button structures:
     *
     * 1.
     * <button id="musicButton">
     *   ♫ PLAY MUSIC
     * </button>
     *
     * 2.
     * <button id="musicButton">
     *   <span class="music-icon">♪</span>
     *   <span class="music-text">PLAY MUSIC</span>
     * </button>
     */

    const musicText =
        musicButton
            ? musicButton.querySelector(".music-text")
            : null;

    const musicIcon =
        musicButton
            ? musicButton.querySelector(".music-icon")
            : null;


    /*
     * Update the visual state of
     * the music button.
     */

    function updateMusicButton() {

        if (!musicButton || !music) {
            return;
        }


        if (!music.paused) {

            musicButton.classList.add("playing");


            if (musicText) {

                musicText.textContent =
                    "PAUSE MUSIC";

            }


            if (musicIcon) {

                musicIcon.textContent =
                    "♫";

            }


            /*
             * If button doesn't contain
             * separate spans, use text.
             */

            if (!musicText && !musicIcon) {

                musicButton.innerHTML =
                    "♫ &nbsp; PAUSE MUSIC";

            }

        }

        else {

            musicButton.classList.remove("playing");


            if (musicText) {

                musicText.textContent =
                    "PLAY MUSIC";

            }


            if (musicIcon) {

                musicIcon.textContent =
                    "♪";

            }


            if (!musicText && !musicIcon) {

                musicButton.innerHTML =
                    "♫ &nbsp; PLAY MUSIC";

            }

        }

    }



    /*
     * Start background music.
     */

    async function startBackgroundMusic() {

        if (!music) {

            console.warn(
                "Background music element #weddingMusic not found."
            );

            return false;

        }


        try {

            /*
             * Always start from the beginning
             * after the opening video.
             */

            music.currentTime = 0;

            music.volume = 0.8;

            await music.play();


            updateMusicButton();


            console.log(
                "Background music started automatically."
            );


            return true;

        }

        catch (error) {

            /*
             * Some browsers may still block
             * delayed audio autoplay.
             */

            console.warn(
                "Automatic background music was blocked by the browser.",
                error
            );


            updateMusicButton();


            return false;

        }

    }



    /*
     * Manual music button.
     */

    if (music && musicButton) {

        musicButton.addEventListener(
            "click",
            async () => {

                if (music.paused) {

                    try {

                        music.volume = 0.8;

                        await music.play();

                        updateMusicButton();

                    }

                    catch (error) {

                        console.error(
                            "Music playback failed:",
                            error
                        );

                    }

                }

                else {

                    music.pause();

                    updateMusicButton();

                }

            }
        );


        /*
         * Keep button synchronized if
         * music ends or changes.
         */

        music.addEventListener(
            "play",
            updateMusicButton
        );


        music.addEventListener(
            "pause",
            updateMusicButton
        );

    }



    /* =====================================================
       OPENING VIDEO
    ===================================================== */

    const introScreen =
        document.getElementById("introScreen");

    const introVideo =
        document.getElementById("introVideo");

    const enterWedding =
        document.getElementById("enterWedding");


    /*
     * Prevent website scrolling while
     * opening video is visible.
     */

    if (introScreen) {

        document.body.style.overflow = "hidden";

    }



    /*
     * Prevent accidentally starting
     * the opening video multiple times.
     */

    let introStarted = false;

    let introFinished = false;



    /* =====================================================
       START INTRO VIDEO
    ===================================================== */

    async function startIntroVideo() {

        if (
            !introVideo ||
            !introScreen ||
            introStarted ||
            introFinished
        ) {
            return;
        }


        introStarted = true;


        introScreen.classList.add(
            "is-playing"
        );


        /*
         * Opening video must play
         * muted (no video sound).
         */

        introVideo.muted = true;

        introVideo.volume = 0;


        try {

            /* =================================================
               START VIDEO + MUSIC AT THE SAME TIME
               (fired together, not one after the other,
               so there is no delay before the music starts)
            ================================================= */

            const introVideoPlayPromise =
                introVideo.play();

            startBackgroundMusic();

            await introVideoPlayPromise;


            /*
             * Hide the OPEN INVITATION button
             * once the video starts.
             */

            if (enterWedding) {

                enterWedding.classList.add(
                    "playing"
                );

            }


            console.log(
                "Opening video started."
            );

        }

        catch (error) {

            console.error(
                "Opening video could not start:",
                error
            );


            /*
             * Reset so the user can
             * try again.
             */

            introStarted = false;


            if (introScreen) {

                introScreen.classList.remove(
                    "is-playing"
                );

            }

        }

    }



    /* =====================================================
       OPEN INVITATION BUTTON
    ===================================================== */

    if (enterWedding) {

        enterWedding.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                startIntroVideo();

            }
        );

    }



    /* =====================================================
       CLICK ANYWHERE ON INTRO
    ===================================================== */

    if (introScreen) {

        introScreen.addEventListener(
            "click",
            (event) => {

                /*
                 * If the button was clicked,
                 * its own handler handles it.
                 */

                if (
                    event.target.closest(
                        "#enterWedding"
                    )
                ) {
                    return;
                }


                /*
                 * Clicking anywhere else
                 * starts the video.
                 */

                if (
                    introVideo &&
                    introVideo.paused
                ) {

                    startIntroVideo();

                }

            }
        );

    }



    /* =====================================================
       OPENING VIDEO FINISHED
    ===================================================== */

    if (introVideo) {

        introVideo.addEventListener(
            "ended",
            async () => {

                if (introFinished) {
                    return;
                }


                introFinished = true;


                console.log(
                    "Opening video finished."
                );


                /*
                 * Mark intro as finished.
                 */

                if (introScreen) {

                    introScreen.classList.add(
                        "is-finished"
                    );

                    introScreen.classList.remove(
                        "is-playing"
                    );

                }


                /*
                 * Restore website scrolling.
                 */

                document.body.style.overflow = "";


                /*
                 * Background music was already started
                 * on the OPEN INVITATION click, so it
                 * simply keeps playing here.
                 */


                /*
                 * Remove opening screen
                 * after fade animation.
                 */

                setTimeout(() => {

                    if (introScreen) {

                        introScreen.style.display =
                            "none";

                    }

                }, 1300);

            }
        );



        /* =================================================
           VIDEO ERROR
        ================================================= */

        introVideo.addEventListener(
            "error",
            () => {

                console.error(
                    "Could not load assets/openvideo.mp4"
                );

                /*
                 * Show useful fallback message
                 * in the console.
                 */

                console.error(
                    "Check that openvideo.mp4 exists inside the assets folder."
                );

            }
        );


        /*
         * Helpful loading diagnostics.
         */

        introVideo.addEventListener(
            "loadedmetadata",
            () => {

                console.log(
                    "Opening video loaded:",
                    introVideo.videoWidth,
                    "x",
                    introVideo.videoHeight
                );

            }
        );

    }



    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        [
            ...document.querySelectorAll(
                "main section[id]"
            )
        ];


    const navLinks =
        [
            ...document.querySelectorAll(
                ".nav a"
            )
        ];


    if (
        sections.length &&
        navLinks.length &&
        "IntersectionObserver" in window
    ) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                !entry.isIntersecting
                            ) {
                                return;
                            }


                            navLinks.forEach(
                                (link) => {

                                    const target =
                                        link.getAttribute(
                                            "href"
                                        );


                                    link.classList.toggle(
                                        "active",
                                        target ===
                                        `#${entry.target.id}`
                                    );

                                }
                            );

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",

                    threshold: 0
                }
            );


        sections.forEach(
            (section) => {

                observer.observe(section);

            }
        );

    }



    /* =====================================================
       INITIAL MUSIC BUTTON STATE
    ===================================================== */

    updateMusicButton();


    console.log(
        "Abisha & Rohit wedding website initialized."
    );

});