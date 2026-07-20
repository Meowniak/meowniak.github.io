// Mandap Website Configuration File
// Update this file to dynamically add, remove, or change carousel images, editorial sections, and grid photos.

const MANDAP_CONFIG = {
    // ==========================================
    // SECTION 1: Carousel Images (Top Hero Carousel)
    // ==========================================
    // Any images placed here will automatically render inside the swifter 3D Cover Flow carousel
    // with correct classes, styles, and autoplay applied.
    carouselImages: [
        { src: "assets/NIS_2836.webp", alt: "Wedding portrait 1" },
        { src: "assets/MDP09312_jpgfinal.webp", alt: "Wedding portrait 2" },
        { src: "assets/MDP00458.webp", alt: "Wedding portrait 3" },
        { src: "assets/MDP05342.webp", alt: "Wedding portrait 4" },
        { src: "assets/MDP06391.webp", alt: "Wedding portrait 5" },
        { src: "assets/MDP05844.webp", alt: "Wedding portrait 6" }
    ],

    // ==========================================
    // SECTION 2: Editorial Split Sections
    // ==========================================
    // Add, remove, or edit these blocks to update the narrative split columns.
    // 'reverse: true' places the text on the left and the image on the right.
    // 'reverse: false' places the image on the left and the text on the right.
    editorialSections: [
        {
            title: "Expert Direction, Not Posing",
            paragraph: "We guide you gently when the light is perfect, but we prioritize the real, unforced version of you. No stiff stances, no checklist performance. We curate the light, direct the space, and let your genuine connection unfold naturally.",
            imageSrc: "assets/MDP05870.webp",
            imageAlt: "Bridal portrait details",
            reverse: false
        },
        {
            title: "Documentary Storytelling",
            paragraph: "Every laugh, every quiet glance, every tear. We capture the day exactly as it felt, preserving the atmosphere, the light, and the deep emotions in their truest form. You will not need to manage us or worry about what comes next.",
            imageSrc: "assets/MDP06269.webp",
            imageAlt: "Couple walk portrait",
            reverse: true
        }
    ],

    // The full bleed parallax quote divider
    quoteDivider: {
        imageSrc: "assets/MDP00484.webp",
        imageAlt: "Wedding landscape ceremony",
        quote: "We want you to look back at these photos and remember how it felt, not just how it looked."
    },

    // ==========================================
    // SECTION 3: The Quiet Chapters (See More Grid)
    // ==========================================
    // Define the glassy overlay cover image and details.
    seeMoreCover: {
        imageSrc: "assets/MDP00412.webp",
        imageAlt: "Couples portrait landscape",
        title: "The Quiet Chapters",
        subtitle: "Unfold the unscripted moments of the day.",
        buttonText: "See More"
    },

    // Add as many images as you like to the gallery list below.
    // The system automatically maps these images to the optimized editorial layout pattern
    // (Diptychs, Asymmetric Pairs, and wide Landscapes) that was carefully designed.
    galleryGrid: [
        { src: "assets/MDP06321.webp", alt: "Wedding portrait details" },
        { src: "assets/MDP04986.webp", alt: "Bridal portrait details" },
        { src: "assets/MDP09620.webp", alt: "Wedding portrait groom" },
        { src: "assets/MDP00534.webp", alt: "Couples walk landscape" },
        { src: "assets/MDP09693.webp", alt: "Wedding details reception" },
        { src: "assets/MDP09854.webp", alt: "Wedding portrait details reception" },
        { src: "assets/MDP05532.webp", alt: "Wedding couple walk outdoor ceremony" },
        { src: "assets/MDP05555.webp", alt: "Wedding couple walk outdoor ceremony" },
        { src: "assets/NIS_2120.webp", alt: "Wedding portrait details" },
        { src: "assets/MDP06011.webp", alt: "Wedding reception design" },
        { src: "assets/MDP04988.webp", alt: "Wedding portrait ceremony" },
        { src: "assets/MDP06050.webp", alt: "Wedding reception outdoor design" },
        { src: "assets/MDP06104.webp", alt: "Wedding reception outdoor layout" }
    ]
};
