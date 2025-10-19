import Post from '../../components/Post/Post';
import styles from './Feed.module.css';
import { useState, useEffect } from 'react';
import { useTeachingUnit } from "../../context/TeachingUnitContext";

interface Resource {
  id: number;
  name: string;
  description: string;
  type: string;
  teachingUnit: string;
  authorId: string | null;
  file: string | null;
  createdAt: string;
  updatedAt: string;
  validated: number;
  views: number;
  downloads: number;
  fileUrl?: string;
}

const Feed = () => {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const { selectedUnit } = useTeachingUnit();

  useEffect(() => {
    // Remplacer l'URL si ton serveur PHP est sur un autre port ou domaine
    fetch("http://127.0.0.1/backend/api/getPosts.php")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResources(data.data);
        } else {
          console.error("Erreur backend :", data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erreur fetch :", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Chargement...</p>;

  const filteredPosts = selectedUnit === "Tous" 
  ? resources 
  : resources.filter(post => post.teachingUnit === selectedUnit);

  return (
    <section className={styles.feed}>
      <h1 className={styles.title}>Derniers posts</h1>
      <div className={styles.postsContainer}>
      {filteredPosts.length === 0 && <p>Aucune ressource pour l’instant.</p>}
        {filteredPosts.map(post => (
          <Post key={post.id}
            title={post.name}
            description={post.description}
            date={post.updatedAt}
            type= {post.type}
            hasDownload={post.type !== "comm_text"}
            hasPreview={post.type !== "comm_text"}
            fileUrl={post.fileUrl}
          />
        ))}
      </div>
    </section>
  );
};

export default Feed;