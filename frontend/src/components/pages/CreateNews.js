import React, { useState, useEffect } from "react"; // Sigurohuni që të keni importuar `useEffect` nga `react`
import { useNavigate, useLocation } from "react-router-dom"; // Sigurohuni që të keni importuar `useLocation` nga `react-router-dom`

const CreateNews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    fullContent: "",
    img: null,
    category: "NEW",
  });

  // Merrni ID-në e lajmit nga URL (query parameters)
  const queryParams = new URLSearchParams(location.search);
  const newsId = queryParams.get("id");

  // Nëse ka një ID lajmi, e ngarkojmë nga localStorage
  useEffect(() => {
    if (newsId) {
      const savedNews = JSON.parse(localStorage.getItem("newsData")) || {
        NEW: [],
        HIGHLIGHT: [],
        INTERVIEWS: [],
      };

      // Kërkojmë lajmin në të gjitha kategoritë
      let newsToEdit = null;
      Object.keys(savedNews).forEach((category) => {
        const news = savedNews[category].find((item) => item.id === parseInt(newsId));
        if (news) {
          newsToEdit = news;
        }
      });

      if (newsToEdit) {
        setFormData({
          title: newsToEdit.title,
          date: newsToEdit.date,
          description: newsToEdit.description,
          fullContent: newsToEdit.fullContent,
          img: newsToEdit.img,
          category: newsToEdit.category,
        });
      }
    }
  }, [newsId]);

  // Funksioni për të ndryshuar të dhënat e formës
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Funksioni për të ndryshuar imazhin
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, img: file });
    }
  };

  // Funksioni për dërgimin e formës
  const handleSubmit = (e) => {
    e.preventDefault();

    // Gjenerojmë një ID të ri për lajmin
    const newId = Date.now();

    // Krijojmë një URL për imazhin e ngarkuar
    const imageUrl = formData.img ? URL.createObjectURL(formData.img) : "";

    // Krijojmë objektin e lajmit
    const newNews = {
      ...formData,
      id: newId,
      img: imageUrl, // Përdorim URL-në e krijuar për imazhin
    };

    // Marrim lajmet ekzistuese nga localStorage
    const savedNews = JSON.parse(localStorage.getItem("newsData")) || {
      NEW: [],
      HIGHLIGHT: [],
      INTERVIEWS: [],
    };

    // Shtojmë lajmin e ri në kategori përkatëse
    savedNews[formData.category].push(newNews);

    // Ruajmë lajmet e përditësuara në localStorage
    localStorage.setItem("newsData", JSON.stringify(savedNews));

    // Shfaqim një mesazh suksesi
    alert("Lajmi u krijua me sukses!");

    // Ridrejtojmë përdoruesin në faqen e lajmeve
    navigate("/news");
  };

  return (
    <div className="create-news-container">
      <h1>Krijo Lajm të Ri</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titulli</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Përshkrimi</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="fullContent">Përmbajtja e Plotë</label>
          <textarea
            id="fullContent"
            name="fullContent"
            value={formData.fullContent}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="img">Ngarko Imazhin</label>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategoria</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="NEW">E Re</option>
            <option value="HIGHLIGHT">Pikat Kryesore</option>
            <option value="INTERVIEWS">Intervista</option>
          </select>
        </div>

        <button type="submit">Krijo Lajm</button>
      </form>
    </div>
  );
};

export default CreateNews;
