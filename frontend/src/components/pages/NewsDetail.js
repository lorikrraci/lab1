import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const initialNewsData = {
    NEW: [
      {
        id: 1,
        img: "/path/to/image1.jpg",
        title: "Vëllaznimi fiton ndaj Pejës në një ndeshje spektakolare",
        date: "25 SHT 2023 NGA ALBAN BERISHA",
        description: "Vëllaznimi ka arritur një fitore të paharruar ndaj Pejës...",
        fullContent: `
          Në një ndeshje të mbushur me emocione dhe tension, Vëllaznimi ka arritur një fitore të paharruar ndaj Pejës, një nga rivalët më të fortë të kampionatit. Ndeshja, e cila u zhvillua në stadiumin e plotë me tifozë, filloi me një ritëm të shpejtë nga të dyja skuadrat. Vëllaznimi u shfaq i përgatitur mirë dhe me një strategji të qartë, duke siguruar një avantazh të hershëm në rezultat. Sulmi i tyre ishte i organizuar dhe efektiv, ndërsa mbrojtja qëndroi e fortë përballë sulmeve të forta të Pejës.
  
          Në pjesën e dytë të ndeshjes, Peja u përpoq të kthente rezultatin, duke shtypur Vëllaznimin me sulme të shpejta dhe kombinime të shkëlqyera. Megjithatë, portieri i Vëllaznimit, me disa interventa të mahnitshme, arriti të mbante skuadrën e tij në lojë. Në minutat e fundit, Vëllaznimi shënoi golin e fitores, duke sjellë festa të mëdha në mes të tifozëve. Ky rezultat i rëndësishëm i jep Vëllaznimit një avantazh të madh në garën për titullin e kampionit.
  
          Trajneri i Vëllaznimit, Alban Berisha, u shpreh i kënaqur me performancën e skuadrës: "Jemi shumë të lumtur për këtë fitore. Lojtarët treguan karakter dhe përkushtim të jashtëzakonshëm. Kjo është vetëm fillimi, dhe ne do të vazhdojmë të punojmë fort për të arritur qëllimet tona."
        `,
      },
      {
        id: 2,
        img: "/path/to/image2.jpg",
        title: "Trajneri i Vëllaznimit: Gati për sfidën e radhës",
        date: "25 SHT 2023 NGA BLERTA KADRIU",
        description: "Trajneri i skuadrës, Alban Berisha, ka shprehur optimizmin e tij...",
        fullContent: `
          Trajneri i Vëllaznimit, Alban Berisha, ka shprehur optimizmin e tij për sfidën e ardhshme të skuadrës. Në një konferencë për shtyp, Berisha theksoi se skuadra është plotësisht e përgatitur për të përballuar çdo kundërshtar që do të vijë në rrugën e tyre. "Ne kemi punuar shumë në stërvitje dhe jemi të gatshëm për të gjitha sfidat," tha Berisha.
  
          Ai gjithashtu vuri në dukje rëndësinë e bashkëpunimit dhe unitetit brenda skuadrës: "Kemi një grup lojtarësh shumë të talentuar dhe të përkushtuar. Secili prej tyre e di rolin e tij dhe është i gatshëm të japë maksimumin për skuadrën. Kjo është ajo që na bën të fortë."
  
          Berisha gjithashtu foli për rëndësinë e mbështetjes së tifozëve: "Tifozët tanë janë pjesë e rëndësishme e suksesit tonë. Energjia dhe entuziazmi i tyre na japin fuqi dhe motivim për të luajtur më mirë. Ne do të vazhdojmë të punojmë fort për t'i kënaqur ata dhe për të arritur qëllimet tona."
        `,
      },
      {
        id: 3,
        img: "/path/to/image5.jpg",
        title: "Vëllaznimi siguron fitoren ndaj rivalëve të tij",
        date: "26 SHT 2023 NGA ARBEN KASTRAQI",
        description: "Në një ndeshje të rëndësishme për sezonin, Vëllaznimi ka mundur...",
        fullContent: `
          Në një ndeshje të rëndësishme për sezonin, Vëllaznimi ka arritur një fitore të madhe ndaj një prej rivalëve të tij më të fortë. Ndeshja, e cila u zhvillua në kushte të vështira, ishte një provë e vërtetë për karakterin dhe përkushtimin e lojtarëve të Vëllaznimit. Skuadra filloi ndeshjen me një ritëm të lartë, duke siguruar një avantazh të hershëm në rezultat.
  
          Megjithatë, rivali nuk u dorëzua lehtë dhe u përpoq të kthente rezultatin me sulme të shpejta dhe kombinime të shkëlqyera. Mbrojtja e Vëllaznimit qëndroi e fortë, dhe portieri i skuadrës bëri disa interventa të mahnitshme për të mbajtur rezultatin. Në pjesën e dytë, Vëllaznimi shënoi golin e dytë, duke siguruar fitoren dhe tre pika të rëndësishme.
  
          Trajneri i skuadrës, Alban Berisha, u shpreh i kënaqur me performancën e lojtarëve: "Kjo ishte një ndeshje shumë e rëndësishme për ne. Lojtarët treguan karakter dhe përkushtim të jashtëzakonshëm. Ne do të vazhdojmë të punojmë fort për të arritur qëllimet tona."
        `,
      },
      {
        id: 4,
        img: "/path/to/image6.jpg",
        title: "Lajm i ri për lëndimin e një lojtari të Vëllaznimit",
        date: "27 SHT 2023 NGA ELDA MALOKU",
        description: "Vëllaznimi ka marrë një lajm të hidhur pas lëndimit...",
        fullContent: `
          Vëllaznimi ka marrë një lajm të hidhur pas lëndimit të një prej lojtarëve të saj kryesorë gjatë një stërvitjeje intensive. Lojtari, i cili ka qenë një nga shtyllat kryesore të skuadrës këtë sezon, u lëndua në një situatë jo kontakti dhe u detyrua të largohej nga fusha. Menaxhmenti i skuadrës ka konfirmuar se lojtari është duke kaluar procedurat mjekësore dhe se ende nuk është e qartë se sa kohë do t'i duhet për t'u rikuperuar.
  
          Trajneri i skuadrës, Alban Berisha, u shpreh i shqetësuar për gjendjen e lojtarit: "Është një situatë shumë e vështirë për ne. Ai është një lojtar shumë i rëndësishëm për skuadrën, dhe shpresojmë që ai të kthehet sa më shpejt në fushë. Ne do të përdorim të gjitha burimet tona për ta ndihmuar atë në procesin e rikuperimit."
  
          Lëndimi ka shkaktuar shqetësim në mes të tifozëve, të cilët shpresojnë që lojtari të kthehet shpejt në formën e tij më të mirë. Skuadra do të duhet të përshtatet pa praninë e tij në ndeshjet e ardhshme.
        `,
      },
    ],
    HIGHLIGHT: [
      {
        id: 5,
        img: "/path/to/image3.jpg",
        title: "Vëllaznimi shkëlqen në turneun ndërkombëtar",
        date: "25 SHT 2023 NGA ARBEN KASTRAQI",
        description: "Vëllaznimi ka shkëlqyer në turneun ndërkombëtar...",
        fullContent: `
          Vëllaznimi ka shkëlqyer në turneun ndërkombëtar, duke treguar një nivel të jashtëzakonshëm të lojës dhe një performancë që ka mahnitur jo vetëm tifozët, por edhe kundërshtarët. Turneu, i cili u zhvillua në një nga vendet më prestigjioze të Evropës, solli së bashku skuadrat më të mira nga të gjithë kontinenti. Vëllaznimi u shfaq si një nga skuadrat më të organizuara dhe më të përgatitura, duke siguruar fitore të bindshme në të gjitha ndeshjet e tyre.
  
          Në ndeshjen finale, Vëllaznimi përballoi një skuadër shumë të fortë nga Spanja. Ndeshja ishte e mbushur me tension dhe emocione, por Vëllaznimi tregoi një nivel të jashtëzakonshëm të lojës, duke siguruar fitoren me një rezultat të ngushtë. Ky triumf i jep skuadrës një hov të madh dhe tregon se Vëllaznimi është gati për të sfiduar çdo ekip në nivel ndërkombëtar.
  
          Trajneri i skuadrës, Alban Berisha, u shpreh i kënaqur me performancën e lojtarëve: "Kjo është një ditë e madhe për ne. Lojtarët treguan karakter dhe përkushtim të jashtëzakonshëm. Ne do të vazhdojmë të punojmë fort për të arritur qëllimet tona."
        `,
      },
      {
        id: 6,
        img: "/path/to/image7.jpg",
        title: "Fitore e rëndësishme për Vëllaznimin në finalen e Kupës",
        date: "28 SHT 2023 NGA ALBAN BERISHA",
        description: "Vëllaznimi ka arritur një fitore të madhe në finalen e Kupës...",
        fullContent: `
          Vëllaznimi ka arritur një fitore të madhe në finalen e Kupës, duke mundur një ekip të fortë që e kishte dominuar gjatë gjithë sezonit. Ndeshja, e cila u zhvillua në një stadium të mbushur plot me tifozë, ishte një provë e vërtetë për karakterin dhe përkushtimin e lojtarëve të Vëllaznimit. Skuadra filloi ndeshjen me një ritëm të lartë, duke siguruar një avantazh të hershëm në rezultat.
  
          Megjithatë, rivali nuk u dorëzua lehtë dhe u përpoq të kthente rezultatin me sulme të shpejta dhe kombinime të shkëlqyera. Mbrojtja e Vëllaznimit qëndroi e fortë, dhe portieri i skuadrës bëri disa interventa të mahnitshme për të mbajtur rezultatin. Në pjesën e dytë, Vëllaznimi shënoi golin e dytë, duke siguruar fitoren dhe trofeun e Kupës.
  
          Trajneri i skuadrës, Alban Berisha, u shpreh i kënaqur me performancën e lojtarëve: "Kjo është një ditë e madhe për ne. Lojtarët treguan karakter dhe përkushtim të jashtëzakonshëm. Ne do të vazhdojmë të punojmë fort për të arritur qëllimet tona."
        `,
      },
    ],
    INTERVIEWS: [
      {
        id: 7,
        img: "/path/to/image4.jpg",
        title: "Intervistë ekskluzive me kapitenin e Vëllaznimit",
        date: "26 SHT 2023 NGA ELDA MALOKU",
        description: "Kapiteni i Vëllaznimit, një nga lojtarët më të përvojshëm në skuadër...",
        fullContent: `
          Kapiteni i Vëllaznimit, një nga lojtarët më të përvojshëm në skuadër, ka dhënë një intervistë ekskluzive ku ka folur për arritjet dhe sfidat e tij si lider i skuadrës. Ai ka theksuar se roli i tij si kapiten është një përgjegjësi e madhe, por gjithashtu një nder i jashtëzakonshëm. "E di që kam përgjegjësi të mëdha ndaj skuadrës dhe tifozëve, dhe kjo më motivon për të dhënë më të mirën çdo herë që dal në fushë," tha ai.
  
          Ai gjithashtu foli për marrëdhënien me trajnerin dhe bashkëlojtarët e tij, duke theksuar rëndësinë e bashkëpunimit dhe harmonisë brenda ekipit. "Ne jemi si një familje. Secili prej nesh e di rolin e tij dhe është i gatshëm të japë maksimumin për skuadrën. Kjo është ajo që na bën të fortë," tha kapiteni.
  
          Kapiteni shpreson që me këtë grup lojtarësh, Vëllaznimi mund të arrijë shumë më shumë në të ardhmen. "Ne kemi një grup shumë të talentuar dhe të përkushtuar. Unë besoj se mund të arrijmë gjëra të mëdha këtë sezon," tha ai.
        `,
      },
      {
        id: 8,
        img: "/path/to/image8.jpg",
        title: "Intervistë me trajnerin e Vëllaznimit pas një fitoreje të madhe",
        date: "30 SHT 2023 NGA BLERTA KADRIU",
        description: "Pas një fitoreje të rëndësishme, trajneri i Vëllaznimit...",
        fullContent: `
          Pas një fitoreje të rëndësishme, trajneri i Vëllaznimit, Alban Berisha, ka dhënë një intervistë ku ka shprehur kënaqësinë e tij për paraqitjen e skuadrës. "Jam shumë i lumtur me mënyrën se si skuadra luajti. Ata treguan disiplinë dhe përkushtim, dhe kjo është ajo që më bën të besoj te ky ekip," tha Berisha.
  
          Ai gjithashtu foli për strategjinë e lojës dhe përgatitjen e skuadrës, duke theksuar se suksesi nuk vjen rastësisht, por është rezultat i punës së palodhur dhe bashkëpunimit të ngushtë mes lojtarëve dhe stafit. "Ne kemi punuar shumë në stërvitje dhe jemi të gatshëm për të gjitha sfidat," tha ai.
  
          Berisha gjithashtu vuri në dukje rëndësinë e mbështetjes së tifozëve: "Tifozët tanë janë pjesë e rëndësishme e suksesit tonë. Energjia dhe entuziazmi i tyre na japin fuqi dhe motivim për të luajtur më mirë. Ne do të vazhdojmë të punojmë fort për t'i kënaqur ata dhe për të arritur qëllimet tona."
        `,
      },
      {
        id: 9,
        img: "/path/to/image9.jpg",
        title: "Intervistë me një lojtar të ri të Vëllaznimit",
        date: "2 OKT 2023 NGA ARBEN KASTRAQI",
        description: "Një nga lojtarët më të rinj të Vëllaznimit ka dhënë një intervistë...",
        fullContent: `
          Një nga lojtarët më të rinj të Vëllaznimit ka dhënë një intervistë ku ka folur për përvojën e tij deri tani me ekipin dhe për pritshmëritë që ka për të ardhmen. Ai theksoi se ka mësuar shumë nga lojtarët më të përvojshëm dhe nga trajneri, dhe se është shumë i motivuar për të treguar aftësitë e tij në fushë. "Kam mësuar shumë gjatë stërvitjeve dhe ndeshjeve. Dua të bëhem një lojtar më i mirë dhe të kontribuoj për skuadrën," tha ai.
  
          Pavarësisht se është ende një lojtar i ri, ai ka treguar se është i gatshëm të marrë përgjegjësi dhe të ndihmojë ekipin të arrijë sukses. "Unë besoj se mund të jap shumë për këtë skuadër. Jam i gatshëm të punoj fort dhe të mësoj nga më të mirët," tha ai.
  
          Lojtari i ri gjithashtu u shpreh i kënaqur me mbështetjen që ka marrë nga trajneri dhe bashkëlojtarët: "Jam shumë i lumtur që jam pjesë e kësaj skuadre. Trajneri dhe lojtarët më kanë ndihmuar shumë dhe jam shumë mirënjohës për këtë."
        `,
      },
    ],
  };

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Lexojmë lajmet nga localStorage
  const savedNews = JSON.parse(localStorage.getItem("newsData")) || {
    NEW: [],
    HIGHLIGHT: [],
    INTERVIEWS: [],
  };

  // Bashkojmë lajmet e inicializuara me ato të ruajtura në localStorage
  const mergedNewsData = {
    NEW: [...initialNewsData.NEW, ...savedNews.NEW],
    HIGHLIGHT: [...initialNewsData.HIGHLIGHT, ...savedNews.HIGHLIGHT],
    INTERVIEWS: [...initialNewsData.INTERVIEWS, ...savedNews.INTERVIEWS],
  };

  // Gjejmë lajmin me ID përkatëse
  const newsItem = Object.values(mergedNewsData)
    .flat()
    .find((news) => news.id === parseInt(id));

  // Funksioni për të fshirë lajmin
  const handleDeleteNews = () => {
    const confirmDelete = window.confirm("A jeni i sigurt që doni ta fshini këtë lajm?");
    if (!confirmDelete) return;

    // Filtrojmë lajmet duke hequr atë me ID përkatëse
    const updatedNews = {
      NEW: mergedNewsData.NEW.filter((news) => news.id !== parseInt(id)),
      HIGHLIGHT: mergedNewsData.HIGHLIGHT.filter((news) => news.id !== parseInt(id)),
      INTERVIEWS: mergedNewsData.INTERVIEWS.filter((news) => news.id !== parseInt(id)),
    };

    // Përditësojmë localStorage
    localStorage.setItem("newsData", JSON.stringify(updatedNews));

    // Ridrejtojmë përdoruesin në faqen e lajmeve
    navigate("/news");
  };

  if (!newsItem) {
    return <div>Lajmi nuk u gjet.</div>;
  }

  return (
    <div className="news-detail">
      <h1>{newsItem.title}</h1>
      <p className="date">{newsItem.date}</p>
      <img src={newsItem.img} alt={newsItem.title} />
      <p>{newsItem.fullContent}</p>
      <button className="delete-button" onClick={handleDeleteNews}>
        Fshij Lajmin
      </button>
    </div>
  );
};

export default NewsDetail;