import este_head from '../../images/este_profil_pic.jpg'
import cyp_head from '../../images/cyp_profil_pic.jpg'
import jojo_head from '../../images/jordan_profil_pic.jpg'

const TeamInfo = [{
        lastname: "Leschi",
        firstname: "Cyprien",
        job: "Développeur de l'application",
        social_networks: [{
            name: "Facebook",
            link: "https://www.facebook.com/cyprien.leschi"
        }],
        photo: cyp_head
    },

    {
        lastname: "Soubiran",
        firstname: "Esteban",
        job: "Développeur de l'API",
        social_networks: [{
                name: "Facebook",
                link: "https://www.facebook.com/esteban.soubiran"
            },
            {
                name: "Github",
                link: "https://github.com/Barbapapazes"
            },
            {
                name: "Twitter",
                link: "https://twitter.com/SOUBIRAN25"
            },
            {
                name: "LinkedIn",
                link: "https://fr.linkedin.com/in/esteban25"
            }
        ],
        photo: este_head
    },

    {
        lastname: "Béziaud",
        firstname: "Jordan",
        job: "Développeur de l'interface",
        social_networks: [{
                name: "Facebook",
                link: "https://www.facebook.com/jordan.beziaud"
            },
            {
                name: "Github",
                link: "https://github.com/spicytelescope"
            },
            {
                name: "Twitter",
                link: "https://twitter.com/spicy_telescope"
            }
        ],
        photo: jojo_head
    }
]

export default TeamInfo