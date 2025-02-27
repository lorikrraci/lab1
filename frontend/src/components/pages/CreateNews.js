import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const CreateNews = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    fullContent: "",
    img: null,
    imgPreview: "",
    category: "NEW",
  });

  const queryParams = new URLSearchParams(location.search);
  const newsId = queryParams.get("id");

  useEffect(() => {
    if (newsId) {
      const savedNews = JSON.parse(localStorage.getItem("newsData")) || {
        NEW: [],
        HIGHLIGHT: [],
        INTERVIEWS: [],
      };

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
          img: null,
          imgPreview: newsToEdit.img,
          category: newsToEdit.category,
        });
      }
    }
  }, [newsId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, img: file, imgPreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedNews = JSON.parse(localStorage.getItem("newsData")) || {
      NEW: [],
      HIGHLIGHT: [],
      INTERVIEWS: [],
    };

    if (newsId) {
      Object.keys(savedNews).forEach((category) => {
        savedNews[category] = savedNews[category].map((news) =>
          news.id === parseInt(newsId) ? { ...news, ...formData, img: formData.imgPreview } : news
        );
      });
    } else {
      const newId = Date.now();
      const newNews = {
        ...formData,
        id: newId,
        img: formData.imgPreview,
      };
      savedNews[formData.category].push(newNews);
    }

    localStorage.setItem("newsData", JSON.stringify(savedNews));
    alert(newsId ? "Lajmi u përditësua me sukses!" : "Lajmi u krijua me sukses!");
    navigate("/news");
  };

  return (
    <div className="create-news-container">
      <h1>{newsId ? "Përditëso Lajmin" : "Krijo Lajm të Ri"}</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titulli</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="date">Data</label>
          <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="description">Përshkrimi</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="fullContent">Përmbajtja e Plotë</label>
          <textarea id="fullContent" name="fullContent" value={formData.fullContent} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="img">Ngarko Imazhin</label>
          <input type="file" id="img" name="img" accept="image/*" onChange={handleImageChange} />
          {formData.imgPreview && <img src={formData.imgPreview} alt="Preview" style={{ width: "200px", marginTop: "10px" }} />}
        </div>

        <div className="form-group">
          <label htmlFor="category">Kategoria</label>
          <select id="category" name="category" value={formData.category} onChange={handleChange}>
            <option value="NEW">E Re</option>
            <option value="HIGHLIGHT">Pikat Kryesore</option>
            <option value="INTERVIEWS">Intervista</option>
          </select>
        </div>

        <button type="submit">{newsId ? "Përditëso Lajmin" : "Krijo Lajm"}</button>
      </form>
    </div>
  );
};

export default CreateNews;