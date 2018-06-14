/*jshint esversion: 6 */

export const API_ENDPOINT = 'http://localhost:3000/';

export const SPORTS = ["alpinisme", "apnee", "basketball", "bmx", "canoe-kayak", "cyclisme", "danse", "equitation", "escalade",
  "fitness", "football", "golf", "handball", "jetski", "kitesurf", "motocross", "musculation", "natation",
  "parachutisme", "parapente", "peche", "plongee", "quad", "rafting", "randonnee", "roller", "running-trail",
  "skateboard", "ski", "ski-de-fond", "ski-de-randonnee", "snowboard", "speleologie", "sport-de-combat", "squash",
  "stand-up-paddle", "surf", "tennis", "voile", "volleyball", "vtt", "wakeboard", "windsurf", "wingsuit", "yoga", "via-ferrata", "autre"
];

export const PLACESLISTS = {
            HOUSETYPES: ["maison", "appartement", "studio", "insolite"],

            HOUSEPRIVATE: ["Logement entier", "Chambre privée", "Chambre partagée"],

            BEDTYPES: [{NAME:"Lit double", PROP: "doubleBed"}, {NAME:"Lit simple", PROP:"simpleBed"},
                      {NAME:"Lit superposé",PROP:"superimposedBed"}, {NAME:"Canapé-lit",PROP:"sofa"},
                      {NAME:"Futon",PROP:"futon"}, {NAME:"Lit enfant",PROP:"childBed"}, {NAME:"Lit bébé", PROP:"babyBed"}],

            EQUIPEMENTS: {
                SERENITY:["Parking privatif","Entrée privée","Garage","Local sécurisé pour équipement"],

                KITCHEN: ["Four","Plaques de cuisson","Lave-vaisselle","Micro-ondes","Grille pain","Bouilloire","Machine à café","Vaisselle et couverts",
                          "Chaise bébé","Réfrigérateur","Freezer","Congélateur"],

                ENTERTAIMENT: ["Wifi","Télévision","Internet","Lecteur DVD","Jeux"],

                HYGIENE: ["Lave-Linge","Sèche linge","Sèche cheveux","Étendoir à linge","Fer à repasser","Penderie/commode","Douche","Baignoire","Baignoire Bébé"],

                COSINESS: ["Chauffage","Climatisation","Salon de jardin","Cheminée/Poêle","Équipements de fitness","BBQ/Plancha"]
            },

            AMENITIES: ['wc', 'salle de bain', 'jardin', 'piscine', 'salon', 'cuisine', 'jacuzzi', 'sauna'],

            // services: ["Petit déjeuner","Papier toilette","Savon/Shampoing","Linge de maison"],
            SERVICES: ["Papier toilette","Savon/Shampoing"],

            RULES: ["Accessible aux personnes à mobilité réduite","Enfants de +10 ans bienvenus","Logement non fumeur","Animaux bienvenus","Soirées festives autorisées","Bébés bienvenus",
                    "Animaux domestiques sur place"]
        };
