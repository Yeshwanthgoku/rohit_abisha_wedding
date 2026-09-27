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

        document.body.style.overflow = "";

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
             * Start background music playback.
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
       AUDIO AUTOPLAY ON FIRST INTERACTION
    ===================================================== */

    function enableAudioOnInteraction() {

        if (music && music.paused) {

            music.volume = 0.8;

            music.play()
                .then(() => {
                    updateMusicButton();
                })
                .catch(() => {
                    /* Autoplay was restricted by browser policy; music button is available */
                });

        }

    }

    window.addEventListener("click", enableAudioOnInteraction, { once: true });
    window.addEventListener("touchstart", enableAudioOnInteraction, { once: true });
    window.addEventListener("keydown", enableAudioOnInteraction, { once: true });



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