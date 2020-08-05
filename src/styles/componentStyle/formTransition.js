export const containerVariants = {
    hidden: {
        x: '100vw',
    },
    visible: {
        x: 0,
        transition: {
            duration: 0.3,
            stiffness: 120,
            type: 'spring',
        },
    },
    exit: {
        x: '-100vw',
    },
}
