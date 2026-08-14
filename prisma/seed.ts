/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// Photos de chiens (Unsplash). En démo ; à remplacer par les vraies photos.
const DOG_PHOTOS = [
  "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
  "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800&q=80",
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
  "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&q=80",
  "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&q=80",
  "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=800&q=80",
];

// Coordonnées approximatives des communes cibles (campagne genevoise).
const GEO: Record<string, { lat: number; lng: number }> = {
  Hermance: { lat: 46.3011, lng: 6.2461 },
  Anières: { lat: 46.2842, lng: 6.2231 },
  Corsier: { lat: 46.2781, lng: 6.2131 },
  Satigny: { lat: 46.2163, lng: 6.0311 },
  Dardagny: { lat: 46.1961, lng: 6.0001 },
  Russin: { lat: 46.1901, lng: 6.0201 },
  Bernex: { lat: 46.1741, lng: 6.0751 },
  Céligny: { lat: 46.3591, lng: 6.2131 },
  Nyon: { lat: 46.3831, lng: 6.2391 },
};

const daysFromNow = (n: number) => {
  const d = new Date();
  d.setDate(d.getDate() + n);
  d.setHours(12, 0, 0, 0);
  return d;
};

async function main() {
  console.log("🌱 Réinitialisation…");
  // Ordre inverse des dépendances.
  await prisma.notification.deleteMany();
  await prisma.careLogEntry.deleteMany();
  await prisma.message.deleteMany();
  await prisma.conversation.deleteMany();
  await prisma.review.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.application.deleteMany();
  await prisma.listing.deleteMany();
  await prisma.dog.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.sitterProfile.deleteMany();
  await prisma.ownerProfile.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await bcrypt.hash("gustave123", 10);

  // ---------------- Gardiens ----------------
  console.log("🧑‍🌾 Gardiens…");
  const sittersData = [
    {
      name: "Léa Moreau",
      email: "lea@example.ch",
      firstName: "Léa",
      region: "Genève",
      headline: "Étudiante à l'UNIGE, amoureuse des balades au bord du lac",
      bio: "Étudiante en biologie, je garde des chiens depuis mon adolescence. J'adore les longues promenades et je suis très attentive aux habitudes de chaque animal.",
      dailyRate: 45,
      animals: ["chiens", "chats"],
      ambiances: ["lac", "campagne"],
      isSuperSitter: true,
      rating: 4.9,
      ratingCount: 27,
    },
    {
      name: "Thomas Girard",
      email: "thomas@example.ch",
      firstName: "Thomas",
      region: "Nyon",
      headline: "Expat, télétravailleur, présent jour et nuit",
      bio: "Je travaille en remote et j'ai grandi avec des bergers australiens. Une garde chez vous, c'est du calme pour votre chien et une vraie coupure verte pour moi.",
      dailyRate: 55,
      animals: ["chiens"],
      ambiances: ["campagne", "montagne"],
      isSuperSitter: true,
      rating: 4.8,
      ratingCount: 19,
    },
    {
      name: "Sofia Rossi",
      email: "sofia@example.ch",
      firstName: "Sofia",
      region: "Carouge",
      headline: "Passionnée de rando avec chien",
      bio: "Monitrice de sport, je propose à votre compagnon des sorties actives et sécurisées. Expérience avec chiens énergiques et jeunes.",
      dailyRate: 50,
      animals: ["chiens", "chats"],
      ambiances: ["montagne", "campagne"],
      isSuperSitter: false,
      rating: 4.7,
      ratingCount: 12,
    },
    {
      name: "Noah Weber",
      email: "noah@example.ch",
      firstName: "Noah",
      region: "Bernex",
      headline: "Étudiant vétérinaire",
      bio: "En 3e année de médecine vétérinaire, je suis à l'aise avec les traitements et les chiens âgés. Sérieux et ponctuel.",
      dailyRate: 48,
      animals: ["chiens", "chats", "chevaux"],
      ambiances: ["campagne"],
      isSuperSitter: false,
      rating: 4.6,
      ratingCount: 8,
    },
    {
      name: "Camille Favre",
      email: "camille@example.ch",
      firstName: "Camille",
      region: "Hermance",
      headline: "Habitante d'Hermance, dispo tout l'été",
      bio: "Je vis au village et je connais tous les sentiers du coin. Idéal pour une garde de proximité, avec beaucoup de tendresse pour les toutous.",
      dailyRate: 42,
      animals: ["chiens"],
      ambiances: ["lac", "campagne"],
      isSuperSitter: true,
      rating: 5.0,
      ratingCount: 15,
    },
  ];

  const sitters = [] as any[];
  for (const s of sittersData) {
    const user = await prisma.user.create({
      data: {
        name: s.name,
        email: s.email,
        passwordHash,
        phone: "+41 78 000 00 00",
        referralCode: s.firstName.toUpperCase() + "2026",
        sitterProfile: {
          create: {
            firstName: s.firstName,
            region: s.region,
            headline: s.headline,
            bio: s.bio,
            dailyRate: s.dailyRate,
            animalsAccepted: JSON.stringify(s.animals),
            ambiances: JSON.stringify(s.ambiances),
            verified: true,
            isSuperSitter: s.isSuperSitter,
            ratingAvg: s.rating,
            ratingCount: s.ratingCount,
            availabilities: {
              create: [
                { startDate: daysFromNow(3), endDate: daysFromNow(60) },
              ],
            },
          },
        },
      },
    });
    sitters.push(user);
  }

  // ---------------- Propriétaires + chiens ----------------
  console.log("🏡 Propriétaires & chiens…");
  const ownersData = [
    {
      name: "Marie Dubois",
      email: "marie@example.ch",
      region: "Hermance",
      dog: {
        name: "Gustave",
        breed: "Cavalier King Charles",
        ageYears: 4,
        character: "Doux, sociable, un vrai petit gentleman.",
        food: "2 repas/jour, croquettes sans céréales (bol dans la cuisine).",
        goodToKnow: "Adore dormir sur le canapé, peur des orages.",
        vet: "Cabinet vétérinaire de St-Jean · +41 22 340 27 27",
        commands: "Assis, couché, pas bouger, au panier.",
        photo: DOG_PHOTOS[0],
      },
    },
    {
      name: "Pierre Blanc",
      email: "pierre@example.ch",
      region: "Satigny",
      dog: {
        name: "Nala",
        breed: "Border Collie",
        ageYears: 3,
        character: "Très active, intelligente, adore courir.",
        food: "Ration ménagère matin et soir.",
        goodToKnow: "A besoin de beaucoup d'exercice, rappelle bien.",
        vet: "VetGenève · +41 22 715 20 20",
        commands: "Rappel impeccable, connaît le frisbee.",
        photo: DOG_PHOTOS[1],
      },
    },
    {
      name: "Julie Martin",
      email: "julie@example.ch",
      region: "Anières",
      dog: {
        name: "Biscotte",
        breed: "Bouledogue français",
        ageYears: 6,
        character: "Câline, tranquille, ronfle beaucoup.",
        food: "Croquettes light, sensible à la chaleur.",
        goodToKnow: "Éviter les grosses chaleurs, balades courtes.",
        vet: "VETCITY · +41 22 995 96 97",
        commands: "Assis, donne la patte.",
        photo: DOG_PHOTOS[2],
      },
    },
    {
      name: "David Schmid",
      email: "david@example.ch",
      region: "Dardagny",
      dog: {
        name: "Rocky",
        breed: "Labrador",
        ageYears: 2,
        character: "Joueur, gourmand, plein d'énergie.",
        food: "3 repas/jour (jeune), attention au vol de nourriture !",
        goodToKnow: "Adore l'eau, tire un peu en laisse.",
        vet: "Bestiaire du Rhône · +41 22 320 43 43",
        commands: "Assis, couché (en apprentissage).",
        photo: DOG_PHOTOS[3],
      },
    },
    {
      name: "Sandra Keller",
      email: "sandra@example.ch",
      region: "Céligny",
      dog: {
        name: "Iris",
        breed: "Golden Retriever",
        ageYears: 8,
        character: "Sage, affectueuse, parfaite avec les enfants.",
        food: "2 repas/jour, complément articulations le matin.",
        goodToKnow: "Chien senior, balades tranquilles au bord du lac.",
        vet: "Cabinet de St-Jean · +41 22 340 27 27",
        commands: "Toutes les bases, très obéissante.",
        photo: DOG_PHOTOS[4],
      },
    },
  ];

  const owners = [] as any[];
  const dogs = [] as any[];
  for (const o of ownersData) {
    const user = await prisma.user.create({
      data: {
        name: o.name,
        email: o.email,
        passwordHash,
        phone: "+41 79 000 00 00",
        referralCode: o.name.split(" ")[0].toUpperCase() + "GVA",
        ownerProfile: {
          create: {
            region: o.region,
            address: `${o.region}, Genève`,
            verified: true,
            bio: `Propriétaire de ${o.dog.name}, basé·e à ${o.region}.`,
          },
        },
      },
    });
    const dog = await prisma.dog.create({
      data: {
        ownerId: user.id,
        name: o.dog.name,
        breed: o.dog.breed,
        ageYears: o.dog.ageYears,
        character: o.dog.character,
        food: o.dog.food,
        goodToKnow: o.dog.goodToKnow,
        vet: o.dog.vet,
        commands: o.dog.commands,
        photo: o.dog.photo,
      },
    });
    owners.push(user);
    dogs.push(dog);
  }

  // ---------------- Escapades (annonces) ----------------
  console.log("🐕 Escapades…");
  const listingsData = [
    {
      ownerIdx: 0,
      title: "Garde de Gustave à Hermance, au bord du lac",
      region: "Hermance",
      startOffset: 10,
      duration: 12,
      careType: "onsite",
      ambiance: "lac",
      price: 540,
      lastMinute: false,
      description:
        "Nous partons en vacances et cherchons une personne douce pour s'occuper de Gustave à la maison. Village calme, jardin clos, lac à 5 minutes à pied.",
      nearby: ["Plage d'Hermance", "Sentier du lac", "Marché du dimanche"],
    },
    {
      ownerIdx: 1,
      title: "Nala cherche un gardien sportif à Satigny",
      region: "Satigny",
      startOffset: 20,
      duration: 8,
      careType: "onsite",
      ambiance: "campagne",
      price: 440,
      lastMinute: false,
      description:
        "Border collie pleine d'énergie, idéale pour quelqu'un qui aime bouger. Maison avec grand terrain au milieu des vignes.",
      nearby: ["Vignoble de Satigny", "Sentier viticole", "Bois de Versoix"],
    },
    {
      ownerIdx: 2,
      title: "Week-end avec Biscotte à Anières",
      region: "Anières",
      startOffset: 5,
      duration: 3,
      careType: "onsite",
      ambiance: "lac",
      price: 150,
      lastMinute: true,
      description:
        "Petit bouledogue très câlin, garde tranquille pour un week-end. Parfait pour une première escapade.",
      nearby: ["Port d'Anières", "Balade du bord du lac"],
    },
    {
      ownerIdx: 3,
      title: "Rocky le labrador à Dardagny (été)",
      region: "Dardagny",
      startOffset: 35,
      duration: 14,
      careType: "onsite",
      ambiance: "campagne",
      price: 700,
      lastMinute: false,
      description:
        "Deux semaines en pleine campagne genevoise pour garder Rocky, jeune labrador adorable. Maison de village avec jardin.",
      nearby: ["Moulin de Dardagny", "Rivière l'Allondon", "Sentiers nature"],
    },
    {
      ownerIdx: 4,
      title: "Iris, golden senior, à Céligny au calme",
      region: "Céligny",
      startOffset: 15,
      duration: 10,
      careType: "onsite",
      ambiance: "lac",
      price: 480,
      lastMinute: false,
      description:
        "Golden retriever senior très sage. Balades tranquilles et beaucoup de câlins. Charmant village au bord du lac.",
      nearby: ["Plage de Céligny", "Domaine de Garengo", "Bord du lac"],
    },
    {
      ownerIdx: 0,
      title: "Dernière minute : Gustave ce week-end",
      region: "Hermance",
      startOffset: 2,
      duration: 2,
      careType: "visits",
      ambiance: "lac",
      price: 90,
      lastMinute: true,
      description:
        "Imprévu ! Nous cherchons quelqu'un pour deux visites par jour ce week-end. Idéal si vous habitez le coin.",
      nearby: ["Plage d'Hermance"],
    },
  ];

  const listings = [] as any[];
  for (const l of listingsData) {
    const owner = owners[l.ownerIdx];
    const dog = dogs[l.ownerIdx];
    const geo = GEO[l.region] ?? GEO.Genève ?? { lat: 46.2, lng: 6.14 };
    const listing = await prisma.listing.create({
      data: {
        ownerId: owner.id,
        dogId: dog.id,
        title: l.title,
        region: l.region,
        lat: geo.lat,
        lng: geo.lng,
        startDate: daysFromNow(l.startOffset),
        endDate: daysFromNow(l.startOffset + l.duration),
        careType: l.careType,
        ambiance: l.ambiance,
        price: l.price,
        description: l.description,
        nearbyActivities: JSON.stringify(l.nearby),
        lastMinute: l.lastMinute,
        status: "open",
      },
    });
    listings.push(listing);
  }

  // ---------------- Avis (sur gardiens) ----------------
  console.log("⭐ Avis…");
  const reviewTexts = [
    "Séjour parfait, notre chien était aux anges. Photos tous les jours !",
    "Très professionnel et rassurant, on recommande les yeux fermés.",
    "Communication au top, maison impeccable au retour. Merci !",
    "Notre toutou a passé de superbes vacances, comme à la maison.",
  ];
  for (let i = 0; i < sitters.length; i++) {
    const sitter = sitters[i];
    for (let j = 0; j < 3; j++) {
      const author = owners[(i + j) % owners.length];
      await prisma.review.create({
        data: {
          authorId: author.id,
          targetId: sitter.id,
          rating: 5 - (j % 2),
          comment: reviewTexts[(i + j) % reviewTexts.length],
        },
      });
    }
  }

  // ---------------- Candidatures + réservation avec carnet ----------------
  console.log("📔 Candidatures, réservation & carnet de garde…");

  // Sofia postule à l'escapade de Nala (candidature en attente, côté Pierre).
  await prisma.application.create({
    data: {
      listingId: listings[1].id,
      sitterId: sitters[2].id,
      message:
        "Bonjour ! Je serais ravie de m'occuper de Nala, j'adore les border collies et les grandes balades. Disponible sur toute la période.",
      status: "pending",
    },
  });

  // Léa garde Nala pour Pierre : candidature acceptée + réservation en cours + carnet.
  // (Ce sont les utilisateurs de démo : ils voient Messages, Carnet et Réservations.)
  const nala = listings[1];
  await prisma.application.create({
    data: {
      listingId: nala.id,
      sitterId: sitters[0].id,
      message:
        "Coucou Pierre ! Confirmé de mon côté pour Nala, hâte de la retrouver. 🐕",
      status: "accepted",
    },
  });

  const commissionPercent = 18;
  const amount = nala.price;
  const commissionAmount = Math.round((amount * commissionPercent) / 100);
  const booking = await prisma.booking.create({
    data: {
      listingId: nala.id,
      ownerId: owners[1].id, // Pierre
      sitterId: sitters[0].id, // Léa
      startDate: daysFromNow(-3),
      endDate: daysFromNow(5),
      amount,
      commissionPercent,
      commissionAmount,
      payoutAmount: amount - commissionAmount,
      status: "in_progress",
    },
  });

  await prisma.careLogEntry.createMany({
    data: [
      {
        bookingId: booking.id,
        date: daysFromNow(-2),
        note: "Belle journée ! Nala a adoré la balade dans les vignes ce matin. Bon appétit et grosse sieste au soleil. 🌞",
        photo: DOG_PHOTOS[1],
      },
      {
        bookingId: booking.id,
        date: daysFromNow(-1),
        note: "Séance de frisbee au top, puis beaucoup de câlins. Nala est en pleine forme !",
        photo: DOG_PHOTOS[5],
      },
    ],
  });

  // ---------------- Conversation de démo ----------------
  console.log("💬 Messages…");
  const convo = await prisma.conversation.create({
    data: {
      userAId: owners[1].id, // Pierre (proprio de Nala)
      userBId: sitters[0].id, // Léa
      messages: {
        create: [
          {
            senderId: sitters[0].id,
            body: "Bonjour Pierre ! J'ai vu votre annonce pour Nala, elle a l'air adorable. Je suis très disponible cet été.",
            createdAt: daysFromNow(-1),
          },
          {
            senderId: owners[1].id,
            body: "Bonjour Léa, merci pour votre message ! Avez-vous déjà gardé des border collies ?",
            createdAt: daysFromNow(-1),
          },
          {
            senderId: sitters[0].id,
            body: "Oui, à plusieurs reprises. On peut faire un petit appel vidéo pour faire connaissance si vous voulez ?",
          },
        ],
      },
    },
  });

  // ---------------- Notifications de démo ----------------
  console.log("🔔 Notifications…");
  await prisma.notification.createMany({
    data: [
      {
        userId: owners[1].id,
        type: "new_application",
        title: "Nouvelle candidature",
        body: "Léa a postulé pour garder Nala.",
        link: "/profil/demandes",
      },
      {
        userId: owners[4].id,
        type: "new_photo",
        title: "Nouvelle photo d'Iris",
        body: "Camille a ajouté une photo au carnet de garde.",
        link: "/carnet",
      },
      {
        userId: sitters[0].id,
        type: "reminder",
        title: "Complétez votre profil",
        body: "Ajoutez une photo pour rassurer les propriétaires.",
        link: "/profil",
      },
    ],
  });

  console.log("✅ Seed terminé.");
  console.log(`   ${sitters.length} gardiens · ${owners.length} propriétaires · ${listings.length} escapades`);
  console.log("   Connexion démo : marie@example.ch / gustave123");
  void convo;
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
