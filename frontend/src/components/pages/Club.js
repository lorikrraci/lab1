import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Club.css";

const Club = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/players"
        ); // Corrected to /players
        const playersData = Array.isArray(response.data)
          ? response.data
          : response.data.players || [];
        setPlayers(playersData);
        setLoading(false);
      } catch (err) {
        setError(
          `Error fetching players: ${err.message} (Status: ${
            err.response?.status || "Unknown"
          })`
        );
        setLoading(false);
        console.error("Fetch error:", err);
      }
    };

    fetchPlayers();
  }, []);

  if (loading) return <div>Loading players...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="club-container">
      <header className="club-header">
        <div className="overlay">
          <h1 className="title">KLUBI YNË</h1>
          <p className="description">
            Klubi më i vjetër dhe më i suksesshëm i basketbollit në Gjakovë,
            duke përfaqësuar pasionin dhe traditën e qytetit. Një histori e
            pasur, një ekip i bashkuar, një qytet pas nesh. Vëllaznimi është më
            shumë se basketboll është një mënyrë jetese!
          </p>
          <h2 className="squad-title">SQUAD</h2>
          <div className="manager">
            <div className="manager-card">
              <div className="name1">Sarin</div>
              <div className="manager-image"></div>
              <span className="manager1">Manager</span>
            </div>
          </div>

          <div className="players">
            {Array.isArray(players) && players.length > 0 ? (
              players.map((player) => (
                <div
                  key={player.id}
                  className={`player-card player-${player.jersey_number}`}
                >
                  <span className="number">{player.jersey_number}</span>
                  <div
                    className="player-image"
                    style={{
                      backgroundImage: player.image_url
                        ? `url(${player.image_url})`
                        : `url('https://via.placeholder.com/200x200?text=Player+Image')`,
                    }}
                  ></div>
                  <span className="name">{`${player.first_name} ${
                    player.last_name || ""
                  }`}</span>
                  <span className="position">{player.position}</span>
                </div>
              ))
            ) : (
              <p>No players found.</p>
            )}
          </div>
        </div>
      </header>

      <main className="club-content">
        <section>
          <h3>HISTORIA E KLUBIT</h3>
          <p>
            KB Vëllaznimi është një klub me traditë shumëvjeqare në Basketbollin
            Kosovarë. Klubi i Vëllaznimit u themelua në vitin 1948 , ku
            fillimisht morri pjesë në kampionatin e parë të organizur në Kosovë
            në vitin 1949 .KB Vëllaznimi zhvillon aktivitetet në Palestren
            Sportive "Shani Nushi" Gjakovë. KB Vëllaznimi në struktrat e veta ka
            të angazhuar një ekip profesional në aspektin : Sportiv ,
            Administrativ dhe në Marketing. Vëllaznimi ka grupin më masiv të
            tifozëve Kuqezinjët e Jakovës që asnjëher nuk mungojnë në ndeshjet e
            Vëllaznimit dhe gjithmonë mbushin sallen.
          </p>
        </section>
        <section>
          <h3>ÇMIMET</h3>
          <p>
            KB Vëllaznimi ka lënë gjurmë të thella në historinë e basketbollit
            të Kosovës, duke fituar çmime të rëndësishme si Ligen e Pare te
            Kosoves, Kupen e Kosoves dhe Super Kupen. Çdo çmim është rezultat i
            përkushtimit dhe pasionit të lojtarëve dhe shtabit teknik. Çmimet që
            KB Vëllaznimi ka fituar janë dëshmi e mundit dhe sakrificës së
            lojtarëve dhe tifozëve. Me çdo fitore, klubi ka rritur ndikimin e
            tij në sport dhe është bërë simbol i krenarisë për Gjakovën.
          </p>
        </section>
        <section>
          <h3>TRAJNERËT NDER VITE</h3>
          <p>
            Vëllaznimi ka pasur shumë trajnerë viteve të fundit: Franco Sterle,
            Josip Plantak, Audrius Prakuraitis, Vladimir Krstic, Branimir Pavic,
            Jeronimo Sarin
          </p>
        </section>
      </main>

      <div className="trophy-section">
        <div className="trophy-left">
          <h4 className="trophy-title">Visit Our</h4>
          <h4 className="trophy-main-title">Trophy Room</h4>
          <p className="trophy-description">
            Zbuloni trashëgiminë tonë të suksesit me tre trofe prestigjioze në
            Kosovë: Titulli i Ligës së Parë, Kupa e Kosovës dhe Superkupa. Çdo
            fitore pasqyron përkushtimin, pasionin dhe angazhimin tonë për
            ekselencë në futboll.
          </p>
        </div>

        <div className="trophy-right">
          <div className="trophy trophy-kosovo-league">
            <div className="trophy-image"></div>
            <p className="trophy-title">Kosovo First League</p>
            <p className="trophy-year">2013,2020,2022</p>
          </div>
          <div className="trophy trophy-kosovo-cup">
            <div className="kosovo-cup-image"></div>
            <p className="trophy-title">Kosovo Cup</p>
            <p className="trophy-year">1992, 1996</p>
          </div>
          <div className="trophy-super-cup">
            <div className="super-cup-image"></div>
            <p className="trophy-title">Super Cup</p>
            <p className="trophy-year">1996</p>
          </div>
        </div>
      </div>

      <div className="opinion-sponsor-container">
        <div className="opinion-sponsor-box">
          <h4 className="opinion-title">Their Opinion of the Team</h4>
          <div className="opinion-section">
            <div className="opinion-card">
              <img
                src="https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250"
                alt="Fan 1"
              />
              <p>
                "Vëllaznimi është zemra e qytetit tonë! Një ekip me traditë të
                madhe."
              </p>
              <span className="fan-name">- Arben Gashi</span>
            </div>
            <div className="opinion-card">
              <img
                src="https://img.freepik.com/free-photo/portrait-smiling-blonde-woman_23-2148316635.jpg?t=st=1738611127~exp=1738614727~hmac=6a7a4106f708b6711848fc094ee9eb1bbfca38673835cdba162e2dede09c38c8&w=740"
                alt="Fan 2"
              />
              <p>
                "Një ekip që gjithmonë lufton deri në fund! Mbështetje e madhe
                për ta!"
              </p>
              <span className="fan-name">- Besarta Hoxha</span>
            </div>
            <div className="opinion-card">
              <img
                src="https://img.freepik.com/free-photo/close-up-young-caucasian-guy-with-beard-smiling-looking-happy-camera-standing-blue-background_1258-40230.jpg?t=st=1738611279~exp=1738614879~hmac=93bbb3578c0715c21b96b00edf3252ce4df90a49b901305aa59ced7c20d3f83f&w=996"
                alt="Fan 3"
              />
              <p>
                "Tradita dhe pasioni i këtij ekipi janë të jashtëzakonshme!"
              </p>
              <span className="fan-name">- Edon Kelmendi</span>
            </div>
          </div>

          <h4 className="sponsor-title">Our Sponsors</h4>
          <div className="sponsors">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt0Nxlk4IDwBXJ1x5WneOZLFHui7Amb3HsNA&s"
              alt="Sponsor 1"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2YgEw2EfI3oPeUYqm0vDo0F7L8GIH2c8PDg&s"
              alt="Sponsor 2"
            />
            <img
              src="https://i0.wp.com/www.koshigroup.com/wp-content/uploads/2019/06/KOSHIGroupLOGO_Official.png?fit=1728%2C804&ssl=1"
              alt="Sponsor 3"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSv1qZJsP94BTO3Sf689vVqMANSXiNQgIux4A&s"
              alt="Sponsor 4"
            />
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbptto9YjwYmj5LhcdCC56eudyTMbWWmoQSg&s"
              alt="Sponsor 5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Club;
