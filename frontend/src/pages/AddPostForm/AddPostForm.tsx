import { useState, useEffect } from "react";
import styles from "./AddPostForm.module.css";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import { API_URL } from "../../config";

interface FormData {
  name: string;
  description: string;
  type: string;
  file: File | null;
  teachingUnit: string;
}

interface Unit {
  id: number;
  code: string;
  name: string;
  semester: number;
}

const AddPostForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    type: "",
    file: null,
    teachingUnit: "",
  });
  const [fileName, setFileName] = useState("");

  const [teachingUnits, setTeachingUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnits = async () => {
      try {
        const res = await fetch(`${API_URL}/getTeachingUnits.php`);
        const data = await res.json();
        if (data.success) {
          setTeachingUnits(data.units);
        } else {
          console.error("Erreur backend :", data.error);
        }
      } catch (err) {
        console.error("Erreur fetch :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUnits();
  }, []);

  if (loading) return (
    <LoadingIndicator
      message='Chargement des ressources...'
      containerStyle={{
        flex: 2,
      }}
    />
  );


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "type") {
      // Reset complet si type change
      setFormData({
        name: "",
        description: "",
        type: value,
        file: null,
        teachingUnit: "",
      });
      setFileName("");
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };  


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setFileName(file.name);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = "var(--primary)";
    e.currentTarget.style.background = "rgba(99, 102, 241, 0.1)";
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.background = "var(--accent)";
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, file }));
      setFileName(file.name);
    }
    handleDragLeave(e);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      description: "",
      type: "",
      file: null,
      teachingUnit: "",
    });
    setFileName("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.teachingUnit &&
      !["comm_doc", "comm_text"].includes(formData.type)
    ) {
      alert("Veuillez sélectionner une unité d’enseignement.");
      return;
    }

    if (formData.type !== "comm_text" && !formData.file) {
      alert("Veuillez sélectionner un fichier avant de soumettre.");
      return;
    }

    const form = new FormData();
    form.append("name", formData.name);
    form.append("description", formData.description);
    form.append("type", formData.type);
    form.append("teachingUnit", formData.teachingUnit);
    form.append("authorId", "user1");
    if (formData.file) form.append("file", formData.file);

    console.log("FormData envoyée :", Object.fromEntries(form.entries()));

    try {
      const response = await fetch("https://openlibrary.free.nf/api/addPost.php", {
      // const response = await fetch("http://127.0.0.1/backend/api/addPost.php", {
        method: "POST",
        body: form,
      });

      const data = await response.json();
      console.log("Réponse complète du serveur:", data);

      if (data.success) {
        alert("Post ajouté avec succès !");
        handleReset();
      } else {
        alert("Erreur : " + data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Erreur lors de l'ajout du post.");
    }
  };

  const showFileField =
    formData.type &&
    !["", "comm_text"].includes(formData.type);
  const showTeachingUnitField =
    formData.type &&
    !["comm_doc", "comm_text"].includes(formData.type);

  return (
    <section className={styles.addPostForm}>
      <h2 className={styles.title}>Ajouter une ressource</h2>
      <form method="POST" encType="multipart/form-data" className={styles.form} onSubmit={handleSubmit}>

        {/* Type de post */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="doc-type">
            Type de post
          </label>
          <select
            className={styles.input}
            id="doc-type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          >
            <option value="">Sélectionnez un type</option>
            <option value="cours">Cours</option>
            <option value="td">TD</option>
            <option value="tp">TP</option>
            <option value="exam">Sujet d'examen</option>
            <option value="comm_text">Communiqué textuel</option>
            <option value="comm_doc">Communiqué par document (PDF)</option>
          </select>
        </div>

        {/* Unité d'enseignement */}
        {showTeachingUnitField && (
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="teaching-unit">
              Unité d’enseignement
            </label>
            <select
              className={styles.input}
              id="teaching-unit"
              name="teachingUnit"
              value={formData.teachingUnit}
              onChange={handleInputChange}
              required={formData.type !== "comm_doc" && formData.type !== "comm_text"}
            >
              <option value="">Sélectionnez une UE</option>
              {teachingUnits.map((ue) => (
                <option key={ue.code} value={ue.code}>
                  {ue.code} — {ue.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Nom du post */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="doc-name">
            Nom du post
          </label>
          <input
            className={styles.input}
            type="text"
            id="doc-name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Ex: Cours d'algorithmique, Communiqué x, etc"
            required
          />
        </div>

        {/* Description */}
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="doc-description">
            Description
          </label>
          <textarea
            className={styles.textarea}
            id="doc-description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Décrivez brièvement le document..."
            required
          />
        </div>

        {/* Champ fichier (visible uniquement pour certains types) */}
        {showFileField && (
          <div className={styles.fileGroup}>
            <label className={styles.label}>Fichier</label>
            <div
              className={styles.fileInput}
              onClick={() => document.getElementById("doc-file")?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <span>{fileName || "Glissez-déposez ou cliquez pour sélectionner"}</span>
              <input
                type="file"
                id="doc-file"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
        )}

        {/* Actions */}
        <div className={styles.formActions}>
          <button
            className={`btn ${styles.resetBtn}`}
            type="button"
            onClick={handleReset}
          >
            Effacer
          </button>
          <button className={`btn ${styles.submitBtn}`} type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddPostForm;
