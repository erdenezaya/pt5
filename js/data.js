// All learning content. English for practice, Mongolian (mn) for explanations.
window.DATA = {};

// ---------- CHUNKS (memorise whole phrases, not single words) ----------
DATA.chunkCats = [
  { id: 'site', mn: 'Ажлын талбай', en: 'On site', scene: 'site' },
  { id: 'talk', mn: 'Энгийн яриа (Aussie)', en: 'Small talk', scene: 'talk' },
  { id: 'phone', mn: 'Утас, цаг товлох', en: 'Phone & bookings', scene: 'phone' },
  { id: 'shop', mn: 'Дэлгүүр, банк, мөнгө', en: 'Shop & bank', scene: 'shop' },
  { id: 'health', mn: 'Эмч, эрүүл мэнд', en: 'Doctor & health', scene: 'health' },
  { id: 'travel', mn: 'Тээвэр, зам', en: 'Getting around', scene: 'travel' },
  { id: 'pte', mn: 'PTE-д хэрэгтэй хэллэг', en: 'PTE phrases', scene: 'pte' },
];

DATA.chunks = [
  // site
  { cat: 'site', en: 'Can you pass me the tie wire?', mn: 'Уях утсаа дамжуулаад өгөөч?', ex: 'Mate, can you pass me the tie wire? I ran out.' },
  { cat: 'site', en: 'Where do you want these bars?', mn: 'Эдгээр арматурыг хаана тавих вэ?', ex: 'Where do you want these bars, on the left or the right?' },
  { cat: 'site', en: 'We need to finish this before the pour.', mn: 'Бетон цутгахаас өмнө үүнийг дуусгах хэрэгтэй.', ex: 'We need to finish this before the pour on Friday.' },
  { cat: 'site', en: 'The spacing is two hundred centres.', mn: 'Хоорондын зай 200 мм (төвөөс төв).', ex: 'Check the drawing. The spacing is two hundred centres.' },
  { cat: 'site', en: 'I\'m running a bit late.', mn: 'Би жаахан хоцорч байна.', ex: 'Sorry boss, I\'m running a bit late. Traffic is bad.' },
  { cat: 'site', en: 'Could you show me how to do it?', mn: 'Яаж хийхийг надад үзүүлж өгөх үү?', ex: 'I haven\'t done this before. Could you show me how to do it?' },
  { cat: 'site', en: 'Sorry, could you say that again?', mn: 'Уучлаарай, дахиад хэлж өгөх үү?', ex: 'Sorry, could you say that again? It\'s too noisy here.' },
  { cat: 'site', en: 'Watch out!', mn: 'Болгоомжлоорой!', ex: 'Watch out! The crane is moving.' },
  { cat: 'site', en: 'Put your hard hat on.', mn: 'Каскаа өмс.', ex: 'Put your hard hat on before you go in.' },
  { cat: 'site', en: 'I\'ve finished this section.', mn: 'Би энэ хэсгийг дуусгалаа.', ex: 'I\'ve finished this section. What\'s next?' },
  { cat: 'site', en: 'What time is smoko?', mn: 'Амралт (цайны цаг) хэдэн цагт вэ?', ex: 'What time is smoko today? Ten o\'clock?' },
  { cat: 'site', en: 'Let\'s call it a day.', mn: 'Өнөөдөр болъё / ажлаа дуусгая.', ex: 'It\'s getting dark. Let\'s call it a day.' },
  { cat: 'site', en: 'I hurt my back.', mn: 'Нуруугаа гэмтээчихлээ.', ex: 'I hurt my back lifting the mesh.' },
  { cat: 'site', en: 'Is this the right size?', mn: 'Энэ зөв хэмжээ мөн үү?', ex: 'Is this the right size? The drawing says N16.' },
  { cat: 'site', en: 'No worries, I\'ll sort it out.', mn: 'Зүгээр, би шийдье.', ex: 'No worries, I\'ll sort it out after lunch.' },
  // talk
  { cat: 'talk', en: 'How\'s it going?', mn: 'Сайн байна уу? Юу байна?', ex: 'Hey Tom, how\'s it going?' },
  { cat: 'talk', en: 'Not bad, thanks. And you?', mn: 'Гайгүй ээ, баярлалаа. Та?', ex: 'Not bad, thanks. And you?' },
  { cat: 'talk', en: 'What did you get up to on the weekend?', mn: 'Амралтын өдөр юу хийсэн бэ?', ex: 'What did you get up to on the weekend? Anything fun?' },
  { cat: 'talk', en: 'I\'m from Mongolia.', mn: 'Би Монголоос ирсэн.', ex: 'I\'m from Mongolia. It\'s between Russia and China.' },
  { cat: 'talk', en: 'I\'ve been here for two years.', mn: 'Би энд хоёр жил болж байна.', ex: 'I\'ve been here for two years. I like Perth.' },
  { cat: 'talk', en: 'I\'m trying to improve my English.', mn: 'Би англи хэлээ сайжруулахыг хичээж байна.', ex: 'I\'m trying to improve my English, so please correct me.' },
  { cat: 'talk', en: 'That sounds good.', mn: 'Сайхан санагдаж байна / Тэгье.', ex: 'A barbie on Sunday? That sounds good.' },
  { cat: 'talk', en: 'I\'m not sure.', mn: 'Би сайн мэдэхгүй байна.', ex: 'I\'m not sure. Let me check.' },
  { cat: 'talk', en: 'What do you mean?', mn: 'Юу гэсэн үг вэ?', ex: 'What do you mean by "arvo"?' },
  { cat: 'talk', en: 'See you this arvo.', mn: 'Өнөөдөр үдээс хойш уулзъя.', ex: 'Okay, see you this arvo.' },
  { cat: 'talk', en: 'Have a good one!', mn: 'Сайхан өнгөрүүлээрэй!', ex: 'Thanks mate, have a good one!' },
  { cat: 'talk', en: 'It\'s pretty hot today, isn\'t it?', mn: 'Өнөөдөр нэлээд халуун байна, тийм үү?', ex: 'It\'s pretty hot today, isn\'t it? Drink some water.' },
  // phone
  { cat: 'phone', en: 'I\'d like to make an appointment.', mn: 'Цаг захиалмаар байна.', ex: 'Hi, I\'d like to make an appointment for Monday.' },
  { cat: 'phone', en: 'Can I speak to ... please?', mn: '...-тай ярьж болох уу?', ex: 'Can I speak to the manager, please?' },
  { cat: 'phone', en: 'Could you speak more slowly, please?', mn: 'Арай удаан ярьж өгнө үү?', ex: 'Sorry, could you speak more slowly, please?' },
  { cat: 'phone', en: 'My name is ... and my number is ...', mn: 'Миний нэр ..., дугаар ...', ex: 'My name is Bat, and my number is 0412 345 678.' },
  { cat: 'phone', en: 'I\'m calling about ...', mn: '... -ийн талаар залгаж байна.', ex: 'I\'m calling about my car service.' },
  { cat: 'phone', en: 'Can I leave a message?', mn: 'Мессеж үлдээж болох уу?', ex: 'He\'s not here? Can I leave a message?' },
  { cat: 'phone', en: 'I can\'t come in today.', mn: 'Би өнөөдөр ирж чадахгүй.', ex: 'I\'m sick. I can\'t come in today.' },
  { cat: 'phone', en: 'Is it possible to change the time?', mn: 'Цагийг өөрчлөх боломжтой юу?', ex: 'Is it possible to change the time to Thursday?' },
  // shop
  { cat: 'shop', en: 'How much is this?', mn: 'Энэ хэд вэ?', ex: 'Excuse me, how much is this?' },
  { cat: 'shop', en: 'Can I pay by card?', mn: 'Картаар төлж болох уу?', ex: 'Can I pay by card? I don\'t have cash.' },
  { cat: 'shop', en: 'I\'m just looking, thanks.', mn: 'Зүгээр л харж байна, баярлалаа.', ex: 'No, I\'m just looking, thanks.' },
  { cat: 'shop', en: 'Do you have this in a bigger size?', mn: 'Үүнээс том размер байна уу?', ex: 'Do you have these boots in a bigger size?' },
  { cat: 'shop', en: 'I\'d like to open an account.', mn: 'Данс нээлгэмээр байна.', ex: 'I\'d like to open an account, please.' },
  { cat: 'shop', en: 'I\'d like to send money overseas.', mn: 'Гадаад руу мөнгө явуулмаар байна.', ex: 'I\'d like to send money overseas to Mongolia.' },
  { cat: 'shop', en: 'Can I get a receipt, please?', mn: 'Баримт авч болох уу?', ex: 'Can I get a receipt, please? It\'s for work.' },
  { cat: 'shop', en: 'Can I get a flat white, please?', mn: 'Нэг flat white кофе өгөөч.', ex: 'Can I get a large flat white, please?' },
  // health
  { cat: 'health', en: 'I don\'t feel well.', mn: 'Би бие тааруу байна.', ex: 'I don\'t feel well. I think I have a cold.' },
  { cat: 'health', en: 'It hurts here.', mn: 'Энд өвдөж байна.', ex: 'It hurts here, when I lift my arm.' },
  { cat: 'health', en: 'I\'ve had a headache for three days.', mn: 'Гурван өдөр толгой өвдөж байна.', ex: 'I\'ve had a headache for three days.' },
  { cat: 'health', en: 'I need a medical certificate.', mn: 'Эмнэлгийн тодорхойлолт (чөлөөний бичиг) хэрэгтэй.', ex: 'I need a medical certificate for my boss.' },
  { cat: 'health', en: 'How often should I take this?', mn: 'Үүнийг хэр давтамжтай уух вэ?', ex: 'How often should I take this medicine?' },
  { cat: 'health', en: 'I\'m allergic to ...', mn: 'Би ...-д харшилтай.', ex: 'I\'m allergic to penicillin.' },
  { cat: 'health', en: 'Do I need to book in advance?', mn: 'Урьдчилан цаг захиалах хэрэгтэй юу?', ex: 'Do I need to book in advance or can I walk in?' },
  { cat: 'health', en: 'I injured my hand at work.', mn: 'Ажил дээрээ гараа гэмтээсэн.', ex: 'I injured my hand at work. Is this workers\' comp?' },
  // travel
  { cat: 'travel', en: 'Does this bus go to the city?', mn: 'Энэ автобус хот руу явах уу?', ex: 'Excuse me, does this bus go to the city?' },
  { cat: 'travel', en: 'How long does it take to get there?', mn: 'Тийшээ хүрэхэд хэр удах вэ?', ex: 'How long does it take to get there by train?' },
  { cat: 'travel', en: 'I\'m stuck in traffic.', mn: 'Би түгжрэлд орчихлоо.', ex: 'I\'m stuck in traffic on the freeway.' },
  { cat: 'travel', en: 'Can you give me a lift?', mn: 'Намайг хүргэж өгөх үү?', ex: 'My car is at the mechanic. Can you give me a lift?' },
  { cat: 'travel', en: 'Turn left at the lights.', mn: 'Гэрлэн дохион дээр зүүн эргэ.', ex: 'Go straight, then turn left at the lights.' },
  { cat: 'travel', en: 'Where can I park?', mn: 'Хаана машинаа тавих вэ?', ex: 'Where can I park near the site?' },
  // pte
  { cat: 'pte', en: 'The chart shows ...', mn: 'График ...-г харуулж байна. (Describe Image эхлэл)', ex: 'The chart shows the number of visitors to Perth from 2019 to 2023.' },
  { cat: 'pte', en: 'The highest figure is ...', mn: 'Хамгийн өндөр үзүүлэлт нь ...', ex: 'The highest figure is in July, at about 40 degrees.' },
  { cat: 'pte', en: 'The lowest figure is ...', mn: 'Хамгийн бага үзүүлэлт нь ...', ex: 'The lowest figure is in June, at around 10 per cent.' },
  { cat: 'pte', en: 'There was a steady increase.', mn: 'Тогтвортой өсөлт байсан.', ex: 'From 2019 to 2023, there was a steady increase.' },
  { cat: 'pte', en: 'It decreased sharply.', mn: 'Огцом буурсан.', ex: 'After 2021, the number decreased sharply.' },
  { cat: 'pte', en: 'In conclusion, ...', mn: 'Дүгнэж хэлэхэд ...', ex: 'In conclusion, the chart gives useful information about energy use.' },
  { cat: 'pte', en: 'The speaker was talking about ...', mn: 'Илтгэгч ...-ийн тухай ярьж байсан. (Retell Lecture эхлэл)', ex: 'The speaker was talking about climate change and farming.' },
  { cat: 'pte', en: 'He / She mentioned that ...', mn: 'Тэр ... гэж дурдсан.', ex: 'She mentioned that trees reduce heat in cities.' },
  { cat: 'pte', en: 'According to the speaker, ...', mn: 'Илтгэгчийн хэлснээр ...', ex: 'According to the speaker, sleep helps memory.' },
  { cat: 'pte', en: 'Overall, ...', mn: 'Ерөнхийдөө ...', ex: 'Overall, sales went up over the five years.' },
];

// ---------- SHADOWING (listen → repeat at the same time → record) ----------
DATA.shadow = [
  { id: 'intro', level: 'A1', title: 'Introducing yourself', mn: 'Өөрийгөө танилцуулах', scene: 'talk', lines: [
    ['Hi, my name is Bat.', 'Сайн байна уу, намайг Бат гэдэг.'],
    ['I\'m from Mongolia.', 'Би Монголоос ирсэн.'],
    ['I live in Perth with my family.', 'Би Пертэд гэр бүлийнхэнтэйгээ амьдардаг.'],
    ['I work as a steel fixer.', 'Би арматурчин хийдэг.'],
    ['I like my job, but it\'s hard work.', 'Ажилдаа дуртай, гэхдээ хүнд ажил.'],
    ['I\'m learning English to get a better future.', 'Илүү сайн ирээдүйн төлөө англи хэл сурч байна.'],
  ]},
  { id: 'site-morning', level: 'A1', title: 'Morning on site', mn: 'Ажлын талбай дээрх өглөө', scene: 'site', lines: [
    ['Morning, mate. How\'s it going?', 'Өглөөний мэнд, найз минь. Юу байна?'],
    ['Good, thanks. What are we doing today?', 'Сайн, баярлалаа. Өнөөдөр юу хийх вэ?'],
    ['We\'re tying the bars for the slab.', 'Хавтангийн арматурыг уяна.'],
    ['The concrete truck is coming at two.', 'Бетоны машин хоёр цагт ирнэ.'],
    ['Okay. I\'ll grab my tools.', 'За. Би багаж хэрэгслээ авъя.'],
    ['Don\'t forget your gloves and glasses.', 'Бээлий, нүдний шилээ бүү март.'],
  ]},
  { id: 'coffee', level: 'A1', title: 'Ordering coffee', mn: 'Кофе захиалах', scene: 'shop', lines: [
    ['Hi, what can I get for you?', 'Сайн байна уу, юу авах вэ?'],
    ['Can I get a large flat white, please?', 'Нэг том flat white өгөөч.'],
    ['Sure. Anything else?', 'За. Өөр юм уу?'],
    ['And a ham and cheese toastie.', 'Бас нэг хиамтай бяслагтай шарсан талх.'],
    ['That\'s twelve dollars fifty.', 'Арван хоёр доллар тавин цент.'],
    ['Can I pay by card?', 'Картаар төлж болох уу?'],
  ]},
  { id: 'sick', level: 'A2', title: 'Calling in sick', mn: 'Өвчтэй гэж утасдах', scene: 'phone', lines: [
    ['Hi Steve, it\'s Bat speaking.', 'Сайн уу Стив, Бат ярьж байна.'],
    ['I\'m sorry, but I can\'t come in today.', 'Уучлаарай, өнөөдөр ирж чадахгүй нь.'],
    ['I\'ve got a high temperature and a sore throat.', 'Халуунтай, хоолой өвдөж байна.'],
    ['I\'m going to see a doctor this morning.', 'Өглөө эмчид үзүүлнэ.'],
    ['I\'ll send you a medical certificate.', 'Эмнэлгийн бичгээ явуулна.'],
    ['I hope to be back tomorrow.', 'Маргааш эргэж ирнэ гэж найдаж байна.'],
  ]},
  { id: 'foreman', level: 'A2', title: 'Talking to the foreman', mn: 'Мастертай ярих', scene: 'site', lines: [
    ['Excuse me, can I ask you something?', 'Уучлаарай, нэг юм асууж болох уу?'],
    ['The drawing says N12, but we only have N16 bars.', 'Зураг дээр N12 гэсэн ч бидэнд зөвхөн N16 байна.'],
    ['Should we wait for the delivery?', 'Хүргэлтийг хүлээх үү?'],
    ['Good question. Let me call the engineer.', 'Сайн асуулт. Инженер рүү залгая.'],
    ['In the meantime, start on the columns.', 'Тэр хооронд баганаас эхэл.'],
    ['No worries. I\'ll get started.', 'Зүгээр. Эхэлье.'],
  ]},
  { id: 'gp', level: 'A2', title: 'At the GP', mn: 'Өрхийн эмч дээр', scene: 'health', lines: [
    ['So, what brings you in today?', 'Өнөөдөр юугаар ирэв?'],
    ['I hurt my shoulder at work last week.', 'Өнгөрсөн долоо хоногт ажил дээрээ мөрөө гэмтээсэн.'],
    ['Does it hurt when you lift your arm?', 'Гараа өргөхөд өвдөж байна уу?'],
    ['Yes, especially in the morning.', 'Тийм, ялангуяа өглөө.'],
    ['I\'ll refer you for an X-ray.', 'Би таныг рентген зурагт явуулъя.'],
    ['Try to rest it for a few days.', 'Хэдэн өдөр амраахыг хичээгээрэй.'],
  ]},
  { id: 'weekend', level: 'A2', title: 'Weekend plans', mn: 'Амралтын өдрийн төлөвлөгөө', scene: 'talk', lines: [
    ['Got any plans for the weekend?', 'Амралтын өдөр төлөвлөгөө байна уу?'],
    ['We\'re going to the beach on Saturday.', 'Бямба гарагт далайн эрэг явна.'],
    ['Which beach do you usually go to?', 'Ихэвчлэн аль эрэг явдаг вэ?'],
    ['Cottesloe. It\'s not too crowded in the morning.', 'Коттеслоу. Өглөө их хөл хөдөлгөөнгүй.'],
    ['Sounds great. Don\'t forget the sunscreen!', 'Гоё байна. Нарны тосоо бүү мартаарай!'],
  ]},
  { id: 'toolbox', level: 'B1', title: 'Toolbox talk (safety)', mn: 'Аюулгүй ажиллагааны товч уулзалт', scene: 'site', lines: [
    ['Okay everyone, let\'s start the toolbox talk.', 'За бүгдээрээ, товч уулзалтаа эхэлье.'],
    ['Today we are working at heights on level three.', 'Өнөөдөр гуравдугаар давхарт өндөрт ажиллана.'],
    ['Make sure your harness is checked and clipped on.', 'Бүсээ шалгаж, заавал зүүгээрэй.'],
    ['If you see a hazard, report it straight away.', 'Аюул харвал шууд мэдэгдээрэй.'],
    ['Nobody works under the crane load.', 'Кранаар өргөж буй ачааны доор хэн ч ажиллахгүй.'],
    ['Any questions before we start?', 'Эхлэхээс өмнө асуулт байна уу?'],
  ]},
  { id: 'rent', level: 'B1', title: 'Renting a unit', mn: 'Байр түрээслэх', scene: 'phone', lines: [
    ['Hi, I\'m calling about the two-bedroom unit in Morley.', 'Морли дахь хоёр өрөө байрны талаар залгаж байна.'],
    ['Is it still available?', 'Одоо ч сул байгаа юу?'],
    ['How much is the rent per week?', 'Долоо хоногийн түрээс хэд вэ?'],
    ['Does that include water and electricity?', 'Ус, цахилгаан орсон уу?'],
    ['When can I come and have a look?', 'Хэзээ ирж үзэж болох вэ?'],
    ['Great, I\'ll see you on Saturday at ten.', 'Сайн байна, бямба гарагт 10 цагт уулзъя.'],
  ]},
  { id: 'trees', level: 'B1', title: 'Why cities need trees (academic)', mn: 'Хотод мод яагаад хэрэгтэй вэ (академик)', scene: 'pte', lines: [
    ['Trees play an important role in modern cities.', 'Мод орчин үеийн хотод чухал үүрэгтэй.'],
    ['They provide shade and reduce the temperature of streets.', 'Сүүдэр өгч, гудамжны температурыг бууруулдаг.'],
    ['In addition, trees improve air quality by absorbing pollution.', 'Мөн бохирдлыг шингээж агаарын чанарыг сайжруулдаг.'],
    ['Research shows that green areas can also reduce stress.', 'Ногоон бүс стрессийг бууруулдгийг судалгаа харуулдаг.'],
    ['As a result, many governments are planting more trees.', 'Үүний үр дүнд олон засгийн газар илүү мод тарьж байна.'],
  ]},
  { id: 'sleep', level: 'B1', title: 'Sleep and memory (academic)', mn: 'Нойр ба ой санамж (академик)', scene: 'pte', lines: [
    ['Sleep is essential for learning and memory.', 'Нойр суралцах, санах ойд зайлшгүй хэрэгтэй.'],
    ['While we sleep, the brain organises new information.', 'Унтах үед тархи шинэ мэдээллийг эмхэлдэг.'],
    ['Students who sleep well often perform better in exams.', 'Сайн унтдаг оюутнууд шалгалтад илүү сайн байдаг.'],
    ['However, many young people do not get enough sleep.', 'Гэвч олон залуус хангалттай унтдаггүй.'],
    ['Experts recommend seven to nine hours every night.', 'Мэргэжилтнүүд шөнө бүр 7-9 цаг унтахыг зөвлөдөг.'],
  ]},
];

// ---------- PTE: READ ALOUD ----------
DATA.readAloud = [
  'Australia is one of the driest continents on Earth. Most people live along the coast, where the climate is milder and rainfall is more reliable. Inland areas receive very little rain, so water management is an important issue for farmers and governments.',
  'Many universities now offer online courses. These courses allow students to study from home and choose their own timetable. However, some students find it difficult to stay motivated without regular contact with teachers and classmates.',
  'Steel is one of the most widely used materials in construction. It is strong, flexible and relatively cheap to produce. When steel bars are placed inside concrete, the combination can support very heavy loads in bridges and buildings.',
  'Regular exercise has many benefits for both the body and the mind. It can reduce the risk of heart disease, improve sleep and help people manage stress. Experts suggest at least thirty minutes of moderate activity on most days of the week.',
  'The kangaroo is a symbol of Australia. These animals move by hopping on their strong back legs and use their long tails for balance. Female kangaroos carry their young in a pouch until they are old enough to survive on their own.',
  'Public transport plays a key role in reducing traffic in large cities. When more people use trains and buses, there are fewer cars on the road. This not only saves time but also reduces air pollution and greenhouse gas emissions.',
  'Learning a second language can improve memory and problem-solving skills. Studies have shown that bilingual people are often better at switching between tasks. Learning a language also helps people understand other cultures more deeply.',
  'Solar energy is becoming more popular in Western Australia. Many households have installed panels on their roofs to reduce their electricity bills. As technology improves, the cost of solar systems continues to fall.',
  'The library is an important place for students. It provides quiet areas for study, access to computers and a large collection of books and journals. Librarians can also help students find reliable sources for their assignments.',
  'Small businesses are an important part of the economy. They create jobs for local people and offer services that large companies often cannot provide. However, many small businesses face challenges such as high rents and strong competition.',
  'Coral reefs are home to thousands of different species. The Great Barrier Reef is the largest reef system in the world. Rising ocean temperatures have caused damage to parts of the reef, which has led to new protection programs.',
  'Good communication is essential in any workplace. When instructions are clear, workers can complete tasks safely and efficiently. Misunderstandings, on the other hand, can lead to mistakes, delays and even accidents.',
];

// ---------- PTE: REPEAT SENTENCE (also used for Write From Dictation) ----------
DATA.repeat = [
  'The library will be closed on public holidays.',
  'Please submit your assignment before the end of the week.',
  'The lecture has been moved to the main theatre.',
  'Students should check their emails every day.',
  'The results will be published on the website next month.',
  'Most of the research was carried out in Western Australia.',
  'You can find more information in the student handbook.',
  'The cafeteria is located on the ground floor.',
  'Remember to bring your student card to the exam.',
  'The professor will be available after the class.',
  'Climate change affects farmers in many different ways.',
  'Group discussions help students develop new ideas.',
  'The deadline for applications has been extended.',
  'Parking on campus is limited during the semester.',
  'The study found a strong link between diet and health.',
  'All participants must complete the online survey.',
  'The new building will open at the start of next year.',
  'Our tutorial starts at nine o\'clock on Monday morning.',
  'Many students work part-time while they are studying.',
  'Safety equipment must be worn at all times on site.',
  'The population of the city has doubled in twenty years.',
  'Water is one of the most valuable natural resources.',
  'Please turn off your mobile phones during the lecture.',
  'The museum offers free entry to university students.',
  'Technology has changed the way we communicate.',
  'The essay should be no longer than two thousand words.',
  'Further details will be discussed in the next lecture.',
  'Renewable energy is becoming cheaper every year.',
  'The meeting has been postponed until further notice.',
  'Reading every day is a good way to improve vocabulary.',
];

// ---------- PTE: ANSWER SHORT QUESTION ----------
DATA.shortQ = [
  { q: 'What do we call a person who repairs cars?', a: ['mechanic'] },
  { q: 'How many days are there in a week?', a: ['seven', '7'] },
  { q: 'What do you call the meal you eat in the morning?', a: ['breakfast'] },
  { q: 'Which season comes after winter?', a: ['spring'] },
  { q: 'What do we use to tell the time?', a: ['clock', 'watch'] },
  { q: 'What is the opposite of "ancient"?', a: ['modern', 'new'] },
  { q: 'Where do you go to borrow books?', a: ['library'] },
  { q: 'What do you call a doctor who looks after teeth?', a: ['dentist'] },
  { q: 'How many sides does a triangle have?', a: ['three', '3'] },
  { q: 'What is frozen water called?', a: ['ice'] },
  { q: 'Which animal is known as the king of the jungle?', a: ['lion'] },
  { q: 'What do you call a picture of a place that shows roads and cities?', a: ['map'] },
  { q: 'What instrument do doctors use to listen to your heart?', a: ['stethoscope'] },
  { q: 'What is the capital city of Australia?', a: ['canberra'] },
  { q: 'Which planet do we live on?', a: ['earth'] },
  { q: 'What do bees make?', a: ['honey'] },
  { q: 'What do you wear on your head to protect it on a building site?', a: ['hard hat', 'helmet', 'hardhat'] },
  { q: 'How many months are there in a year?', a: ['twelve', '12'] },
  { q: 'What is the period of ten years called?', a: ['decade'] },
  { q: 'What part of a plant grows under the ground?', a: ['root', 'roots'] },
  { q: 'What do you call a book of words and their meanings?', a: ['dictionary'] },
  { q: 'What do we call the person who flies a plane?', a: ['pilot'] },
  { q: 'Which direction does the sun rise in?', a: ['east'] },
  { q: 'What do you call the money you pay to live in a house you do not own?', a: ['rent'] },
  { q: 'What is the opposite of "maximum"?', a: ['minimum'] },
];

// ---------- PTE: RESPOND TO A SITUATION ----------
DATA.situations = [
  { s: 'You booked a table at a restaurant for Saturday, but now you cannot go. Call the restaurant and explain.', mn: 'Бямба гарагт ширээ захиалсан ч очиж чадахгүй боллоо. Ресторан руу залгаж тайлбарла.',
    model: 'Hi, my name is Bat. I booked a table for four people this Saturday at seven pm. Unfortunately, something came up at work and I can\'t make it. Could you please cancel my booking? I\'m really sorry for the short notice. I hope to come another time. Thank you.' },
  { s: 'Your classmate borrowed your notes last week and has not returned them. You need them for the exam. Talk to your classmate.', mn: 'Ангийнхан тань тэмдэглэлийг чинь авсан ч буцааж өгөөгүй. Шалгалтад хэрэгтэй байна. Түүнтэй ярь.',
    model: 'Hey Sam, how are you? Do you remember you borrowed my notes last week? I\'m sorry to ask, but I really need them now because the exam is on Monday. Could you bring them tomorrow? If you still need them, we can make a copy at the library. Thanks a lot.' },
  { s: 'You will be late for an important meeting with your manager because of a traffic accident. Leave a voice message.', mn: 'Замын осолоос болж менежертэйгээ хийх чухал уулзалтад хоцорно. Дуут мессеж үлдээ.',
    model: 'Hi Steve, it\'s Bat. I\'m very sorry, but I\'m going to be about twenty minutes late for our meeting. There has been an accident on the freeway and the traffic is not moving. I\'ll get there as soon as I can. If it\'s easier, we can move the meeting to eleven. Sorry again.' },
  { s: 'Your neighbour plays loud music late at night and you cannot sleep. Talk to your neighbour politely.', mn: 'Хөрш тань шөнө чанга хөгжим тоглуулж, та унтаж чадахгүй байна. Эелдэгээр ярь.',
    model: 'Hi, sorry to bother you. I live next door. I start work very early, at six in the morning, and the music last night was quite loud after midnight. Would you mind turning it down after ten pm? I\'d really appreciate it. Thanks for understanding.' },
];

// ---------- PTE: RETELL LECTURE (short lectures read by the app) ----------
DATA.lectures = [
  { title: 'Urban heat', text: 'Today I want to talk about something called the urban heat island effect. Cities are usually hotter than the countryside around them. This is because roads and buildings absorb heat during the day and release it at night. There are also fewer trees and less water to cool the air. One simple solution is to plant more trees and create green roofs. Some cities have also started to use lighter coloured materials on roads, which reflect sunlight instead of absorbing it.',
    keys: ['urban heat island', 'cities hotter', 'roads and buildings absorb heat', 'fewer trees', 'plant more trees', 'green roofs', 'lighter materials'] },
  { title: 'Bees and food', text: 'Bees are much more important than most people think. Around one third of the food we eat depends on pollination, and bees do a large part of this work. Without bees, crops like apples, almonds and many vegetables would produce much less. Unfortunately, bee numbers have fallen in many countries. Scientists believe the main causes are pesticides, disease and the loss of natural habitats. Farmers and gardeners can help by planting flowers and reducing the use of chemicals.',
    keys: ['bees important', 'one third of food', 'pollination', 'apples almonds', 'numbers have fallen', 'pesticides disease habitat', 'plant flowers'] },
  { title: 'Learning by doing', text: 'Many studies show that people learn best when they are actively involved. If students only listen to a lecture, they may forget most of the information within a week. However, when they practise, discuss or teach the information to others, they remember much more. This is why apprenticeships are so effective. Apprentices learn skills on the job, with guidance from experienced workers. They combine theory with real practice, and this helps them develop both knowledge and confidence.',
    keys: ['learn best actively', 'only listen forget', 'practise discuss teach', 'remember more', 'apprenticeships effective', 'on the job', 'theory and practice'] },
  { title: 'Concrete', text: 'Concrete is the most widely used building material in the world. It is made by mixing cement, water, sand and stone. Concrete is very strong when it is compressed, but it is weak when it is pulled or bent. That is why engineers place steel bars, called reinforcement, inside it. The steel carries the tension and the concrete carries the compression. However, producing cement creates a large amount of carbon dioxide, so researchers are looking for greener alternatives.',
    keys: ['most used material', 'cement water sand stone', 'strong in compression', 'weak in tension', 'steel reinforcement', 'carbon dioxide', 'greener alternatives'] },
];

// ---------- PTE: DESCRIBE IMAGE (charts drawn by the app) ----------
DATA.images = [
  { type: 'bar', title: 'Visitors to Perth (thousands), 2019–2023', unit: 'thousand', labels: ['2019', '2020', '2021', '2022', '2023'], values: [820, 310, 260, 640, 910] },
  { type: 'line', title: 'Average maximum temperature in Perth (°C)', unit: 'degrees', labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'], values: [31, 29, 22, 18, 21, 27] },
  { type: 'pie', title: 'How workers travel to a construction site', unit: 'per cent', labels: ['Car', 'Ute / van', 'Train', 'Bus', 'Bike'], values: [45, 30, 12, 8, 5] },
  { type: 'bar', title: 'Household electricity use by activity (%)', unit: 'per cent', labels: ['Heating', 'Cooling', 'Water', 'Fridge', 'Lights'], values: [32, 24, 21, 13, 10] },
  { type: 'line', title: 'Number of apprentices in WA (thousands)', unit: 'thousand', labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022'], values: [14, 12, 11, 11, 13, 17, 19] },
  { type: 'pie', title: 'How students spend a typical day (hours)', unit: 'hours', labels: ['Sleep', 'Study', 'Work', 'Travel', 'Free time'], values: [8, 6, 4, 2, 4] },
  { type: 'process', title: 'How a concrete slab is built', steps: ['Set up formwork', 'Place and tie steel bars', 'Pour concrete', 'Smooth the surface', 'Let it cure'] },
];

// ---------- PTE: READING FILL IN THE BLANKS ----------
DATA.fib = [
  { text: 'Australia has a {0} population, with most people living in large cities on the {1}. The government encourages migrants to {2} in regional areas.', blanks: [['diverse', 'diversity', 'diverted'], ['coast', 'cost', 'coats'], ['settle', 'settled', 'settlement']], answer: ['diverse', 'coast', 'settle'] },
  { text: 'Regular sleep is {0} for good health. People who do not get {1} sleep may find it hard to {2} at work or school.', blanks: [['essence', 'essential', 'essentially'], ['enough', 'many', 'lot'], ['concentrate', 'concentration', 'concentrated']], answer: ['essential', 'enough', 'concentrate'] },
  { text: 'The new bridge was {0} in 2021. It was designed to {1} heavy traffic and to {2} strong winds.', blanks: [['complete', 'completed', 'completing'], ['carry', 'carrying', 'carried'], ['resist', 'resistant', 'resistance']], answer: ['completed', 'carry', 'resist'] },
  { text: 'Many students {0} from studying in groups. Working with others helps them to share ideas and {1} problems more {2}.', blanks: [['benefit', 'benefits', 'beneficial'], ['solve', 'solution', 'solving'], ['effective', 'effectively', 'effect']], answer: ['benefit', 'solve', 'effectively'] },
  { text: 'Recycling {0} the amount of rubbish that goes to landfill. It also {1} energy, because making products from recycled materials {2} less power.', blanks: [['reduces', 'reduce', 'reduction'], ['saves', 'save', 'saving'], ['requires', 'require', 'requirement']], answer: ['reduces', 'saves', 'requires'] },
  { text: 'There has been a {0} increase in the number of people working from home. This trend has had a big {1} on city centres, where many offices are now {2}.', blanks: [['significant', 'significance', 'signify'], ['impact', 'impacted', 'impacting'], ['empty', 'emptiness', 'emptied']], answer: ['significant', 'impact', 'empty'] },
];

// ---------- PRONUNCIATION TIPS for Mongolian speakers ----------
DATA.pron = [
  { t: 'TH /θ/ /ð/', mn: 'Хэлний үзүүрийг шүдний хооронд гаргаж хэл: think, three, this, the. "s" эсвэл "z" болгож болохгүй.', ex: 'I think three of them are there.' },
  { t: 'V ба W', mn: 'V: дээд шүдээ доод уруул дээр тавина (very). W: уруулаа дугуйлна (well). Монгол "в"-тэй андуурах нь их.', ex: 'We have a very wet winter.' },
  { t: 'Төгсгөлийн гийгүүлэгч', mn: 'Үгийн төгсгөлийн -s, -ed, -t, -d-г заавал хэл. PTE машин үүнийг сонсдог.', ex: 'He worked and finished the slabs.' },
  { t: 'Үгийн өргөлт', mn: 'Монгол хэлэнд өргөлт эхэнд байдаг. Англид өөр байж болно: comPUter, inforMAtion, enVIronment.', ex: 'The information about the environment is important.' },
  { t: 'Холбож хэлэх (linking)', mn: 'Гийгүүлэгчээр төгсөж, эгшгээр эхэлсэн үгийг холбо: "pick it up" → "pi-ki-tup".', ex: 'Pick it up and put it on.' },
  { t: 'Хэмнэл, зогсолт', mn: 'Таслал, цэг дээр богино амсхий. Өгүүлбэр дундуур "ээ..." гэж бүү зогс. Гөлгөр ярих нь PTE-д хамгийн чухал.', ex: 'In addition, trees improve air quality, and they reduce stress.' },
];
